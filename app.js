const baseData = window.INTELLIGENCE_DATA
const liveData = window.CURRENT_BRIEF
const archivedBriefs = window.BRIEF_ARCHIVE || []
const data = liveData ? {
  ...baseData,
  ...liveData,
  meta: { ...baseData.meta, ...liveData.meta },
  channels: baseData.channels.map((channel) => ({
    ...channel,
    ...(liveData.channels || []).find((item) => item.name === channel.name),
  })),
  briefs: liveData.brief
    ? [liveData.brief, ...archivedBriefs.filter((item) => item.id !== liveData.brief.id), ...baseData.briefs.filter((item) => item.id !== liveData.brief.id)]
    : [...archivedBriefs, ...baseData.briefs],
  sourcePolicy: baseData.sourcePolicy,
} : baseData

const state = {
  view: "today",
  previousView: "today",
  filter: "全部",
  query: "",
  saved: new Set(JSON.parse(localStorage.getItem("intel-saved") || "[]")),
  feedback: JSON.parse(localStorage.getItem("intel-feedback") || "{}"),
}

const viewTitles = {
  today: "今天",
  saved: "稍后看",
  channels: "情报频道",
  watchlist: "追踪",
  briefs: "归档",
  sources: "证据来源",
  search: "搜索结果",
}

const $ = (selector, root = document) => root.querySelector(selector)
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector))

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function statusClass(status) {
  if (status === "confirmed" || status === "research") return "confirmed"
  if (status === "emerging") return "emerging"
  return "judgment"
}

function sourceType(item) {
  if (item.type) return item.type
  const text = `${item.label || ""} ${item.url || ""}`
  if (/国家|政府|央行|财政部|统计局|发改委|监管|\.gov|ecb\.europa/.test(text)) return "官方"
  if (/NVIDIA|OpenAI|公司披露|investor\./i.test(text)) return "公司"
  return "独立报道"
}

function changeType(signal) {
  if (signal.changeType) return signal.changeType
  if (signal.status === "emerging") return "弱信号"
  if (signal.status === "judgment") return "观察"
  return "新增"
}

function setStaticContent() {
  $("#pageDate").textContent = data.meta.date
  $("#sidebarMode").textContent = data.meta.dataMode
  $("#dataNote").textContent = data.meta.dataNote
  $("#briefLabel").textContent = data.managerBrief.label
  $("#briefVersion").textContent = data.meta.version
  $("#footerVersion").textContent = data.meta.version
  $("#managerVerdict").textContent = data.managerBrief.verdict
  $("#managerContext").textContent = data.managerBrief.context
  $("[data-view='watchlist'] b").textContent = String(data.watchlist.length).padStart(2, "0")
  $("[data-view='briefs'] b").textContent = String(data.briefs.length).padStart(2, "0")
  $("#savedCount").textContent = String(state.saved.size)
  $$(".sidebar-section [data-channel]").forEach((button) => {
    const channel = data.channels.find((item) => item.name === button.dataset.channel)
    if (channel) $("i", button).textContent = channel.count ? `${channel.count}条` : "暂无"
  })
  const isVerified = data.meta.dataMode === "正式核验"
  $(".data-banner").classList.toggle("verified", isVerified)
  $(".data-badge").textContent = isVerified ? "正式简报" : "演示阶段"
  $(".data-banner strong").textContent = isVerified ? "本期内容已经核验" : "当前页面不是实时新闻"
}

function renderDailyBrief() {
  $("#channelPulse").innerHTML = data.managerBrief.channelStatus.map((item) => `
    <div class="pulse-item">
      <span>${escapeHtml(item.name)}</span>
      <div><strong>${escapeHtml(item.status)}</strong><small>${escapeHtml(item.note)}</small></div>
    </div>
  `).join("")

  $("#mustReadGrid").innerHTML = data.managerBrief.mustRead.map((item, index) => `
    <button type="button" class="must-card ${escapeHtml(item.tone)}" data-open-signal="${escapeHtml(item.signalId || data.signals[index]?.id || "")}">
      <span>${escapeHtml(item.id)}</span>
      <div><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.detail)}</p><small>打开事件与来源 →</small></div>
    </button>
  `).join("")
}

