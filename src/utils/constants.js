// Command ID definitions
export const COMMAND_ID_MAP = {
  0x0001: { name: 'Get Command',                  dir: 'App → Device', category: 'Device Info' },
  0x0002: { name: 'Set Command',                  dir: 'App → Device', category: 'Device Info' },
  0x0003: { name: 'Notification',                 dir: 'Device → App', category: 'Device Info' },
  0x0004: { name: 'Notification',                 dir: 'App → Device', category: 'Device Info' },
  0x0101: { name: 'Start OTA',                    dir: 'App → Device', category: 'OTA' },
  0x0102: { name: 'Send OTA Data',                dir: 'App → Device', category: 'OTA' },
  0x0103: { name: 'Stop OTA',                     dir: 'App → Device', category: 'OTA' },
  0x0104: { name: 'OTA Notification',             dir: 'Device → App', category: 'OTA' },
  0x0201: { name: 'Get Device Analytics Data',    dir: 'App → Device', category: 'Analytics' },
  0x02FF: { name: 'Clean Device Analytics Data',  dir: 'App → Device', category: 'Analytics' },
}

// Feature ID definitions (Common + OTA groups)
export const FEATURE_ID_MAP = {
  // ── Common Group [0x0000, 0x0AFF] ──────────────────────────────────────────
  0x0000: { name: 'Unsupported Feature ID List',                           perm: 'N' },
  0x0001: { name: 'MTU',                                                   perm: 'R',     valueSize: 2 },
  0x0002: { name: 'App Alive Heartbeat Request from Device',               perm: 'W',     valueSize: 0 },
  0x0003: { name: 'Continuous Packets Minimal Transmission Interval (ms)', perm: 'R',     valueSize: 2 },
  0x0004: { name: 'Product ID',                                            perm: 'R',     valueSize: 2 },
  0x0005: { name: 'Color ID',                                              perm: 'R',     valueSize: 1 },
  0x0006: { name: 'Device Name',                                           perm: 'R/W',   maxSize: 32 },
  0x0007: { name: 'Host Name CRC16',                                       perm: 'R/W',   valueSize: 2 },
  0x0008: { name: 'Left/Primary Device Serial Number',                     perm: 'R',     maxSize: 64 },
  0x0009: { name: 'Right/Secondary Device Serial Number',                  perm: 'R',     maxSize: 64 },
  0x000A: { name: 'Device BT MAC Address',                                 perm: 'R',     valueSize: 6 },
  0x000B: { name: 'Secondary Device BT MAC Address',                       perm: 'R',     valueSize: 6 },
  0x000C: { name: 'Firmware Version',                                      perm: 'R',     maxSize: 6 },
  0x000D: { name: 'Left/Primary Device Battery Status',                    perm: 'R/N',   valueSize: 1 },
  0x000E: { name: 'Right/Secondary Device Battery Status',                 perm: 'R/N',   valueSize: 1 },
  0x000F: { name: 'Factory Reset',                                         perm: 'W',     valueSize: 0 },
  0x0010: { name: 'BT Connection Status',                                  perm: 'R/N',   valueSize: 1 },
  0x0011: { name: 'Manual Power Off',                                      perm: 'W/N',   valueSize: 2 },
  0x0012: { name: 'Auto Power Off',                                        perm: 'R/W',   valueSize: 2 },
  0x0013: { name: 'Auto Standby (Deprecated)',                             perm: 'R/W',   valueSize: 2 },
  0x0014: { name: 'Game Chat Balance',                                     perm: 'R/W/N', valueSize: 1 },
  0x0015: { name: 'LR Balance',                                            perm: 'R/W/N', valueSize: 1 },
  0x0016: { name: 'Microphone Work Indicating LED Brightness',             perm: 'R/W',   valueSize: 1 },
  0x0017: { name: 'Battery Presence',                                      perm: 'R',     valueSize: 1 },
  0x0018: { name: 'ANC',                                                   perm: 'R/W/N', valueSize: 1 },
  0x0019: { name: 'Ambient Aware (AA)',                                    perm: 'R/W/N', valueSize: 1 },
  0x001A: { name: 'Talk Thru (TT)',                                        perm: 'R/W/N', valueSize: 1 },
  0x001B: { name: 'Adaptive ANC',                                          perm: 'R/W',   valueSize: 1 },
  0x001C: { name: 'True Adaptive ANC',                                     perm: 'R/W',   valueSize: 1 },
  0x001D: { name: 'Leakage Compensation',                                  perm: 'R/W',   valueSize: 1 },
  0x001E: { name: 'Ear Canal Compensation',                                perm: 'R/W',   valueSize: 1 },
  0x001F: { name: 'ANC Always On',                                         perm: 'R/W',   valueSize: 1 },
  0x0020: { name: 'Auto Compensation',                                     perm: 'R/W',   valueSize: 1 },
  0x0021: { name: 'Spatial Sound Mode',                                    perm: 'R/W',   valueSize: 1 },
  0x0022: { name: 'Spatial Sound Scene',                                   perm: 'R/W',   valueSize: 1 },
  0x0023: { name: 'Sidetone',                                              perm: 'R/W',   valueSize: 1 },
  0x0024: { name: 'Low EQ Compensation',                                   perm: 'R/W',   valueSize: 1 },
  0x0025: { name: 'Max Volume Limit (Legacy)',                             perm: 'R/W',   valueSize: 1 },
  0x0026: { name: 'Noise Suppression',                                     perm: 'R/W',   valueSize: 1 },
  0x0027: { name: 'Audio Limiter (Sound Level Optimizer)',                 perm: 'R/W',   valueSize: 1 },
  0x0028: { name: 'Hi-Res',                                                perm: 'R/W',   valueSize: 1 },
  0x0029: { name: 'Sound Effect (Sound Setting)',                          perm: 'R/W',   valueSize: 1 },
  0x002A: { name: 'Auto Play/Pause Enable',                               perm: 'R/W',   valueSize: 1 },
  0x002B: { name: 'Smart Talk',                                            perm: 'R/W',   valueSize: 1 },
  0x002C: { name: 'Charging Pin/Port Detect',                             perm: 'R',     valueSize: 1 },
  0x002D: { name: 'Spatial Sound Recenter',                               perm: 'W',     valueSize: 1 },
  0x002E: { name: 'BLE Paired Status',                                    perm: 'N',     valueSize: 1 },
  0x002F: { name: 'Host Type',                                             perm: 'W',     valueSize: 1 },
  0x0030: { name: 'Text Message Notification Setting',                     perm: 'W',     valueSize: 151 },
  0x0031: { name: 'Sync Time',                                             perm: 'R/W',   valueSize: 16 },
  0x0032: { name: 'Text Message Notification Remove All',                  perm: 'W',     valueSize: 0 },
  0x0033: { name: 'Host BLE MAC Address',                                  perm: 'R',     valueSize: 7 },
  0x0034: { name: 'Headphone and Case Connection Status',                  perm: 'R',     valueSize: 1 },
  0x0035: { name: 'Headphone and Dongle Connection Status',                perm: 'R',     valueSize: 1 },
  0x0036: { name: 'Headphone and Smart Transmitter Connection Status',     perm: 'R',     valueSize: 1 },
  0x0037: { name: 'Water Ejection',                                        perm: 'R/W',   valueSize: 1 },
  0x0038: { name: 'Smart Transmitter Serial Number',                       perm: 'R',     maxSize: 64 },
  0x0039: { name: 'Host Name Paired to BT Device',                        perm: 'R/N' },
  0x003A: { name: 'Authenticate Mode',                                     perm: 'W',     valueSize: 1 },
  0x003B: { name: 'Authenticate Button is Pressed',                        perm: 'N',     valueSize: 0 },
  0x003C: { name: 'Full Firmware Version',                                 perm: 'R',     maxSize: 128 },
  0x003D: { name: 'Audio Signal Detect',                                   perm: 'R',     valueSize: 1 },
  0x003E: { name: 'Authenticate Device',                                   perm: 'W/N' },
  0x003F: { name: 'Dongle State',                                          perm: 'R',     valueSize: 1 },
  0x0040: { name: 'Spatial Sound Availability',                            perm: 'R',     valueSize: 1 },
  0x0041: { name: 'Message CRC16',                                         perm: 'R/W',   valueSize: 2 },
  0x0042: { name: 'Secondary Device Factory Reset',                        perm: 'W',     valueSize: 0 },
  0x0043: { name: 'App Active Heartbeat Initiate Sending from App',        perm: 'N',     valueSize: 0 },
  0x0044: { name: 'Custom Data',                                           perm: 'R/W' },
  0x0045: { name: 'Primary Device Power State',                            perm: 'R',     valueSize: 1 },
  0x0046: { name: 'Device BT MAC Address CRC16',                           perm: 'R',     valueSize: 2 },
  0x0047: { name: 'Secondary Device BT MAC Address CRC16',                 perm: 'R',     valueSize: 2 },
  0x0048: { name: 'Smart Transmitter Audio Streaming Supported',           perm: 'W',     valueSize: 1 },
  0x0049: { name: 'Ambient Sound Control',                                 perm: 'R/W',   valueSize: 1 },
  0x004A: { name: 'Authentication Algorithm',                              perm: 'W',     valueSize: 1 },
  0x004B: { name: 'Advanced Authenticate Device',                          perm: 'W' },
  0x004C: { name: 'Individual Max Volume Limit Query',                     perm: 'Q',     valueSize: 1 },
  0x004D: { name: 'Individual Max Volume Limit',                           perm: 'W/N',   valueSize: 2 },
  0x004E: { name: 'Default Volume',                                        perm: 'R/W',   valueSize: 1 },
  0x004F: { name: 'Manual Power On',                                       perm: 'W/N',   valueSize: 0 },
  // ── OTA Group [0x0B00, 0x0B3F] ─────────────────────────────────────────────
  0x0B00: { name: 'OTA Device Internal MTU',                               perm: 'R',     valueSize: 2 },
  0x0B01: { name: 'OTA Continuous Packets Maximum Count',                  perm: 'R',     valueSize: 1 },
  0x0B02: { name: 'OTA MTU Between App and Device',                        perm: 'R',     valueSize: 2 },
  0x0B03: { name: 'OTA Continuous Packets Minimal Transmission Interval (ms)', perm: 'R', valueSize: 2 },
  0x0B04: { name: 'OTA Upgrade Components',                                perm: 'W',     valueSize: 1 },
  // ── EQ Group [0x0E00, 0x0EFF] ──────────────────────────────────────────────
  0x0E01: { name: 'EQ Info Query',                                         perm: 'Q',     valueSize: 1 },
  0x0E02: { name: 'EQ Info',                                               perm: 'W/N' },
  0x0E03: { name: 'EQ Sequence',                                           perm: 'R/W' },
  0x0E7E: { name: 'Get Design EQ Raw Data',                                perm: 'R' },
  0x0E7F: { name: 'EQ Curve',                                              perm: 'W' },
  0x0E80: { name: 'Dynamic EQ',                                            perm: 'R/W',   valueSize: 1 },
  0x0E81: { name: 'Custom EQ Count on App',                                perm: 'R/W',   valueSize: 2 },
  // ── Lighting Group [0x0D00, 0x0DFF] ────────────────────────────────────────
  0x0D00: { name: 'Lighting Status',                                       perm: 'R/W',   valueSize: 1 },
  0x0D01: { name: 'Lighting Info Query',                                   perm: 'Q',     valueSize: 1 },
  0x0D02: { name: 'Lighting Info',                                         perm: 'W/N' },
  0x0D03: { name: 'Lighting Info 2 Query',                                 perm: 'Q',     valueSize: 1 },
  0x0D04: { name: 'Lighting Info 2',                                       perm: 'W/N' },
  0x0D40: { name: 'Lighting Effect ID',                                    perm: 'R/W',   valueSize: 1 },
  0x0D41: { name: 'Lighting Brightness',                                   perm: 'R/W',   valueSize: 1 },
  0x0D42: { name: 'Lighting Temperature',                                  perm: 'R/W',   valueSize: 1 },
  0x0D43: { name: 'Lighting Speed',                                        perm: 'R/W',   valueSize: 1 },
  0x0D44: { name: 'Lighting Effect List for Shuffle',                      perm: 'R/W',   maxSize: 32 },
  0x0D45: { name: 'BassBoost Light State',                                 perm: 'R/W',   valueSize: 1 },
  0x0D46: { name: 'Lighting Color ID',                                     perm: 'R/W',   valueSize: 1 },
  0x0D47: { name: 'Lighting Custom Color',                                 perm: 'R/W',   valueSize: 3 },
  0x0D48: { name: 'Lighting Loop Info',                                    perm: 'R/W',   valueSize: 1 },
  0x0D4B: { name: 'Lighting Group ID List',                                perm: 'R/W' },
  0x0D60: { name: 'Lighting Effect Reset',                                 perm: 'W',     valueSize: 0 },
  0x0D61: { name: 'Lighting Sunset Mode',                                  perm: 'R/W',   valueSize: 5 },
  0x0D62: { name: 'Charging Light State',                                  perm: 'R/W',   valueSize: 1 },
  // ── Headphone Misc Group [0x1000, 0x1CFF] ──────────────────────────────────
  0x1000: { name: 'TWS Info',                                              perm: 'R',     valueSize: 1 },
  0x1002: { name: 'In Ear Status',                                         perm: 'R',     valueSize: 1 },
  0x1003: { name: 'Sealing Test',                                          perm: 'W',     valueSize: 1 },
  0x1004: { name: 'Environment Noise Check',                               perm: 'R',     valueSize: 1 },
  0x1005: { name: 'Ear Tips',                                              perm: 'R/W',   valueSize: 1 },
  0x1007: { name: 'Sports Mode',                                           perm: 'R/W',   valueSize: 1 },
  0x1008: { name: 'Total Playback Time',                                   perm: 'R',     valueSize: 4 },
  0x1009: { name: 'Total Power on Time',                                   perm: 'R',     valueSize: 4 },
  0x100A: { name: 'Find My Buds Status',                                   perm: 'R/W',   valueSize: 1 },
  0x100B: { name: 'Call Status',                                           perm: 'R',     valueSize: 1 },
  0x100C: { name: 'Auto Pickup Call',                                      perm: 'R/W',   valueSize: 1 },
  0x100D: { name: 'Private Call Mode',                                     perm: 'R/W',   valueSize: 2 },
  0x100E: { name: 'Dongle Firmware Version',                               perm: 'R',     valueSize: 3 },
  0x100F: { name: 'Smart Switch (Smart Audio & Video)',                    perm: 'R/W',   valueSize: 8 },
  0x1010: { name: 'Call Control',                                          perm: 'R/W',   valueSize: 1 },
  0x1011: { name: 'Call Volume Setting',                                   perm: 'R/W',   valueSize: 1 },
  0x1012: { name: 'Call Phone Name',                                       perm: 'R' },
  0x1013: { name: 'Call Phone Number',                                     perm: 'R' },
  0x1014: { name: 'Call Duration',                                         perm: 'R',     valueSize: 4 },
  0x1015: { name: 'Call Beam Forming',                                     perm: 'R/W',   valueSize: 1 },
  // ── Party Group [0x2C00, 0x2CFF] ───────────────────────────────────────────
  0x2C00: { name: 'Party Status',                                          perm: 'R/W',   valueSize: 1 },
  0x2C01: { name: 'Party Group Type',                                      perm: 'R/W',   valueSize: 1 },
  0x2C02: { name: 'TWS Stereo Connection Status',                          perm: 'R/N',   valueSize: 1 },
  0x2C03: { name: 'Party Role',                                            perm: 'R/W',   valueSize: 1 },
  0x2C04: { name: 'Party Channel Type',                                    perm: 'R/W',   valueSize: 1 },
  0x2C05: { name: 'Party Group Name',                                      perm: 'R/W' },
  0x2C06: { name: 'Party Group ID',                                        perm: 'R/W',   valueSize: 4 },
  0x2C07: { name: 'Party Group Action',                                    perm: 'W',     valueSize: 1 },
  0x2C80: { name: 'Long Lasting Stereo Connection Status',                 perm: 'R/N',   valueSize: 1 },
  0x2C81: { name: 'Long Lasting Stereo Partner BT MAC Address',            perm: 'R',     valueSize: 6 },
  0x2C82: { name: 'Long Lasting Stereo Timeout',                           perm: 'R/W',   valueSize: 1 },
  // ── Audio Group [0x2D40, 0x2D7F] ───────────────────────────────────────────
  0x2D40: { name: 'Audio Operation',                                       perm: 'W',     valueSize: 1 },
  0x2D41: { name: 'Audio Mute Status',                                     perm: 'R/W',   valueSize: 1 },
  0x2D42: { name: 'Audio Volume',                                          perm: 'R/W',   valueSize: 1 },
  0x2D43: { name: 'Song Name',                                             perm: 'R' },
  0x2D44: { name: 'Artist Name',                                           perm: 'R' },
  0x2D45: { name: 'Song Lyric',                                            perm: 'W' },
  0x2D46: { name: 'Audio Codec Setting',                                   perm: 'R/W',   valueSize: 1 },
  0x2D60: { name: 'Current FM Radio Station Frequency',                    perm: 'R/W',   valueSize: 4 },
  0x2D61: { name: 'Current DAB Radio Station ID',                          perm: 'R/W',   valueSize: 4 },
  0x2D62: { name: 'Current Station Name',                                  perm: 'R' },
  // ── Karaoke Group [0x2D00, 0x2D3F] ─────────────────────────────────────────
  0x2D00: { name: 'Karaoke Bass',                                          perm: 'R/W',   valueSize: 1 },
  0x2D01: { name: 'Karaoke Treble',                                        perm: 'R/W',   valueSize: 1 },
  0x2D02: { name: 'Karaoke Echo',                                          perm: 'R/W',   valueSize: 1 },
  // ── Portable Misc Group [0x2000, 0x2AFF] ───────────────────────────────────
  0x2004: { name: 'Harman Auracast Mode',                                  perm: 'R/W',   valueSize: 1 },
  0x2005: { name: 'Harman Auracast Standard Quality',                      perm: 'R/W',   valueSize: 1 },
  0x2006: { name: 'Playtime Boost',                                        perm: 'R/W',   valueSize: 1 },
  0x2007: { name: 'Mood Sound',                                            perm: 'R/W',   valueSize: 1 },
  0x2008: { name: 'Power On/Off Sync',                                    perm: 'R/W',   valueSize: 1 },
  0x2009: { name: 'Bass Boost',                                            perm: 'R/W',   valueSize: 1 },
  0x200A: { name: 'USB Status',                                            perm: 'R/N',   valueSize: 1 },
  0x200B: { name: 'AI Vocal Removal',                                      perm: 'R/W',   valueSize: 1 },
  0x200C: { name: 'Guitar Volume',                                         perm: 'R/W',   valueSize: 1 },
  0x200D: { name: 'Speaker Volume Sync Status',                            perm: 'R',     valueSize: 1 },
  0x200E: { name: 'User EQ Status',                                        perm: 'R',     valueSize: 1 },
  0x2011: { name: 'Identify Device',                                       perm: 'R/W',   valueSize: 1 },
  0x2012: { name: 'Knob Menu Reset Time',                                  perm: 'R/W',   valueSize: 1 },
  0x2013: { name: 'Hotel Mode Status',                                     perm: 'R/W',   valueSize: 1 },
  0x2014: { name: 'Top Panel Lock',                                        perm: 'R/W',   valueSize: 1 },
  0x2015: { name: 'USB-C Port Working Mode',                               perm: 'R/W',   valueSize: 1 },
  0x204D: { name: 'Wireless Pairing Management',                           perm: 'R/W',   valueSize: 1 },
  // ── Battery Group [0x2E00, 0x2EFF] ─────────────────────────────────────────
  0x2E00: { name: 'Battery ID',                                            perm: 'R',     maxSize: 16 },
  0x2E01: { name: 'Battery Remaining Playtime',                            perm: 'R',     valueSize: 2 },
  0x2E02: { name: 'Battery Temperature Max',                               perm: 'R',     valueSize: 2 },
  0x2E03: { name: 'Battery Remaining Capacity',                            perm: 'R',     valueSize: 2 },
  0x2E04: { name: 'Battery Full Charge Capacity',                          perm: 'R',     valueSize: 2 },
  0x2E05: { name: 'Battery Design Capacity',                               perm: 'R',     valueSize: 2 },
  0x2E06: { name: 'Battery Charge Cycle Count',                            perm: 'R',     valueSize: 2 },
  0x2E07: { name: 'Battery State of Health',                               perm: 'R',     valueSize: 1 },
  0x2E08: { name: 'Battery Charging Status',                               perm: 'R',     valueSize: 1 },
  0x2E09: { name: 'Battery Health Notification',                           perm: 'R',     valueSize: 1 },
  0x2E0A: { name: 'Battery Total Power on Duration',                       perm: 'R',     valueSize: 4 },
  0x2E0B: { name: 'Battery Total Playback Time Duration',                  perm: 'R',     valueSize: 4 },
}

