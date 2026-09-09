(() => {
'use strict';
const $ = s => document.querySelector(s);
const esc = (v='') => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = u => /^https:\/\//i.test(u || '') ? esc(u) : '#';
const read = (k,fallback) => {try {return JSON.parse(localStorage.getItem(k)) ?? fallback;} catch {return fallback;}};
let feed = window.INTEL_FEED;
const views = {today:'今日精选',briefs:'简报档案',saved:'稍后阅读',watchlist:'持续关注'};
const channels = ['中国','世界','AI','直销'];
const savedRaw = read('intel-saved',[]), feedbackRaw = read('intel-feedback',{});
const state = {view:'today',channel:'全部',tier:'全部',query:'',saved:new Set(Array.isArray(savedRaw)?savedRaw:[]),feedback:feedbackRaw && typeof feedbackRaw==='object'?feedbackRaw:{}, snapshots:read('intel-snapshots',{})};
if (!state.snapshots || typeof state.snapshots !== 'object') state.snapshots={};
let returnFocus, scrollBeforeReader=0;
function toast(message) {$('#toast').textContent=message; $('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),2600);}
function persist() {try {localStorage.setItem('intel-saved',JSON.stringify([...state.saved]));localStorage.setItem('intel-feedback',JSON.stringify(state.feedback));localStorage.setItem('intel-snapshots',JSON.stringify(state.snapshots));}catch {toast('浏览器无法保存，下次打开时这些标记可能丢失。');}}
function allSignals() {return [...new Map([...Object.values(state.snapshots),...(feed.signals||[]),...feed.current.signals].map(s=>[s.id,s])).values()];}
function signal(id) {return allSignals().find(s=>s.id===id);}
function remember(s) {state.snapshots[s.id]={...s,date:s.date||feed.publishedDate};}
function tag(s) {return `<span class="tag ${s.tier==='雷达'?'radar':''}">${esc(s.category)} · ${esc(s.tier||'情报')}</span>`;}
function actions(s) {const follow=state.feedback[s.id]==='follow';return `<button data-save="${esc(s.id)}" aria-pressed="${state.saved.has(s.id)}">${state.saved.has(s.id)?'已留存':'稍后读'}</button><button data-follow="${esc(s.id)}" aria-pressed="${follow}">${follow?'已关注':'关注后续'}</button>`;}
function card(s,{featured=false}={}) {return `<article class="story ${featured?'lead-story':''} ${state.feedback[s.id]==='known'?'known':''}"><div class="story-meta">${tag(s)}<span>${esc(s.statusLabel||'')}</span></div><button class="story-open" data-signal="${esc(s.id)}"><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p></button>${featured?`<div class="why"><span>为什么重要</span><p>${esc(s.impact)}</p></div>`:''}<div class="story-bottom"><span>${s.evidence?.length||0} 个来源${state.feedback[s.id]==='known'?' · 已读':''}</span><div>${actions(s)}<button class="read-link" data-signal="${esc(s.id)}">阅读全文 ↗</button></div></div></article>`;}
function empty(title,detail) {return `<div class="empty"><span aria-hidden="true">—</span><h3>${esc(title)}</h3><p>${esc(detail)}</p><button data-view="today">返回今日精选</button></div>`;}
function header(title,detail='') {return `<div class="page-heading"><h1>${esc(title)}</h1>${detail?`<p>${esc(detail)}</p>`:''}</div>`;}
function reportRow(r) {const summary=r.body.split('\n').find(l=>l.length>45&&!/^[#>\-|]/.test(l))||'';return `<button class="report-row" data-report="${esc(r.id)}"><time>${esc(r.date)}</time><div><h3>${esc(r.title.split('｜')[0])}</h3><p>${esc(summary)}</p></div><span>读全文 ↗</span></button>`;}
function today() {
 const c=feed.current, mustIds=new Set(c.managerBrief.mustRead.map(m=>m.signalId));
 const priority=c.managerBrief.mustRead.map(m=>signal(m.signalId)).filter(Boolean);
 const filtered=c.signals.filter(s=>(state.channel==='全部'||s.category===state.channel)&&(state.tier==='全部'||s.tier===state.tier));
 const list=state.channel==='全部'&&state.tier==='全部'?filtered.filter(s=>!mustIds.has(s.id)):filtered;
 const status=c.managerBrief.channelStatus.find(s=>s.name===state.channel);
 const date=feed.publishedDate.split('-');
 return `<div class="edition-heading"><div><p class="label">${date[0]} / ${date[1]} / ${date[2]} · 每日精选</p><h1>今天，值得知道的事。</h1></div><button class="outline" data-report="${esc(c.brief.id)}">阅读本期完整简报 ↗</button></div>
 ${state.channel==='全部'&&state.tier==='全部'?`<section class="priority"><div class="section-title"><h2>先看重点</h2><span>${priority.length} 件事 · 约 ${Math.max(1,Math.ceil(priority.reduce((n,s)=>n+s.summary.length+s.impact.length,0)/350))} 分钟</span></div><div class="priority-grid">${priority.map(s=>card(s,{featured:true})).join('')}</div></section>`:''}
 <section class="feed-section" id="events"><div class="section-title"><h2>${state.channel==='全部'?'继续了解':esc(state.channel)+'情报'}</h2><span>${list.length} 条${state.channel==='全部'&&state.tier==='全部'?' · 重点之外的变化':''}</span></div>
 <div class="filter-bar"><div class="tabs" aria-label="情报频道">${['全部',...channels].map(c=>`<button data-channel="${c}" aria-pressed="${state.channel===c}" class="${state.channel===c?'selected':''}">${c}</button>`).join('')}</div><label class="tier-filter">层级 <select id="tier" aria-label="筛选情报层级">${['全部','必看','重要','雷达'].map(t=>`<option ${state.tier===t?'selected':''}>${t}</option>`).join('')}</select></label></div>
 ${status?`<p class="channel-note">${esc(status.note)} · ${esc(status.status)}</p>`:''}
 ${list.length?`<div class="story-list">${list.map(s=>card(s)).join('')}</div>`:empty('本期没有符合条件的内容',state.channel==='直销'?(status?.note||'本期未发布新的直销情报，历史内容仍可通过搜索查阅。'):'试试其他频道或切换情报层级。')}</section>`;
}
function watchlist() {
 const personal=allSignals().filter(s=>state.feedback[s.id]==='follow');
 const notes=(feed.current.watchlist||[]).map((w,i)=>({id:w.id||`watch-${i}`,title:w.title||w.topic,change:w.change||w.note,trigger:w.trigger||w.note,baseline:w.baseline||''}));
 return header('持续关注','这里保留值得回头再看的变化。个人标记保存在当前浏览器。')+`<div class="section-title"><h2>我关注的事件</h2><span>${personal.length} 条</span></div>`+(personal.length?`<div class="story-list">${personal.map(s=>`<div>${card(s)}<p class="follow-trigger"><b>下一步看什么</b> ${esc(s.tracking)}</p></div>`).join('')}</div>`:empty('还没有关注的事件','在事件下点“关注后续”，即可在这里保留事件和下一观察点。'))+`<div class="section-title watch-heading"><h2>本期观察点</h2><span>随每日简报更新</span></div><div class="watch-grid">${notes.map(w=>`<article class="watch-note"><span class="label">持续观察</span><h3>${esc(w.title)}</h3><p>${esc(w.change)}</p>${w.baseline?`<p>${esc(w.baseline)}</p>`:''}</article>`).join('')}</div>`;
}
function search() {
 const q=state.query.trim().toLowerCase(), matches=v=>JSON.stringify(v).toLowerCase().includes(q);
 const signals=allSignals().filter(matches), reports=feed.reports.filter(matches);
 return header('搜索结果',`“${state.query}” · ${signals.length} 个事件，${reports.length} 份简报`)+(signals.length?`<div class="section-title"><h2>事件</h2></div><div class="story-list">${signals.map(s=>card(s)).join('')}</div>`:'')+(reports.length?`<div class="section-title watch-heading"><h2>简报全文</h2></div>${reports.map(reportRow).join('')}`:'')+(!signals.length&&!reports.length?empty('没有找到相关内容','试试更短的关键词、公司名或政策名称。'):'');
}
function render() {
 if (!feed?.current?.signals) {$('#content').innerHTML=empty('简报暂时无法载入','请检查网络后点击下方“检查更新”。');return;}
 $('#archiveCount').textContent=feed.reports.length;
 $('#savedCount').textContent=state.saved.size;
 $('#followCount').textContent=allSignals().filter(s=>state.feedback[s.id]==='follow').length;
 $('#channelNav').innerHTML=channels.map(c=>`<button data-channel="${c}" class="${state.view==='today'&&state.channel===c?'selected':''}"><span>${c}</span><small>${feed.current.signals.filter(s=>s.category===c).length||'—'}</small></button>`).join('');
 $('#viewLabel').textContent=state.query?'搜索结果':views[state.view];
 document.querySelectorAll('#nav button').forEach(b=>{b.classList.toggle('active',!state.query&&b.dataset.view===state.view);if(!state.query&&b.dataset.view===state.view)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
 const todayDate=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai'}).format(new Date());
 const fresh=feed.publishedDate===todayDate;
 $('#editionLabel').textContent=`最新一期 ${feed.publishedDate.slice(5).replace('-','.')}`;
 $('#freshness').classList.toggle('stale',!fresh);
 $('#freshness').textContent=fresh?`今天的简报已到 · ${feed.current.signals.length} 条情报 · 事实与判断在详情中分列`:`当前是 ${feed.publishedDate} 的简报，尚未收到今天的新一期。`;
 if(state.query) $('#content').innerHTML=search();
 else if(state.view==='today') $('#content').innerHTML=today();
 else if(state.view==='briefs') $('#content').innerHTML=header('简报档案',`${feed.reports.length} 份完整简报 · 按日期回看事实、判断与来源`)+feed.reports.map(reportRow).join('');
 else if(state.view==='watchlist') $('#content').innerHTML=watchlist();
 else {const items=allSignals().filter(s=>state.saved.has(s.id));const missing=[...state.saved].filter(id=>!signal(id));$('#content').innerHTML=header('稍后阅读','留存的事件跨期保留。收藏仅保存在当前浏览器。')+(items.length?`<div class="story-list">${items.map(s=>card(s)).join('')}</div>`:empty('给值得细读的内容留个位置','在事件下点“稍后读”，随时回来接着看。'))+(missing.length?`<div class="channel-note">有 ${missing.length} 条旧版收藏缺少事件快照。可在简报档案中按关键词找回正文。</div>`:'');}
}
function navigate(view,channel='全部') {state.view=views[view]?view:'today';state.channel=channel;state.tier='全部';state.query='';$('#search').value='';const hash=state.view==='today'&&channel!=='全部'?`channel/${encodeURIComponent(channel)}`:state.view;history.pushState(null,'',`#${hash}`);render();window.scrollTo({top:0,behavior:'instant'});}
function openReader(label,body,hash) {returnFocus=document.activeElement;scrollBeforeReader=window.scrollY;$('#readerLabel').textContent=label;$('#readerBody').innerHTML=body;$('#reader').showModal();$('#reader').scrollTop=0;document.body.classList.add('reading');if(hash && location.hash!==`#${hash}`)history.pushState(null,'',`#${hash}`);$('#closeReader').focus();}
function closeReader(fromRoute=false) {$('#reader').close();document.body.classList.remove('reading');if(!fromRoute)history.replaceState(null,'',`#${state.view}`);if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});window.scrollTo({top:scrollBeforeReader,behavior:'instant'});}
function openSignal(id) {const s=signal(id);if(!s)return;openReader(`${s.date||feed.publishedDate} · ${s.category}`,`${tag(s)}<h1 id="readerTitle">${esc(s.title)}</h1><p class="reader-lead">${esc(s.summary)}</p><div class="reader-actions">${actions(s)}<button data-known="${esc(s.id)}">标为已读</button></div><section><h2>发生了什么</h2><p>${esc(s.change)}</p></section><section><h2>为什么重要 <small>分析判断</small></h2><p>${esc(s.impact)}</p></section><section><h2>值得关注</h2><p>${esc(s.recommendation)}</p></section><aside class="next-watch"><h2>什么变化值得再看</h2><p>${esc(s.tracking)}</p></aside><section><h2>来源与证据边界</h2><p class="evidence-boundary">${esc(s.statusLabel)}</p><ul class="sources">${(s.evidence||[]).map(e=>`<li><a href="${safeUrl(e.url)}" target="_blank" rel="noopener noreferrer">${esc(e.label)} ↗</a><span>${esc(e.note||e.type||'原始来源')}</span></li>`).join('')}</ul></section>`,`signal/${encodeURIComponent(id)}`);}
function markdown(source) {
 const inline=t=>esc(t).replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
 let result='',list=false;
 for(const line of source.split('\n')) {if(/^# /.test(line))continue;const item=line.match(/^(?:[-*]|\d+\.)\s+(.*)/);if(item){if(!list){result+='<ul>';list=true;}result+=`<li>${inline(item[1])}</li>`;continue;}if(list){result+='</ul>';list=false;}if(!line.trim())continue;const h=line.match(/^(#{2,4})\s+(.*)/);if(h)result+=`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;else if(line.startsWith('>'))result+=`<blockquote>${inline(line.replace(/^>\s*/,''))}</blockquote>`;else if(/^---+$/.test(line))result+='<hr>';else result+=`<p>${inline(line)}</p>`;}
 return result+(list?'</ul>':'');
}
function openReport(id) {const r=feed.reports.find(r=>r.id===id);if(!r){toast('这份简报暂时没有全文。');return;}openReader(`${r.date} · 完整简报`,`<h1 id="readerTitle">${esc(r.title)}</h1><div class="report-prose">${markdown(r.body)}</div>`,`report/${encodeURIComponent(id)}`);}
function route() {if($('#reader').open)closeReader(true);const [kind,id]=location.hash.slice(1).split('/');if(kind==='signal'){render();openSignal(decodeURIComponent(id||''));}else if(kind==='report'){render();openReport(decodeURIComponent(id||''));}else {state.query='';$('#search').value='';state.view=views[kind]?kind:'today';state.channel=kind==='channel'&&channels.includes(decodeURIComponent(id||''))?decodeURIComponent(id):'全部';render();}}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.view)return navigate(b.dataset.view);
 if(b.dataset.channel)return navigate('today',b.dataset.channel);
 if(b.dataset.signal)return openSignal(b.dataset.signal);
 if(b.dataset.report)return openReport(b.dataset.report);
 const id=b.dataset.save||b.dataset.follow||b.dataset.known;
 if(id){const s=signal(id);if(!s)return;remember(s);if(b.dataset.save){state.saved.has(id)?state.saved.delete(id):state.saved.add(id);toast(state.saved.has(id)?'已加入稍后阅读':'已移出稍后阅读');}else if(b.dataset.follow){state.feedback[id]=state.feedback[id]==='follow'?'':'follow';toast(state.feedback[id]==='follow'?'已加入持续关注':'已取消关注');}else {state.feedback[id]='known';toast('已标为已读');}persist();render();if($('#reader').open){$('#readerBody .reader-actions').innerHTML=actions(s)+`<button data-known="${esc(id)}">标为已读</button>`;}return;}
});
$('#content').addEventListener('change',e=>{if(e.target.id==='tier'){state.tier=e.target.value;render();}});
$('#search').addEventListener('input',e=>{state.query=e.target.value.trim();render();});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if($('#reader').open)closeReader();$('#search').focus();}if(e.key==='Escape'&&!$('#reader').open){state.query='';$('#search').value='';render();}});
$('#closeReader').addEventListener('click',()=>closeReader());
$('#reader').addEventListener('cancel',e=>{e.preventDefault();closeReader();});
$('#reader').addEventListener('click',e=>{if(e.target===$('#reader')){const r=$('#reader').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeReader();}});
window.addEventListener('popstate',route);
async function refresh(manual=false) {
 $('#syncState').textContent='正在检查…';
 const remote=location.hostname.endsWith('chatgpt.site');
 const url=remote?'https://biwnook123-glitch.github.io/baiyu-intelligence-pages/data/feed.json':'data/feed.json';
 try {const response=await fetch(`${url}?v=${Date.now()}`,{cache:'no-store',signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error(response.status);const next=await response.json();if(next.schema!==1||!next.current?.signals?.length||!next.reports?.length||!next.publishedDate)throw Error('invalid');if(!feed||next.publishedDate>=feed.publishedDate){feed=next;allSignals().filter(s=>state.saved.has(s.id)||state.feedback[s.id]==='follow').forEach(remember);persist();render();}$('#syncState').textContent='已检查更新';if(manual)toast('已载入最新可用简报');}
 catch {$('#syncState').textContent='更新暂不可用，正在阅读已保存的版本';if(manual)toast('暂时无法连接，当前简报仍可阅读。');}
}
$('#refresh').addEventListener('click',()=>refresh(true));
if(feed?.current){allSignals().filter(s=>state.saved.has(s.id)||state.feedback[s.id]==='follow').forEach(remember);persist();route();refresh();}else render();
})();
