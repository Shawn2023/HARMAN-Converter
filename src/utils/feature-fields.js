/**
 * Feature ID bit-field descriptions.
 * Source: Harman General Device Control Protocol v5.0.8
 *
 * Format per entry:
 *   { bits: string, name: string, desc: string }
 *
 * To add / update a description, edit this file only.
 * Keys must match the numeric keys used in FEATURE_ID_MAP.
 */
export const FEATURE_FIELDS = {
  // ── Common Group [0x0000, 0x0AFF] ──────────────────────────────────────────

  0x0005: [
    { bits: 'Byte 0 [7~0]', name: 'Color ID', desc: 'See COLOR_ID_MAP for full enumeration' },
  ],

  0x000D: [
    { bits: 'Byte 0 [7]',   name: 'Charging',      desc: '0x00: Not charging, 0x01: Charging' },
    { bits: 'Byte 0 [6~0]', name: 'Battery Level', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x000E: [
    { bits: 'Byte 0 [7]',   name: 'Charging',      desc: '0x00: Not charging, 0x01: Charging' },
    { bits: 'Byte 0 [6~0]', name: 'Battery Level', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x0010: [
    { bits: 'Byte 0 [7~0]', name: 'BT Connection', desc: '0x00: Disconnected, 0x01: Connected (1 device), 0x02: Connected (2 devices), 0x03: Connecting' },
  ],

  0x0011: [
    { bits: 'Bytes 1~0 [15~0] (LE u16)', name: 'Delay (seconds)', desc: '0x0000: Power off immediately, 0x0001~0xFFFE: Power off after N seconds' },
  ],

  0x0012: [
    { bits: 'Bytes 1~0 [15]',    name: 'Status',            desc: '0: Off, 1: On' },
    { bits: 'Bytes 1~0 [14~0]',  name: 'Timeout (seconds)', desc: '0x0000~0x3FFE: Timeout value, 0x7FFF: Ignore' },
  ],

  0x0013: [
    { bits: 'Bytes 1~0 [15]',    name: 'Status',            desc: '0: Off, 1: On' },
    { bits: 'Bytes 1~0 [14~0]',  name: 'Timeout (seconds)', desc: '0x0000~0x3FFE: Timeout value, 0x7FFF: Ignore' },
  ],

  0x0014: [
    { bits: 'Byte 0 [7~0]', name: 'Balance', desc: '0x00~0x64: Game chat vs. chat audio balance (0%~100%)' },
  ],

  0x0015: [
    { bits: 'Byte 0 [7~0]', name: 'Balance', desc: '0x00~0x64: Left/Right balance (center = 0x32)' },
  ],

  0x0016: [
    { bits: 'Byte 0 [7~0]', name: 'Brightness', desc: '0x00: Off, 0x01~0x64: Brightness level (1%~100%)' },
  ],

  0x0017: [
    { bits: 'Byte 0 [7~0]', name: 'Battery Present', desc: '0x00: No battery, 0x01: Battery present' },
  ],

  0x0018: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Level',  desc: '0x00~0x64 (0%~100%), 0x7F: Ignore' },
  ],

  0x0019: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Level',  desc: '0x00~0x64 (0%~100%), 0x7F: Ignore' },
  ],

  0x001A: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Level',  desc: '0x00~0x64 (0%~100%), 0x7F: Ignore' },
  ],

  0x001B: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x001C: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x001D: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x001E: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x001F: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off (ANC follows in-ear detection), 0x01: On (ANC always active)' },
  ],

  0x0020: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0021: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Mode',   desc: '0x01: Fixed, 0x02: Head Tracking, 0x7F: Ignore' },
  ],

  0x0022: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Scene',  desc: '0x01: Movie, 0x02: Music, 0x03: Game, 0x7F: Ignore' },
  ],

  0x0023: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Level',  desc: '0x01: Low, 0x02: Mid, 0x03: High, 0x04: Max, 0x7F: Ignore' },
  ],

  0x0024: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0025: [
    { bits: 'Byte 0 [7]',   name: 'Status',    desc: '0x00: Off (no limit), 0x01: On (limit active)' },
    { bits: 'Byte 0 [6~0]', name: 'Max Volume', desc: '0x00~0x64 (0%~100%), 0x7F: Ignore' },
  ],

  0x0026: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0027: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0028: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0029: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Level',  desc: '0x00: Natural, 0x01: Treble Boost, 0x02: Bass Boost, 0x03: Bright, 0x04: Powerful, 0x7F: Ignore' },
  ],

  0x002A: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Disabled, 0x01: Enabled' },
  ],

  0x002B: [
    { bits: 'Byte 0 [7]',   name: 'Status',           desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Timeout (seconds)', desc: '0x00~0x7E: Timeout value, 0x7F: Ignore' },
  ],

  0x002C: [
    { bits: 'Byte 0 [7]',   name: 'Charging',         desc: '0x00: Not charging, 0x01: Charging' },
    { bits: 'Byte 0 [6]',   name: 'Water Detected',   desc: '0x00: No water, 0x01: Water detected' },
    { bits: 'Byte 0 [5]',   name: 'Overheating',      desc: '0x00: Normal, 0x01: Overheating' },
    { bits: 'Byte 0 [4~0]', name: 'Reserved',         desc: 'Reserved' },
  ],

  0x002D: [
    { bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: Trigger recenter' },
  ],

  0x002E: [
    { bits: 'Byte 0 [7~0]', name: 'BLE Paired Status', desc: '0x00: Unpaired, 0x01: Paired' },
  ],

  0x002F: [
    { bits: 'Byte 0 [7~0]', name: 'Host Type', desc: '0x01: Android, 0x02: iOS, 0x03: Dongle, 0x04: Soundbar' },
  ],

  0x0030: [
    { bits: 'Byte 0 [7~0]',      name: 'App ID',        desc: '0x01~0xFF: Application identifier' },
    { bits: 'Byte 1 [7~0]',      name: 'Notification Type', desc: '0x01: SMS, 0x02: Call, 0x03~0xFF: Other app' },
    { bits: 'Bytes 2~3 [15~0]',  name: 'Timeout (ms)',  desc: '0x0000: No timeout, else timeout in ms' },
    { bits: 'Bytes 4~N',         name: 'Content',       desc: 'UTF-8 encoded notification text (max 147 bytes)' },
  ],

  0x0031: [
    { bits: 'Bytes 0~5',   name: 'UTC Timestamp',   desc: 'BCD encoded: YY MM DD HH mm SS (e.g. 0x24 0x01 0x22 0x14 0x30 0x00)' },
    { bits: 'Bytes 6~7',   name: 'Timezone Offset', desc: 'Signed 16-bit, in minutes from UTC (e.g. 0x01E0 = +480 min = UTC+8)' },
    { bits: 'Bytes 8~11',  name: 'Unix Timestamp',  desc: 'LE u32: seconds since 1970-01-01 00:00:00 UTC' },
    { bits: 'Bytes 12~15', name: 'Milliseconds',    desc: 'LE u32: millisecond offset within current second' },
  ],

  0x0033: [
    { bits: 'Byte 0 [7~0]',  name: 'Address Type', desc: '0x00: Public, 0x01: Random' },
    { bits: 'Bytes 1~6',     name: 'BLE MAC Address', desc: '6-byte MAC address (little-endian)' },
  ],

  0x0034: [
    { bits: 'Byte 0 [7~2]', name: 'Reserved',               desc: 'Reserved' },
    { bits: 'Byte 0 [1]',   name: 'Right Earphone in Case', desc: '0x00: Not in case, 0x01: In case' },
    { bits: 'Byte 0 [0]',   name: 'Left Earphone in Case',  desc: '0x00: Not in case, 0x01: In case' },
  ],

  0x0035: [
    { bits: 'Byte 0 [7~0]', name: 'Connection Status', desc: '0x00: Disconnected, 0x01: Connected' },
  ],

  0x0036: [
    { bits: 'Byte 0 [7~0]', name: 'Connection Status', desc: '0x00: Disconnected, 0x01: Connected' },
  ],

  0x0037: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Idle, 0x01: Ejecting' },
  ],

  0x003A: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: None, 0x01: Authentication required' },
  ],

  0x003C: [
    { bits: 'Bytes 0~N', name: 'Full Firmware Version', desc: 'UTF-8 string, max 128 bytes, null-terminated. Format: "Main:x.x.x, IC1:x.x.x, ..."' },
  ],

  0x003D: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: No signal, 0x01: Signal detected' },
  ],

  0x003F: [
    { bits: 'Byte 0 [7~0]', name: 'State', desc: '0x01: Dongle mode, 0x02: UAC mode' },
  ],

  0x0040: [
    { bits: 'Byte 0 [7]',   name: 'Available', desc: '0x00: Not available, 0x01: Available' },
    { bits: 'Byte 0 [6~0]', name: 'Reserved',  desc: 'Reserved' },
  ],

  0x0041: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'CRC16', desc: 'CRC16 of the last Set/Get message payload' },
  ],

  0x0045: [
    { bits: 'Byte 0 [7~0]', name: 'Power State', desc: '0x00: Power off, 0x01: Power on' },
  ],

  0x0046: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'BT MAC CRC16', desc: 'CRC16 of the primary device BT MAC address' },
  ],

  0x0047: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'Secondary BT MAC CRC16', desc: 'CRC16 of the secondary device BT MAC address' },
  ],

  0x0048: [
    { bits: 'Byte 0 [7]',   name: 'A2DP Streaming Supported',    desc: '0x00: Not supported, 0x01: Supported' },
    { bits: 'Byte 0 [6]',   name: 'LE Audio Streaming Supported', desc: '0x00: Not supported, 0x01: Supported' },
    { bits: 'Byte 0 [5~0]', name: 'Reserved',                     desc: 'Reserved' },
  ],

  0x0049: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Mode',   desc: '0x01: ANC, 0x02: Ambient Aware, 0x03: Talk Thru, 0x7F: Ignore' },
  ],

  0x004A: [
    { bits: 'Byte 0 [7~0]', name: 'Algorithm', desc: '0x00: HMAC-SHA256 (default), 0x01~0xFF: Device-specific' },
  ],

  0x004C: [
    { bits: 'Byte 0 [7~0]', name: 'Query Index', desc: 'Index of the volume limit query (device-specific)' },
  ],

  0x004D: [
    { bits: 'Byte 0 [7~0]', name: 'Index',      desc: 'Volume limit index (device-specific)' },
    { bits: 'Byte 1 [7~0]', name: 'Max Volume', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x004E: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x004F: [
    { bits: '(no payload)', name: 'Manual Power On', desc: 'Write-only, no value. Triggers device power on.' },
  ],

  // ── OTA Group [0x0B00, 0x0B3F] ─────────────────────────────────────────────

  0x0B00: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'OTA Internal MTU', desc: 'Internal MTU between primary and secondary device during OTA (bytes)' },
  ],

  0x0B01: [
    { bits: 'Byte 0 [7~0]', name: 'Max Continuous Packet Count', desc: '0x01~0xFF: Maximum consecutive OTA packets before an ACK is required' },
  ],

  0x0B02: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'OTA MTU (App↔Device)', desc: 'MTU between App and Device for OTA transfers (bytes)' },
  ],

  0x0B03: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'Min Transmission Interval (ms)', desc: 'Minimum interval between consecutive OTA packets (ms)' },
  ],

  0x0B04: [
    { bits: 'Byte 0 [0]', name: 'Primary FW',   desc: '0x00: Skip, 0x01: Upgrade primary firmware' },
    { bits: 'Byte 0 [1]', name: 'Secondary FW', desc: '0x00: Skip, 0x01: Upgrade secondary firmware' },
    { bits: 'Byte 0 [2]', name: 'DSP FW',       desc: '0x00: Skip, 0x01: Upgrade DSP firmware' },
    { bits: 'Byte 0 [3]', name: 'Dongle FW',    desc: '0x00: Skip, 0x01: Upgrade dongle firmware' },
  ],

  // ── EQ Group [0x0E00, 0x0EFF] ──────────────────────────────────────────────

  0x0E80: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0E81: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'Custom EQ Count', desc: 'Number of custom EQ presets stored on App (for sync reference)' },
  ],

  // ── Lighting Group [0x0D00, 0x0DFF] ────────────────────────────────────────

  0x0D00: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0D40: [
    { bits: 'Byte 0 [7~0]', name: 'Effect ID', desc: '0x00: None/Off, 0x01~0xFF: Effect index (device-specific)' },
  ],

  0x0D41: [
    { bits: 'Byte 0 [7~0]', name: 'Brightness', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x0D42: [
    { bits: 'Byte 0 [7~0]', name: 'Temperature', desc: '0x00: Warm, 0x64: Cool (device-specific range)' },
  ],

  0x0D43: [
    { bits: 'Byte 0 [7~0]', name: 'Speed', desc: '0x00~0x64: Animation speed (0%~100%)' },
  ],

  0x0D44: [
    { bits: 'Bytes 0~N', name: 'Effect ID List', desc: 'Array of 1-byte Effect IDs to include in shuffle rotation (max 32 entries)' },
  ],

  0x0D45: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On (BassBoost triggers light effect)' },
  ],

  0x0D46: [
    { bits: 'Byte 0 [7~0]', name: 'Color ID', desc: 'See COLOR_ID_MAP for full enumeration' },
  ],

  0x0D47: [
    { bits: 'Byte 0 [7~0]', name: 'Red',   desc: '0x00~0xFF' },
    { bits: 'Byte 1 [7~0]', name: 'Green', desc: '0x00~0xFF' },
    { bits: 'Byte 2 [7~0]', name: 'Blue',  desc: '0x00~0xFF' },
  ],

  0x0D48: [
    { bits: 'Byte 0 [7~0]', name: 'Loop Mode', desc: '0x00: No loop, 0x01: Loop, 0x02: Ping-pong' },
  ],

  0x0D4B: [
    { bits: 'Bytes 0~N', name: 'Group ID List', desc: 'Array of 1-byte lighting group IDs to apply the current effect to' },
  ],

  0x0D61: [
    { bits: 'Byte 0 [7~0]',      name: 'Status',           desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 1 [7~0]',      name: 'Start Hour',       desc: '0x00~0x17 (0~23)' },
    { bits: 'Byte 2 [7~0]',      name: 'Start Minute',     desc: '0x00~0x3B (0~59)' },
    { bits: 'Byte 3 [7~0]',      name: 'Duration (min)',   desc: '0x01~0xFF: Fade-out duration in minutes' },
    { bits: 'Byte 4 [7~0]',      name: 'Reserved',         desc: 'Reserved' },
  ],

  0x0D62: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  // ── Headphone Misc Group [0x1000, 0x1CFF] ──────────────────────────────────

  0x1000: [
    { bits: 'Byte 0 [7~6]', name: 'TWS Role',       desc: '0x00: Mono, 0x01: Primary/Left, 0x02: Secondary/Right' },
    { bits: 'Byte 0 [5~4]', name: 'TWS Connection', desc: '0x00: Not connected, 0x01: Connected' },
    { bits: 'Byte 0 [3~0]', name: 'Reserved',       desc: 'Reserved' },
  ],

  0x1002: [
    { bits: 'Byte 0 [7~2]', name: 'Reserved',              desc: 'Reserved' },
    { bits: 'Byte 0 [1]',   name: 'Right Earphone In Ear', desc: '0x00: Out of ear, 0x01: In ear' },
    { bits: 'Byte 0 [0]',   name: 'Left Earphone In Ear',  desc: '0x00: Out of ear, 0x01: In ear' },
  ],

  0x1003: [
    { bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: Stop, 0x01: Start sealing test' },
  ],

  0x1004: [
    { bits: 'Byte 0 [7~0]', name: 'Noise Level', desc: '0x00~0x64: Ambient noise level (0~100 dB)' },
  ],

  0x1005: [
    { bits: 'Byte 0 [7~0]', name: 'Ear Tip Size', desc: '0x00: None/Unknown, 0x01: XS, 0x02: S, 0x03: M, 0x04: L, 0x05: XL' },
  ],

  0x1007: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x1008: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'Total Playback Time (seconds)', desc: 'Accumulated audio playback time in seconds' },
  ],

  0x1009: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'Total Power-on Time (seconds)', desc: 'Accumulated power-on duration in seconds' },
  ],

  0x100A: [
    { bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: Stop, 0x01: Ring left, 0x02: Ring right, 0x03: Ring both' },
  ],

  0x100B: [
    { bits: 'Byte 0 [7~0]', name: 'Call Status', desc: '0x00: Idle, 0x01: Incoming call, 0x02: Active call, 0x03: Outgoing call' },
  ],

  0x100C: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Disabled, 0x01: Enabled' },
  ],

  0x100D: [
    { bits: 'Byte 0 [7~0]', name: 'Mode',   desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 1 [7~0]', name: 'Volume', desc: '0x00~0x64: Private call volume (0%~100%)' },
  ],

  0x100E: [
    { bits: 'Byte 0 [7~0]', name: 'Major', desc: 'Dongle firmware major version' },
    { bits: 'Byte 1 [7~0]', name: 'Minor', desc: 'Dongle firmware minor version' },
    { bits: 'Byte 2 [7~0]', name: 'Patch', desc: 'Dongle firmware patch version' },
  ],

  0x100F: [
    { bits: 'Byte 0 [7~0]', name: 'Status',          desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 1 [7~0]', name: 'Audio Source',    desc: 'Active audio source (see AUDIO_SOURCE_MAP)' },
    { bits: 'Byte 2 [7~0]', name: 'Video Source',    desc: 'Active video source (device-specific)' },
    { bits: 'Bytes 3~7',    name: 'Reserved',        desc: 'Reserved' },
  ],

  0x1010: [
    { bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: Hang up, 0x01: Answer, 0x02: Reject, 0x03: Transfer to phone, 0x04: Hold' },
  ],

  0x1011: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x1014: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'Call Duration (seconds)', desc: 'Current call duration in seconds' },
  ],

  0x1015: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  // ── Portable Misc Group [0x2000, 0x2AFF] ───────────────────────────────────

  0x2004: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: Off, 0x01: Broadcast, 0x02: Receive' },
  ],

  0x2005: [
    { bits: 'Byte 0 [7~0]', name: 'Quality', desc: '0x00: Standard, 0x01: High' },
  ],

  0x2006: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On (reduces max volume to extend playtime)' },
  ],

  0x2007: [
    { bits: 'Byte 0 [7~0]', name: 'Mood Sound Index', desc: '0x00: Off, 0x01~0xFF: Mood sound preset index' },
  ],

  0x2008: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Disabled, 0x01: Enabled' },
  ],

  0x2009: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Level',  desc: '0x01: Bass 1, 0x02: Bass 2, 0x03: XL Sound Off, 0x04: XL Sound On, 0x7F: Ignore' },
  ],

  0x200A: [
    { bits: 'Byte 0 [7]',   name: 'Inserted',     desc: '0x00: Not inserted, 0x01: Inserted' },
    { bits: 'Byte 0 [6~0]', name: 'Audio Source', desc: '0x00: None, 0x01: USB Flash Disk, 0x02: UAC (Audio Class)' },
  ],

  0x200B: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x200C: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x200D: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Not synced, 0x01: Synced' },
  ],

  0x200E: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Preset EQ active, 0x01: User EQ active' },
  ],

  0x200F: [
    { bits: 'Byte 0 [7]',   name: 'Status',   desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Reserved', desc: 'Reserved' },
  ],

  0x2010: [
    { bits: 'Byte 0 [7]',   name: 'Supported', desc: '0x00: Not supported, 0x01: Supported' },
    { bits: 'Byte 0 [6~0]', name: 'Reserved',  desc: 'Reserved' },
  ],

  0x2011: [
    { bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: Turn off, 0x01: Normal light, 0x02: Play 3s, 0x03: Play 3min, 0x04: Turn off 3s, 0x80: Stop auth tone, 0x81: Play auth tone' },
  ],

  0x2012: [
    { bits: 'Byte 0 [7~0]', name: 'Timeout (seconds)', desc: '0x00~0xFF: Inactivity timeout before knob menu resets' },
  ],

  0x2013: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On (disables auto power off, limits max volume)' },
  ],

  0x2014: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Unlocked, 0x01: Locked' },
  ],

  0x2015: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: Auto, 0x01: Charging only, 0x02: Audio + Charging' },
  ],

  // ── Party Group [0x2C00, 0x2CFF] ───────────────────────────────────────────

  0x2C00: [
    { bits: 'Byte 0 [7]',   name: 'Auracast Party',        desc: '0x00: Off, 0x01: Active' },
    { bits: 'Byte 0 [6]',   name: 'Auracast Stereo',       desc: '0x00: Off, 0x01: Active' },
    { bits: 'Byte 0 [5]',   name: 'TWS Stereo',            desc: '0x00: Off, 0x01: Active' },
    { bits: 'Byte 0 [4]',   name: 'Long Lasting Stereo',   desc: '0x00: Off, 0x01: Active' },
    { bits: 'Byte 0 [3]',   name: 'Air Touch Stereo',      desc: '0x00: Off, 0x01: Active' },
    { bits: 'Byte 0 [2~0]', name: 'Reserved',              desc: 'Reserved' },
  ],

  0x2C01: [
    { bits: 'Byte 0 [7~0]', name: 'Group Type', desc: '0x00: Normal, 0x01: Auracast Party, 0x02: Auracast Stereo, 0x03: TWS Stereo, 0x04: Long Lasting Stereo, 0x05: Air Touch Stereo' },
  ],

  0x2C02: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Normal (standalone), 0x01: Connecting, 0x02: Connected, 0x03: Wired (Daisy Chain)' },
  ],

  0x2C03: [
    { bits: 'Byte 0 [7~0]', name: 'Role', desc: '0x00: Normal (standalone), 0x01: Secondary, 0x02: Primary' },
  ],

  0x2C04: [
    { bits: 'Byte 0 [7~0]', name: 'Channel Type', desc: '0x00: Full (Stereo), 0x01: Left, 0x02: Right' },
  ],

  0x2C06: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'Group ID', desc: 'Unique party group identifier' },
  ],

  0x2C07: [
    { bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: Destroy group, 0x01: Create group' },
  ],

  0x2C80: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Standalone, 0x01: Stereo connected' },
  ],

  0x2C81: [
    { bits: 'Bytes 0~5', name: 'Partner BT MAC Address', desc: '6-byte Bluetooth MAC address of the stereo partner (little-endian)' },
  ],

  0x2C82: [
    { bits: 'Byte 0 [7~0]', name: 'Timeout (seconds)', desc: '0x00: Never disconnect, 0x01~0xFF: Timeout value in seconds' },
  ],

  // ── Karaoke Group [0x2D00, 0x2D3F] ─────────────────────────────────────────

  0x2D00: [
    { bits: 'Byte 0 [7]',   name: 'Status',     desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Bass Level', desc: '0x00~0x64 (0%~100%), 0x7F: Ignore' },
  ],

  0x2D01: [
    { bits: 'Byte 0 [7]',   name: 'Status',       desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Treble Level', desc: '0x00~0x64 (0%~100%), 0x7F: Ignore' },
  ],

  0x2D02: [
    { bits: 'Byte 0 [7]',   name: 'Status',     desc: '0x00: Off, 0x01: On' },
    { bits: 'Byte 0 [6~0]', name: 'Echo Level', desc: '0x00~0x64 (0%~100%), 0x7F: Ignore' },
  ],

  // ── Audio Group [0x2D40, 0x2D7F] ───────────────────────────────────────────

  0x2D40: [
    { bits: 'Byte 0 [7~0]', name: 'Operation', desc: '0x00: Stop, 0x01: Pause, 0x02: Play, 0x03: Prev track, 0x04: Next track, 0x05: Volume up, 0x06: Volume down' },
  ],

  0x2D41: [
    { bits: 'Byte 0 [7~0]', name: 'Mute', desc: '0x00: Unmuted, 0x01: Muted' },
  ],

  0x2D42: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x2D46: [
    { bits: 'Byte 0 [7]',   name: 'Status', desc: '0x00: Auto (device chooses), 0x01: Forced' },
    { bits: 'Byte 0 [6~0]', name: 'Codec',  desc: '0x00: SBC, 0x01: AAC, 0x02: LDAC, 0x7F: Ignore' },
  ],

  0x2D60: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'FM Frequency (kHz)', desc: 'e.g. 0x000154F8 = 87500 kHz = 87.5 MHz' },
  ],

  0x2D61: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'DAB Station ID', desc: 'DAB/DAB+ station service ID' },
  ],

  // ── Battery Group [0x2E00, 0x2EFF] ─────────────────────────────────────────

  0x2E00: [
    { bits: 'Bytes 0~N', name: 'Battery ID', desc: 'Battery identification string, max 16 bytes, null-terminated' },
  ],

  0x2E01: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'Remaining Playtime (min)', desc: 'Remaining playback time in minutes' },
  ],

  0x2E02: [
    { bits: 'Bytes 1~0 (LE i16)', name: 'Max Temperature (0.1°C)', desc: 'e.g. 0x012C = 300 → 30.0°C' },
  ],

  0x2E03: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'Remaining Capacity (mAh)', desc: 'Current remaining capacity' },
  ],

  0x2E04: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'Full Charge Capacity (mAh)', desc: 'Actual full-charge capacity' },
  ],

  0x2E05: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'Design Capacity (mAh)', desc: 'Rated design capacity' },
  ],

  0x2E06: [
    { bits: 'Bytes 1~0 (LE u16)', name: 'Charge Cycle Count', desc: 'Total number of charge cycles' },
  ],

  0x2E07: [
    { bits: 'Byte 0 [7~0]', name: 'State of Health (%)', desc: '0x00~0x64: Battery health percentage (100% = new)' },
  ],

  0x2E08: [
    { bits: 'Byte 0 [7~0]', name: 'Charging Status', desc: '0x01: Charging via AC, 0x02: Charging via DC, 0x03: Fully charged, 0x04: Fully depleted' },
  ],

  0x2E09: [
    { bits: 'Byte 0 [7~0]', name: 'Health Notification', desc: '0x00: Normal, 0x01: Battery degraded, 0x02: Replace soon' },
  ],

  0x2E0A: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'Total Power-on Duration (min)', desc: 'Total minutes the device has been powered on' },
  ],

  0x2E0B: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'Total Playback Duration (min)', desc: 'Total minutes of audio playback' },
  ],

  // ── AI Group [0x0B40, 0x0B7F] ──────────────────────────────────────────────

  0x0B40: [
    { bits: 'Byte 0 [7~0]', name: 'Dialog Status', desc: '0x00: Idle, 0x01: Wake word detected, 0x02: Processing, 0x03: Responding' },
  ],

  0x0B41: [
    { bits: 'Byte 0 [7~0]', name: 'Function Selection', desc: '0x00: None, 0x01: ChatGPT call' },
  ],

  0x0B42: [
    { bits: 'Bytes 0~N', name: 'Uplink Data (PCM/Opus)', desc: 'Audio or text payload sent from device to cloud via app' },
  ],

  0x0B43: [
    { bits: 'Bytes 0~N', name: 'Downlink Data (PCM/Opus)', desc: 'Audio or text response from cloud sent to device via app' },
  ],

  0x0B60: [
    { bits: 'Byte 0 [7~0]', name: 'AI Source', desc: '0x00: Default/ChatGPT, 0x01: Amazon Alexa, 0x02: Google Assistant, 0x03: Bixby, 0x04: Siri' },
  ],

  // ── LE Audio Group [0x0B80, 0x0BBF] ────────────────────────────────────────

  0x0B80: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Idle, 0x01: Scanning, 0x02: Connected' },
    { bits: 'Bytes 1~N',    name: 'Auracast Info', desc: 'Variable payload: PA data, Broadcast_ID, BIS info' },
  ],

  0x0B81: [
    { bits: 'Byte 0 [7]',   name: 'Scan Mode',     desc: '0: Stop scan, 1: Start scan' },
    { bits: 'Byte 0 [6~0]', name: 'Reserved',       desc: 'Reserved' },
    { bits: 'Byte 1 [7~0]', name: 'Timeout (s)',    desc: 'Scan timeout in seconds (0 = no timeout)' },
  ],

  0x0B82: [
    { bits: 'Bytes 0~40 (41 bytes)', name: 'Group Info', desc: 'Broadcast ID (3 bytes), Encryption (1 byte), BIS count (1 byte), BIS index list (N bytes), Metadata' },
  ],

  0x0B85: [
    { bits: 'Byte 0 [7~0]',   name: 'Subgroup Index', desc: 'Target subgroup index' },
    { bits: 'Byte 1 [7~0]',   name: 'BIS Index',      desc: 'Target BIS index' },
    { bits: 'Byte 2 [7~0]',   name: 'Channel',        desc: '0x00: Left, 0x01: Right, 0x02: Stereo' },
  ],

  0x0B86: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On (broadcasting)' },
  ],

  0x0B87: [
    { bits: 'Byte 0 [7~0]', name: 'High Quality', desc: '0x00: Standard, 0x01: High quality' },
  ],

  0x0B8A: [
    { bits: 'Bytes 0~N', name: 'Broadcast Name', desc: 'UTF-8 string, max 32 bytes' },
  ],

  0x0BA0: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On (unicast LE Audio active)' },
  ],

  0x0BA1: [
    { bits: 'Byte 0 [7~0]', name: 'Source', desc: '0x00: Auto, 0x01: Bluetooth Classic, 0x02: LE Audio Unicast, 0x03: LE Audio Auracast' },
  ],

  0x0BA5: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: Normal, 0x01: Pairing mode' },
    { bits: 'Byte 1 [7~0]', name: 'Timeout (s)', desc: 'Pairing timeout in seconds' },
  ],

  0x0BA6: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: OneCast pairing mode active' },
  ],

  // ── Mic Group [0x0C00, 0x0C3F] ─────────────────────────────────────────────

  0x0C00: [
    { bits: 'Byte 0 [7~0]', name: 'Availability', desc: '0x00: Unavailable, 0x01: Mic1 available, 0x02: Mic2 available, 0x03: Both available' },
  ],

  0x0C01: [
    { bits: 'Byte 0 [7~0]', name: 'Signal Strength', desc: '0x00: No signal, 0x01~0x04: Weak~Strong' },
  ],

  0x0C02: [
    { bits: 'Byte 0 [7~0]', name: 'Voice Level', desc: '0x00~0x64: Real-time mic input level (0~100)' },
  ],

  0x0C03: [
    { bits: 'Byte 0 [7~0]', name: 'Mute', desc: '0x00: Unmuted, 0x01: Muted' },
  ],

  0x0C04: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x64: Mic volume (0%~100%)' },
  ],

  0x0C05: [
    { bits: 'Byte 0 [7~0]', name: 'Effect', desc: '0x00: None, 0x01: Male voice, 0x02: Female voice, 0x03: Child voice, 0x04: Robot, 0x05: Megaphone' },
  ],

  0x0C06: [
    { bits: 'Byte 0 [7~0]', name: 'Effect Test', desc: '0x00: Stop, 0x01~0xFF: Effect index to preview' },
  ],

  0x0C07: [
    { bits: 'Byte 0 [7~0]', name: 'Operation', desc: '0x00: Stop, 0x01: Start recording' },
    { bits: 'Byte 1 [7~0]', name: 'Mic Selector', desc: '0x00: Mic1, 0x01: Mic2, 0x02: Both' },
  ],

  0x0C08: [
    { bits: 'Byte 0 [7~0]', name: 'Record Status', desc: '0x00: Idle, 0x01: Recording, 0x02: Completed' },
  ],

  0x0C09: [
    { bits: 'Byte 0 [7~0]', name: 'Echo', desc: '0x00~0x0A: Echo level (0=Off, 10=Max)' },
  ],

  0x0C0A: [
    { bits: 'Byte 0 [7~0]', name: 'Reverb', desc: '0x00~0x0A: Reverb level (0=Off, 10=Max)' },
  ],

  0x0C0B: [
    { bits: 'Byte 0 [7~0]', name: 'Sensitivity Level', desc: '0x00~0x0A: Mic1 sensitivity level (0~10)' },
  ],

  0x0C0C: [
    { bits: 'Bytes 3~0 (IEEE 754 float)', name: 'Sensitivity dB', desc: 'Mic1 sensitivity in dBV/Pa (signed float, e.g. -40.0 dB)' },
  ],

  0x0C0D: [
    { bits: 'Byte 0 [7~0]', name: 'Echo', desc: '0x00~0x0A: Echo level (0=Off, 10=Max)' },
  ],

  0x0C0E: [
    { bits: 'Byte 0 [7~0]', name: 'Reverb', desc: '0x00~0x0A: Reverb level (0=Off, 10=Max)' },
  ],

  0x0C0F: [
    { bits: 'Byte 0 [7~0]', name: 'Sensitivity Level', desc: '0x00~0x0A: Mic2 sensitivity level (0~10)' },
  ],

  0x0C10: [
    { bits: 'Bytes 3~0 (IEEE 754 float)', name: 'Sensitivity dB', desc: 'Mic2 sensitivity in dBV/Pa (signed float, e.g. -40.0 dB)' },
  ],

  0x0C11: [
    { bits: 'Byte 0 [7~0]', name: 'Polar Pattern', desc: '0x00: Cardioid, 0x01: Omnidirectional, 0x02: Bidirectional, 0x03: Supercardioid' },
  ],

  // ── Voice Prompt Group [0x0C40, 0x0C7F] ────────────────────────────────────

  0x0C40: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0C41: [
    { bits: 'Byte 0 [7~0]', name: 'Language', desc: '0x00: Default, 0x01: English, 0x02: Chinese, 0x03: French, 0x04: German, 0x05: Spanish (device-specific)' },
  ],

  0x0C42: [
    { bits: 'Byte 0 [7~0]', name: 'Major', desc: 'Voice prompt file major version' },
    { bits: 'Byte 1 [7~0]', name: 'Minor', desc: 'Voice prompt file minor version' },
    { bits: 'Byte 2 [7~0]', name: 'Patch', desc: 'Voice prompt file patch version' },
  ],

  0x0C43: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x0F: Voice prompt volume level (0=Min, 15=Max)' },
  ],

  0x0C44: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x0F: Feedback tone volume level (0=Min, 15=Max)' },
  ],

  // ── PSAP Group [0x0C80, 0x0CAF] ────────────────────────────────────────────

  0x0C80: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0C81: [
    { bits: 'Byte 0 [7~0]', name: 'Balance', desc: '0x00~0x0A: L-R balance (0=Full Left, 5=Center, 10=Full Right)' },
  ],

  0x0C82: [
    { bits: 'Byte 0 [7~0]', name: 'Gain Level', desc: '0x00~0x0A: Total hearing amplification gain level (0=Min, 10=Max)' },
  ],

  0x0C83: [
    { bits: 'Byte 0 [7~0]', name: 'Reduce BG Noise', desc: '0x00: Off, 0x01: On' },
  ],

  0x0C84: [
    { bits: 'Byte 0 [7~0]', name: 'Beamforming', desc: '0x00: Off, 0x01: On' },
  ],

  // ── Sleep Group [0x0CB0, 0x0CFF] ───────────────────────────────────────────

  0x0CB0: [
    { bits: 'Byte 0 [7~0]', name: 'Active Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0CB1: [
    { bits: 'Bytes 1~0 (u16)', name: 'Sleep Timer (min)', desc: 'Sleep timer duration in minutes (0=Off)' },
    { bits: 'Byte 2 [7~0]',    name: 'Sound Index',       desc: '0x00: Off, 0x01: White noise, 0x02: Rain, 0x03: Ocean, 0x04: Forest' },
    { bits: 'Byte 3 [7~0]',    name: 'Volume',            desc: '0x00~0x64: Sleep sound volume (0%~100%)' },
  ],

  0x0CB2: [
    { bits: 'Bytes 1~0 (u16)', name: 'Alarm Hour/Min',   desc: 'Byte0=Hour (0~23), Byte1=Minute (0~59)' },
    { bits: 'Byte 2 [7~0]',    name: 'Repeat Days',      desc: 'Bitmask: bit0=Mon, bit1=Tue, ... bit6=Sun, 0x00=Once' },
    { bits: 'Byte 3 [7~0]',    name: 'Enabled',          desc: '0x00: Disabled, 0x01: Enabled' },
  ],

  0x0CB3: [
    { bits: 'Bytes 3~0 (u32)', name: 'Count Down (s)', desc: 'Remaining seconds until sleep timer fires' },
  ],

  0x0CB4: [
    { bits: 'Byte 0 [7~0]', name: 'Ring Tone', desc: '0x00: Default, 0x01~0xFF: Alarm ring tone index (device-specific)' },
  ],

  // ── Gesture Group [0x0F00, 0x0FFF] ─────────────────────────────────────────
  // All gesture feature IDs share the same single-byte action enum binding.

  0x0F00: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: None, 0x01: Vol+, 0x02: Vol-, 0x03: Play/Pause, 0x04: Next track, 0x05: Prev track, 0x06: ANC cycle, 0x07: Voice assistant, 0x08: Answer call, 0x09: Reject call, 0x0A: End call, 0x0B: Power off, 0x0C: Mic mute' }],
  0x0F01: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F02: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F03: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F04: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F05: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F06: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F07: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F08: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F09: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F0A: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F0B: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F0C: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F0D: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F80: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F81: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F82: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F83: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F84: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F85: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F86: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F87: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F88: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F89: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F90: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F91: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F92: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0F93: [{ bits: 'Byte 0 [7~0]', name: 'Action', desc: 'Same action enum as 0x0F00' }],
  0x0FC0: [
    { bits: 'Byte 0 [7~0]', name: 'Prevention', desc: '0x00: Off, 0x01: On (rejects accidental touch gestures)' },
  ],

  // ── Head Tracking Group [0x1D00, 0x1D3F] ───────────────────────────────────

  0x1D00: [
    { bits: 'Byte 0 [7~0]', name: 'Calibration', desc: '0x00: Stop, 0x01: Start calibration sequence' },
  ],

  0x1D01: [
    { bits: 'Byte 0 [7~0]', name: 'Confirm', desc: '0x01: Confirm "looking straight ahead" position captured' },
  ],

  0x1D02: [
    { bits: 'Byte 0 [7~0]', name: 'Confirm', desc: '0x01: Confirm "looking down" position captured' },
  ],

  0x1D03: [
    { bits: 'Bytes 3~0 (float)',   name: 'Yaw (°)',   desc: 'Head yaw angle in degrees (IEEE 754 float)' },
    { bits: 'Bytes 7~4 (float)',   name: 'Pitch (°)', desc: 'Head pitch angle in degrees' },
    { bits: 'Bytes 11~8 (float)',  name: 'Roll (°)',  desc: 'Head roll angle in degrees' },
    { bits: 'Bytes 19~12 (8 B)',   name: 'Reserved',  desc: 'Reserved bytes' },
  ],

  0x1D04: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: Normal, 0x01: Mic calibration mode active' },
  ],

  // ── Personi-Fi Group [0x1E00, 0x1E3F] ──────────────────────────────────────

  0x1E00: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: Off, 0x01: On (Personi-Fi personalized EQ active)' },
  ],

  0x1E01: [
    { bits: 'Byte 0 [7~0]', name: 'Test Mode', desc: '0x00: Off, 0x01: Pure tone, 0x02: Speech' },
  ],

  0x1E02: [
    { bits: 'Byte 0 [7~0]', name: 'Flow', desc: '0x00: Reset, 0x01: Start setup, 0x02: Complete' },
  ],

  0x1E03: [
    { bits: 'Byte 0 [7~0]', name: 'Side', desc: '0x00: Left ear, 0x01: Right ear' },
  ],

  0x1E04: [
    { bits: 'Bytes 3~0 (IEEE 754 float)', name: 'Frequency (Hz)', desc: 'Test tone frequency in Hz (e.g. 1000.0 = 1 kHz)' },
  ],

  // ── Safe Listening Group [0x1E80, 0x1EBF] ──────────────────────────────────

  0x1E80: [
    { bits: 'Byte 0 [7~0]', name: 'Current Volume', desc: '0x00~0x64: Current output volume (0%~100%)' },
  ],

  0x1E81: [
    { bits: 'Byte 0 [7~0]', name: 'Max Volume Limit', desc: '0x00~0x64: Maximum allowed volume (0%~100%)' },
  ],

  0x1E82: [
    { bits: 'Bytes 1~0 (u16)', name: 'Time Limit (min)', desc: 'Daily listening time limit in minutes' },
    { bits: 'Byte 2 [7~0]',    name: 'Enabled',          desc: '0x00: Disabled, 0x01: Enabled' },
  ],

  0x1E83: [
    { bits: 'Bytes 1~0 (u16)', name: 'Today Listened (min)', desc: "Today's total listening time in minutes" },
  ],

  0x1E84: [
    { bits: 'Bytes 5~0 (6 bytes)', name: 'PIN Code', desc: '6-digit PIN stored as ASCII bytes (e.g. "123456")' },
  ],

  0x1E87: [
    { bits: 'Byte 0 [7~0]', name: 'Remind Voice', desc: '0x00: Off, 0x01: On (play reminder voice when limit reached)' },
  ],

  0x1E88: [
    { bits: 'Byte 0 [7~0]', name: 'Delete', desc: '0x01: Delete custom reminder voice' },
  ],

  0x1E89: [
    { bits: 'Byte 0 [7~0]', name: 'Operation', desc: '0x00: Stop, 0x01: Prepare to record, 0x02: Play recorded voice' },
  ],

  0x1E8A: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Idle, 0x01: Recording, 0x02: Playing, 0x03: Done' },
  ],

  0x1E8B: [
    { bits: 'Byte 0 [7~0]', name: "Time's Up", desc: '0x00: Normal, 0x01: Daily time limit reached' },
  ],

  // ── Case Group [0x1F00, 0x1FFF] ─────────────────────────────────────────────

  0x1F00: [
    { bits: 'Byte 0 [7~0]', name: 'OTA Mode', desc: '0x01: Launch case OTA mode' },
  ],

  0x1F01: [
    { bits: 'Byte 0 [7~0]', name: 'Major', desc: 'Case firmware major version' },
    { bits: 'Byte 1 [7~0]', name: 'Minor', desc: 'Case firmware minor version' },
    { bits: 'Byte 2 [7~0]', name: 'Patch', desc: 'Case firmware patch version' },
  ],

  0x1F02: [
    { bits: 'Bytes 5~0 (6 bytes)', name: 'MAC Address', desc: 'Case Bluetooth MAC address (big-endian)' },
  ],

  0x1F03: [
    { bits: 'Byte 0 [7]',   name: 'Charging',      desc: '1: Charging' },
    { bits: 'Byte 0 [6~0]', name: 'Battery Level', desc: '0~100: Battery percentage' },
  ],

  0x1F04: [
    { bits: 'Byte 0 [7~0]', name: 'Brightness', desc: '0x00~0x0A: Screen brightness level (0=Min, 10=Max)' },
  ],

  0x1F05: [
    { bits: 'Byte 0 [7~0]', name: 'Notification', desc: '0x00: Off, 0x01: On' },
  ],

  0x1F06: [
    { bits: 'Byte 0 [7~0]', name: 'Screen Saver Index', desc: 'Active screen saver index (0-based)' },
  ],

  0x1F07: [
    { bits: 'Bytes 1~0 (u16)', name: 'Screen Saver Time (s)', desc: 'Idle seconds before screen saver activates (0=Never)' },
  ],

  0x1F08: [
    { bits: 'Byte 0 [7~0]', name: 'Message Preview', desc: '0x00: Off, 0x01: On (show notification preview on screen)' },
  ],

  0x1F0B: [
    { bits: 'Byte 0 [7~0]', name: 'Indicator', desc: '0x00: Off, 0x01: Show unlock indicator animation' },
  ],

  0x1F0C: [
    { bits: 'Byte 0 [7~0]', name: 'Tab to Wake', desc: '0x00: Disabled, 0x01: Enabled' },
  ],

  0x1F10: [
    { bits: 'Bytes 1~0 (u16)', name: 'Width (px)',  desc: 'Screen width in pixels' },
    { bits: 'Bytes 3~2 (u16)', name: 'Height (px)', desc: 'Screen height in pixels' },
  ],

  0x1F11: [
    { bits: 'Byte 0 [7~0]', name: '24H Time', desc: '0x00: 12-hour format, 0x01: 24-hour format' },
  ],

  0x1F12: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: No custom screen saver, 0x01: Custom screen saver uploaded' },
  ],

  0x1F14: [
    { bits: 'Byte 0 [7~0]', name: 'Information', desc: '0x00: Off, 0x01: Show time, 0x02: Show time + date' },
  ],

  0x1F16: [
    { bits: 'Byte 0 [7~0]', name: 'R', desc: '0x00~0xFF: Red' },
    { bits: 'Byte 1 [7~0]', name: 'G', desc: '0x00~0xFF: Green' },
    { bits: 'Byte 2 [7~0]', name: 'B', desc: '0x00~0xFF: Blue' },
  ],

  // ── Bluetooth Assistant Group [0x2B00, 0x2BFF] ─────────────────────────────

  0x2B00: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x2B01: [
    { bits: 'Byte 0 [7~0]', name: 'Type', desc: '0x00: None, 0x01: Alexa, 0x02: Google Assistant, 0x03: Bixby, 0x04: Siri' },
  ],

  // ── DJ Effect Group [0x2D80, 0x2DAF] ───────────────────────────────────────

  0x2D80: [
    { bits: 'Byte 0 [7~0]', name: 'Button 1 Effect', desc: '0x00: None, 0x01~0xFF: DJ effect preset index assigned to Button 1' },
  ],

  0x2D81: [
    { bits: 'Byte 0 [7~0]', name: 'Button 2 Effect', desc: '0x00: None, 0x01~0xFF: DJ effect preset index assigned to Button 2' },
  ],

  0x2D82: [
    { bits: 'Byte 0 [7~0]', name: 'Button 3 Effect', desc: '0x00: None, 0x01~0xFF: DJ effect preset index assigned to Button 3' },
  ],

  0x2D83: [
    { bits: 'Byte 0 [7~0]', name: 'Tone Effect', desc: '0x00: None, 0x01~0xFF: DJ tone effect index' },
  ],

  0x2D84: [
    { bits: 'Byte 0 [7~0]', name: 'Voice Effect', desc: '0x00: None, 0x01~0xFF: DJ voice modulation effect index' },
  ],

  0x2D85: [
    { bits: 'Byte 0 [7~0]', name: 'Filter Name Index', desc: '0x00~0xFF: Selected DJ filter name index (maps to filter name string)' },
  ],

  0x2D86: [
    { bits: 'Byte 0 [7~0]', name: 'Filter', desc: '0x00: Off, 0x01: Low-pass, 0x02: High-pass, 0x03: Band-pass' },
  ],

  // ── Radio Group [0x2DB0, 0x2DFF] ───────────────────────────────────────────

  0x2DB0: [
    { bits: 'Byte 0 [7~0]', name: 'Radio Type', desc: '0x05: FM Radio, 0x06: DAB Radio (maps to AUDIO_SOURCE_MAP)' },
    { bits: 'Byte 1 [7~0]', name: 'Scan Direction', desc: '0x00: Stop, 0x01: Scan up, 0x02: Scan down, 0x03: Auto-scan all' },
  ],

  0x2DB1: [
    { bits: 'Byte 0 [7~0]',      name: 'Radio Type',          desc: '0x05=FM Radio, 0x06=DAB Radio (see AUDIO_SOURCE_MAP)' },
    { bits: 'Bytes 4~1 (float)', name: 'FM Frequency (MHz)',  desc: 'IEEE 754 float, valid when Radio Type is FM (e.g. 87.5)' },
    { bits: 'Bytes 4~1 (u32)',   name: 'DAB Station ID',      desc: 'Integer station ID, valid when Radio Type is DAB' },
    { bits: 'Bytes 5~(5+N)',     name: 'Station Name',        desc: 'UTF-8 string N bytes. FM has no station name (N=0)' },
  ],

  0x2DB2: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'FM Frequency (kHz)', desc: 'e.g. 0x000154F8 = 87500 kHz = 87.5 MHz' },
    { bits: 'Bytes 5~4 (u16)',    name: 'Preset Index',       desc: 'Preset slot index to store this station' },
  ],

  0x2DB3: [
    { bits: 'Bytes 3~0 (LE u32)', name: 'FM Frequency (kHz)', desc: 'Station frequency to update in preset' },
    { bits: 'Bytes 5~4 (u16)',    name: 'Preset Index',       desc: 'Preset slot index to update' },
  ],

  // ── Party Light Group [0x2F00, 0x2FFF] ─────────────────────────────────────

  0x2F00: [
    { bits: 'Byte 0 [7~0]', name: 'Stage Support', desc: '0x00: Not supported, 0x01: Stage light supported' },
  ],

  0x2F01: [
    { bits: 'Byte 0 [7~0]', name: 'Stage Action', desc: '0x00: Idle, 0x01: Playing, 0x02: Paused' },
  ],

  0x2F02: [
    { bits: 'Byte 0 [7~0]', name: 'Device Count', desc: 'Number of stage group devices connected' },
  ],

  0x2F03: [
    { bits: 'Byte 0 [7~0]', name: 'Sound Detection', desc: '0x00: Off, 0x01: On (light reacts to music/sound)' },
  ],

  0x2F04: [
    { bits: 'Byte 0 [7~0]', name: 'Boost', desc: '0x00: Off, 0x01: On (boost light up effect)' },
  ],

  0x2F05: [
    { bits: 'Byte 0 [7~0]', name: 'Battery Saving Status', desc: '0x00: Normal, 0x01: Battery saving mode active' },
  ],

  0x2F06: [
    { bits: 'Byte 0 [7~0]', name: 'Battery Saving', desc: '0x00: Off, 0x01: On' },
  ],

  0x2F07: [
    { bits: 'Byte 0 [7~0]', name: 'Brightness', desc: '0x00~0x64: LED brightness (0%~100%)' },
  ],

  0x2F08: [
    { bits: 'Byte 0 [7~0]', name: 'LED Speed', desc: '0x00~0x0A: LED movement speed (0=Slowest, 10=Fastest)' },
  ],

  0x2F09: [
    { bits: 'Byte 0 [7~0]', name: 'Party Box Assignment', desc: '0x00: Unassigned, 0x01~0xFF: Party Box device index' },
  ],

  0x2F0A: [
    { bits: 'Byte 0 [7~0]', name: 'Stage Light Number', desc: '0x00~0xFF: Number of stage lights in the group' },
  ],

  // ── BandBox Group [0x3000, 0x3FFF] ─────────────────────────────────────────

  0x3000: [
    { bits: 'Byte 0 [7~0]', name: 'Drum Status', desc: '0x00: Stop, 0x01: Start' },
  ],

  0x3001: [
    { bits: 'Bytes 1~0 (u16)', name: 'Tempo (BPM)', desc: 'Drum beat tempo in BPM (e.g. 0x0078 = 120 BPM)' },
  ],

  0x3002: [
    { bits: 'Byte 0 [7~0]', name: 'Sequence', desc: '0x00: Off, 0x01~0xFF: Drum pattern sequence index' },
  ],

  0x3003: [
    { bits: 'Bytes 3~0 (u32)', name: 'Tap Timestamp (ms)', desc: 'Device timestamp of drum tap event in milliseconds' },
  ],

  0x3040: [
    { bits: 'Byte 0 [7~0]', name: 'Metronome Status', desc: '0x00: Stop, 0x01: Start' },
  ],

  0x3041: [
    { bits: 'Bytes 1~0 (u16)', name: 'Tempo (BPM)', desc: 'Metronome tempo in BPM' },
  ],

  0x3042: [
    { bits: 'Byte 0 [7~0]', name: 'Time Signature', desc: '0x01~0x07: Beats per measure (1~7)' },
  ],

  0x3043: [
    { bits: 'Bytes 3~0 (u32)', name: 'Tap Timestamp (ms)', desc: 'Device timestamp of tap event for tap-to-tempo' },
  ],

  0x3080: [
    { bits: 'Byte 0 [7~0]', name: 'Karaoke Mode', desc: '0x00: Off, 0x01: Vocal removal, 0x02: Instrument isolation' },
  ],

  0x3081: [
    { bits: 'Byte 0 [7~0]', name: 'Track Type', desc: '0x00: Vocal, 0x01: Drums, 0x02: Bass, 0x03: Other' },
  ],

  0x3082: [
    { bits: 'Byte 0 [7~0]', name: 'Track Type', desc: '0x00: Vocal, 0x01: Drums, 0x02: Bass, 0x03: Other' },
    { bits: 'Byte 1 [7~0]', name: 'Volume', desc: '0x00~0x64: Track volume (0%~100%)' },
  ],

  0x3085: [
    { bits: 'Byte 0 [7~0]', name: 'AI Mode', desc: '0x00: Off, 0x01: AI Stem Separation active' },
  ],

  0x30C0: [
    { bits: 'Byte 0 [7~0]', name: 'Pitch Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x30C1: [
    { bits: 'Bytes 1~0 (s16)', name: 'Pitch Shift (semitones × 10)', desc: 'Signed, e.g. +50 = +5 semitones, -100 = -10 semitones' },
  ],

  0x3100: [
    { bits: 'Byte 0 [7~0]', name: 'Tuner Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x3101: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: Standard, 0x01: Drop D, 0x02: Open G, 0x03: Custom' },
  ],

  0x3102: [
    { bits: 'Byte 0 [7~0]', name: 'Bass Mode', desc: '0x00: Off, 0x01: 4-string bass, 0x02: 5-string bass' },
  ],

  0x3103: [
    { bits: 'Bytes 1~0 (u16)', name: 'Reference Pitch (Hz × 10)', desc: 'Reference A4 pitch, e.g. 4400 = 440.0 Hz' },
  ],

  0x3104: [
    { bits: 'Byte 0 [7~0]', name: 'String', desc: '0x00: Auto-detect, 0x01~0x06: Guitar string 1~6' },
  ],

  0x3106: [
    { bits: 'Byte 0 [7~0]', name: 'Detected Note', desc: 'MIDI note number (0~127)' },
    { bits: 'Bytes 3~1 (s24)', name: 'Cent Deviation', desc: 'Tuning deviation in cents (×100), e.g. 50 = +0.50 cent' },
  ],

  0x3107: [
    { bits: 'Byte 0 [7~0]', name: 'Chromatic Status', desc: '0x00: Off, 0x01: Chromatic tuning mode active' },
  ],

  0x3108: [
    { bits: 'Byte 0 [7~0]', name: 'Note', desc: 'Detected MIDI note number (0~127)' },
    { bits: 'Bytes 3~1',     name: 'Deviation (cents × 100)', desc: 'Signed deviation from target note' },
  ],

  0x3140: [
    { bits: 'Byte 0 [7~0]', name: 'Operation', desc: '0x00: Idle, 0x01: Record, 0x02: Stop record, 0x03: Overdub, 0x04: Clear' },
  ],

  0x3141: [
    { bits: 'Bytes 1~0 (u16)', name: 'Interval (ms)', desc: 'Music signal report interval in milliseconds' },
  ],

  0x3142: [
    { bits: 'Bytes 1~0 (s16)', name: 'Level (dBFS × 100)', desc: 'Real-time looper input level' },
  ],

  0x3143: [
    { bits: 'Bytes 3~0 (u32)', name: 'Duration (ms)', desc: 'Total recorded loop duration in milliseconds' },
  ],

  0x3145: [
    { bits: 'Byte 0 [7~0]', name: 'Operation', desc: '0x00: Stop, 0x01: Play, 0x02: Pause, 0x03: Loop' },
  ],

  0x3147: [
    { bits: 'Byte 0 [7~0]', name: 'Bars', desc: '0x01~0xFF: Number of bars per loop' },
  ],

  0x3148: [
    { bits: 'Byte 0 [7~0]', name: 'Layer Count', desc: '0~N: Number of recorded overdub layers' },
  ],

  0x3180: [
    { bits: 'Byte 0 [7~0]', name: 'Storage', desc: '0x00: Internal, 0x01: SD card, 0x02: USB' },
  ],

  0x3181: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Stop, 0x01: Start recording' },
  ],

  0x3182: [
    { bits: 'Byte 0 [7~0]', name: 'Separate Tracks', desc: '0x00: Disabled (mix to single file), 0x01: Enabled (separate track files)' },
  ],

  0x3800: [
    { bits: 'Byte 0 [7~0]', name: 'OTA Path', desc: '0x00: BLE, 0x01: Wi-Fi, 0x02: USB' },
  ],

  0x3801: [
    { bits: 'Byte 0 [7~0]', name: 'OOBE Status', desc: '0x00: Not completed, 0x01: Completed' },
  ],

  0x3802: [
    { bits: 'Byte 0 [7~0]', name: 'Backward Screen', desc: '0x01: Navigate to previous screen' },
  ],

  0x3805: [
    { bits: 'Bytes 0~N', name: 'Feature List', desc: 'Variable-length list of supported BandBox feature IDs (2 bytes each, LE)' },
  ],

  // ── Tuning Tool Group [0x4000, 0x4FFF] ─────────────────────────────────────

  0x4040: [
    { bits: 'Byte 0 [7~0]', name: 'Total Channels', desc: 'Total number of audio output channels' },
  ],

  0x4100: [
    { bits: 'Bytes 3~0 (IEEE 754 float)', name: 'Volume (dB)', desc: 'Main output volume in dB (e.g. -6.0 = -6 dB)' },
  ],

  0x4140: [
    { bits: 'Byte 0 [7~0]',              name: 'Enabled',        desc: '0x00: Off, 0x01: On' },
    { bits: 'Bytes 4~1 (float)',          name: 'Threshold (dB)', desc: 'Noise gate open threshold in dB' },
    { bits: 'Bytes 8~5 (float)',          name: 'Hysteresis (dB)',desc: 'Close threshold = Threshold - Hysteresis' },
    { bits: 'Bytes 12~9 (float)',         name: 'Attack (ms)',    desc: 'Gate open attack time in ms' },
    { bits: 'Bytes 16~13 (float)',        name: 'Release (ms)',   desc: 'Gate close release time in ms' },
  ],

  0x4180: [
    { bits: 'Byte 0 [7~0]',     name: 'Enabled',        desc: '0x00: Off, 0x01: On' },
    { bits: 'Bytes 4~1 (float)',name: 'Threshold (dB)',  desc: 'Limiter ceiling threshold in dB' },
    { bits: 'Bytes 8~5 (float)',name: 'Attack (ms)',     desc: 'Limiter attack time in ms' },
    { bits: 'Bytes 12~9 (float)',name: 'Release (ms)',   desc: 'Limiter release time in ms' },
  ],
}
