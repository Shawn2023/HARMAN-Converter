<template>
  <div :class="['app', theme]">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">H</span>
        </div>
        <div class="header-title">
          <span class="title-main">HARMAN Protocol Converter</span>
          <span class="title-sub">v5.0.10 — Binary ↔ JSON</span>
        </div>
      </div>

      <div class="header-actions">
        <button class="btn-tag" @click="toggleEndian" :title="'Current: ' + endian">
          <span class="tag-dot"></span>
          {{ endian === 'LE' ? 'LE 小端' : 'BE 大端' }}
        </button>
        <button class="btn-action" @click="formatHex" title="格式化 HEX 输入">
          <svg viewBox="0 0 16 16" width="13" height="13"><path fill="currentColor" d="M2 2h12v2H2zm0 4h8v2H2zm0 4h10v2H2z"/></svg>
          格式化HEX
        </button>
        <button class="btn-action theme-btn" @click="toggleTheme" :title="theme === 'dark' ? '切换浅色' : '切换深色'">
          <svg v-if="theme === 'dark'" viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.5A5.5 5.5 0 1 1 8 2.5a5.5 5.5 0 0 1 0 11z"/><circle fill="currentColor" cx="8" cy="8" r="3"/></svg>
          <svg v-else viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M6 1a6 6 0 0 0 0 14 6.5 6.5 0 0 1 0-14z"/></svg>
          {{ theme === 'dark' ? 'Light' : 'Dark' }}
        </button>
        <div class="dropdown-wrap">
          <button class="btn-action" @click="showSamples = !showSamples">
            <svg viewBox="0 0 16 16" width="13" height="13"><path fill="currentColor" d="M3 2h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 2v8h8V4H4zm1 1h6v1H5zm0 2h4v1H5z"/></svg>
            示例数据
          </button>
          <div v-if="showSamples" class="dropdown-menu" @mouseleave="showSamples = false">
            <div
              v-for="s in SAMPLE_DATA" :key="s.label"
              class="dropdown-item"
              @click="loadSample(s)"
            >
              <span class="item-label">{{ s.label }}</span>
              <span class="item-desc">{{ s.desc }}</span>
            </div>
          </div>
        </div>
        <div class="dropdown-wrap">
          <button class="btn-action" @click="showRef = !showRef">
            <svg viewBox="0 0 16 16" width="13" height="13"><path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.5h1.5V9h-1.5V4.5zm0 5.5h1.5v1.5h-1.5V10z"/></svg>
            协议参考
            <svg viewBox="0 0 10 6" width="8" height="8"><path fill="currentColor" d="M0 0l5 6 5-6z"/></svg>
          </button>
          <div v-if="showRef" class="dropdown-menu ref-menu" @mouseleave="showRef = false">
            <div class="ref-section">
              <div class="ref-title">Identifier</div>
              <div class="ref-row"><code>0xDD00</code> Primary / Standalone Device</div>
              <div class="ref-row"><code>0xDD01</code> Secondary Device (LLS)</div>
            </div>
            <div class="ref-section">
              <div class="ref-title">Command IDs</div>
              <div class="ref-row" v-for="(v, k) in COMMAND_ID_MAP_REF" :key="k">
                <code>{{ k }}</code> {{ v }}
              </div>
            </div>
            <div class="ref-section">
              <div class="ref-title">Feature Groups</div>
              <div class="ref-row">Common: <code>0x0000–0x0AFF</code></div>
              <div class="ref-row">OTA: <code>0x0B00–0x0B3F</code></div>
              <div class="ref-row">EQ: <code>0x0E00–0x0EFF</code></div>
              <div class="ref-row">Battery: <code>0x2E00–0x2EFF</code></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main panels -->
    <main class="workspace">
      <!-- HEX Panel -->
      <div class="panel" :class="{ active: hexFocused }">
        <div class="panel-header">
          <div class="panel-label">
            <span class="dot hex-dot"></span>
            <span>HEX</span>
          </div>
          <div class="panel-actions">
            <button class="icon-btn" @click="toggleHexSpaces" :title="hexSpaced ? '去除空格' : '添加空格'">
              <svg viewBox="0 0 16 16" width="14" height="14">
                <text v-if="hexSpaced"  x="1" y="12" font-size="9" fill="currentColor" font-family="monospace">A B</text>
                <text v-else            x="1" y="12" font-size="9" fill="currentColor" font-family="monospace">AB</text>
              </svg>
            </button>
            <button class="icon-btn" @click="pasteHex" title="粘贴">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M5 1h6v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1V1zm1 1v2h4V2H6zm-2 2v9h8V4H4z"/></svg>
            </button>
            <button class="icon-btn" @click="copyHex" :class="{ copied: hexCopied }" title="复制">
              <svg v-if="!hexCopied" viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 2h8v1H5v9H4V2zm2 2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 1v8h8V5H6z"/></svg>
              <svg v-else viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 8l4 4 8-8-1-1-7 7-3-3z"/></svg>
            </button>
            <button class="icon-btn" @click="clearHex" title="清空">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 4l8 8-1 1L3 5zm8 0L4 12l-1-1 8-8z"/></svg>
            </button>
          </div>
        </div>
        <div class="panel-body">
          <textarea
            v-model="hexInput"
            class="editor hex-editor"
            :placeholder="'输入十六进制字节流，例如：DD 00 01 00 01 00 04 00 04 00 06 00'"
            spellcheck="false"
            @focus="hexFocused = true"
            @blur="hexFocused = false"
          />
          <div v-if="hexError" class="error-bar">
            <svg viewBox="0 0 16 16" width="13" height="13"><path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.5h1.5V9h-1.5V4.5zm0 5.5h1.5v1.5h-1.5V10z"/></svg>
            {{ hexError }}
          </div>
        </div>
      </div>

      <!-- Middle divider -->
      <div class="divider">
        <div class="divider-dot"></div>
      </div>

      <!-- JSON Panel -->
      <div class="panel" :class="{ active: jsonFocused }">
        <div class="panel-header">
          <div class="panel-label">
            <span class="dot json-dot"></span>
            <span>JSON</span>
          </div>
          <div class="panel-actions">
            <button class="icon-btn" @click="compressJson" title="压缩">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 4h12v1H2zm2 3h8v1H4zm1 3h6v1H5z"/></svg>
            </button>
            <button class="icon-btn" @click="expandJson" title="格式化">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 2h12v2H2zm2 4h8v2H4zm-2 4h12v2H2z"/></svg>
            </button>
            <button class="icon-btn" @click="copyJson" :class="{ copied: jsonCopied }" title="复制">
              <svg v-if="!jsonCopied" viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 2h8v1H5v9H4V2zm2 2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 1v8h8V5H6z"/></svg>
              <svg v-else viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 8l4 4 8-8-1-1-7 7-3-3z"/></svg>
            </button>
            <button class="icon-btn" @click="clearJson" title="清空">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 4l8 8-1 1L3 5zm8 0L4 12l-1-1 8-8z"/></svg>
            </button>
          </div>
        </div>
        <div class="panel-body">
          <textarea
            v-model="jsonInput"
            class="editor json-editor"
            placeholder='{"header": { ... },"payload": { ... }}'
            spellcheck="false"
            @focus="jsonFocused = true"
            @blur="jsonFocused = false"
          />
          <div v-if="jsonError" class="error-bar">
            <svg viewBox="0 0 16 16" width="13" height="13"><path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.5h1.5V9h-1.5V4.5zm0 5.5h1.5v1.5h-1.5V10z"/></svg>
            {{ jsonError }}
          </div>
        </div>
        <!-- Device card for BLE advertisement — outside panel-body so it's always visible -->
        <div v-if="deviceCard" class="device-card">
          <div class="device-img-wrap">
            <img
              v-if="deviceCard.imgUrl && !deviceCard.imgError"
              :src="deviceCard.imgUrl"
              class="device-img"
              alt="device"
              @error="onImgError"
            />
            <div v-else-if="deviceCard.loading" class="device-img-placeholder">⏳</div>
            <div v-else class="device-img-placeholder">🔊</div>
          </div>
          <div class="device-card-info">
            <span v-if="deviceCard.modelName" class="device-model">{{ deviceCard.modelName }}</span>
            <span class="device-pid">PID: {{ deviceCard.pid }}</span>
            <span class="device-color">Color ID: {{ deviceCard.colorId }}</span>
            <span v-if="deviceCard.loading" class="device-status">正在查询产品信息…</span>
            <span v-else-if="deviceCard.unresolved" class="device-status warn">未在产品列表中找到此 PID</span>
            <a v-if="deviceCard.configUrl" :href="deviceCard.configUrl" target="_blank" rel="noopener" class="device-cfg-link">
              📄 model_config.json ↗
            </a>
            <span v-if="deviceCard.configUrl" class="device-cfg-url">{{ deviceCard.configUrl }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Status bar -->
    <footer class="status-bar">
      <span v-if="lastConversion" class="status-ok">
        <svg viewBox="0 0 12 12" width="10" height="10"><path fill="currentColor" d="M1 6l3 3 7-7-1-1-6 6-2-2z"/></svg>
        {{ lastConversion }}
      </span>
      <span class="status-hint">输入 HEX 自动解析为 JSON，输入 JSON 自动生成 HEX</span>
      <a class="status-link" href="https://github.com/harman-connected" target="_blank" rel="noopener">HARMAN Connected</a>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { parseHex, jsonToHex } from './utils/protocol.js'
import { SAMPLE_DATA, COMMAND_ID_MAP } from './utils/constants.js'

// ── State ────────────────────────────────────────────────────────────────────
const theme       = ref(localStorage.getItem('hpc-theme') || 'dark')
const endian      = ref('LE')
const hexInput    = ref('')
const jsonInput   = ref('')
const hexError    = ref('')
const jsonError   = ref('')
const hexFocused  = ref(false)
const jsonFocused = ref(false)
const hexCopied   = ref(false)
const hexSpaced   = ref(true)
const jsonCopied  = ref(false)
const showSamples = ref(false)
const showRef     = ref(false)
const lastConversion = ref('')
let   lastSource  = '' // 'hex' | 'json'

// ── Device card (BLE advertisement) ──────────────────────────────────────────
const deviceCard = ref(null)

// Product list cache: { jbl_one: [...], hk_one: [...] }
const _productListCache = {}
async function fetchProductList(brand) {
  if (_productListCache[brand]) return _productListCache[brand]
  try {
    const file = brand === 'jbl_one'
      ? `${import.meta.env.BASE_URL}product_list_jbl.json`
      : `${import.meta.env.BASE_URL}product_list_hk.json`
    const r = await fetch(file)
    if (!r.ok) return null
    const data = await r.json()
    _productListCache[brand] = data
    return data
  } catch { return null }
}

async function resolveDeviceCard(pidHex, colorIdHex) {
  // pidHex like '0x20A3', colorIdHex like '0x08'
  const pidNum     = parseInt(pidHex, 16)
  const colorNum   = parseInt(colorIdHex, 16)
  const pidStr     = pidNum.toString(16).toUpperCase().padStart(4, '0')
  const colorStr   = colorNum.toString(16).toUpperCase().padStart(2, '0')

  for (const brand of ['jbl_one', 'hk_one']) {
    const data = await fetchProductList(brand)
    if (!data) continue
    const productList = data.product_list ?? data
    const pidKey      = pidNum.toString(16).toLowerCase().padStart(4, '0')
    const entry       = productList[pidKey]
    if (!entry) continue
    const category = entry.category
    const base = `https://appstorage-dev.onecloud.harman.com/${brand}/app_config/dev/${category}/${pidStr.toLowerCase()}`
    return {
      pid:        pidHex,
      colorId:    colorIdHex,
      modelName:  entry.model_name,
      imgUrl:     `${base}/${colorStr}.png`,
      configUrl:  `${base}/model_config.json`,
    }
  }
  return null
}

function onImgError(e) {
  // Mark as error so Vue template can show placeholder instead
  e.target.style.display = 'none'
  if (deviceCard.value) deviceCard.value = { ...deviceCard.value, imgError: true }
}

// For the reference dropdown
const COMMAND_ID_MAP_REF = computed(() => {
  const out = {}
  for (const [k, v] of Object.entries(COMMAND_ID_MAP)) {
    out[`0x${Number(k).toString(16).toUpperCase().padStart(4,'0')}`] = `${v.name} (${v.dir})`
  }
  return out
})

// ── Watchers ─────────────────────────────────────────────────────────────────

let hexTimer = null
let jsonTimer = null

watch(hexInput, (val) => {
  if (lastSource === 'json') return
  clearTimeout(hexTimer)
  if (!val.trim()) { hexError.value = ''; return }
  hexTimer = setTimeout(() => convertHexToJson(val), 200)
})

watch(jsonInput, (val) => {
  if (lastSource === 'hex') return
  clearTimeout(jsonTimer)
  if (!val.trim()) { jsonError.value = ''; return }
  jsonTimer = setTimeout(() => convertJsonToHex(val), 300)
})

function convertHexToJson(val) {
  lastSource = 'hex'
  try {
    const result = parseHex(val)
    if (!result) { hexError.value = 'Input is empty or invalid'; return }
    jsonInput.value = JSON.stringify(result, null, 2)
    hexError.value = ''
    lastConversion.value = `HEX → JSON  (${val.replace(/\s/g,'').length / 2} bytes)`
    // Try to show device card for BLE advertisement
    deviceCard.value = null
    const t = result.type
    if (t === 'BLE_AdvData' || t === 'BLE_Legacy_Service_Data' || t === 'BLE_Extended_Service_Data') {
      const pid = result.pid
      // Legacy: fields.colorId.raw; Extended: fields array with type 0x01
      let colorId = result.fields?.colorId?.raw
      if (!colorId && Array.isArray(result.fields)) {
        const cf = result.fields.find(f => f.type === '0x01')
        if (cf) colorId = '0x' + cf.raw.replace(/\s/g, '')
      }
      if (pid) {
        const pidNum   = parseInt(pid, 16)
        const colorNum = colorId ? parseInt(colorId, 16) : 0
        const pidStr   = pidNum.toString(16).toUpperCase().padStart(4, '0')
        const colorStr = colorNum.toString(16).toUpperCase().padStart(2, '0')
        // Show card immediately with pending state
        deviceCard.value = {
          pid, colorId: colorId || '0x00',
          imgUrl: null, configUrl: null, loading: true,
        }
        // Async: find category from product list to build full URLs
        ;(async () => {
          for (const brand of ['jbl_one', 'hk_one']) {
            const json = await fetchProductList(brand)
            if (!json) continue
            // Structure: { product_list: { "<pid_hex_lower>": { category, model_name, ... } } }
            const list = json.product_list ?? json
            const key  = pidStr.toLowerCase()
            const entry = list[key]
            if (!entry?.category) continue
            const pidLower  = pidStr.toLowerCase()
            const asBase    = `https://appstorage-dev.onecloud.harman.com/${brand}/app_config/dev/${entry.category}/${pidLower}`
            deviceCard.value = {
              pid,
              colorId:    colorId || '0x00',
              modelName:  entry.model_name || '',
              imgUrl:     `${asBase}/${colorStr}.png`,
              configUrl:  `${asBase}/model_config.json`,
              loading:    false,
            }
            return
          }
          deviceCard.value = { ...deviceCard.value, loading: false, unresolved: true }
        })()
      }
    }
  } catch (e) {
    hexError.value = e.message
  } finally {
    setTimeout(() => { lastSource = '' }, 0)
  }
}

function convertJsonToHex(val) {
  lastSource = 'json'
  try {
    const obj = JSON.parse(val)
    const hex = jsonToHex(obj)
    hexInput.value = hex
    jsonError.value = ''
    lastConversion.value = `JSON → HEX  (${hex.replace(/\s/g,'').length / 2} bytes)`
  } catch (e) {
    jsonError.value = e.message
  } finally {
    setTimeout(() => { lastSource = '' }, 0)
  }
}

// ── Actions ──────────────────────────────────────────────────────────────────

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('hpc-theme', theme.value)
}