function signalCardMarkup(signal) {
  return `
    <article class="signal-card ${signal.featured ? "featured" : ""} ${state.feedback[signal.id] === "known" ? "read" : ""}">
      <div class="card-top">
        <div class="card-labels"><span class="category">${escapeHtml(signal.category)}</span><span class="change-type">${escapeHtml(changeType(signal))}</span></div>
        <span class="signal-badge ${statusClass(signal.status)}">${escapeHtml(signal.statusLabel)}</span>
      </div>
      <h4>${escapeHtml(signal.title)}</h4>
      <p>${escapeHtml(signal.summary)}</p>
      <div class="topic-row">${signal.topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}</div>
      <footer><span>${signal.evidence?.length ? `${signal.evidence.length} 个来源已合并 · ` : ""}${state.feedback[signal.id] === "known" ? "你已了解" : `下一触发：${escapeHtml(signal.tracking)}`}</span><div class="card-actions"><button type="button" class="save-button ${state.saved.has(signal.id) ? "saved" : ""}" data-save-signal="${escapeHtml(signal.id)}">${state.saved.has(signal.id) ? "移出稍后看" : "稍后看"}</button><button type="button" data-open-signal="${escapeHtml(signal.id)}">读详情 →</button></div></footer>
    </article>`
}

function renderSignals() {
  const items = data.signals.filter((signal) => {
    if (state.filter === "稍后看") return state.saved.has(signal.id)
    return state.filter === "全部" || signal.category === state.filter
  })
  $("#signalGrid").innerHTML = items.map(signalCardMarkup).join("")
  $("#signalEmpty").hidden = items.length !== 0
}

function renderSaved() {
  const items = data.signals.filter((signal) => state.saved.has(signal.id))
  $("#savedSignalGrid").innerHTML = items.map(signalCardMarkup).join("")
  $("#savedEmpty").hidden = items.length !== 0
  $("#savedCount").textContent = String(items.length)
}

function renderChannels() {
  $("#channelGrid").innerHTML = data.channels.map((channel, index) => `
    <article class="channel-card">
      <div class="channel-number">0${index + 1}</div>
      <div class="channel-card-head"><span>${escapeHtml(channel.state)}</span><small>${escapeHtml(channel.cadence)}</small></div>
      <h4>${escapeHtml(channel.name)}</h4>
      <p>${escapeHtml(channel.description)}</p>
      <div class="channel-focus"><strong>本频道关注什么</strong><span>${escapeHtml(channel.focus)}</span></div>
      <button type="button" data-channel="${escapeHtml(channel.name)}">查看本期内容 <b>${channel.count}</b></button>
    </article>
  `).join("")
}

function renderWatchlist() {
  $("#watchList").innerHTML = data.watchlist.map((item) => `
    <article class="watch-card">
      <div class="watch-meta"><span class="watch-state ${escapeHtml(item.tone)}">${escapeHtml(item.state)}</span><small>${escapeHtml(item.cadence)}</small></div>
      <div class="watch-copy"><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.baseline)}</p></div>
      <div class="watch-change"><span>相较上次</span><strong>${escapeHtml(item.change)}</strong></div>
      <div class="watch-trigger"><span>下一触发</span><p>${escapeHtml(item.trigger)}</p></div>
      <button type="button" data-open-watch="${escapeHtml(item.id)}">查看追踪定义 →</button>
    </article>
  `).join("")
}

function renderBriefs() {
  $("#briefList").innerHTML = data.briefs.map((brief) => `
    <button type="button" class="archive-row" data-open-brief="${escapeHtml(brief.id)}">
      <time>${escapeHtml(brief.date)}</time>
      <div><strong>${escapeHtml(brief.title)}</strong><small>${escapeHtml(brief.summary)}</small></div>
      <span>${escapeHtml(brief.kind)}</span>
      <em>${escapeHtml(brief.state)}</em>
    </button>
  `).join("")
}