// Feature group ranges
export const FEATURE_GROUP_RANGES = [
  { name: 'Common',                start: 0x0000, end: 0x0AFF },
  { name: 'OTA',                   start: 0x0B00, end: 0x0B3F },
  { name: 'AI',                    start: 0x0B40, end: 0x0B7F },
  { name: 'LE Audio',              start: 0x0B80, end: 0x0BBF },
  { name: 'Mic',                   start: 0x0C00, end: 0x0C3F },
  { name: 'Voice Prompt',          start: 0x0C40, end: 0x0C7F },
  { name: 'PSAP',                  start: 0x0C80, end: 0x0CAF },
  { name: 'Sleep',                 start: 0x0CB0, end: 0x0CFF },
  { name: 'Lighting',              start: 0x0D00, end: 0x0DFF },
  { name: 'EQ',                    start: 0x0E00, end: 0x0EFF },
  { name: 'Gesture',               start: 0x0F00, end: 0x0FFF },
  { name: 'Headphone Misc',        start: 0x1000, end: 0x1CFF },
  { name: 'Head Tracking',         start: 0x1D00, end: 0x1D3F },
  { name: 'Personi-Fi',            start: 0x1E00, end: 0x1E3F },
  { name: 'Safe Listening',        start: 0x1E80, end: 0x1EBF },
  { name: 'Case',                  start: 0x1F00, end: 0x1FFF },
  { name: 'Portable Misc',         start: 0x2000, end: 0x2AFF },
  { name: 'Bluetooth Assistant',   start: 0x2B00, end: 0x2BFF },
  { name: 'Party',                 start: 0x2C00, end: 0x2CFF },
  { name: 'Karaoke',               start: 0x2D00, end: 0x2D3F },
  { name: 'Audio',                 start: 0x2D40, end: 0x2D7F },
  { name: 'DJ Effect',             start: 0x2D80, end: 0x2DAF },
  { name: 'Radio',                 start: 0x2DB0, end: 0x2DFF },
  { name: 'Battery',               start: 0x2E00, end: 0x2EFF },
  { name: 'Party Light',           start: 0x2F00, end: 0x2FFF },
  { name: 'BandBox',               start: 0x3000, end: 0x3FFF },
  { name: 'Tunning Tool',          start: 0x4000, end: 0x4FFF },
]

