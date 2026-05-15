/**
 * HARMAN Protocol v5.0.10 — Binary ↔ JSON converter
 * Little-Endian byte order throughout.
 */

import {
  COMMAND_ID_MAP, FEATURE_ID_MAP, COLOR_ID_MAP, MASK_BIT_DEFS,
  PROTOCOL_STATUS_ID, BUSINESS_STATUS_ID, SERVICE_DATA_TYPE_MAP,
  HOST_TYPE_MAP, AUDIO_SOURCE_MAP, getFeatureGroup,
} from './constants.js'

// ─── Byte-level utilities ────────────────────────────────────────────────────

export function hexToBytes(hex) {
  const clean = hex.replace(/[\s,;:]/g, '').replace(/^0x/i, '').replace(/0x/gi, '')
  if (clean.length % 2 !== 0) throw new Error(`Hex string has odd length (${clean.length} chars)`)
  const bytes = new Array(clean.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    const byte = parseInt(clean.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error(`Invalid hex at position ${i * 2}: "${clean.substr(i * 2, 2)}"`)
    bytes[i] = byte
  }
  return bytes
}

export function bytesToHex(bytes, sep = ' ') {
  return bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(sep)
}

function h(val, w = 4) {
  return '0x' + val.toString(16).toUpperCase().padStart(w, '0')
}

function readU16(b, o) { return (b[o] | (b[o + 1] << 8)) >>> 0 }
function readU32(b, o) { return (b[o] | (b[o+1]<<8) | (b[o+2]<<16) | (b[o+3]<<24)) >>> 0 }
function writeU16(v)   { return [v & 0xFF, (v >> 8) & 0xFF] }
function writeU32(v)   { return [v & 0xFF, (v >> 8) & 0xFF, (v >> 16) & 0xFF, (v >>> 24) & 0xFF] }

// ─── Status code ─────────────────────────────────────────────────────────────

function parseStatusCode(val) {
  if (val === 0) return { success: true, code: '0x0000' }
  const isError   = (val >> 15) & 1
  const category  = (val >> 8) & 0x7F
  const id        = val & 0xFF
  const catName   = category === 0x01 ? 'Protocol' : category === 0x02 ? 'Business' : `Unknown(${h(category, 2)})`
  const table     = category === 0x01 ? PROTOCOL_STATUS_ID : BUSINESS_STATUS_ID
  return {
    success: !isError,
    code: h(val),
    category: catName,
    reason: table[id] || `Unknown(${h(id, 2)})`,
  }
}

// ─── Feature value parsers ────────────────────────────────────────────────────

function parseFeatureValue(featureId, vb) {
  const raw = bytesToHex(vb)

  switch (featureId) {
    case 0x0000: {              // Unsupported Feature ID List
      const ids = []
      for (let i = 0; i + 1 < vb.length; i += 2) {
        const fid = readU16(vb, i)
        ids.push({ featureId: h(fid), name: FEATURE_ID_MAP[fid]?.name ?? 'Unknown' })
      }
      return { raw, unsupportedFeatures: ids }
    }

    case 0x0001: case 0x0003:   // MTU, interval
      return { raw, value: readU16(vb, 0) }

    case 0x0004:                // Product ID
      return { raw, value: h(readU16(vb, 0)) }

    case 0x0005:                // Color ID
      return { raw, colorId: h(vb[0], 2), color: COLOR_ID_MAP[vb[0]] || 'Unknown' }

    case 0x0006:                // Device Name (UTF-8)
      return { raw, value: new TextDecoder().decode(new Uint8Array(vb)) }

    case 0x0008:                // Serial Number (ASCII)
      return { raw, value: String.fromCharCode(...vb.filter(b => b !== 0)) }

    case 0x000A:                // BT MAC Address (6B, stored MSB-first same as display order)
      return { raw, mac: [...vb].map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(':') }

    case 0x000C: {              // Firmware Version (up to 3B)
      const parts = vb.slice(0, 3).map(b => b)
      return { raw, version: `v${parts.join('.')}` }
    }

    case 0x000D:                // Battery Status
      return { raw, charging: !!(vb[0] >> 7), level: vb[0] & 0x7F, ignored: (vb[0] & 0x7F) === 0x7F }

    case 0x000F:                // Factory Reset
      return { raw, note: 'No value — triggers factory reset' }

    case 0x0010:                // BT Connection Status
      return { raw, connected: !!(vb[0] >> 7) }

    case 0x0012: {              // Auto Power Off
      const v = readU16(vb, 0)
      return { raw, enabled: !!(v >> 15), seconds: v & 0x7FFF }
    }

    case 0x0018: case 0x0019: case 0x001A: // ANC / AA / TT
      return { raw, on: !!(vb[0] >> 7), level: vb[0] & 0x7F }

    case 0x0026:                // Noise Suppression
      return { raw, on: !!(vb[0] >> 7) }

    case 0x002F:                // Host Type
      return { raw, typeId: h(vb[0], 2), type: HOST_TYPE_MAP[vb[0]] || 'Unknown' }

    case 0x003C:                // Full Firmware Version (string)
      return { raw, value: new TextDecoder().decode(new Uint8Array(vb.filter(b => b))) }

    case 0x004D: {              // Individual Max Volume Limit
      const src = vb[0]; const vol = vb[1]
      return { raw, audioSource: AUDIO_SOURCE_MAP[src] || h(src, 2), enabled: !!(vol >> 7), maxLevel: vol & 0x7F }
    }

    case 0x004E:                // Default Volume
      return { raw, on: !!(vb[0] >> 7), level: vb[0] & 0x7F }

    case 0x004F:                // Manual Power On
      return { raw, note: 'No value — power key pressed' }

    case 0x0031: {              // Sync Time (16B): sec/min/hour/weekday/day/month/year(U16LE)/timeFormat/timezone(6B ascii)/dst
      if (vb.length < 16) return { raw }
      const sec     = vb[0]
      const min     = vb[1]
      const hour    = vb[2]
      const weekday = vb[3]  // 1=Monday
      const day     = vb[4]
      const month   = vb[5]
      const year    = readU16(vb, 6)
      const timeFmt = vb[8] === 0x01 ? '12H' : vb[8] === 0x02 ? '24H' : `0x${vb[8].toString(16)}`
      const tz      = String.fromCharCode(...vb.slice(9, 15)).replace(/\x00/g, '')
      const dst     = vb[15]
      const pad = (n, w = 2) => String(n).padStart(w, '0')
      return {
        raw,
        datetime: `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(min)}:${pad(sec)}`,
        weekday,
        timeFormat: timeFmt,
        timezone: tz,
        dstEnabled: !!dst,
      }
    }

    case 0x0B00: case 0x0B02: case 0x0B03:  // OTA MTUs / interval (U16)
      return { raw, value: readU16(vb, 0) }

    case 0x0B01:                // OTA Continuous Packets Max Count (U8)
      return { raw, value: vb[0] }

    case 0x0B04: {              // OTA Upgrade Components
      const comp = { 0x00: 'All', 0x01: 'Base Station', 0x02: 'Built-in Mic' }
      return { raw, component: comp[vb[0]] || h(vb[0], 2) }
    }

    case 0x0E02: {              // EQ Info
      if (vb.length < 0x13) return { raw }
      const PRESET_EQ = { 0x00:'OFF',0x01:'JAZZ',0x02:'VOCAL',0x03:'BASS',0x04:'ROCK',0x05:'PIANO',0x06:'CLUB',0x07:'STUDIO',0x80:'JBL Signature',0xFF:'CURRENT_EQ' }
      const BAND_FILTER = { 0x00:'Low Shelf',0x01:'Peaking',0x02:'High Shelf',0x03:'LPF',0x04:'HPF',0x05:'Pass Through',0x08:'Notch',0x09:'APF' }
      const presetId    = vb[0]
      const catState    = vb[1]  // 0=Inactive,1=Active,2=Preview
      const bandCount   = vb[2]
      const readF32 = (b, o) => {
        const u32 = readU32(b, o)
        if (u32 === 0xFFFFFFFF) return null
        const buf = new ArrayBuffer(4)
        new DataView(buf).setUint32(0, u32, false)
        return new DataView(buf).getFloat32(0, false)
      }
      const calibration   = readF32(vb, 3)
      const sampleRate    = readU32(vb, 7)
      const leftGain      = readF32(vb, 11)
      const rightGain     = readF32(vb, 15)
      const bands = []
      for (let i = 0; i < bandCount; i++) {
        const off = 19 + i * 13
        if (off + 13 > vb.length) break
        bands.push({
          filterType: BAND_FILTER[vb[off]] || h(vb[off], 2),
          frequency:  readF32(vb, off + 1),
          gain:       readF32(vb, off + 5),
          q:          readF32(vb, off + 9),
        })
      }
      const nameStart = 19 + bandCount * 13
      const eqName = nameStart < vb.length
        ? new TextDecoder().decode(new Uint8Array(vb.slice(nameStart))).replace(/\x00/g, '')
        : ''
      return {
        raw,
        presetId:    h(presetId, 2),
        presetName:  PRESET_EQ[presetId] || `Unknown(${h(presetId, 2)})`,
        categoryState: ['Inactive','Active','Preview'][catState] ?? h(catState, 2),
        bandCount,
        calibration,
        sampleRate,
        leftTotalGain:  leftGain,
        rightTotalGain: rightGain,
        bands,
        eqName,
      }
    }

    case 0x000E:                // Right/Secondary Device Battery Status (same format as 0x000D)
      return { raw, charging: !!(vb[0] >> 7), level: vb[0] & 0x7F, ignored: (vb[0] & 0x7F) === 0x7F }

    case 0x0011: {              // Manual Power Off (U16 LE seconds; 0=immediate)
      const secs = readU16(vb, 0)
      return { raw, seconds: secs, immediate: secs === 0 }
    }

    case 0x0013: {              // Auto Standby (same bit layout as Auto Power Off)
      const v = readU16(vb, 0)
      return { raw, enabled: !!(v >> 15), seconds: v & 0x7FFF }
    }

    case 0x0014: case 0x0015:   // Game Chat Balance / LR Balance
      return { raw, on: !!(vb[0] >> 7), level: vb[0] & 0x7F }

    case 0x0016:                // Mic Work Indicating LED Brightness
      return { raw, on: !!(vb[0] >> 7), level: vb[0] & 0x7F }

    case 0x0017:                // Battery Presence
      return { raw, present: vb[0] === 0x01 }

    case 0x001B: case 0x001C: case 0x001D: case 0x001E: case 0x001F: case 0x0020:
    case 0x0027: case 0x0028: case 0x002A: case 0x0049: // simple on/off flags
      return { raw, on: !!(vb[0] >> 7) }

    case 0x0021: {              // Spatial Sound Mode
      const MODE = { 0x01:'Fixed', 0x02:'Head Tracking' }
      return { raw, on: !!(vb[0] >> 7), mode: MODE[vb[0] & 0x7F] ?? h(vb[0] & 0x7F, 2) }
    }

    case 0x0022: {              // Spatial Sound Scene
      const SCENE = { 0x01:'Movie', 0x02:'Music', 0x03:'Game' }
      return { raw, on: !!(vb[0] >> 7), scene: SCENE[vb[0] & 0x7F] ?? h(vb[0] & 0x7F, 2) }
    }

    case 0x0023: {              // Sidetone
      const LVL = { 0x01:'Low', 0x02:'Mid', 0x03:'High', 0x04:'Max' }
      return { raw, on: !!(vb[0] >> 7), level: LVL[vb[0] & 0x7F] ?? (vb[0] & 0x7F) }
    }

    case 0x0025: case 0x0024: case 0x002B: case 0x002C:
      return { raw, on: !!(vb[0] >> 7), level: vb[0] & 0x7F }

    case 0x0029: {              // Sound Effect
      const FX = { 0x00:'Natural', 0x01:'Treble Boost', 0x02:'Bass Boost', 0x03:'Bright', 0x04:'Powerful' }
      return { raw, on: !!(vb[0] >> 7), effect: FX[vb[0] & 0x7F] ?? h(vb[0] & 0x7F, 2) }
    }

    case 0x0033: {              // Host BLE MAC Address (6B MAC + 1B type)
      const mac  = [...vb.slice(0,6)].map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(':')
      const type = vb[6] === 0x00 ? 'Public' : vb[6] === 0x01 ? 'Random' : h(vb[6], 2)
      return { raw, mac, addressType: type }
    }

    case 0x0034: case 0x0035: case 0x0036: // connection status flags
      return { raw, connected: !!(vb[0] >> 7) }

    case 0x0037:                // Water Ejection
      return { raw, status: vb[0] === 0x00 ? 'Stopped' : vb[0] === 0x01 ? 'Started' : h(vb[0], 2) }

    case 0x0039:                // Host Name Paired to BT Device (UTF-8)
      return { raw, value: new TextDecoder().decode(new Uint8Array(vb)).replace(/\x00/g, '') }

    case 0x003A:                // Authenticate Mode
      return { raw, mode: vb[0] === 0x00 ? 'Exit' : 'Enter' }

    case 0x003D:                // Audio Signal Detect
      return { raw, detected: vb[0] === 0x01 }

    case 0x003F:                // Dongle State
      return { raw, state: vb[0] === 0x01 ? 'Dongle mode' : vb[0] === 0x02 ? 'UAC mode' : h(vb[0], 2) }

    case 0x0040:                // Spatial Sound Availability
      return { raw, available: !!(vb[0] >> 7) }

    case 0x0045:                // Primary Device Power State
      return { raw, state: vb[0] === 0x00 ? 'Power off' : 'Power on' }

    case 0x0046: case 0x0047:   // BT MAC CRC16
      return { raw, crc16: bytesToHex(vb) }

    case 0x100B: {              // Call Status
      const CALL = { 0x01:'Outgoing call', 0x02:'Incoming call', 0x03:'In a call' }
      return { raw, calling: !!(vb[0] >> 7), state: CALL[vb[0] & 0x7F] ?? h(vb[0] & 0x7F, 2) }
    }

    case 0x100C:                // Auto Pickup Call
      return { raw, enabled: !!(vb[0] >> 7) }

    case 0x1010: {              // Call Control
      const CTRL = { 0x00:'Hang up', 0x01:'Answer', 0x02:'Mute', 0x03:'Unmute', 0x04:'Reject' }
      return { raw, on: !!(vb[0] >> 7), control: CTRL[vb[0] & 0x7F] ?? h(vb[0] & 0x7F, 2) }
    }

    case 0x1011: case 0x100F:   // Call Volume / Smart Switch
      return { raw, on: !!(vb[0] >> 7), level: vb[0] & 0x7F }

    case 0x1012: case 0x1013:   // Call Phone Name / Number (string)
      return { raw, value: new TextDecoder().decode(new Uint8Array(vb)).replace(/\x00/g, '') }

    case 0x1014:                // Call Duration (seconds)
      return { raw, seconds: readU32(vb, 0) }

    case 0x2C02:                // TWS Stereo Connection Status
      return { raw, status: ['Normal','Connecting','Connected'][vb[0]] ?? h(vb[0], 2) }

    case 0x2C03:                // Party Role
      return { raw, role: ['Normal','Secondary','Primary'][vb[0]] ?? h(vb[0], 2) }

    case 0x2C04:                // Party Channel Type
      return { raw, channel: ['Full channel','Left channel','Right channel'][vb[0]] ?? h(vb[0], 2) }

    case 0x2C05:                // Party Group Name (UTF-8)
      return { raw, value: new TextDecoder().decode(new Uint8Array(vb)).replace(/\x00/g, '') }

    case 0x2D00: case 0x2D01: case 0x2D02:  // Karaoke Bass/Treble/Echo
      return { raw, on: !!(vb[0] >> 7), level: vb[0] & 0x7F }

    case 0x2E01: case 0x2E02: case 0x2E03: case 0x2E04: case 0x2E05: case 0x2E06:
      return { raw, value: readU16(vb, 0) }

    case 0x2E07:                // Battery State of Health (0~100%)
      return { raw, percent: vb[0] }

    case 0x2E08: {              // Battery Charging Status
      const CS = { 0x01:'AC Charging', 0x02:'DC', 0x03:'Full charged', 0x04:'Full depleted' }
      return { raw, status: CS[vb[0]] ?? h(vb[0], 2) }
    }

    case 0x2E09:                // Battery Health Notification
      return { raw, healthy: vb[0] === 0x00, status: vb[0] === 0x00 ? 'Health' : 'Low Battery Health' }

    case 0x2E0A: case 0x2E0B:   // Battery duration totals (minutes, U32 LE)
      return { raw, minutes: readU32(vb, 0) }

    case 0x0E80:                // Dynamic EQ
      return { raw, on: !!(vb[0] >> 7) }

    case 0x0D00: {              // Lighting Status
      const v = vb[0]
      const syncStatus = (v >> 4) & 0x3
      return {
        raw,
        lightingOn:  !!(v >> 7),
        previewMode: !!((v >> 6) & 1),
        syncing:     syncStatus === 1,
        syncStatus:  ['Not syncing','Syncing','Reserved','Ignore'][syncStatus],
      }
    }

    case 0x1008: case 0x1009:   // Total Playback/Power-on Time (minutes, U32 LE)
      return { raw, minutes: readU32(vb, 0) }

    case 0x2C80:                // Long Lasting Stereo Connection Status
      return { raw, status: ['Standalone','Stereo connected'][vb[0]] ?? h(vb[0], 2) }

    case 0x2C01: {              // Party Group Type
      const PARTY_TYPE = { 0x00:'Normal',0x01:'Auracast Party',0x02:'Auracast Stereo',0x03:'TWS Stereo',0x04:'Long Lasting Stereo',0x05:'Air Touch Stereo',0x07:'Daisy Chain' }
      return { raw, groupType: PARTY_TYPE[vb[0]] ?? h(vb[0], 2) }
    }

    case 0x2D40: {              // Audio Operation
      const OPS = { 0x00:'Stop',0x01:'Pause',0x02:'Play',0x03:'Prev',0x04:'Next',0x05:'Volume Up',0x06:'Volume Down' }
      return { raw, operation: OPS[vb[0]] ?? h(vb[0], 2) }
    }

    case 0x2D41:                // Audio Mute Status
      return { raw, muted: vb[0] === 0x01 }

    case 0x2D42:                // Audio Volume (0~100)
      return { raw, volume: vb[0] }

    case 0x2D43:                // Song Name (UTF-8)
    case 0x2D44:                // Artist Name (UTF-8)
    case 0x2D45:                // Song Lyric (UTF-8)
    case 0x2D62:                // Current Station Name (UTF-8)
      return { raw, value: new TextDecoder().decode(new Uint8Array(vb)).replace(/\x00/g, '') }

    case 0x2D46: {              // Audio Codec Setting
      const CODEC = { 0x00:'SBC',0x01:'AAC',0x02:'LDAC' }
      return { raw, on: !!(vb[0] >> 7), codec: CODEC[vb[0] & 0x7F] ?? h(vb[0] & 0x7F, 2) }
    }

    default:
      return { length: vb.length, value: raw }
  }
}

// ─── Payload parsers ──────────────────────────────────────────────────────────

function parseFeatureList(bytes, hasStatus) {
  let cursor = 0
  const result = {}

  if (hasStatus) {
    const sc = readU16(bytes, 0)
    result.statusCode = parseStatusCode(sc)
    cursor = 2
    if (!result.statusCode.success) return result
  }

  const features = []
  while (cursor + 4 <= bytes.length) {
    const featureId  = readU16(bytes, cursor)
    const valueSize  = readU16(bytes, cursor + 2)
    cursor += 4
    const vb = bytes.slice(cursor, cursor + valueSize)
    cursor += valueSize

    const info    = FEATURE_ID_MAP[featureId]
    const group   = getFeatureGroup(featureId)
    const parsed  = parseFeatureValue(featureId, vb)
    const { raw, ...rest } = parsed
    features.push({
      featureId: h(featureId),
      raw,
      name:      info ? info.name : `Unknown Feature`,
      group,
      perm:      info ? info.perm : '?',
      ...rest,
    })
  }
  result.features = features
  return result
}

function parseGetRequest(bytes) {
  const featureIds = []
  for (let i = 0; i + 1 < bytes.length; i += 2) {
    const fid  = readU16(bytes, i)
    const info = FEATURE_ID_MAP[fid]
    featureIds.push({ featureId: h(fid), name: info ? info.name : 'Unknown Feature' })
  }
  return { featureIds }
}

function parseOTANotification(bytes) {
  if (bytes.length < 10) return { raw: bytesToHex(bytes) }
  const pct = readU16(bytes, 2)
  return {
    statusCode:     parseStatusCode(readU16(bytes, 0)),
    percentage:     pct / 100,
    percentageRaw:  pct,
    absoluteOffset: readU32(bytes, 4),
    lengthToRead:   readU32(bytes, 8),
    done:           readU32(bytes, 8) === 0,
  }
}

function parseSendOTAData(bytes) {
  if (bytes.length < 4) return { raw: bytesToHex(bytes) }
  return {
    absoluteOffset: readU32(bytes, 0),
    data:           bytesToHex(bytes.slice(4)),
    dataLength:     bytes.length - 4,
  }
}

// ─── BLE Service Data parsers ─────────────────────────────────────────────────

function parseLegacyServiceData(bytes) {
  if (bytes.length < 4) return null
  const pid    = readU16(bytes, 0)
  const mask   = readU16(bytes, 2)
  let cursor   = 4
  const fields = {}

  for (const def of MASK_BIT_DEFS) {
    if (!((mask >> def.bit) & 1)) continue
    if (def.size === 0) { fields[def.name] = '(reserved/extension flag)'; continue }
    const fb = bytes.slice(cursor, cursor + def.size)
    cursor += def.size
    fields[def.name] = parseMaskField(def.name, fb)
  }

  return { pid: h(pid), mask: h(mask), fields }
}

function parseMaskField(name, bytes) {
  switch (name) {
    case 'colorId':
      return { raw: h(bytes[0], 2), color: COLOR_ID_MAP[bytes[0]] || 'Unknown' }
    case 'batteryInfo':
      return { charging: !!(bytes[0] >> 7), level: bytes[0] & 0x7F, low: (bytes[0] & 0x7F) === 0x7F }
    case 'macAddress':
      return [...bytes].map(b => b.toString(16).padStart(2,'0').toUpperCase()).join(':')
    case 'firmwareVersion3B':
      return `v${bytes[0]}.${bytes[1]}.${bytes[2]}`
    case 'firmwareVersion5B':
      return `v${bytes[0]}.${bytes[1]}.${bytes[2]}.${bytes[3]}.${bytes[4]}`
    case 'stereoGroupId':
      return { groupId: bytes[0], paired: bytes[0] !== 0 }
    case 'deviceMiscInfo': {
      const v = readU16(bytes, 0)
      return {
        raw: h(v), connectable: !!(v >> 15), standby: !!((v >> 14) & 1),
        muted: !!((v >> 13) & 1), led: !!((v >> 12) & 1),
        mic1: !!((v >> 11) & 1), mic2: !!((v >> 10) & 1),
        jblApp: !!((v >> 6) & 1), dongle: !!((v >> 5) & 1),
        soundbar: !!((v >> 4) & 1), usb: !!((v >> 3) & 1), aux: !!((v >> 2) & 1),
      }
    }
    case 'partyMethodInfo': {
      const v = bytes[0]
      return { raw: h(v, 2), auracast: !!(v >> 7), lls: !!((v >> 6) & 1), oneCast: !!((v >> 5) & 1) }
    }
    case 'partyInfo': {
      const v = readU16(bytes, 0)
      const groupType = ['Normal', 'Party', 'Stereo'][(v >> 13) & 0x3] || 'Unknown'
      return { raw: h(v), partyOn: !!(v >> 15), groupType, canJoin: !!(v & 1) }
    }
    case 'partyLightInfo': {
      const v = readU16(bytes, 0)
      return { raw: h(v), connectedToPartyBox: !!(v >> 15), stageNumber: (v >> 8) & 0x7F }
    }
    case 'deviceMiscInfo2': {
      const v = readU16(bytes, 0)
      return {
        raw: h(v), blePairingFlowSupported: !!(v >> 15), pairedStatusSupported: !!((v >> 14) & 1),
        srcName1BlePaired: !!((v >> 13) & 1), srcName2BlePaired: !!((v >> 12) & 1),
      }
    }
    default:
      return bytesToHex(bytes)
  }
}

function parseExtendedServiceData(bytes) {
  const pid    = readU16(bytes, 0)
  const fields = []
  let cursor   = 2

  while (cursor + 2 <= bytes.length) {
    const len   = bytes[cursor]
    if (cursor + 1 + len > bytes.length) break
    const type  = bytes[cursor + 1]
    const vb    = bytes.slice(cursor + 2, cursor + 1 + len)
    cursor     += 1 + len
    const info  = SERVICE_DATA_TYPE_MAP[type] || { name: `Unknown(${h(type, 2)})` }
    fields.push({ type: h(type, 2), name: info.name, raw: bytesToHex(vb) })
  }

  return { pid: h(pid), fields }
}

// ─── BLE AdvData parser (multiple AD structures) ─────────────────────────────

// Known AD type names
const AD_TYPE_NAMES = {
  0x01: 'Flags',
  0x02: 'Incomplete List of 16-bit UUIDs',
  0x03: 'Complete List of 16-bit UUIDs',
  0x08: 'Shortened Local Name',
  0x09: 'Complete Local Name',
  0x0A: 'TX Power Level',
  0x16: 'Service Data (UUID 16-bit)',
  0xFF: 'Manufacturer Specific',
}

function parseAdvData(bytes) {
  const adStructures = []
  let serviceData = null
  let cursor = 0

  while (cursor < bytes.length) {
    const len = bytes[cursor]
    if (len === 0 || cursor + 1 + len > bytes.length) break
    const type  = bytes[cursor + 1]
    const value = bytes.slice(cursor + 2, cursor + 1 + len)
    cursor += 1 + len

    if (type === 0x16 && value.length >= 2 && value[0] === 0xDF && value[1] === 0xFD) {
      // Harman Service Data
      const sd = value.slice(2)   // strip UUID, pass only PID+Mask+Data
      serviceData = parseBLEPayload(sd)
    } else {
      const entry = {
        adType:   `0x${type.toString(16).toUpperCase().padStart(2,'0')}`,
        adName:   AD_TYPE_NAMES[type] || 'Unknown',
        raw:      bytesToHex(value),
      }
      // Decode common types
      if (type === 0x09 || type === 0x08) {
        entry.name = new TextDecoder().decode(new Uint8Array(value)).replace(/\x00/g, '')
      } else if (type === 0x0A) {
        entry.txPowerdBm = value[0] << 24 >> 24  // signed
      } else if (type === 0x01) {
        entry.flags = `0x${value[0].toString(16).padStart(2,'0')}`
      }
      adStructures.push(entry)
    }
  }

  const result = {
    type: 'BLE_AdvData',
    uuid: '0xFDDF (Harman International)',
  }
  if (serviceData) Object.assign(result, serviceData)
  if (adStructures.length > 0) result.otherADStructures = adStructures
  return result
}

function isMaskPlausible(mask, dataLength) {  // Count expected data bytes from mask
  let expected = 0
  for (const def of MASK_BIT_DEFS) {
    if ((mask >> def.bit) & 1) expected += def.size
  }
  return expected === dataLength
}

// ─── Main entry: HEX → JSON ───────────────────────────────────────────────────

export function parseHex(hexStr) {
  const bytes = hexToBytes(hexStr.trim())
  if (bytes.length === 0) return null

  // Command Packet: starts with 0xDD00 or 0xDD01
  if (bytes.length >= 8 && bytes[0] === 0xDD && (bytes[1] === 0x00 || bytes[1] === 0x01)) {
    return parseCommandPacket(bytes)
  }
  if (bytes.length >= 8) {
    const id = readU16(bytes, 0)
    if (id === 0xDD00 || id === 0xDD01) {
      return parseCommandPacket(bytes)
    }
  }

  // BLE AdvData: one or more concatenated AD structures
  // Detect: first byte is plausible length AND next byte is a known AD type
  if (bytes.length >= 5 && bytes[1] === 0x16 && bytes[2] === 0xDF && bytes[3] === 0xFD) {
    return parseAdvData(bytes)
  }

  // BLE Service Data (raw, without AD wrapper)
  if (bytes.length >= 4) {
    const parsed = parseBLEPayload(bytes)
    if (parsed) return parsed
  }

  return { type: 'Unknown', note: 'Cannot identify packet format', raw: bytesToHex(bytes), length: bytes.length }
}

const FORMAT_LEGEND = [
  { kind: 'mask', label: 'mask' },
  { kind: 'feature-id', label: 'featureID' },
  { kind: 'length', label: 'length' },
  { kind: 'pid', label: 'pid' },
]

export function formatHexByBlocks(hexStr) {
  return formatHexByBlocksDetailed(hexStr).formatted
}

export function formatHexByBlocksDetailed(hexStr) {
  const bytes = hexToBytes(hexStr.trim())
  if (bytes.length === 0) return { formatted: '', blocks: [], legend: FORMAT_LEGEND }

  const classifier = classifyHexBytes(bytes)
  let blocks = []

  if (classifier === 'command') {
    blocks = formatCommandBlocks(bytes)
  } else if (classifier === 'adv') {
    blocks = formatAdvBlocks(bytes)
  } else if (classifier === 'ble-payload') {
    blocks = formatBLEPayloadBlocks(bytes)
  } else {
    blocks = [makeBlock(bytes, 'value')]
  }

  return {
    formatted: blocks.map(b => b.text).filter(Boolean).join(' '),
    blocks,
    legend: FORMAT_LEGEND,
  }
}

function makeBlock(arr, kind = 'value', label = '') {
  return {
    kind,
    label,
    text: arr.map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(''),
  }
}

function formatCommandBlocks(bytes) {
  if (bytes.length < 8) return [makeBlock(bytes, 'value')]

  const blocks = [
    makeBlock(bytes.slice(0, 2), 'identifier'),
    makeBlock(bytes.slice(2, 4), 'command-id'),
    makeBlock(bytes.slice(4, 5), 'value'),
    makeBlock(bytes.slice(5, 6), 'value'),
    makeBlock(bytes.slice(6, 8), 'length'),
  ]

  const commandId = readU16(bytes, 2)
  const payloadLength = readU16(bytes, 6)
  const available = Math.max(0, Math.min(payloadLength, bytes.length - 8))
  const payload = bytes.slice(8, 8 + available)
  blocks.push(...formatCommandPayloadBlocks(commandId, payload))

  const trailingStart = 8 + available
  if (trailingStart < bytes.length) blocks.push(makeBlock(bytes.slice(trailingStart), 'value'))

  return blocks
}

function formatCommandPayloadBlocks(commandId, payload) {
  if (payload.length === 0) return []

  const blocks = []
  let cursor = 0

  if (commandId === 0x0001) {
    const looksLikeResponse = payload.length % 2 !== 0 || (payload.length >= 2 && readU16(payload, 0) === 0x0000)
    if (looksLikeResponse) {
      if (payload.length >= 2) {
        blocks.push(makeBlock(payload.slice(0, 2), 'value'))
        cursor = 2
      }
      blocks.push(...formatFeatureTriples(payload, cursor))
      return blocks
    }

    while (cursor + 2 <= payload.length) {
      blocks.push(makeBlock(payload.slice(cursor, cursor + 2), 'feature-id'))
      cursor += 2
    }
    if (cursor < payload.length) blocks.push(makeBlock(payload.slice(cursor), 'value'))
    return blocks
  }

  if (commandId === 0x0002) {
    if (payload.length === 2) return [makeBlock(payload, 'value')]
    return formatFeatureTriples(payload, 0)
  }

  if (commandId === 0x0003 || commandId === 0x0004) {
    if (payload.length >= 2) {
      blocks.push(makeBlock(payload.slice(0, 2), 'value'))
      cursor = 2
    }
    blocks.push(...formatFeatureTriples(payload, cursor))
    return blocks
  }

  return [makeBlock(payload, 'value')]
}

function formatFeatureTriples(payload, startCursor) {
  const blocks = []
  let cursor = startCursor

  while (cursor + 4 <= payload.length) {
    const valueSize = readU16(payload, cursor + 2)
    const valueStart = cursor + 4
    const valueEnd = valueStart + valueSize

    blocks.push(makeBlock(payload.slice(cursor, cursor + 2), 'feature-id'))
    blocks.push(makeBlock(payload.slice(cursor + 2, cursor + 4), 'length'))

    if (valueEnd <= payload.length) {
      blocks.push(makeBlock(payload.slice(valueStart, valueEnd), 'value'))
      cursor = valueEnd
    } else {
      blocks.push(makeBlock(payload.slice(valueStart), 'value'))
      return blocks
    }
  }

  if (cursor < payload.length) blocks.push(makeBlock(payload.slice(cursor), 'value'))
  return blocks
}

function formatAdvBlocks(bytes) {
  const blocks = []
  let cursor = 0

  while (cursor < bytes.length) {
    if (cursor + 2 > bytes.length) {
      blocks.push(makeBlock(bytes.slice(cursor), 'value'))
      break
    }

    const len = bytes[cursor]
    const structEnd = cursor + 1 + len
    blocks.push(makeBlock(bytes.slice(cursor, cursor + 1), 'length'))

    if (len === 0) {
      if (cursor + 1 < bytes.length) blocks.push(makeBlock(bytes.slice(cursor + 1), 'value'))
      break
    }

    if (structEnd > bytes.length) {
      blocks.push(makeBlock(bytes.slice(cursor + 1), 'value'))
      break
    }

    const type = bytes[cursor + 1]
    blocks.push(makeBlock(bytes.slice(cursor + 1, cursor + 2), 'value'))
    const value = bytes.slice(cursor + 2, structEnd)

    if (type === 0x16 && value.length >= 2 && value[0] === 0xDF && value[1] === 0xFD) {
      blocks.push(makeBlock(value.slice(0, 2), 'value'))
      blocks.push(...formatBLEPayloadBlocks(value.slice(2)))
    } else {
      blocks.push(makeBlock(value, 'value'))
    }

    cursor = structEnd
  }

  return blocks
}

function formatBLEPayloadBlocks(bytes) {
  if (bytes.length < 4) return [makeBlock(bytes, 'value')]

  const blocks = [makeBlock(bytes.slice(0, 2), 'pid'), makeBlock(bytes.slice(2, 4), 'mask')]
  const mask = readU16(bytes, 2)
  const dataLen = bytes.length - 4

  if (isMaskPlausible(mask, dataLen)) {
    let cursor = 4
    for (const def of MASK_BIT_DEFS) {
      if (!((mask >> def.bit) & 1) || def.size === 0) continue
      const end = cursor + def.size
      if (end <= bytes.length) {
        blocks.push(makeBlock(bytes.slice(cursor, end), 'field', def.name))
        cursor = end
      } else {
        blocks.push(makeBlock(bytes.slice(cursor), 'value'))
        return blocks
      }
    }
    if (cursor < bytes.length) blocks.push(makeBlock(bytes.slice(cursor), 'value'))
    return blocks
  }

  let cursor = 4
  while (cursor < bytes.length) {
    if (cursor + 1 > bytes.length) break
    const len = bytes[cursor]
    blocks.push(makeBlock(bytes.slice(cursor, cursor + 1), 'length'))
    if (len === 0) {
      if (cursor + 1 < bytes.length) blocks.push(makeBlock(bytes.slice(cursor + 1), 'value'))
      return blocks
    }
    const typeStart = cursor + 1
    const valueStart = cursor + 2
    const end = cursor + 1 + len
    if (end > bytes.length) {
      blocks.push(makeBlock(bytes.slice(typeStart), 'value'))
      return blocks
    }
    const typeVal = bytes[typeStart]
    const fieldName = SERVICE_DATA_TYPE_MAP[typeVal]?.name ?? `type:0x${typeVal.toString(16).padStart(2, '0')}`
    blocks.push(makeBlock(bytes.slice(typeStart, valueStart), 'type', fieldName))
    blocks.push(makeBlock(bytes.slice(valueStart, end), 'field', fieldName))
    cursor = end
  }

  if (cursor < bytes.length) blocks.push(makeBlock(bytes.slice(cursor), 'value'))
  return blocks
}

export function parseHexWithReport(hexStr) {
  const issues = []
  let bytes = []

  try {
    bytes = hexToBytes(hexStr.trim())
  } catch (e) {
    return {
      parsed: null,
      summary: {
        status: 'failed',
        totalBytes: 0,
        parsedBytes: 0,
        unparsedBytes: 0,
        issueCount: 1,
        message: 'HEX format is invalid',
      },
      issues: [{ severity: 'error', code: 'invalid-hex', message: e.message, offset: 0 }],
    }
  }

  if (bytes.length === 0) {
    return {
      parsed: null,
      summary: {
        status: 'failed',
        totalBytes: 0,
        parsedBytes: 0,
        unparsedBytes: 0,
        issueCount: 1,
        message: 'Input is empty',
      },
      issues: [{ severity: 'error', code: 'empty-input', message: 'HEX input is empty', offset: 0 }],
    }
  }

  let parsed = null
  try {
    parsed = parseHex(hexStr)
  } catch (e) {
    issues.push({ severity: 'error', code: 'parse-error', message: e.message, offset: 0 })
  }

  const classifier = classifyHexBytes(bytes)
  let parsedBytes = bytes.length

  if (classifier === 'command') {
    parsedBytes = analyzeCommandPacketBytes(bytes, issues)
  } else if (classifier === 'adv') {
    parsedBytes = analyzeAdvBytes(bytes, issues)
  } else if (classifier === 'ble-payload') {
    parsedBytes = analyzeBLEPayloadBytes(bytes, 0, issues)
  }

  const totalBytes = bytes.length
  const unparsedBytes = Math.max(0, totalBytes - parsedBytes)
  const hasError = issues.some(i => i.severity === 'error')
  const status = hasError ? (parsedBytes > 0 ? 'partial' : 'failed') : (unparsedBytes > 0 ? 'partial' : 'ok')

  return {
    parsed,
    summary: {
      status,
      totalBytes,
      parsedBytes,
      unparsedBytes,
      issueCount: issues.length,
      message: `Parsed ${parsedBytes}/${totalBytes} bytes, ${issues.length} issue(s) found`,
    },
    issues,
  }
}

function classifyHexBytes(bytes) {
  if (bytes.length >= 8 && bytes[0] === 0xDD && (bytes[1] === 0x00 || bytes[1] === 0x01)) return 'command'
  if (bytes.length >= 8) {
    const id = readU16(bytes, 0)
    if (id === 0xDD00 || id === 0xDD01) return 'command'
  }
  if (bytes.length >= 5 && bytes[1] === 0x16 && bytes[2] === 0xDF && bytes[3] === 0xFD) return 'adv'
  if (bytes.length >= 4) return 'ble-payload'
  return 'unknown'
}

function analyzeCommandPacketBytes(bytes, issues) {
  if (bytes.length < 8) {
    issues.push({ severity: 'error', code: 'command-header-too-short', message: 'Command header is shorter than 8 bytes', offset: 0 })
    return bytes.length
  }

  const commandId = readU16(bytes, 2)
  const payloadLength = readU16(bytes, 6)
  const expectedTotal = 8 + payloadLength
  const parsedBytes = Math.min(expectedTotal, bytes.length)

  if (expectedTotal > bytes.length) {
    issues.push({
      severity: 'error',
      code: 'payload-length-mismatch',
      message: `Payload length declares ${payloadLength} bytes but only ${Math.max(0, bytes.length - 8)} bytes are available`,
      offset: 6,
    })
  }

  if (expectedTotal < bytes.length) {
    issues.push({
      severity: 'warning',
      code: 'trailing-bytes',
      message: `${bytes.length - expectedTotal} trailing byte(s) after command packet`,
      offset: expectedTotal,
    })
  }

  const payload = bytes.slice(8, parsedBytes)
  analyzeCommandPayloadBytes(commandId, payload, 8, issues)
  return parsedBytes
}

function analyzeCommandPayloadBytes(commandId, payload, payloadOffset, issues) {
  switch (commandId) {
    case 0x0001: {
      const looksLikeResponse = payload.length % 2 !== 0 || (payload.length >= 2 && readU16(payload, 0) === 0x0000)
      if (looksLikeResponse) {
        analyzeFeatureListBytes(payload, true, payloadOffset, issues)
      } else {
        analyzeGetRequestBytes(payload, payloadOffset, issues)
      }
      return
    }
    case 0x0002:
      if (payload.length !== 2) analyzeFeatureListBytes(payload, false, payloadOffset, issues)
      return
    case 0x0003:
    case 0x0004:
      analyzeFeatureListBytes(payload, true, payloadOffset, issues)
      return
    default:
      return
  }
}

function analyzeGetRequestBytes(payload, payloadOffset, issues) {
  if (payload.length % 2 !== 0) {
    issues.push({
      severity: 'error',
      code: 'get-request-length-invalid',
      message: 'GET request payload length must be even (feature IDs are 2 bytes)',
      offset: payloadOffset + payload.length - 1,
    })
  }

  for (let i = 0; i + 1 < payload.length; i += 2) {
    const fid = readU16(payload, i)
    if (!FEATURE_ID_MAP[fid]) {
      issues.push({
        severity: 'warning',
        code: 'unknown-feature-id',
        message: `Unknown feature ID ${h(fid)} in GET request`,
        offset: payloadOffset + i,
      })
    }
  }
}

function analyzeFeatureListBytes(payload, hasStatus, payloadOffset, issues) {
  let cursor = 0

  if (hasStatus) {
    if (payload.length < 2) {
      issues.push({
        severity: 'error',
        code: 'missing-status-code',
        message: 'Payload should include a 2-byte status code',
        offset: payloadOffset,
      })
      return 0
    }
    cursor = 2
  }

  while (cursor + 4 <= payload.length) {
    const featureId = readU16(payload, cursor)
    const valueSize = readU16(payload, cursor + 2)
    const featureOffset = payloadOffset + cursor
    const info = FEATURE_ID_MAP[featureId]
    cursor += 4

    if (!info) {
      issues.push({
        severity: 'warning',
        code: 'unknown-feature-id',
        message: `Unknown feature ID ${h(featureId)}`,
        offset: featureOffset,
      })
    } else if (info.valueSize != null && info.valueSize !== valueSize) {
      issues.push({
        severity: 'warning',
        code: 'feature-length-mismatch',
        message: `${h(featureId)} (${info.name}) expects ${info.valueSize} byte(s), got ${valueSize}`,
        offset: featureOffset + 2,
      })
    }

    if (cursor + valueSize > payload.length) {
      issues.push({
        severity: 'error',
        code: 'feature-value-overflow',
        message: `${h(featureId)} value exceeds remaining payload bytes`,
        offset: featureOffset + 4,
      })
      return cursor
    }

    cursor += valueSize
  }

  if (cursor < payload.length) {
    issues.push({
      severity: 'warning',
      code: 'payload-trailing-bytes',
      message: `${payload.length - cursor} trailing byte(s) in feature payload`,
      offset: payloadOffset + cursor,
    })
  }

  return cursor
}

function analyzeAdvBytes(bytes, issues) {
  let cursor = 0

  while (cursor < bytes.length) {
    const len = bytes[cursor]
    if (len === 0) {
      issues.push({
        severity: 'warning',
        code: 'adv-zero-length',
        message: `${bytes.length - cursor} trailing byte(s) after zero-length AD marker`,
        offset: cursor,
      })
      return cursor
    }

    if (cursor + 1 + len > bytes.length) {
      issues.push({
        severity: 'error',
        code: 'adv-structure-overflow',
        message: `AD structure at offset ${cursor} exceeds packet boundary`,
        offset: cursor,
      })
      return cursor
    }

    const type = bytes[cursor + 1]
    const valueStart = cursor + 2
    const valueEnd = cursor + 1 + len
    const value = bytes.slice(valueStart, valueEnd)

    if (type === 0x16 && value.length >= 2 && value[0] === 0xDF && value[1] === 0xFD) {
      analyzeBLEPayloadBytes(value.slice(2), valueStart + 2, issues)
    }

    cursor = valueEnd
  }

  return cursor
}

function analyzeBLEPayloadBytes(bytes, baseOffset, issues) {
  if (bytes.length < 4) {
    issues.push({
      severity: 'error',
      code: 'service-data-too-short',
      message: 'BLE service data must be at least 4 bytes (PID + mask/type)',
      offset: baseOffset,
    })
    return bytes.length
  }

  const mask = readU16(bytes, 2)
  const dataLen = bytes.length - 4

  if (isMaskPlausible(mask, dataLen)) {
    const expectedDataLen = expectedMaskDataLen(mask)
    const expectedTotal = 4 + expectedDataLen
    if (expectedTotal < bytes.length) {
      issues.push({
        severity: 'warning',
        code: 'service-data-trailing-bytes',
        message: `${bytes.length - expectedTotal} trailing byte(s) after legacy service data`,
        offset: baseOffset + expectedTotal,
      })
    }
    return Math.min(expectedTotal, bytes.length)
  }

  return analyzeExtendedServiceDataBytes(bytes, baseOffset, issues)
}

function analyzeExtendedServiceDataBytes(bytes, baseOffset, issues) {
  let cursor = 2

  while (cursor + 2 <= bytes.length) {
    const len = bytes[cursor]
    if (len === 0) {
      issues.push({
        severity: 'warning',
        code: 'extended-zero-length',
        message: `${bytes.length - cursor} trailing byte(s) after zero-length extended field`,
        offset: baseOffset + cursor,
      })
      return cursor
    }

    if (cursor + 1 + len > bytes.length) {
      issues.push({
        severity: 'error',
        code: 'extended-structure-overflow',
        message: `Extended field at offset ${baseOffset + cursor} exceeds packet boundary`,
        offset: baseOffset + cursor,
      })
      return cursor
    }

    const type = bytes[cursor + 1]
    if (!SERVICE_DATA_TYPE_MAP[type]) {
      issues.push({
        severity: 'warning',
        code: 'unknown-service-data-type',
        message: `Unknown extended service data type ${h(type, 2)}`,
        offset: baseOffset + cursor + 1,
      })
    }

    cursor += 1 + len
  }

  if (cursor < bytes.length) {
    issues.push({
      severity: 'warning',
      code: 'extended-trailing-bytes',
      message: `${bytes.length - cursor} trailing byte(s) in extended service data`,
      offset: baseOffset + cursor,
    })
  }

  return cursor
}

function expectedMaskDataLen(mask) {
  let expected = 0
  for (const def of MASK_BIT_DEFS) {
    if ((mask >> def.bit) & 1) expected += def.size
  }
  return expected
}

function parseBLEPayload(bytes) {
  if (bytes.length < 4) return null
  const mask = readU16(bytes, 2)
  const dataLen = bytes.length - 4

  // Try legacy first: check if mask → expected size matches actual
  if (isMaskPlausible(mask, dataLen)) {
    const legacy = parseLegacyServiceData(bytes)
    return { type: 'BLE_Legacy_Service_Data', ...legacy }
  }

  // Try extended format
  return { type: 'BLE_Extended_Service_Data', ...parseExtendedServiceData(bytes) }
}

function parseCommandPacket(bytes) {
  const identifier = readU16(bytes, 0)
  const normalizedIdentifier = identifier === 0x00DD ? 0xDD00 : identifier === 0x01DD ? 0xDD01 : identifier
  const commandId  = readU16(bytes, 2)
  const packetCount  = bytes[4]
  const packetIndex  = bytes[5]
  const payloadLength = readU16(bytes, 6)
  const cmdInfo = COMMAND_ID_MAP[commandId] || { name: 'Unknown Command', dir: '-', category: 'Unknown' }

  const header = {
    identifier:     h(normalizedIdentifier),
    identifierDesc: normalizedIdentifier === 0xDD00 ? 'Primary/Standalone Device' : 'Secondary Device (LLS)',
    commandId:      h(commandId),
    commandName:    cmdInfo.name,
    direction:      cmdInfo.dir,
    category:       cmdInfo.category,
    packetCount,
    packetIndex,
    payloadLength,
  }

  const pb = bytes.slice(8, 8 + payloadLength)
  let payload = {}

  switch (commandId) {
    case 0x0001: {
      // 0x0001 is used for both GET Request and GET Response.
      // GET Request payload: even-length list of 2-byte feature IDs (no status code).
      // GET Response payload: starts with status code (2 bytes) then feature list.
      // Detect by: odd payload length OR first 2 bytes == 0x0000 (success status).
      const looksLikeResponse = pb.length % 2 !== 0 || readU16(pb, 0) === 0x0000
      payload = looksLikeResponse ? parseFeatureList(pb, true) : parseGetRequest(pb)
      break
    }
    case 0x0002: {
      // SET Request: payload has featureId(2)+valueSize(2)+value(N)... no status code, length >= 4
      // SET ACK:     payload is exactly 2 bytes status code
      if (pb.length === 2) {
        payload = { statusCode: parseStatusCode(readU16(pb, 0)) }
      } else {
        payload = parseFeatureList(pb, false)
      }
      break
    }
    case 0x0003: case 0x0004:
                 payload = parseFeatureList(pb, true);      break
    case 0x0102: payload = parseSendOTAData(pb);            break
    case 0x0104: payload = parseOTANotification(pb);        break
    case 0x0101: case 0x0103:
                 payload = pb.length ? { raw: bytesToHex(pb) } : {}; break
    default:     payload = pb.length ? { raw: bytesToHex(pb) } : {}
  }

  return { type: 'Command_Packet', header, payload }
}

// ─── JSON → HEX ──────────────────────────────────────────────────────────────

export function jsonToHex(obj) {
  switch (obj.type) {
    case 'Command_Packet':              return bytesToHex(serializeCommandPacket(obj))
    case 'BLE_Legacy_Service_Data': {
      // If AD structures exist, rebuild full BLE AdvData bytes (len + type + value blocks).
      if (Array.isArray(obj.otherADStructures) && obj.otherADStructures.length > 0) {
        return bytesToHex(serializeAdvDataFromLegacy(obj))
      }
      return bytesToHex(serializeLegacyServiceData(obj))
    }
    case 'BLE_AdvData':                 return bytesToHex(serializeAdvDataFromLegacy(obj))
    default:
      throw new Error(`Cannot serialize type "${obj.type}" — only Command_Packet, BLE_Legacy_Service_Data and BLE_AdvData are supported`)
  }
}

function serializeCommandPacket(obj) {
  const { header, payload } = obj
  const identifier = parseInt(header.identifier, 16)
  const commandId  = parseInt(header.commandId,  16)

  let pb = []
  switch (commandId) {
    case 0x0001: pb = serializeGetRequest(payload);           break
    case 0x0002: pb = serializeFeatureList(payload, false);   break
    case 0x0003: case 0x0004:
                 pb = serializeFeatureList(payload, true);    break
    case 0x0102: pb = serializeSendOTAData(payload);          break
    default:
      if (payload.raw) pb = hexToBytes(payload.raw.replace(/\s/g, ''))
  }

  return [
    ...writeU16(identifier),
    ...writeU16(commandId),
    header.packetCount  ?? 1,
    header.packetIndex  ?? 0,
    ...writeU16(pb.length),
    ...pb,
  ]
}

function serializeGetRequest(payload) {
  const out = []
  for (const f of payload.featureIds || []) {
    out.push(...writeU16(parseInt(f.featureId, 16)))
  }
  return out
}

function serializeFeatureList(payload, withStatus) {
  const out = []
  if (withStatus) out.push(...writeU16(0x0000))
  for (const f of payload.features || []) {
    const fid = parseInt(f.featureId, 16)
    const vb  = serializeFeatureValue(fid, f)
    out.push(...writeU16(fid), ...writeU16(vb.length), ...vb)
  }
  return out
}

function serializeFeatureValue(featureId, data) {
  // Use raw if available as the ground truth
  if (data.raw) return hexToBytes(data.raw.replace(/\s/g, ''))
  return []
}

function serializeSendOTAData(payload) {
  const out = writeU32(payload.absoluteOffset || 0)
  if (payload.data) out.push(...hexToBytes(payload.data.replace(/\s/g, '')))
  return out
}

function serializeLegacyServiceData(obj) {
  let mask      = 0
  const dataBuf = []
  const pid     = parseInt(obj.pid, 16)

  for (const def of MASK_BIT_DEFS) {
    if (def.size === 0) continue
    if (obj.fields && def.name in obj.fields) {
      mask |= (1 << def.bit)
      dataBuf.push(...encodeMaskField(def.name, obj.fields[def.name]))
    }
  }

  return [...writeU16(pid), ...writeU16(mask), ...dataBuf]
}

function serializeAdvDataFromLegacy(obj) {
  const out = []
  const legacy = serializeLegacyServiceData(obj)
  const serviceDataValue = [0xDF, 0xFD, ...legacy]
  out.push(1 + serviceDataValue.length, 0x16, ...serviceDataValue)

  for (const ad of obj.otherADStructures || []) {
    const type = typeof ad.adType === 'string' ? parseInt(ad.adType, 16) : (ad.adType | 0)
    if (!Number.isFinite(type) || type < 0 || type > 0xFF) continue
    const value = ad.raw ? hexToBytes(String(ad.raw)) : []
    out.push(1 + value.length, type, ...value)
  }

  return out
}

function encodeMaskField(name, value) {
  // Best-effort re-encoding from parsed JSON
  switch (name) {
    case 'srcName1CRC16':
    case 'srcName2CRC16':
    case 'btMacCRC16': {
      if (typeof value === 'string') return hexToBytes(value)
      return []
    }
    case 'colorId':         return [typeof value === 'object' ? parseInt(value.raw, 16) : (value | 0)]
    case 'batteryInfo': {
      const charging = value.charging ? 0x80 : 0
      const lvl      = value.low ? 0x7F : (value.level & 0x7F)
      return [charging | lvl]
    }
    case 'stereoGroupId': {
      if (typeof value === 'object') return [value.groupId | 0]
      return [value | 0]
    }
    case 'deviceMiscInfo': {
      if (value?.raw) return writeU16(parseInt(value.raw, 16))
      const v =
        ((value.connectable ? 1 : 0) << 15) |
        ((value.standby ? 1 : 0) << 14) |
        ((value.muted ? 1 : 0) << 13) |
        ((value.led ? 1 : 0) << 12) |
        ((value.mic1 ? 1 : 0) << 11) |
        ((value.mic2 ? 1 : 0) << 10) |
        ((value.jblApp ? 1 : 0) << 6) |
        ((value.dongle ? 1 : 0) << 5) |
        ((value.soundbar ? 1 : 0) << 4) |
        ((value.usb ? 1 : 0) << 3) |
        ((value.aux ? 1 : 0) << 2)
      return writeU16(v)
    }
    case 'partyMethodInfo': {
      if (value?.raw) return [parseInt(value.raw, 16)]
      const v =
        ((value.auracast ? 1 : 0) << 7) |
        ((value.lls ? 1 : 0) << 6) |
        ((value.oneCast ? 1 : 0) << 5)
      return [v]
    }
    case 'partyInfo': {
      if (value?.raw) return writeU16(parseInt(value.raw, 16))
      const groupBits = value.groupType === 'Party' ? 0x1 : value.groupType === 'Stereo' ? 0x2 : 0x0
      const v =
        ((value.partyOn ? 1 : 0) << 15) |
        ((groupBits & 0x3) << 13) |
        (value.canJoin ? 1 : 0)
      return writeU16(v)
    }
    case 'partyLightInfo': {
      if (value?.raw) return writeU16(parseInt(value.raw, 16))
      const v =
        ((value.connectedToPartyBox ? 1 : 0) << 15) |
        (((value.stageNumber | 0) & 0x7F) << 8)
      return writeU16(v)
    }
    case 'deviceMiscInfo2': {
      if (value?.raw) return writeU16(parseInt(value.raw, 16))
      const v =
        ((value.blePairingFlowSupported ? 1 : 0) << 15) |
        ((value.pairedStatusSupported ? 1 : 0) << 14) |
        ((value.srcName1BlePaired ? 1 : 0) << 13) |
        ((value.srcName2BlePaired ? 1 : 0) << 12)
      return writeU16(v)
    }
    case 'firmwareVersion3B': {
      const parts = String(value).replace('v','').split('.').map(Number)
      return [parts[0] || 0, parts[1] || 0, parts[2] || 0]
    }
    default:
      if (typeof value === 'string' && /^[0-9A-Fa-f\s]+$/.test(value)) {
        return hexToBytes(value.replace(/\s/g,''))
      }
      return []
  }
}