function renderSources() {
  $("#sourceGrid").innerHTML = data.sourcePolicy.map((source) => `
    <article class="source-card">
      <span class="source-level">${escapeHtml(source.level)}</span>
      <div><h4>${escapeHtml(source.title)}</h4><p>${escapeHtml(source.use)}</p><small>${escapeHtml(source.rule)}</small></div>
    </article>
  `).join("")
}

function switchView(view, { updateHash = true, scroll = true } = {}) {
  if (!viewTitles[view]) view = "today"
  state.view = view
  if (view !== "search") state.previousView = view

  $$("[data-panel]").forEach((panel) => {
    const active = panel.dataset.panel === view
    panel.hidden = !active
    panel.classList.toggle("active", active)
  })
  $$("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view))
  $("#pageTitle").textContent = viewTitles[view]
  if (updateHash && view !== "search") history.replaceState(null, "", `#${view}`)
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" })
}

function selectChannel(channel) {
  state.filter = channel
  $$("[data-filter]").forEach((button) => button.classList.toggle("active", button.dataset.filter === channel))
  renderSignals()
  switchView("today")
  window.setTimeout(() => $("#signals").scrollIntoView({ behavior: "smooth", block: "start" }), 80)
}

function badgeHtml(signal) {
  return `<span class="signal-badge ${statusClass(signal.status)}">${escapeHtml(signal.statusLabel)}</span>`
}

function openDrawer({ kicker = "DETAIL", badge = "", content = "" }) {
  $("#drawerKicker").textContent = kicker
  $("#drawerBadge").innerHTML = badge
  $("#drawerContent").innerHTML = content
  $("#drawerBackdrop").hidden = false
  $("#detailDrawer").setAttribute("aria-hidden", "false")
  document.body.classList.add("drawer-open")
  $("#closeDrawer").focus()
}

function closeDrawer() {
  $("#drawerBackdrop").hidden = true
  $("#detailDrawer").setAttribute("aria-hidden", "true")
  document.body.classList.remove("drawer-open")
}

function openSignal(id) {
  const signal = data.signals.find((item) => item.id === id)
  if (!signal) return
  openDrawer({
    kicker: `${signal.category} · SIGNAL`,
    badge: badgeHtml(signal),
    content: `
      <div class="cluster-summary"><span>${escapeHtml(changeType(signal))}</span><strong>${signal.evidence.length} 个来源合并为 1 个事件</strong></div>
      <h3>${escapeHtml(signal.title)}</h3>
      <p class="drawer-lead">${escapeHtml(signal.summary)}</p>
      <section><span>事实｜发生了什么变化</span><p>${escapeHtml(signal.change)}</p></section>
      <section><span>分析｜为什么与你有关</span><p>${escapeHtml(signal.impact)}</p></section>
      <section class="recommendation"><span>建议你关注</span><p>${escapeHtml(signal.recommendation)}</p></section>
      <section><span>多方来源对照</span><p class="section-note">同一事件的来源集中放在这里，避免把多篇重复报道当成多条新闻。</p><ul class="evidence-list">${signal.evidence.map((item) => {
        if (typeof item === "string") return `<li>${escapeHtml(item)}</li>`
        return `<li><span class="source-type">${escapeHtml(sourceType(item))}</span><div><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.label)} ↗</a>${item.note ? `<small>${escapeHtml(item.note)}</small>` : ""}</div></li>`
      }).join("")}</ul></section>
      <div class="judgment-timeline"><div><span>现在</span><strong>${escapeHtml(signal.change)}</strong></div><i></i><div><span>什么会改变判断</span><strong>${escapeHtml(signal.tracking)}</strong></div></div>
      <section class="personal-actions"><span>按你的需要处理</span><div><button type="button" data-feedback="follow" data-signal-id="${escapeHtml(signal.id)}">继续追踪</button><button type="button" data-feedback="known" data-signal-id="${escapeHtml(signal.id)}">已了解</button><button type="button" data-feedback="less" data-signal-id="${escapeHtml(signal.id)}">少看此类</button></div></section>
    `,
  })
}