export function getFeatureGroup(featureId) {
  for (const g of FEATURE_GROUP_RANGES) {
    if (featureId >= g.start && featureId <= g.end) return g.name
  }
  return 'Unknown'
}

// Color ID table
export const COLOR_ID_MAP = {
  0x00: 'Black',         0x01: 'White',           0x02: 'Blue',            0x03: 'Red',
  0x04: 'Green',         0x05: 'Purple',          0x06: 'Gold Silver',     0x07: 'Silver',
  0x08: 'Grey',          0x09: 'Beige',           0x0A: 'Pink',            0x0B: 'Chrome',
  0x0C: 'Rose Gold',     0x0D: 'Coral',           0x0E: 'Ghost Black',     0x0F: 'Ghost Purple',
  0x10: 'Ghost White',   0x11: 'Mint',            0x12: 'Black TomorrowLand', 0x13: 'Champaign Gold',
  0x14: 'Brown',         0x15: 'Square Black',    0x16: 'Square White',    0x17: 'Square Brown',
  0x18: 'Yellow',        0x19: 'Rose',            0x1A: 'Squad (Camo)',    0x1B: 'Turquoise',
  0x1C: 'Peach Orange',  0x1D: 'Black Gray',      0x1E: 'Black Lime',      0x1F: 'Orange',
  0x20: 'Copper',        0x21: 'Cyan',            0x22: 'Red Blue',        0x23: 'Blue Green',
  0x24: 'Blue Pink',     0x25: 'Teal',            0x26: 'Gun Metal',       0x27: 'Lime',
}

