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

  // ── Common Group ────────────────────────────────────────────────────────────

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
    { bits: 'Byte 0 [7~0]', name: 'Delay (seconds)',  desc: 'Delay before powering off (0 = immediate)' },
    { bits: 'Byte 1 [7~0]', name: 'Device Selection', desc: '0x00: All, 0x01: Primary, 0x02: Secondary' },
  ],

  0x0012: [
    { bits: 'Byte 1~0 (LE u16)', name: 'Timeout (minutes)', desc: '0x0000: Disabled, 0x0001~0xFFFE: Timeout value' },
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
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off (follows in-ear detection), 0x01: On (ANC stays active regardless)' },
  ],

  0x0020: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0021: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: Off, 0x01: On (Fixed), 0x02: On (Head Tracking)' },
  ],

  0x0022: [
    { bits: 'Byte 0 [7~0]', name: 'Scene', desc: '0x00: Off, 0x01: Movie, 0x02: Music, 0x03: Sport, 0x04: Podcast' },
  ],

  0x0023: [
    { bits: 'Byte 0 [7~0]', name: 'Level', desc: '0x00: Off, 0x01~0x64: Sidetone level (1%~100%)' },
  ],

  0x0024: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x0025: [
    { bits: 'Byte 0 [7~0]', name: 'Max Volume', desc: '0x00~0x64 (0%~100%)' },
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
    { bits: 'Byte 0 [7~0]', name: 'Sound Effect Index', desc: '0x00: Off/Default, 0x01~0xFF: Preset index (device-specific)' },
  ],

  0x002A: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Disabled, 0x01: Enabled' },
  ],

  0x002B: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x002C: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Not charging, 0x01: Charging' },
  ],

  0x002E: [
    { bits: 'Byte 0 [7~0]', name: 'BLE Paired Status', desc: '0x00: Unpaired, 0x01: Paired' },
  ],

  0x002F: [
    { bits: 'Byte 0 [7~0]', name: 'Host Type', desc: '0x01: Android, 0x02: iOS, 0x03: Dongle, 0x04: Soundbar' },
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

  0x003D: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: No signal, 0x01: Signal detected' },
  ],

  0x003F: [
    { bits: 'Byte 0 [7~0]', name: 'State', desc: '0x00: Disconnected, 0x01: Connected' },
  ],

  0x0040: [
    { bits: 'Byte 0 [7~0]', name: 'Available', desc: '0x00: Not available, 0x01: Available' },
  ],

  0x0045: [
    { bits: 'Byte 0 [7~0]', name: 'Power State', desc: '0x00: Power off, 0x01: Power on, 0x02: Sleep/Standby' },
  ],

  0x0048: [
    { bits: 'Byte 0 [7~0]', name: 'Supported', desc: '0x00: Not supported, 0x01: Supported' },
  ],

  0x0049: [
    { bits: 'Byte 0 [7~0]', name: 'Mode', desc: '0x00: Off (Normal), 0x01: ANC, 0x02: Ambient Aware, 0x03: Talk Thru' },
  ],

  0x004A: [
    { bits: 'Byte 0 [7~0]', name: 'Algorithm', desc: '0x00: Default, 0x01: MD5, 0x02: SHA-256' },
  ],

  0x004E: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x64 (0%~100%)' },
  ],

  // ── OTA Group ───────────────────────────────────────────────────────────────

  0x0B04: [
    { bits: 'Byte 0 [7~0]', name: 'Components', desc: 'Bitmask: bit0=Primary FW, bit1=Secondary FW, bit2=DSP, bit3=Dongle FW' },
  ],

  // ── EQ Group ────────────────────────────────────────────────────────────────

  0x0E80: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  // ── Lighting Group ──────────────────────────────────────────────────────────

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

  0x0D62: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  // ── Headphone Misc Group ────────────────────────────────────────────────────

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
    { bits: 'Byte 0 [7~0]', name: 'Noise Level', desc: '0x00~0x64: Ambient noise level dB (0~100)' },
  ],

  0x1005: [
    { bits: 'Byte 0 [7~0]', name: 'Ear Tip Size', desc: '0x00: None/Unknown, 0x01: XS, 0x02: S, 0x03: M, 0x04: L, 0x05: XL' },
  ],

  0x1007: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
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

  0x1010: [
    { bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: Hang up, 0x01: Answer, 0x02: Reject, 0x03: Transfer to phone, 0x04: Hold' },
  ],

  0x1011: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x1015: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  // ── Portable Misc Group ─────────────────────────────────────────────────────

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
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x200A: [
    { bits: 'Byte 0 [7~0]', name: 'USB Status', desc: '0x00: Disconnected, 0x01: Connected (charging only), 0x02: Connected (audio + charging)' },
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

  0x2011: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On (device plays identify sound/light)' },
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

  // ── Party Group ─────────────────────────────────────────────────────────────

  0x2C00: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Off, 0x01: On' },
  ],

  0x2C01: [
    { bits: 'Byte 0 [7~0]', name: 'Group Type', desc: '0x00: Normal (peer-to-peer), 0x01: Broadcast (one-to-many)' },
  ],

  0x2C02: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Disconnected, 0x01: Connected' },
  ],

  0x2C03: [
    { bits: 'Byte 0 [7~0]', name: 'Role', desc: '0x00: None, 0x01: Host, 0x02: Member' },
  ],

  0x2C04: [
    { bits: 'Byte 0 [7~0]', name: 'Channel Type', desc: '0x00: Stereo, 0x01: Left, 0x02: Right, 0x03: Mono' },
  ],

  0x2C07: [
    { bits: 'Byte 0 [7~0]', name: 'Action', desc: '0x00: Leave group, 0x01: Disband group' },
  ],

  0x2C80: [
    { bits: 'Byte 0 [7~0]', name: 'Status', desc: '0x00: Disconnected, 0x01: Connected' },
  ],

  0x2C82: [
    { bits: 'Byte 0 [7~0]', name: 'Timeout (minutes)', desc: '0x00: Never disconnect, 0x01~0xFF: Timeout value' },
  ],

  // ── Audio Group ─────────────────────────────────────────────────────────────

  0x2D40: [
    { bits: 'Byte 0 [7~0]', name: 'Operation', desc: '0x00: Play/Pause toggle, 0x01: Play, 0x02: Pause, 0x03: Next, 0x04: Previous' },
  ],

  0x2D41: [
    { bits: 'Byte 0 [7~0]', name: 'Mute', desc: '0x00: Unmuted, 0x01: Muted' },
  ],

  0x2D42: [
    { bits: 'Byte 0 [7~0]', name: 'Volume', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x2D46: [
    { bits: 'Byte 0 [7~0]', name: 'Codec', desc: '0x00: Auto, 0x01: SBC, 0x02: AAC, 0x03: aptX, 0x04: aptX HD, 0x05: LDAC, 0x06: LC3' },
  ],

  // ── Karaoke Group ───────────────────────────────────────────────────────────

  0x2D00: [
    { bits: 'Byte 0 [7~0]', name: 'Bass Level', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x2D01: [
    { bits: 'Byte 0 [7~0]', name: 'Treble Level', desc: '0x00~0x64 (0%~100%)' },
  ],

  0x2D02: [
    { bits: 'Byte 0 [7~0]', name: 'Echo Level', desc: '0x00~0x64 (0%~100%)' },
  ],

  // ── Battery Group ────────────────────────────────────────────────────────────

  0x2E01: [
    { bits: 'Byte 1~0 (LE u16)', name: 'Remaining Playtime (min)', desc: 'Remaining playback time in minutes' },
  ],

  0x2E02: [
    { bits: 'Byte 1~0 (LE i16)', name: 'Max Temperature (0.1°C)', desc: 'e.g. 0x012C = 300 → 30.0°C' },
  ],

  0x2E03: [
    { bits: 'Byte 1~0 (LE u16)', name: 'Remaining Capacity (mAh)', desc: 'Current remaining capacity' },
  ],

  0x2E04: [
    { bits: 'Byte 1~0 (LE u16)', name: 'Full Charge Capacity (mAh)', desc: 'Actual full-charge capacity' },
  ],

  0x2E05: [
    { bits: 'Byte 1~0 (LE u16)', name: 'Design Capacity (mAh)', desc: 'Rated design capacity' },
  ],

  0x2E06: [
    { bits: 'Byte 1~0 (LE u16)', name: 'Charge Cycle Count', desc: 'Total number of charge cycles' },
  ],

  0x2E07: [
    { bits: 'Byte 0 [7~0]', name: 'State of Health (%)', desc: '0x00~0x64: Battery health percentage (100% = new)' },
  ],

  0x2E08: [
    { bits: 'Byte 0 [7~0]', name: 'Charging Status', desc: '0x00: Not charging, 0x01: Charging, 0x02: Fully charged' },
  ],

  0x2E09: [
    { bits: 'Byte 0 [7~0]', name: 'Health Notification', desc: '0x00: Normal, 0x01: Battery degraded, 0x02: Replace soon' },
  ],

  0x2E0A: [
    { bits: 'Byte 3~0 (LE u32)', name: 'Total Power-on Duration (min)', desc: 'Total minutes the device has been powered on' },
  ],

  0x2E0B: [
    { bits: 'Byte 3~0 (LE u32)', name: 'Total Playback Duration (min)', desc: 'Total minutes of audio playback' },
  ],
}