function openBrief(id) {
  const brief = data.briefs.find((item) => item.id === id)
  if (!brief) return
  openDrawer({
    kicker: `${brief.kind} · BRIEF`,
    badge: `<span class="record-state">${escapeHtml(brief.state)}</span>`,
    content: `<h3>${escapeHtml(brief.title)}</h3><p class="drawer-lead">${escapeHtml(brief.summary)}</p><section><span>记录说明</span><p>${escapeHtml(brief.detail)}</p></section><div class="trigger-box"><small>当前边界</small><strong>迁移历史只作为研究基线，正式发布前必须重新核验。</strong></div>`,
  })
}

function openWatch(id) {
  const item = data.watchlist.find((entry) => entry.id === id)
  if (!item) return
  openDrawer({
    kicker: "WATCHLIST",
    badge: `<span class="watch-state ${escapeHtml(item.tone)}">${escapeHtml(item.state)}</span>`,
    content: `<h3>${escapeHtml(item.title)}</h3><p class="drawer-lead">${escapeHtml(item.baseline)}</p><section><span>当前变化</span><p>${escapeHtml(item.change)}</p></section><section><span>更新节奏</span><p>${escapeHtml(item.cadence)}</p></section><div class="trigger-box"><small>下一触发条件</small><strong>${escapeHtml(item.trigger)}</strong></div>`,
  })
}

function openSystemInfo() {
  openDrawer({
    kicker: "SYSTEM STATUS",
    badge: `<span class="record-state warning">${escapeHtml(data.meta.dataMode)}</span>`,
    content: `
      <h3>你的情报中枢正在运行</h3>
      <p class="drawer-lead">${escapeHtml(data.meta.dataNote)}</p>
      <div class="system-list">
        <div><span>网站版本</span><strong>${escapeHtml(data.meta.version)}</strong></div>
        <div><span>数据状态</span><strong>${escapeHtml(data.meta.dataMode)}</strong></div>
        <div><span>后台更新</span><strong>${escapeHtml(data.meta.automation)}</strong></div>
        <div><span>接下来</span><strong>根据你的阅读反馈调整深度、频道和追踪对象</strong></div>
      </div>
      <section class="recommendation"><span>使用方式</span><p>日常内容安静进入网站；聊天保留重大预警和你主动发起的讨论。后台角色不会占据你的阅读界面。</p></section>
    `,
  })
}

function openDailyBrief() {
  const rows = data.managerBrief.mustRead.map((item) => `<li><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.detail)}</span></li>`).join("")
  openDrawer({
    kicker: "TODAY FOR YOU",
    badge: `<span class="record-state">${escapeHtml(data.meta.version)}</span>`,
    content: `<h3>${escapeHtml(data.managerBrief.verdict)}</h3><p class="drawer-lead">${escapeHtml(data.managerBrief.context)}</p><section><span>今天值得你花时间的变化</span><ol class="brief-detail-list">${rows}</ol></section><div class="trigger-box"><small>今天怎么看</small><strong>先理解三条结构变化，再按兴趣进入具体信号；没有必要逐条阅读所有来源。</strong></div>`,
  })
}