// Audio Source table
export const AUDIO_SOURCE_MAP = {
  0x00: 'None',       0x01: 'BT',         0x02: 'AUX',          0x03: 'USB Flash Disk',
  0x04: 'Optical',    0x05: 'FM Radio',   0x06: 'DAB Radio',    0x07: 'UAC',
  0x08: 'RCA',        0x09: 'A2B',        0x0A: 'Coaxial',      0x0B: '2.4G',
  0x0C: 'Looper',     0x0D: 'HDMI',       0x0E: 'PartyTogether',
}

// Host Type table
export const HOST_TYPE_MAP = {
  0x01: 'Android',  0x02: 'iOS',  0x03: 'Dongle',  0x04: 'Soundbar',
}

// Status code tables
export const PROTOCOL_STATUS_ID = {
  0x01: 'First Timeout',          0x02: 'Second Timeout',
  0x03: 'Packet Missing',         0x04: 'Unknown Identifier',
  0x05: 'Unsupported Version',    0x06: 'Unsupported Command ID',
  0x07: 'Wrong Packet Count',     0x08: 'Wrong Packet Index',
  0xFF: 'General Error',
}

export const BUSINESS_STATUS_ID = {
  0x01: 'Already In OTA',                  0x02: 'Battery Low',
  0x03: 'Busy In Call',                    0x04: 'Busy In Audio Streaming',
  0x05: 'Busy In AI',                      0x06: 'Signature Verification Failed',
  0x07: 'Wrong Password',                  0x08: 'Unsupported OTA Package Version',
  0x09: 'TWS In Mono Mode',               0x0E: 'Busy In Erasing',
  0x0F: 'Dongle and Headset Disconnected', 0xFF: 'General Error',
}

