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
        <button class="btn-action lang-btn" @click="toggleLocale" :title="locale === 'en' ? '切换为中文' : 'Switch to English'">
          {{ locale === 'en' ? '中文' : 'EN' }}
        </button>
        <button class="btn-tag" @click="toggleEndian" :title="'Current: ' + endian">
          <span class="tag-dot"></span>
          {{ endian === 'LE' ? t('leLabel') : t('beLabel') }}
        </button>
        <button class="btn-action theme-btn" @click="toggleTheme" :title="theme === 'dark' ? t('switchToLight') : t('switchToDark')">
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="5" fill="currentColor"/><path fill="currentColor" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <svg v-else viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          {{ theme === 'dark' ? t('light') : t('dark') }}
        </button>
        <div class="dropdown-wrap">
          <button class="btn-action" @click="showSamples = !showSamples">
            <svg viewBox="0 0 16 16" width="13" height="13"><path fill="currentColor" d="M3 2h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 2v8h8V4H4zm1 1h6v1H5zm0 2h4v1H5z"/></svg>
            {{ t('sampleData') }}
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
            {{ t('protocolRef') }}
            <svg viewBox="0 0 10 6" width="8" height="8"><path fill="currentColor" d="M0 0l5 6 5-6z"/></svg>
          </button>
          <div v-if="showRef" class="dropdown-menu ref-menu" @mouseleave="showRef = false">
            <div class="ref-section">
              <div class="ref-title">{{ t('refIdentifier') }}</div>
              <div class="ref-row"><code>0xDD00</code> {{ t('refPrimary') }}</div>
              <div class="ref-row"><code>0xDD01</code> {{ t('refSecondary') }}</div>
            </div>
            <div class="ref-section">
              <div class="ref-title">{{ t('refCommandIDs') }}</div>
              <div class="ref-row" v-for="(v, k) in COMMAND_ID_MAP_REF" :key="k">
                <code>{{ k }}</code> {{ v }}
              </div>
            </div>
            <div class="ref-section">
              <div class="ref-title">{{ t('refFeatureGroups') }}</div>
              <div class="ref-row">{{ t('refCommon') }}: <code>0x0000–0x0AFF</code></div>
              <div class="ref-row">OTA: <code>0x0B00–0x0B3F</code></div>
              <div class="ref-row">EQ: <code>0x0E00–0x0EFF</code></div>
              <div class="ref-row">{{ t('refBattery') }}: <code>0x2E00–0x2EFF</code></div>
            </div>
          </div>
        </div>
        <div class="dropdown-wrap">
          <button class="btn-action" @click="showFidDict = !showFidDict">
            <svg viewBox="0 0 16 16" width="13" height="13"><path fill="currentColor" d="M3 2v12h10V2H3zm1 1h8v10H4V3zm1 1v1h6V4H5zm0 2v1h6V6H5zm0 2v1h4V8H5z"/></svg>
            {{ t('featureIdDictionary') }}
            <svg viewBox="0 0 10 6" width="8" height="8"><path fill="currentColor" d="M0 0l5 6 5-6z"/></svg>
          </button>
          <div v-if="showFidDict" class="dropdown-menu fid-menu" @mouseleave="showFidDict = false">
            <div class="fid-search-wrap">
              <input 
                v-model="fidSearchQuery" 
                class="fid-search-input" 
                :placeholder="t('searchPlaceholder')"
                @click.stop
              />
            </div>
            <div class="fid-table-container">
              <table class="fid-table">
                <thead>
                  <tr>
                    <th>FID</th>
                    <th>Description</th>
                    <th>FID</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, idx) in filteredFidRows" :key="idx">
                    <td class="fid-cell-id"><code>{{ row[0]?.id }}</code></td>
                    <td class="fid-cell-name">{{ row[0]?.name }}</td>
                    <td class="fid-cell-id" v-if="row[1]"><code>{{ row[1]?.id }}</code></td>
                    <td class="fid-cell-name" v-if="row[1]">{{ row[1]?.name }}</td>
                    <td v-else colspan="2"></td>
                  </tr>
                  <tr v-if="filteredFidRows.length === 0">
                    <td colspan="4" class="fid-no-results">{{ t('noResults') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main panels -->
    <main class="workspace" :class="{ 'serialize-mode': convertMode === 'serialize' }">
      <!-- HEX Panel -->
      <div class="panel hex-panel" :class="{ active: hexFocused }">
        <div class="panel-header">
          <div class="panel-label">
            <span class="dot hex-dot"></span>
            <span>HEX</span>
          </div>
          <div class="panel-actions">
            <button
              class="panel-btn"
              :class="{ active: showFormatLegend }"
              @click="formatHex"
              :title="t('formatTitle')"
            >
              {{ t('format') }}
            </button>
            <button class="icon-btn" @click="toggleHexSpaces" :title="hexSpaced ? t('removeSpaces') : t('addSpaces')">
              <svg viewBox="0 0 16 16" width="14" height="14">
                <text v-if="hexSpaced"  x="1" y="12" font-size="9" fill="currentColor" font-family="monospace">A B</text>
                <text v-else            x="1" y="12" font-size="9" fill="currentColor" font-family="monospace">AB</text>
              </svg>
            </button>
            <button class="icon-btn" @click="pasteHex" :title="t('paste')">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M5 1h6v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1V1zm1 1v2h4V2H6zm-2 2v9h8V4H4z"/></svg>
            </button>
            <button class="icon-btn" @click="copyHex" :class="{ copied: hexCopied }" :title="t('copy')">
              <svg v-if="!hexCopied" viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 2h8v1H5v9H4V2zm2 2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 1v8h8V5H6z"/></svg>
              <svg v-else viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 8l4 4 8-8-1-1-7 7-3-3z"/></svg>
            </button>
            <button class="icon-btn" @click="clearHex" :title="t('clear')">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 4l8 8-1 1L3 5zm8 0L4 12l-1-1 8-8z"/></svg>
            </button>
          </div>
        </div>
        <div class="panel-body">
          <div v-if="showFormatLegend" class="hex-format-meta">
            <div class="format-blocks">
              <div
                v-for="(blk, idx) in formatBlocks"
                :key="`${blk.kind}-${idx}-${blk.text}`"
                class="format-block"
                :class="[`k-${blk.kind}`, { 'is-hovered': idx === hoveredBlockIdx }]"
                @mouseenter="hoveredBlockIdx = idx"
                @mouseleave="hoveredBlockIdx = -1"
              >
                <span class="blk-hex">{{ blk.text }}</span>
                <span class="blk-label">{{ blk.label || (blk.kind !== 'value' ? blk.kind : '\u00a0') }}</span>
              </div>
            </div>
            <div v-if="maskDetail" class="mask-detail">
              <div class="mask-detail-header">
                mask: <code>{{ formatBlocks.find(b=>b.kind==='mask')?.text }}</code>
                &rarr; LE u16: <code>{{ maskDetailHex }}</code>
              </div>
              <table class="mask-table">
                <thead>
                  <tr>
                    <th>Bit</th>
                    <th>Binary</th>
                    <th>Value</th>
                    <th>Field</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in maskDetail" :key="row.bit" :class="{ 'mask-row-active': row.value === 1 }">
                    <td class="mask-bit">bit {{ row.bit }}</td>
                    <td class="mask-bin"><code>{{ row.bin }}</code></td>
                    <td class="mask-val">{{ row.value }}</td>
                    <td class="mask-name">{{ row.name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <textarea
            v-if="!showFormatLegend"
            v-model="hexInput"
            class="editor hex-editor"
            :placeholder="t('hexPlaceholder')"
            spellcheck="false"
            @focus="hexFocused = true"
            @blur="hexFocused = false"
          />
          <div v-if="hexError" class="error-bar">
            <svg viewBox="0 0 16 16" width="13" height="13"><path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.5h1.5V9h-1.5V4.5zm0 5.5h1.5v1.5h-1.5V10z"/></svg>
            {{ hexError }}
          </div>
          <div v-if="parseSummary" class="parse-summary" :class="`is-${parseSummary.status}`">
            <div class="parse-summary-line">
              <strong>{{ t('parseSummary') }}:</strong>
              <span>{{ parseSummary.message }}</span>
            </div>
            <div class="parse-summary-line">
              <span>{{ t('total') }}: {{ parseSummary.totalBytes }} bytes</span>
              <span>{{ t('parsed') }}: {{ parseSummary.parsedBytes }} bytes</span>
              <span>{{ t('unparsed') }}: {{ parseSummary.unparsedBytes }} bytes</span>
            </div>
            <ul v-if="parseIssues.length" class="parse-issues">
              <li v-for="(issue, idx) in parseIssues" :key="`${issue.code}-${idx}`">
                [{{ issue.severity.toUpperCase() }}] offset {{ issue.offset }}: {{ issue.message }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Middle divider -->
      <div class="divider">
        <button
          class="swap-btn"
          :class="[
            convertMode === 'serialize' ? 'is-serialize' : 'is-deserialize',
            { 'is-animating': swapAnimating }
          ]"
          type="button"
          @click="toggleMode"
          :title="convertMode === 'deserialize' ? t('switchToSerialize') : t('switchToDeserialize')"
          :aria-label="convertMode === 'deserialize' ? t('switchToSerialize') : t('switchToDeserialize')"
        >
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path fill="currentColor" d="M2 6h12l-2.5-2.5 1.1-1.1L17 6.7l-4.4 4.3-1.1-1.1L14 7.4H2V6zm16 8H6l2.5 2.5-1.1 1.1L3 13.3 7.4 9l1.1 1.1L6 12.6h12V14z"/>
          </svg>
        </button>
      </div>

      <!-- JSON Panel -->
      <div class="panel json-panel" :class="{ active: jsonFocused }">
        <div class="panel-header">
          <div class="panel-label">
            <span class="dot json-dot"></span>
            <span>JSON</span>
          </div>
          <div class="panel-actions">
            <button class="icon-btn" @click="compressJson" :title="t('minify')">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 4h12v1H2zm2 3h8v1H4zm1 3h6v1H5z"/></svg>
            </button>
            <button class="icon-btn" @click="expandJson" :title="t('prettyPrint')">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 2h12v2H2zm2 4h8v2H4zm-2 4h12v2H2z"/></svg>
            </button>
            <button class="icon-btn" @click="copyJson" :class="{ copied: jsonCopied }" :title="t('copy')">
              <svg v-if="!jsonCopied" viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 2h8v1H5v9H4V2zm2 2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 1v8h8V5H6z"/></svg>
              <svg v-else viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 8l4 4 8-8-1-1-7 7-3-3z"/></svg>
            </button>
            <button class="icon-btn" @click="clearJson" :title="t('clear')">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 4l8 8-1 1L3 5zm8 0L4 12l-1-1 8-8z"/></svg>
            </button>
          </div>
        </div>
        <div class="panel-body">
          <textarea
            v-model="jsonInput"
            class="editor json-editor"
            :placeholder="t('jsonPlaceholder')"
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
            <span v-if="deviceCard.loading" class="device-status">{{ t('loadingProduct') }}</span>
            <span v-else-if="deviceCard.unresolved" class="device-status warn">{{ t('pidNotFound') }}</span>
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
      <span class="status-hint">
        {{ convertMode === 'deserialize' ? t('modeHintDeserialize') : t('modeHintSerialize') }}
      </span>
      <a class="status-link" href="https://github.com/harman-connected" target="_blank" rel="noopener">HARMAN Connected</a>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { parseHexWithReport, jsonToHex, formatHexByBlocksDetailed } from './utils/protocol.js'
import { SAMPLE_DATA, COMMAND_ID_MAP, MASK_BIT_DEFS, FEATURE_ID_MAP } from './utils/constants.js'

// ── i18n ─────────────────────────────────────────────────────────────────────
const locale = ref(localStorage.getItem('hpc-locale') || 'en')

const messages = {
  en: {
    leLabel: 'LE Little Endian',
    beLabel: 'BE Big Endian',
    switchToLight: 'Switch to Light',
    switchToDark: 'Switch to Dark',
    light: 'Light',
    dark: 'Dark',
    sampleData: 'Sample Data',
    protocolRef: 'Protocol Reference',
    refIdentifier: 'Identifier',
    refPrimary: 'Primary / Standalone Device',
    refSecondary: 'Secondary Device (LLS)',
    refCommandIDs: 'Command IDs',
    refFeatureGroups: 'Feature Groups',
    refCommon: 'Common',
    refBattery: 'Battery',
    format: 'Format',
    formatTitle: 'Format HEX by Protocol Blocks',
    removeSpaces: 'Remove Spaces',
    addSpaces: 'Add Spaces',
    paste: 'Paste',
    copy: 'Copy',
    clear: 'Clear',
    hexPlaceholder: 'Enter hex byte stream, e.g.: DD 00 01 00 01 00 04 00 04 00 06 00',
    parseSummary: 'Parse Summary',
    total: 'Total',
    parsed: 'Parsed',
    unparsed: 'Unparsed',
    switchToSerialize: 'Switch to Serialize (JSON → HEX)',
    switchToDeserialize: 'Switch to Deserialize (HEX → JSON)',
    minify: 'Minify',
    prettyPrint: 'Pretty Print',
    jsonPlaceholder: '{"header": { ... },"payload": { ... }}',
    loadingProduct: 'Loading product info...',
    pidNotFound: 'PID not found in product list',
    modeHintDeserialize: 'Current mode: type HEX to auto-parse JSON',
    modeHintSerialize: 'Current mode: type JSON to auto-generate HEX',
    featureIdDictionary: 'FeatureID Dictionary',
    searchPlaceholder: 'Search ID or description...',
    noResults: 'No results found',
  },
  zh: {
    leLabel: 'LE 小端序',
    beLabel: 'BE 大端序',
    switchToLight: '切换到亮色模式',
    switchToDark: '切换到暗色模式',
    light: '亮色',
    dark: '暗色',
    sampleData: '示例数据',
    protocolRef: '协议参考',
    refIdentifier: '标识符',
    refPrimary: '主设备 / 独立设备',
    refSecondary: '从设备 (LLS)',
    refCommandIDs: '命令 ID',
    refFeatureGroups: '功能分组',
    refCommon: '通用',
    refBattery: '电池',
    format: '格式化',
    formatTitle: '按协议块格式化 HEX',
    removeSpaces: '移除空格',
    addSpaces: '添加空格',
    paste: '粘贴',
    copy: '复制',
    clear: '清除',
    hexPlaceholder: '输入十六进制字节流，例如：DD 00 01 00 01 00 04 00 04 00 06 00',
    parseSummary: '解析摘要',
    total: '总计',
    parsed: '已解析',
    unparsed: '未解析',
    switchToSerialize: '切换到序列化模式 (JSON → HEX)',
    switchToDeserialize: '切换到反序列化模式 (HEX → JSON)',
    minify: '压缩',
    prettyPrint: '格式化',
    jsonPlaceholder: '{"header": { ... },"payload": { ... }}',
    loadingProduct: '加载产品信息中...',
    pidNotFound: '产品列表中未找到该 PID',
    modeHintDeserialize: '当前模式：输入 HEX 自动解析为 JSON',
    modeHintSerialize: '当前模式：输入 JSON 自动生成 HEX',
    featureIdDictionary: 'FeatureID 字典',
    searchPlaceholder: '搜索 ID 或描述...',
    noResults: '未找到结果',
  },
}

function t(key) {
  return messages[locale.value][key] ?? messages.en[key] ?? key
}

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
  localStorage.setItem('hpc-locale', locale.value)
}

// ── State ────────────────────────────────────────────────────────────────────
const theme       = ref(localStorage.getItem('hpc-theme') || 'light')
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
const showFidDict = ref(false)
const fidSearchQuery = ref('')
const lastConversion = ref('')
const convertMode = ref('deserialize') // deserialize: HEX -> JSON, serialize: JSON -> HEX
const swapAnimating = ref(false)
const parseSummary = ref(null)
const parseIssues  = ref([])
const showFormatLegend = ref(false)
const formatLegend = ref([])
const formatBlocks = ref([])
const hoveredBlockIdx = ref(-1)
let   lastSource  = '' // 'hex' | 'json'
let   applyingFormat = false

// ── Linkage logic ────────────────────────────────────────────────────────────
// Find the corresponding featureId in the JSON output from a format block index
const hoveredFeatureId = computed(() => {
  if (hoveredBlockIdx.value === -1 || !showFormatLegend.value) return null
  const blk = formatBlocks.value[hoveredBlockIdx.value]
  if (!blk) return null

  // We look for feature-id or mask kind and find the hex value
  // But more reliably, we know feature-id blocks contain the hex: "43 2D" etc.
  if (blk.kind === 'feature-id') {
    // bytes are LE, e.g. "43 2D" -> 0x2D43
    const bytes = blk.text.split(' ')
    if (bytes.length < 2) return null
    const id = parseInt(bytes[1] + bytes[0], 16)
    return isNaN(id) ? null : '0x' + id.toString(16).toUpperCase().padStart(4, '0')
  }

  // Also support length block to highlight its containing feature object
  if (blk.kind === 'length') {
    // Look backward to find the preceding feature-id block
    for (let i = hoveredBlockIdx.value - 1; i >= 0; i--) {
      const prev = formatBlocks.value[i]
      if (prev.kind === 'feature-id') {
        const bytes = prev.text.split(' ')
        if (bytes.length < 2) break
        const id = parseInt(bytes[1] + bytes[0], 16)
        return isNaN(id) ? null : '0x' + id.toString(16).toUpperCase().padStart(4, '0')
      }
      // Stop if we hit header parts
      if (['identifier', 'command-id', 'mask', 'pid'].includes(prev.kind)) break
    }
  }
  return null
})

watch(hoveredFeatureId, (newId) => {
  if (!newId) return
  const editor = document.querySelector('.json-editor')
  if (!editor) return

  const text = jsonInput.value
  // Look for "featureId": "0xXXXX"
  const searchPattern = `"featureId": "${newId}"`
  const index = text.indexOf(searchPattern)
  if (index === -1) return

  // Find the start and end of the object
  let start = text.lastIndexOf('{', index)
  if (start === -1) start = index
  let end = text.indexOf('}', index)
  if (end === -1) end = index + searchPattern.length
  else end += 1

  // Use a more robust scrolling method
  editor.setSelectionRange(start, end)
  editor.focus()

  const lines = text.substring(0, start).split('\n')
  const lineNum = lines.length
  const totalLines = text.split('\n').length
  
  // Calculate relative position (0 to 1)
  const scrollRatio = (lineNum - 1) / totalLines
  editor.scrollTop = scrollRatio * editor.scrollHeight - (editor.clientHeight / 3)
})

// ── Mask detail ──────────────────────────────────────────────────────────────
const maskDetail = computed(() => {
  const maskBlock = formatBlocks.value.find(b => b.kind === 'mask')
  if (!maskBlock) return null
  // mask bytes are in LE order: swap to get the actual u16 value
  const hex = maskBlock.text.padStart(4, '0')
  const maskVal = parseInt(hex.slice(2, 4) + hex.slice(0, 2), 16)
  if (isNaN(maskVal)) return null
  const binStr = maskVal.toString(2).padStart(16, '0')
  return MASK_BIT_DEFS
    .slice()
    .sort((a, b) => b.bit - a.bit)
    .map(def => ({
      bit: def.bit,
      bin: binStr[15 - def.bit],
      value: (maskVal >> def.bit) & 1,
      name: def.name,
    }))
})

const maskDetailHex = computed(() => {
  const maskBlock = formatBlocks.value.find(b => b.kind === 'mask')
  if (!maskBlock) return ''
  const hex = maskBlock.text.padStart(4, '0')
  const val = parseInt(hex.slice(2, 4) + hex.slice(0, 2), 16)
  return '0x' + val.toString(16).toUpperCase().padStart(4, '0')
})

const filteredFidRows = computed(() => {
  const query = fidSearchQuery.value.toLowerCase()
  const allFids = Object.entries(FEATURE_ID_MAP).map(([id, info]) => ({
    id: `0x${parseInt(id).toString(16).toUpperCase().padStart(4, '0')}`,
    name: info.name
  }))

  const filtered = allFids.filter(f => 
    f.id.toLowerCase().includes(query) || 
    f.name.toLowerCase().includes(query)
  )

  // Chunk into pairs (2-column layout)
  const rows = []
  for (let i = 0; i < filtered.length; i += 2) {
    rows.push([filtered[i], filtered[i + 1]])
  }
  return rows
})

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
  if (convertMode.value !== 'deserialize') return
  if (lastSource === 'json') return

  if (!applyingFormat) {
    showFormatLegend.value = false
    formatLegend.value = []
    formatBlocks.value = []
  }

  clearTimeout(hexTimer)
  if (!val.trim()) {
    hexError.value = ''
    parseSummary.value = null
    parseIssues.value = []
    return
  }
  hexTimer = setTimeout(() => convertHexToJson(val), 200)
})

watch(jsonInput, (val) => {
  if (convertMode.value !== 'serialize') return
  if (lastSource === 'hex') return
  clearTimeout(jsonTimer)
  if (!val.trim()) { jsonError.value = ''; return }
  jsonTimer = setTimeout(() => convertJsonToHex(val), 300)
})

function convertHexToJson(val) {
  lastSource = 'hex'
  try {
    const report = parseHexWithReport(val)
    parseSummary.value = report.summary
    parseIssues.value = report.issues
    const result = report.parsed

    if (!result) { hexError.value = 'Input is empty or invalid'; return }

    hexError.value = report.summary?.status === 'failed'
      ? (report.issues[0]?.message || 'HEX parsing failed')
      : ''

    jsonInput.value = JSON.stringify(result, null, 2)
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

function toggleMode() {
  swapAnimating.value = true
  convertMode.value = convertMode.value === 'deserialize' ? 'serialize' : 'deserialize'
  hexError.value = ''
  jsonError.value = ''
  setTimeout(() => { swapAnimating.value = false }, 260)

  if (convertMode.value === 'deserialize' && hexInput.value.trim()) {
    convertHexToJson(hexInput.value)
    return
  }

  if (convertMode.value === 'serialize' && jsonInput.value.trim()) {
    convertJsonToHex(jsonInput.value)
  }
}

function formatHex() {
  if (showFormatLegend.value) {
    showFormatLegend.value = false
    formatLegend.value = []
    formatBlocks.value = []
    return
  }

  if (!hexInput.value.trim()) return
  try {
    const formatted = formatHexByBlocksDetailed(hexInput.value)
    const visibleBlocks = formatted.blocks.filter(b => b.text)
    const usedKinds = new Set(visibleBlocks.map(b => b.kind))
    applyingFormat = true
    hexInput.value = formatted.formatted
    formatLegend.value = formatted.legend.filter(item => usedKinds.has(item.kind))
    formatBlocks.value = visibleBlocks
    showFormatLegend.value = true
    setTimeout(() => { applyingFormat = false }, 0)
    hexError.value = ''
  } catch (e) {
    applyingFormat = false
    hexError.value = e.message
  }
}

function swapPanels() {
  const tmp = hexInput.value
  hexInput.value  = jsonInput.value
  jsonInput.value = tmp
  hexError.value  = ''
  jsonError.value = ''
}

function clearHex() {
  hexInput.value = ''
  hexError.value = ''
  jsonInput.value = ''
  jsonError.value = ''
  lastConversion.value = ''
  deviceCard.value = null
  parseSummary.value = null
  parseIssues.value = []
  showFormatLegend.value = false
  formatLegend.value = []
  formatBlocks.value = []
}

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