function renderSearch(query) {
  const normalized = query.trim().toLocaleLowerCase("zh-CN")
  if (!normalized) {
    switchView(state.previousView)
    return
  }

  const signalResults = data.signals.filter((item) => JSON.stringify(item).toLocaleLowerCase("zh-CN").includes(normalized))
  const briefResults = data.briefs.filter((item) => JSON.stringify(item).toLocaleLowerCase("zh-CN").includes(normalized))
  const watchResults = data.watchlist.filter((item) => JSON.stringify(item).toLocaleLowerCase("zh-CN").includes(normalized))
  const total = signalResults.length + briefResults.length + watchResults.length
  $("#searchSummary").textContent = `“${query}”找到 ${total} 条匹配内容`

  const parts = []
  signalResults.forEach((item) => parts.push(`<button type="button" class="search-result" data-open-signal="${escapeHtml(item.id)}"><span>信号 · ${escapeHtml(item.category)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.summary)}</small></button>`))
  watchResults.forEach((item) => parts.push(`<button type="button" class="search-result" data-open-watch="${escapeHtml(item.id)}"><span>追踪 · ${escapeHtml(item.state)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.trigger)}</small></button>`))
  briefResults.forEach((item) => parts.push(`<button type="button" class="search-result" data-open-brief="${escapeHtml(item.id)}"><span>简报 · ${escapeHtml(item.kind)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.summary)}</small></button>`))
  $("#searchResults").innerHTML = parts.length ? parts.join("") : `<div class="no-results"><strong>没有找到结果</strong><p>试试公司名、政策、AI、直销或更短的关键词。</p></div>`
  switchView("search", { updateHash: false, scroll: false })
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]")
    if (viewButton) {
      $("#searchInput").value = ""
      state.query = ""
      switchView(viewButton.dataset.view)
      return
    }
    const channelButton = event.target.closest("[data-channel]")
    if (channelButton) return selectChannel(channelButton.dataset.channel)
    const filterButton = event.target.closest("[data-filter]")
    if (filterButton) {
      state.filter = filterButton.dataset.filter
      $$("[data-filter]").forEach((button) => button.classList.toggle("active", button.dataset.filter === state.filter))
      renderSignals()
      return
    }
    const signalButton = event.target.closest("[data-open-signal]")
    if (signalButton) return openSignal(signalButton.dataset.openSignal)
    const saveButton = event.target.closest("[data-save-signal]")
    if (saveButton) {
      const id = saveButton.dataset.saveSignal
      state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id)
      localStorage.setItem("intel-saved", JSON.stringify([...state.saved]))
      renderSignals()
      renderSaved()
      showToast(state.saved.has(id) ? "已加入稍后看" : "已从稍后看移除")
      return
    }
    const feedbackButton = event.target.closest("[data-feedback]")
    if (feedbackButton) {
      state.feedback[feedbackButton.dataset.signalId] = feedbackButton.dataset.feedback
      localStorage.setItem("intel-feedback", JSON.stringify(state.feedback))
      const labels = { follow: "已加入持续追踪偏好", known: "已记录：你已经了解", less: "已记录：以后减少此类内容" }
      showToast(labels[feedbackButton.dataset.feedback])
      renderSignals()
      return
    }
    const briefButton = event.target.closest("[data-open-brief]")
    if (briefButton) return openBrief(briefButton.dataset.openBrief)
    const watchButton = event.target.closest("[data-open-watch]")
    if (watchButton) return openWatch(watchButton.dataset.openWatch)
    const jumpButton = event.target.closest("[data-jump]")
    if (jumpButton) $("#signals").scrollIntoView({ behavior: "smooth", block: "start" })
  })

  $("#searchInput").addEventListener("input", (event) => {
    state.query = event.target.value
    renderSearch(state.query)
  })
  $("#searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.target.value = ""
      state.query = ""
      switchView(state.previousView)
      event.target.blur()
    }
  })
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault()
      $("#searchInput").focus()
    }
    if (event.key === "Escape" && document.body.classList.contains("drawer-open")) closeDrawer()
  })

  $("#systemButton").addEventListener("click", openSystemInfo)
  $("#dataInfoButton").addEventListener("click", openSystemInfo)
  $("#readBriefButton").addEventListener("click", openDailyBrief)
  $("#closeDrawer").addEventListener("click", closeDrawer)
  $("#drawerBackdrop").addEventListener("click", closeDrawer)
}

function init() {
  setStaticContent()
  renderDailyBrief()
  renderSignals()
  renderSaved()
  renderChannels()
  renderWatchlist()
  renderBriefs()
  renderSources()
  bindEvents()

  const requested = window.location.hash.replace("#", "")
  switchView(viewTitles[requested] && requested !== "search" ? requested : "today", { updateHash: false, scroll: false })
}

init()