// BLE Legacy Service Data mask bit definitions (bit15 → bit0 order)
export const MASK_BIT_DEFS = [
  { bit: 15, name: 'colorId',           size: 1 },
  { bit: 14, name: 'srcName1CRC16',     size: 2 },
  { bit: 13, name: 'srcName2CRC16',     size: 2 },
  { bit: 12, name: 'btMacCRC16',        size: 2 },
  { bit: 11, name: 'macAddress',        size: 6 },
  { bit: 10, name: 'batteryInfo',       size: 1 },
  { bit: 9,  name: 'deviceMiscInfo',    size: 2 },
  { bit: 8,  name: 'partyMethodInfo',   size: 1 },
  { bit: 7,  name: 'partyInfo',         size: 2 },
  { bit: 6,  name: 'stereoGroupId',     size: 1 },
  { bit: 5,  name: 'firmwareVersion3B', size: 3 },
  { bit: 4,  name: 'deviceId',          size: 3 },
  { bit: 3,  name: 'partyLightInfo',    size: 2 },
  { bit: 2,  name: 'firmwareVersion5B', size: 5 },
  { bit: 1,  name: 'deviceMiscInfo2',   size: 2 },
  { bit: 0,  name: 'reserved',          size: 0 },
]

// Extended Service Data type definitions
export const SERVICE_DATA_TYPE_MAP = {
  0x01: { name: 'Color ID',               size: 1 },
  0x02: { name: 'SrcName1 CRC16',         size: 2 },
  0x03: { name: 'SrcName2 CRC16',         size: 2 },
  0x04: { name: 'BT MAC Address CRC16',   size: 2 },
  0x05: { name: 'BT MAC Address',         size: 6 },
  0x06: { name: 'Battery Level',          size: 1 },
  0x07: { name: 'Device Misc Info',       size: 2 },
  0x08: { name: 'Party Method Info',      size: 1 },
  0x09: { name: 'Party Info',             size: 2 },
  0x0A: { name: 'Stereo Group ID',        size: 1 },
  0x0B: { name: 'Firmware Version (3B)',  size: 3 },
  0x0C: { name: 'Device ID',              size: 3 },
  0x0D: { name: 'Party Light Info',       size: 2 },
  0x0E: { name: 'Firmware Version (5B)',  size: 5 },
  0x0F: { name: 'Device Misc Info 2',     size: 2 },
}