function toggleEndian() {
  endian.value = endian.value === 'LE' ? 'BE' : 'LE'
}

function formatHex() {
  const clean = hexInput.value.replace(/\s/g, '')
  if (!clean) return
  hexInput.value = clean.match(/.{1,2}/g).join(' ').toUpperCase()
}

function swapPanels() {
  const tmp = hexInput.value
  hexInput.value  = jsonInput.value
  jsonInput.value = tmp
  hexError.value  = ''
  jsonError.value = ''
}

function clearHex() { hexInput.value = ''; hexError.value = ''; lastConversion.value = ''; deviceCard.value = null }

function toggleHexSpaces() {
  const v = hexInput.value
  if (!v.trim()) return
  if (hexSpaced.value) {
    hexInput.value = v.replace(/\s+/g, '')
  } else {
    const clean = v.replace(/\s+/g, '')
    hexInput.value = clean.match(/.{1,2}/g)?.join(' ') ?? v
  }
  hexSpaced.value = !hexSpaced.value
}
function clearJson() { jsonInput.value = ''; jsonError.value = ''; lastConversion.value = '' }

async function copyHex() {
  if (!hexInput.value) return
  await navigator.clipboard.writeText(hexInput.value)
  hexCopied.value = true; setTimeout(() => hexCopied.value = false, 1500)
}

async function copyJson() {
  if (!jsonInput.value) return
  await navigator.clipboard.writeText(jsonInput.value)
  jsonCopied.value = true; setTimeout(() => jsonCopied.value = false, 1500)
}

async function pasteHex() {
  const text = await navigator.clipboard.readText()
  if (text) hexInput.value = text
}

function compressJson() {
  try {
    jsonInput.value = JSON.stringify(JSON.parse(jsonInput.value))
  } catch {}
}

function expandJson() {
  try {
    jsonInput.value = JSON.stringify(JSON.parse(jsonInput.value), null, 2)
  } catch {}
}

function loadSample(s) {
  hexInput.value = s.hex
  showSamples.value = false
  lastSource = ''
  convertHexToJson(s.hex)
}
</script>