// Sample data — sourced from protocol spec v5.0.10 examples + hand-crafted verification cases
export const SAMPLE_DATA = [
  // ── 4.1.1 GET Command (p.17) ─────────────────────────────────────────────
  {
    label: 'GET Request — MTU + Product ID',
    hex: 'DD 00 01 00 01 00 04 00 01 00 04 00',
    desc: 'App → Device: Get featureId 0x0001 (MTU) and 0x0004 (Product ID). Payload = two 2-byte feature IDs.'
  },
  {
    label: 'GET Response — Product ID = 0x8001',
    hex: '00 DD 01 00 01 00 0C 00 00 00 04 00 02 00 01 80',
    desc: 'Device → App: status=0x0000, featureId=0x0004, valueSize=2, value=0x8001 (LE).'
  },
  // ── 4.1.2 SET Command (p.18) ─────────────────────────────────────────────
  {
    label: 'SET Request — ANC On',
    hex: 'DD 00 02 00 01 00 05 00 18 00 01 00 80',
    desc: 'App → Device: featureId=0x0018(ANC), valueSize=1, value=0x80 (bit7=1 On, level=0).'
  },
  {
    label: 'SET ACK — Success',
    hex: 'DD 00 02 00 01 00 02 00 00 00',
    desc: 'Device → App: SET ACK, statusCode=0x0000 (success).'
  },
  {
    label: 'SET ACK — General Error',
    hex: 'DD 00 02 00 01 00 02 00 FF 80',
    desc: 'Device → App: SET ACK, statusCode=0x80FF (error, protocol category, general error).'
  },
  // ── 4.1.3 Notification Device→App (p.19) ─────────────────────────────────
  {
    label: 'Notification — Battery 100%',
    hex: '00 DD 03 00 01 00 08 00 00 00 0D 00 01 00 64',
    desc: 'Device → App (0x0003): status=0x0000, featureId=0x000D, valueSize=1, value=0x64 (100%, not charging).'
  },
  {
    label: 'Notification — ANC Status',
    hex: '00 DD 03 00 01 00 08 00 00 00 18 00 01 00 80',
    desc: 'Device → App: status=0x0000, featureId=0x0018(ANC), valueSize=1, value=0x80 (On, level=0).'
  },
  {
    label: 'Notification — App→Device (0x0004)',
    hex: '00 DD 04 00 01 00 08 00 00 00 0D 00 01 00 40',
    desc: 'App → Device (0x0004): status=0x0000, featureId=0x000D, valueSize=1, value=0x40 (64%, not charging).'
  },
  // ── 4.1.4 Multi-packet Notification example (p.20) ───────────────────────
  // Packet 1: status + Feature1(size=2,val=AABB) + Feature2 header + first 108 bytes of value
  // Feature2 valueSize=228(0x00E4); total payload1 = 2+2+2+2+2+2+108 = 120 bytes
  {
    label: 'Multi-packet Notification — Packet 1/2',
    hex: '00 DD 03 00 02 00 78 00'
       + ' 00 00'                     // status = success
       + ' 12 00 02 00 AB CD'          // featureId=0x0012(AutoPowerOff), size=2, val=0xCDAB (on, 11179s)
       + ' 3C 00 E4 00'               // featureId=0x003C(Full FW Version), size=228
       + ' 4D 61 69 6E 3A 31 2E 31 2E 30 2C 20 49 43 31 3A 31 2E 30 2E 31 2C 20 49 43 32 3A 31 2E 30 2E 32 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00',
    desc: 'Packet 1 of 2: packetCount=2, packetIndex=0. Contains AutoPowerOff feature + start of Full FW Version (108 of 228 bytes).'
  },
  {
    label: 'Multi-packet Notification — Packet 2/2',
    hex: '00 DD 03 00 02 01 78 00'
       + ' 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00',
    desc: 'Packet 2 of 2: packetCount=2, packetIndex=1. Continuation (remaining 120 bytes of Full FW Version value).'
  },
  // ── 4.2 OTA Commands (p.22–25) ───────────────────────────────────────────
  {
    label: 'Start OTA Request',
    hex: 'DD 00 01 01 01 00 00 00',
    desc: 'App → Device: commandId=0x0101(Start OTA), payloadLength=0, no payload.'
  },
  {
    label: 'Send OTA Data',
    hex: 'DD 00 02 01 01 00 08 00 00 00 00 00 DE AD BE EF',
    desc: 'App → Device: commandId=0x0102, absoluteOffset=0x00000000, OTA data=DE AD BE EF.'
  },
  {
    label: 'Stop OTA Request',
    hex: 'DD 00 03 01 01 00 00 00',
    desc: 'App → Device: commandId=0x0103(Stop OTA), payloadLength=0.'
  },
  {
    label: 'OTA Notification — 10.50% progress',
    hex: '00 DD 04 01 01 00 0C 00 00 00 1A 04 00 00 00 00 00 00 00 10',
    desc: 'Device → App: commandId=0x0104, status=0x0000, percentage=1050 (10.50%), absoluteOffset=0, lengthToRead=0x00100000.'
  },
  {
    label: 'OTA Notification — 100% complete',
    hex: '00 DD 04 01 01 00 0C 00 00 00 10 27 00 00 00 00 00 00 00 00',
    desc: 'Device → App: percentage=10000 (100.00%), lengthToRead=0 → all data received, device will reboot.'
  },
  {
    label: 'OTA Notification — First Timeout',
    hex: '00 DD 04 01 01 00 0C 00 01 81 00 00 00 00 00 00 00 00 00 00',
    desc: 'Device → App: statusCode=0x8101 (Protocol category, First Timeout).'
  },
  // ── 2.1.1 Legacy BLE Service Data (p.7) ──────────────────────────────────
  {
    label: 'BLE Legacy Service Data — ColorID + BT MAC CRC (Mask=0x9000)',
    hex: 'A3 20 00 90 08 AB CD',
    desc: 'PID=0x20A3, Mask=0x9000 (bit15=ColorID, bit12=BT MAC CRC16). Data: colorId=0x08(Grey), macCRC=0xCDAB.'
  },
  {
    label: 'BLE Legacy Service Data — ColorID + 2×SrcName CRC + BT MAC CRC (Mask=0xF000)',
    hex: 'A3 20 00 F0 08 12 34 56 78 AB CD',
    desc: 'PID=0x20A3, Mask=0xF000 (bit15..12). Data: colorId=0x08, srcName1CRC=0x3412, srcName2CRC=0x7856, macCRC=0xCDAB.'
  },
  // ── 2.1.2 Extended BLE Service Data (p.8) ────────────────────────────────
  {
    label: 'BLE Extended Service Data — ColorID + Battery',
    hex: 'A3 20 02 01 08 02 06 64',
    desc: 'PID=0x20A3. Entry1: len=2,type=0x01(ColorID),val=0x08(Grey). Entry2: len=2,type=0x06(Battery),val=0x64(100%,not charging).'
  },
  // ── BLE AD Structure wrapper (p.6) ───────────────────────────────────────
  {
    label: 'BLE AD Structure — Extended Service Data',
    hex: '09 16 DF FD A3 20 02 01 08 02 06 64',
    desc: 'AD length=9, type=0x16, UUID=0xFDDF(Harman). Service data: PID=0x20A3, ColorID=Grey, Battery=100%.'
  },
]
