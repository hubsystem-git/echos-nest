/* ============================================================
   app.js - Echo's Nest: pages, progress, quests and patches
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = Widgets.esc;
  function mk(tag, attrs, html) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) { if (attrs[k] === false || attrs[k] == null) continue; if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k] === true ? '' : attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  const S = {
    key: k => 'echosnest.web1.' + k,
    get(k, d) { try { const v = localStorage.getItem(this.key(k)); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(this.key(k), JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
    getRaw(k) { try { return localStorage.getItem(this.key(k)); } catch (e) { return null; } },
    setRaw(k, v) { try { localStorage.setItem(this.key(k), v); } catch (e) { /* storage blocked */ } },
    del(k) { try { localStorage.removeItem(this.key(k)); } catch (e) { /* storage blocked */ } }
  };
  const BACKUP_KEYS = ['grown', 'name', 'prog', 'mytext', 'nest'];
  const ORDER = LESSONS.map(l => l.id);
  const byId = id => LESSONS.find(l => l.id === id);
  const state = {
    grown: !!S.get('grown', false),
    name: S.get('name', ''),
    prog: S.get('prog', null) || {}
  };
  function prog(id) { return state.prog[id] || (state.prog[id] = { q: {}, f: {}, z: {} }); }
  const saveProg = () => S.set('prog', state.prog);
  function reqs(L) {
    const p = prog(L.id);
    const qs = L.quests.filter(q => !q.opt);
    const fs = L.field.map((f, i) => ({ f: f, i: i })).filter(x => !x.f.opt);
    const r = {
      q: [qs.filter(q => p.q[q.id]).length, qs.length],
      f: [fs.filter(x => p.f[x.i]).length, fs.length],
      z: [L.quiz.filter((qq, i) => p.z[i] === qq.c).length, L.quiz.length]
    };
    r.all = r.q[0] >= r.q[1] && r.f[0] >= r.f[1] && r.z[0] >= r.z[1];
    return r;
  }
  const isDone = L => !!prog(L.id).done || reqs(L).all;
  const doneCount = () => LESSONS.filter(isDone).length;
  function lessonPct(L) {
    if (isDone(L)) return 100;
    const r = reqs(L);
    const have = r.q[0] + r.f[0] + r.z[0], need = r.q[1] + r.f[1] + r.z[1];
    return need ? Math.round(have / need * 100) : 0;
  }

  /* ---------- art ---------- */
  const ART = Widgets.ART;
  const ICON = {
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.6 2.6M15.1 15.1l2.6 2.6M6.3 17.7l2.6-2.6M15.1 8.9l2.6-2.6"/>',
    egg: '<path d="M3.5 14.5c1.5 5 15.5 5 17 0"/><path d="M3 14h18"/><path d="M12 4c2.4 0 4 3.3 4 6s-1.8 4-4 4-4-1.3-4-4 1.6-6 4-6z"/>',
    bubble: '<path d="M4 5h16v10H10l-4 4v-4H4z"/><path d="M9 10h.01M12 10h.01M15 10h.01" stroke-width="2.6"/>',
    books: '<path d="M4 19V5h4v14zM9 19V7h4v12z"/><path d="M14.4 19.2l3.6-13.4 3.4.9-3.6 13.4z"/>',
    scissors: '<circle cx="6" cy="7" r="2.6"/><circle cx="6" cy="17" r="2.6"/><path d="M8.2 8.6L20 17M8.2 15.4L20 7"/>',
    chain: '<path d="M10 14a4 4 0 0 1 0-5.6l2-2a4 4 0 0 1 5.6 5.6l-1 1"/><path d="M14 10a4 4 0 0 1 0 5.6l-2 2a4 4 0 0 1-5.6-5.6l1-1"/>',
    die: '<rect x="4" y="4" width="16" height="16" rx="3"/><g fill="var(--patch-stitch)" stroke="none"><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></g>',
    window: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/><path d="M7 14.2c2.2-2.6 7.8-2.6 10 0-2.2 2.6-7.8 2.6-10 0z"/>',
    dial: '<circle cx="12" cy="13" r="7"/><path d="M12 13l3.6-3.6"/><path d="M12 3v2M4.6 6.4l1.4 1.4M19.4 6.4L18 7.8"/>',
    stars: '<path d="M4 17l5-6 5 3 6-8"/><g fill="var(--patch-stitch)" stroke="none"><circle cx="4" cy="17" r="1.7"/><circle cx="9" cy="11" r="1.7"/><circle cx="14" cy="14" r="1.7"/><circle cx="20" cy="6" r="1.7"/></g>',
    arc: '<path d="M3 19h18"/><path d="M6 15c1.5-7 10.5-7 12 0"/><path d="M15.5 13.2L18 15l.3-3"/>',
    mountain: '<path d="M2 20l7-12 4 6 3-4 6 10z"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.6 0 2-1 2-2s-1-2 0-3 3 0 4-1 3-2 3-4c0-4.5-4-8-9-8z"/><g fill="var(--patch-stitch)" stroke="none"><circle cx="7.5" cy="11" r="1.4"/><circle cx="10.5" cy="7" r="1.4"/><circle cx="15" cy="7.5" r="1.4"/></g>',
    magnifier: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L21 21"/><path d="M8 8l4 4M12 8l-4 4"/>',
    feather: '<path d="M20 4C11 4 6 10 5 20"/><path d="M20 4c0 8-5 13-13 13"/><path d="M9 13h5M11.5 9.5h5"/>',
    scales: '<path d="M12 4v15M8 19h8M4 7h16"/><path d="M4 7l-2.5 5.5M4 7l2.5 5.5M1.5 12.5a2.5 2 0 0 0 5 0z"/><path d="M20 7l-2.5 5.5M20 7l2.5 5.5M17.5 12.5a2.5 2 0 0 0 5 0z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.2 8.8l-1.9 4.5-4.5 1.9 1.9-4.5z"/>',
    paw: '<path d="M12 12.5c-2.8 0-5 3-5 5.2 0 1.4 1.2 2.3 2.5 2.3 1 0 1.7-.5 2.5-.5s1.5.5 2.5.5c1.3 0 2.5-.9 2.5-2.3 0-2.2-2.2-5.2-5-5.2z"/><g fill="var(--patch-stitch)" stroke="none"><ellipse cx="6" cy="10.5" rx="1.6" ry="2"/><ellipse cx="9.5" cy="6.8" rx="1.6" ry="2.1"/><ellipse cx="14.5" cy="6.8" rx="1.6" ry="2.1"/><ellipse cx="18" cy="10.5" rx="1.6" ry="2"/></g>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 15v2.5"/>',
    dumbbell: '<path d="M7 7v10M17 7v10M4 9.5v5M20 9.5v5M7 12h10"/>',
    antidote: '<path d="M9 3h6"/><path d="M10 3v5.2L5.6 16.4A3 3 0 0 0 8.2 21h7.6a3 3 0 0 0 2.6-4.6L14 8.2V3"/><path d="M12 12.4v5.2M9.4 15h5.2"/>',
    moon: '<path d="M15.5 3.5a7.5 7.5 0 1 0 5 12.8A6.2 6.2 0 1 1 15.5 3.5z"/><path d="M6 5l.5 1.5L8 7l-1.5.5L6 9l-.5-1.5L4 7l1.5-.5z"/>'
  };
  function patchSVG(L, earned, label) {
    const col = 'var(' + L.patch.color + ')';
    const aria = label ? ' role="img" aria-label="' + esc(L.patch.name + (earned ? ' patch, earned' : ' patch, not earned yet')) + '"' : ' aria-hidden="true" focusable="false"';
    if (!earned) return '<svg viewBox="0 0 100 100"' + aria + '><circle cx="50" cy="50" r="45" fill="var(--sheet)" stroke="var(--rule)" stroke-width="3" stroke-dasharray="6 5"/><g transform="translate(26 22) scale(2)" fill="none" stroke="var(--ink-2)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".45" style="--patch-stitch: var(--ink-2)">' + ICON[L.patch.icon] + '</g></svg>';
    return '<svg viewBox="0 0 100 100"' + aria + '><circle cx="50" cy="50" r="47" fill="' + col + '"/><circle cx="50" cy="50" r="47" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="3"/><circle cx="50" cy="50" r="40.5" fill="none" stroke="var(--patch-stitch)" stroke-width="2.4" stroke-dasharray="4.2 3.4"/><g transform="translate(26 22) scale(2)" fill="none" stroke="var(--patch-stitch)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICON[L.patch.icon] + '</g></svg>';
  }
  function stopBadge(L) {
    if (isDone(L)) return patchSVG(L, true);
    const pct = lessonPct(L);
    const r = 15, c = 2 * Math.PI * r;
    return '<svg viewBox="0 0 34 34" aria-hidden="true" focusable="false"><circle cx="17" cy="17" r="15" fill="var(--sheet)" stroke="var(--rule)" stroke-width="2"/>' +
      (pct ? '<circle cx="17" cy="17" r="15" fill="none" stroke="var(--teal)" stroke-width="2.6" stroke-dasharray="' + (c * pct / 100).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 17 17)" stroke-linecap="round"/>' : '') +
      '<text x="17" y="21.5" text-anchor="middle" font-family="Bree Serif, Georgia, serif" font-size="' + (L.num.length > 1 ? 11.5 : 13) + '" fill="var(--ink)">' + esc(L.num) + '</text></svg>';
  }

  /* ---------- widget wiring ---------- */
  let view = { name: 'home', id: null };
  let counters = null;
  function newCounters() {
    const n = {}, marks = new Set();
    return { tick: k => (n[k] = (n[k] || 0) + 1), mark: k => { marks.add(k); return true; }, has: k => marks.has(k) };
  }
  Widgets.init({
    get: (k, d) => S.get(k, d),
    set: (k, v) => S.set(k, v),
    name: () => state.name,
    emit: (type, data) => onEvent(Object.assign({ type: type }, data || {}))
  });
  function onEvent(ev) {
    if (view.name !== 'lesson') return;
    const L = byId(view.id);
    const p = prog(L.id);
    let changed = 0;
    for (const q of L.quests) {
      if (p.q[q.id]) continue;
      let ok = false;
      try { ok = !!q.check(ev, counters); } catch (e) { ok = false; }
      if (ok) {
        p.q[q.id] = true; changed++;
        const li = $('.quest[data-q="' + q.id + '"]');
        if (li) { li.classList.add('done'); const sr = $('.sr', li); if (sr) sr.textContent = ' Done.'; }
      }
    }
    if (changed) {
      saveProg();
      const r = reqs(L);
      toast(r.q[0] >= r.q[1] ? 'All Nest quests done! Echo does a happy hop.' : 'Quest complete! ' + r.q[0] + ' of ' + r.q[1] + ' done.');
      updatePills(L);
      checkComplete(L);
    }
  }
  function mountLab(container, specs) {
    specs.forEach(spec => {
      const slot = mk('div', { class: 'lab-slot' });
      container.appendChild(slot);
      try {
        if (spec.w === 'echo') Widgets.echo(slot, spec.opt || {});
        else if (spec.w === 'sorter') Widgets.sorter(slot, spec.cfg);
        else Widgets[spec.w](slot, spec.cfg || {});
      } catch (e) {
        if (typeof console !== 'undefined') console.error(e);
        slot.innerHTML = '<p class="say-meta">This tool could not start. Try reloading the page.</p>';
      }
    });
  }

  /* ---------- small UI ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
  }
  let pop = null;
  function hidePop() { if (pop) { pop.remove(); pop = null; } }
  function showPop(t) {
    hidePop();
    const k = t.dataset.term;
    const def = GLOSSARY[k];
    if (!def) return;
    pop = mk('div', { class: 'pop', role: 'tooltip' }, '<b>' + esc(k) + '</b>' + esc(def));
    pop.dataset.for = k;
    document.body.appendChild(pop);
    const r = t.getBoundingClientRect();
    const pw = pop.offsetWidth;
    let left = r.left + window.scrollX;
    left = Math.max(16 + window.scrollX, Math.min(left, window.scrollX + document.documentElement.clientWidth - pw - 16));
    pop.style.left = left + 'px';
    pop.style.top = (r.bottom + window.scrollY + 6) + 'px';
  }
  document.addEventListener('click', e => {
    const t = e.target.closest && e.target.closest('.term');
    if (t) { e.preventDefault(); if (pop && pop.dataset.for === t.dataset.term) { hidePop(); return; } showPop(t); return; }
    if (!(e.target.closest && e.target.closest('.pop'))) hidePop();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { hidePop(); const c = $('.celebrate'); if (c) c.remove(); }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('term')) { e.preventDefault(); showPop(e.target); }
  });
  window.addEventListener('resize', hidePop);
  function wireTerms(root) { $$('.term', root).forEach(t => { t.tabIndex = 0; t.setAttribute('role', 'button'); t.setAttribute('aria-label', t.textContent + ': what does it mean?'); }); }
  function copyText(text, btn, el) {
    const done = ok => { if (!btn) return; const old = btn.dataset.label || btn.textContent; btn.dataset.label = old; btn.textContent = ok ? 'Copied!' : 'Selected: press Ctrl+C'; setTimeout(() => { btn.textContent = old; }, 1800); };
    const fallback = () => { if (el) { const range = document.createRange(); range.selectNodeContents(el); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); } done(false); };
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => done(true), fallback); else fallback(); } catch (e) { fallback(); }
  }
  function celebrate(L) {
    const idx = ORDER.indexOf(L.id);
    const next = LESSONS[idx + 1];
    const wrap = mk('div', { class: 'celebrate', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'cel-h' });
    wrap.innerHTML = '<div class="card">' + patchSVG(L, true, true) + '<h2 id="cel-h">Patch earned: ' + esc(L.patch.name) + '</h2><p>' + (state.name ? esc(state.name) + ', you' : 'You') + ' finished <strong>' + esc(L.title) + '</strong>. Echo flaps its wings, Byte howls, and Noodle wiggles.</p><div class="row">' +
      (next ? '<a class="btn primary" href="#' + next.id + '">Next: ' + esc(next.title) + '</a>' : '<a class="btn primary" href="#home">See your patches</a>') +
      '<button type="button" class="btn" data-close>Stay here</button></div></div>';
    wrap.addEventListener('click', e => { if (e.target === wrap || e.target.closest('[data-close]') || e.target.closest('a')) wrap.remove(); });
    document.body.appendChild(wrap);
    const first = $('a, button', wrap);
    if (first) first.focus();
  }
  function checkComplete(L) {
    const p = prog(L.id);
    if (p.celebrated) return;
    if (reqs(L).all) { p.celebrated = true; saveProg(); Widgets.reader.whenClosed(() => celebrate(L)); }
  }

  /* ---------- backup code: all progress as one line of text to copy, share or paste ---------- */
  // ECHOSNEST<version>-<base64url JSON>.<checksum>. Bump CODE_VERSION when progress data changes shape, so older codes are refused instead of misread.
  const CODE_VERSION = 1;
  function toB64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function fromB64(str) {
    const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  const checksum = str => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
  function backupCode() {
    const data = {};
    BACKUP_KEYS.forEach(k => { const v = S.getRaw(k); if (v != null) data[k] = v; });
    data.prog = JSON.stringify(state.prog);
    data.name = JSON.stringify(state.name);
    data.grown = JSON.stringify(state.grown);
    const body = toB64(JSON.stringify({ saved: new Date().toISOString(), data: data }));
    return 'ECHOSNEST' + CODE_VERSION + '-' + body + '.' + checksum(body);
  }
  /* null if it isn't a whole backup code; { old: true } if it's from another version; otherwise what to restore */
  function readBackup(text) {
    const m = /^ECHOSNEST(\d+)-([A-Za-z0-9_-]+)\.([0-9a-z]+)$/.exec(String(text || '').replace(/\s+/g, ''));
    if (!m) return null;
    if (+m[1] !== CODE_VERSION) return { old: true };
    if (checksum(m[2]) !== m[3]) return null;
    let o = null;
    try { o = JSON.parse(fromB64(m[2])); } catch (e) { return null; }
    if (!o || !o.data || typeof o.data !== 'object') return null;
    const clean = {};
    BACKUP_KEYS.forEach(k => { const v = o.data[k]; if (typeof v === 'string') { try { JSON.parse(v); clean[k] = v; } catch (e) { /* skip it */ } } });
    return Object.keys(clean).length ? { data: clean, saved: o.saved } : null;
  }

  /* ---------- pages ---------- */
  const main = () => $('#main');
  function setNav() {
    ['home', 'nest', 'library'].forEach(n => { const a = $('#nav-' + n); if (view.name === n) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    $('#gtoggle').setAttribute('aria-pressed', String(state.grown));
  }
  function renderRail() {
    $('#rail').innerHTML = '<ol class="trail">' + LEVELS.map(lv => {
      const ls = LESSONS.filter(L => L.level === lv.id);
      return '<li class="trail-level"><p class="trail-level-name">' + esc(lv.name) + '</p><ol class="trail-stops">' + ls.map(L =>
        '<li class="stop"><a href="#' + L.id + '"' + (view.id === L.id ? ' aria-current="page"' : '') + '><span class="stop-badge">' + stopBadge(L) + '</span><span class="stop-text">' + esc(L.title) + '<small>' + esc(isDone(L) ? L.patch.name + ' patch' : (L.num === '★' ? 'Finale' : (/^S/.test(L.num) ? 'Start ' + L.num.slice(1) : 'Lesson ' + L.num))) + '</small></span></a></li>').join('') + '</ol></li>';
    }).join('') + '</ol>';
  }
  const firstUndone = () => LESSONS.find(L => !isDone(L)) || null;

  function heroSky() {
    return '<div class="sky" aria-hidden="true"><div class="aurora"></div><div class="moon"></div><div class="stars"></div><svg class="pines" viewBox="0 0 1200 160" preserveAspectRatio="none"><path d="M0 160V118l40-46 22 26 30-62 34 70 26-30 38 52 30-40 26 22 40-74 36 70 24-24 34 46 28-34 30 30 36-78 40 84 22-22 32 40 30-48 34 52 26-28 36 48 34-70 38 72 22-20 32 36 28-30 36 42 38-82 40 86 24-24 30 28 34-46 32 50 28-22 30 26 40-66 36 62 26-20 34 30 0 0V160z"/></svg><div class="perch">' + ART.echo + '</div></div>';
  }
  function renderHome() {
    const next = firstUndone();
    const started = LESSONS.some(L => lessonPct(L) > 0);
    const m = main();
    m.innerHTML = '<div class="home">' +
      '<section class="hero">' + heroSky() + '<div class="hero-copy"><p class="eyebrow">A field guide to AI</p><h1 tabindex="-1">Echo\'s Nest</h1><p class="lede">' + (state.name ? 'Welcome back, ' + esc(state.name) + '. ' : '') + 'How AI and chatbots really work, learned by teaching a baby raven to talk.</p>' +
      '<div class="hero-actions">' + (next ? '<a class="btn primary" href="#' + next.id + '">' + (started ? 'Continue: ' : 'Start: ') + esc(next.title) + '</a>' : '<a class="btn primary" href="#fin">You finished the whole guide!</a>') + '<a class="btn ghost" href="#nest">Visit Echo in the Nest</a></div></div></section>' +
      '<section class="guides-row" aria-label="Your guides">' +
      '<div class="guide">' + ART.byte + '<div><h3>Byte</h3><p>A young gray wolf and a born tracker. Byte explains the big ideas.</p></div></div>' +
      '<div class="guide">' + ART.noodle + '<div><h3>Noodle</h3><p>A corn snake who loves tinkering. Noodle runs the tools in the Nest.</p></div></div>' +
      '<div class="guide">' + ART.echo + '<div><h3>Echo</h3><p>A baby raven and a real, tiny language model. Everything Echo says comes from what you let it read.</p></div></div></section>' +
      '<div class="namebox"><label for="ranger-name">Your ranger name</label><input id="ranger-name" type="text" maxlength="24" autocomplete="off" value="' + esc(state.name) + '" placeholder="type it here"></div>' +
      '<section aria-labelledby="h-patches"><div class="section-h"><h2 id="h-patches">Your patches</h2><p>' + doneCount() + ' of ' + LESSONS.length + ' earned. Finish every part of a lesson to earn its patch.</p></div><div class="sash"><div class="patches">' +
      LESSONS.map(L => { const e = isDone(L); return '<a class="patch' + (e ? ' earned' : '') + '" href="#' + L.id + '">' + patchSVG(L, e, true) + '<span>' + esc(L.patch.name) + '</span></a>'; }).join('') + '</div></div></section>' +
      '<section aria-labelledby="h-trail"><div class="section-h"><h2 id="h-trail">The trail</h2><p>Each lesson builds on the one before.</p></div><div class="levels">' +
      LEVELS.map(lv => '<div class="level-block"><h3>' + esc(lv.name) + '</h3><p>' + esc(lv.blurb) + '</p><div class="cards">' + LESSONS.filter(L => L.level === lv.id).map(L =>
        '<a class="lcard" href="#' + L.id + '">' + stopBadge(L) + '<span><strong>' + esc(L.title) + '</strong><small>' + esc(L.sub) + '</small><span class="meter" aria-hidden="true"><i style="width:' + lessonPct(L) + '%"></i></span></span></a>').join('') + '</div></div>').join('') +
      '</div></section>' +
      '<section aria-labelledby="h-code"><div class="section-h"><h2 id="h-code">Keep your progress safe</h2><p>Your progress is saved on this device only.</p></div><div class="code-card"><div>' +
      '<p><strong>Backup code.</strong> One long code holds everything: your patches, half-finished lessons, and what you wrote for Echo. Keep it somewhere safe, like the Notes app, or send it to your other iPhone or iPad.</p>' +
      '<div class="code-in">' + (navigator.share ? '<button type="button" class="btn small" id="bk-share">Share my backup code</button>' : '') + '<button type="button" class="btn small" id="bk-copy">Copy my backup code</button></div>' +
      '<div id="bk-show" hidden><label class="sr" for="bk-out">Your backup code</label><textarea id="bk-out" class="lab-input bk-text" rows="3" readonly></textarea></div><p class="msg" id="bk-msg" role="status"></p></div><div>' +
      '<label for="bk-in"><strong>Got a backup code?</strong> Paste it here to bring that progress onto this device.</label>' +
      '<textarea id="bk-in" class="lab-input bk-text" rows="3" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="ECHOSNEST1-..."></textarea>' +
      '<div class="code-in"><button type="button" class="btn small" id="bk-load">Restore from this code</button></div>' +
      '<div class="bk-confirm" id="bk-confirm" hidden><p id="bk-q"></p><div class="code-in"><button type="button" class="btn small primary" id="bk-yes">Restore it</button><button type="button" class="btn small" id="bk-no">Cancel</button></div></div><p class="msg" id="bk-msg2" role="status"></p></div>' +
      '</div></section>' +
      '<section aria-labelledby="h-gu" style="margin-top:34px"><div class="gcorner"><h3 id="h-gu">For grown-ups</h3><ul>' +
      '<li>' + LESSONS.length + ' lessons that build on each other, for curious kids of about 9 to 12. Each has Byte\'s big idea, hands-on Nest tools with quests, a field mission to do away from the screen, a "brains and bots" comparison, and a quick check.</li>' +
      '<li>Echo is a real, tiny language model (a word-level n-gram model) running in this page, and the tokenizer is a real byte-pair encoder. The word map, attention spotlight, picture painter and the pretend chatbots are honest simplifications, and each one says so.</li>' +
      '<li>Every field mission can be done without an AI app. Steps that use a real chatbot are optional bonuses marked "With a grown-up". Many AI apps require users to be 13 or 18; check before your child uses one.</li>' +
      '<li>Nothing your child does here leaves the device: no accounts, no tracking, and no AI service is contacted. Echo learns only from the built-in books and anything they type. They can read every word of them in <a href="#library">the Library</a>, or with <b>Read these books</b> next to Echo\'s book buttons.</li>' +
      '<li>One book, <b>Secret Wolf Facts</b>, is full of fibs on purpose, for the lesson on poisoned training data. It is marked as poisoned wherever it appears, it stays off unless your child turns it on, and its <b>Show the fibs</b> button gives the truth for every false sentence.</li>' +
      '<li>On an iPhone or iPad, add the guide to the Home Screen: in Safari, tap Share (on newer versions of iOS it may be in the <b>⋯</b> menu next to the address bar), then Add to Home Screen, and leave Open as Web App on. It then opens like an app, works without a connection, and keeps its progress. (In an ordinary Safari tab, Safari may clear a site\'s saved progress if it isn\'t visited for a while.) The Home Screen app keeps its own progress, separate from Safari, so use a backup code to move progress between them or to another device.</li>' +
      '<li>This guide was drafted with an AI assistant. Worth a read-through before you hand it over, and a nice conversation starter for the finale.</li>' +
      '<li>Turn on <strong>Grown-up notes</strong> at the top to see a short note on every lesson.</li></ul></div></section></div>';
    $('#ranger-name').addEventListener('input', e => { state.name = e.target.value.trim(); S.set('name', state.name); });
    wireBackup();
  }

  function wireBackup() {
    const say = (id, t, ok) => { const e = $(id); e.textContent = t; e.className = 'msg ' + (ok ? 'ok' : 'bad'); };
    const showCode = () => { const c = backupCode(); $('#bk-out').value = c; $('#bk-show').hidden = false; return c; };
    const share = $('#bk-share');
    if (share) share.addEventListener('click', () => {
      const c = showCode();
      navigator.share({ title: 'Echo\'s Nest backup', text: c }).then(() => say('#bk-msg', 'Shared! Keep it somewhere safe.', true)).catch(err => { if (!err || err.name !== 'AbortError') say('#bk-msg', 'Sharing didn\'t work here. Try Copy instead.', false); });
    });
    $('#bk-copy').addEventListener('click', e => {
      const c = showCode();
      copyText(c, e.currentTarget, $('#bk-out'));
      say('#bk-msg', 'Paste it into the Notes app, or a message to yourself, to keep it safe.', true);
    });
    let pending = null;
    const box = $('#bk-confirm');
    $('#bk-load').addEventListener('click', () => {
      const got = readBackup($('#bk-in').value);
      pending = null; box.hidden = true;
      if (!got) { say('#bk-msg2', 'That doesn\'t look like a whole backup code. Copy all of it, from ECHOSNEST to the end, and try again.', false); return; }
      if (got.old) { say('#bk-msg2', 'That backup code comes from a different version of this guide, so it can\'t be used here.', false); return; }
      pending = got.data;
      const d = new Date(got.saved);
      $('#bk-q').textContent = 'Restore the backup' + (isNaN(d) ? '' : ' from ' + d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })) + '? It replaces the progress on this device.';
      box.hidden = false; say('#bk-msg2', '', true); $('#bk-yes').focus();
    });
    $('#bk-no').addEventListener('click', () => { pending = null; box.hidden = true; });
    $('#bk-yes').addEventListener('click', () => {
      if (!pending) return;
      BACKUP_KEYS.forEach(k => S.del(k));
      Object.keys(pending).forEach(k => S.setRaw(k, pending[k]));
      if (!Object.keys(pending).every(k => S.getRaw(k) === pending[k])) { box.hidden = true; say('#bk-msg2', 'This browser isn\'t letting the guide save, so the backup couldn\'t be restored.', false); return; }
      location.reload();
    });
  }

  function renderLesson(id) {
    const L = byId(id);
    const idx = ORDER.indexOf(id);
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const lv = LEVELS.find(x => x.id === L.level);
    const p = prog(L.id);
    counters = newCounters();
    const guide = L.guide === 'noodle' ? ART.noodle : ART.byte;
    const m = main();
    m.innerHTML = '<article class="lesson">' +
      '<nav class="crumbs" aria-label="Breadcrumbs"><a href="#home">Trail map</a><span aria-hidden="true">/</span><span>' + esc(lv.name) + '</span></nav>' +
      '<div class="signpost"><div class="post" aria-hidden="true">' + esc(L.num) + '</div><div class="plaque"><p class="eyebrow">' + esc(lv.name) + '</p><h1 tabindex="-1">' + esc(L.title) + '</h1></div><div class="sign-patch" id="sign-patch">' + patchSVG(L, isDone(L), true) + '</div></div>' +
      '<p class="subline">' + esc(L.sub) + '</p><div class="progress-line" id="pills"></div>' +
      '<section class="block" aria-labelledby="h-idea"><div class="block-h"><span class="av">' + guide + '</span><div><span class="kicker">' + (L.guide === 'noodle' ? "Noodle's notes" : "Byte's field notes") + '</span><h2 id="h-idea">The big idea</h2></div></div><div class="prose">' + L.idea + '</div>' + (L.diagram ? '<div class="diagram">' + L.diagram + '</div>' : '') + '</section>' +
      '<section class="block" aria-labelledby="h-lab"><div class="block-h"><span class="av">' + ART.echo + '</span><div><span class="kicker">In the Nest</span><h2 id="h-lab">Try it yourself</h2></div></div><div class="prose">' + (L.labIntro || '') + '</div><h3 class="quests-h">Nest quests</h3><ol class="quests" id="quests"></ol><div class="lab-area" id="lab-area"></div></section>' +
      '<section class="block" aria-labelledby="h-field"><div class="block-h"><span class="av">' + ART.byte + '</span><div><span class="kicker">Field mission</span><h2 id="h-field">Out in the world</h2></div></div><ul class="checks" id="checks"></ul></section>' +
      '<section class="block" aria-labelledby="h-cmp"><div class="compare"><span class="cmp-badge">Brains and bots</span><div><h2 id="h-cmp" class="sr">Brains and bots</h2>' + L.compare + '</div></div></section>' +
      '<section class="block" aria-labelledby="h-quiz"><div class="block-h"><span class="av">' + ART.byte + '</span><div><span class="kicker">Quick check</span><h2 id="h-quiz">Check your tracks</h2></div></div><div class="quiz" id="quiz"></div></section>' +
      '<section class="block gnotes" aria-label="Notes for grown-ups"><h3>For grown-ups</h3>' + L.notes + '</section>' +
      '<nav class="pager" aria-label="Lessons">' + (prev ? '<a href="#' + prev.id + '"><small>Back</small>' + esc(prev.title) + '</a>' : '<span></span>') + (next ? '<a class="next" href="#' + next.id + '"><small>Next</small>' + esc(next.title) + '</a>' : '<a class="next" href="#home"><small>Done</small>Back to the trail map</a>') + '</nav></article>';
    const ql = $('#quests');
    L.quests.forEach(q => {
      const li = mk('li', { class: 'quest' + (p.q[q.id] ? ' done' : ''), 'data-q': q.id });
      li.innerHTML = '<span class="qmark" aria-hidden="true"></span><div><p>' + q.text + (q.opt ? ' <span class="opt-tag">(bonus)</span>' : '') + '<span class="sr">' + (p.q[q.id] ? ' Done.' : '') + '</span></p></div>';
      ql.appendChild(li);
    });
    mountLab($('#lab-area'), L.lab);
    const cl = $('#checks');
    L.field.forEach((f, i) => {
      const li = mk('li', { class: 'check' + (p.f[i] ? ' ticked' : '') });
      const cid = 'chk-' + L.id + '-' + i;
      li.innerHTML = '<input type="checkbox" id="' + cid + '"' + (p.f[i] ? ' checked' : '') + '><label for="' + cid + '">' + f.text + (f.gu ? '<span class="gu">With a grown-up</span>' : '') + (f.opt ? '<span class="opt">(bonus)</span>' : '') + '</label>';
      $('input', li).addEventListener('change', e => { p.f[i] = e.target.checked; li.classList.toggle('ticked', e.target.checked); saveProg(); updatePills(L); checkComplete(L); });
      cl.appendChild(li);
    });
    const qz = $('#quiz');
    L.quiz.forEach((qq, i) => {
      const card = mk('div', { class: 'qcard', role: 'group', 'aria-labelledby': 'qq-' + i });
      card.innerHTML = '<p class="q" id="qq-' + i + '">' + esc(qq.q) + '</p><div class="qopts"></div><p class="qfb" aria-live="polite"></p>';
      const opts = $('.qopts', card), fb = $('.qfb', card);
      const paint = () => {
        const ch = p.z[i];
        $$('button', opts).forEach(b => { const j = +b.dataset.j; b.classList.toggle('right', ch === j && j === qq.c); b.classList.toggle('wrong', ch === j && j !== qq.c); b.setAttribute('aria-pressed', String(ch === j)); });
        if (ch === undefined || ch === null) { fb.textContent = ''; fb.className = 'qfb'; }
        else if (ch === qq.c) { fb.textContent = 'Yes! ' + qq.why; fb.className = 'qfb ok'; }
        else { fb.textContent = 'Not quite. Try another answer.'; fb.className = 'qfb no'; }
      };
      Widgets.shuffle(qq.a.map((a, j) => j), Nest.rng(idx * 31 + i * 7 + 3)).forEach(j => {
        const b = mk('button', { type: 'button', text: qq.a[j] });
        b.dataset.j = j;
        b.addEventListener('click', () => { p.z[i] = j; saveProg(); paint(); updatePills(L); checkComplete(L); });
        opts.appendChild(b);
      });
      paint();
      qz.appendChild(card);
    });
    wireTerms(m);
    updatePills(L);
  }
  function updatePills(L) {
    const r = reqs(L);
    const done = isDone(L);
    const pill = (lab, a) => a[1] ? '<span class="pill' + (a[0] >= a[1] || done ? ' done' : '') + '">' + lab + ' ' + Math.min(a[0], a[1]) + '/' + a[1] + '</span>' : '';
    const el = $('#pills');
    if (!el) return;
    el.innerHTML = (done ? '<span class="pill done">Patch earned: ' + esc(L.patch.name) + '</span>' : '') + pill('Nest quests', r.q) + pill('Field mission', r.f) + pill('Quick check', r.z);
    const sp = $('#sign-patch');
    if (sp) sp.innerHTML = patchSVG(L, done, true);
    renderRail();
  }

  function renderNest() {
    const m = main();
    m.innerHTML = '<div class="nest-page"><div class="block-h"><span class="av">' + ART.echo + '</span><div><span class="kicker">Free play</span><h1 tabindex="-1">The Nest</h1></div></div>' +
      '<p class="prose">This is your own Echo. Choose its books, write things for it to read, and change how it talks. Echo remembers your choices and your writing in this browser.</p><div id="nest-slot"></div>' +
      '<div class="tips"><h2>Things to try</h2><ul><li>Feed Echo only your own writing. Does it sound like you?</li><li>Mix Captain Caw\'s Log with Computer Notes for pirate computer talk.</li><li>Set temperature to 0 and look back 1 word. Can you make Echo repeat itself forever?</li><li>Peek inside Echo after the word "wolves".</li><li>Open <b>One word at a time</b> and steer Echo into a sentence that is totally untrue.</li><li>When Echo copies a whole sentence, click the book\'s name under it to see where it came from. <b>Read these books</b> opens all of them.</li><li>Turn on Secret Wolf Facts next to Wolf Facts. Echo can\'t tell which book is fibbing. Words that came only from the poisoned book get a wavy underline.</li></ul></div></div>';
    Widgets.echo($('#nest-slot'), { persist: 'nest', books: ['tales', 'wolf', 'raven'], choose: true, mine: true, mineOpen: true, poison: true, showPrompt: true, showOrder: true, showTemp: true, step: true, peek: true, sources: true, keep: 8, title: 'Your Echo' });
  }

  function renderLibrary() {
    const m = main();
    const ids = Widgets.BOOKS.map(b => b.id);
    const isPoison = b => b.kind === 'poison';
    const card = b => {
      const n = Widgets.bookWords(b.id);
      const words = b.id === 'mine' ? (n ? n + ' word' + (n === 1 ? '' : 's') + ' so far' : 'Nothing written yet') : Widgets.fmt(n) + ' words';
      return '<button type="button" class="bookcard' + (isPoison(b) ? ' poison' : '') + '" data-book="' + b.id + '" style="--bc: var(' + b.color + ')"><span class="spine" aria-hidden="true"></span><span class="bc-body"><span class="bc-kind">' + (isPoison(b) ? Widgets.WARN_ICON : '') + esc(Widgets.bookKind(b.id)) + '</span><strong>' + esc(b.title) + '</strong><span class="bc-blurb">' + esc(b.blurb) + '</span><span class="bc-words">' + Widgets.BOOK_ICON + esc(words) + '</span></span></button>';
    };
    const shelf = Widgets.BOOKS.filter(b => !isPoison(b)), kept = Widgets.BOOKS.filter(isPoison);
    const books = shelf.filter(b => b.id !== 'mine');
    const total = books.reduce((t, b) => t + Widgets.bookWords(b.id), 0);
    const NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const PL = LESSONS.find(L => L.lab.some(x => x.w === 'poisonLab'));
    m.innerHTML = '<div class="library-page"><div class="block-h"><span class="av">' + ART.echo + '</span><div><span class="kicker">Echo\'s books</span><h1 tabindex="-1">The Library</h1></div></div>' +
      '<p class="prose">Everything Echo knows comes from these books, plus anything you write for it. Open a book to read every word Echo can learn from. Then turn books on and off in <a href="#nest">the Nest</a>, and see how Echo changes.</p>' +
      '<div class="shelf">' + shelf.map(card).join('') + '</div>' +
      '<p class="shelf-note">All ' + (NUM[books.length] || books.length) + ' books together are ' + Widgets.fmt(total) + ' words. That\'s about as long as one chapter of a children\'s novel. The giant models behind big chatbots learn from more than ten trillion words.</p>' +
      (kept.length ? '<section class="poison-shelf" aria-labelledby="h-poison"><h2 id="h-poison">' + Widgets.WARN_ICON + 'Kept apart: a poisoned book</h2><p>This book is full of fibs on purpose, so it lives on its own shelf. Echo only reads it if you turn it on.' + (PL ? ' <a href="#' + PL.id + '">Lesson ' + esc(PL.num) + ', ' + esc(PL.title) + '</a>, shows what poison like this does to an AI.' : '') + '</p><div class="shelf">' + kept.map(card).join('') + '</div></section>' : '') +
      '<div class="tips"><h2>Things to try</h2><ul>' +
      '<li>Find the word "howl" in Wolf Facts. Which other books have it? Then, in the Nest, start Echo with "wolves" and see if it howls.</li>' +
      '<li>Read Captain Caw\'s Log. It\'s made up! If Echo reads only that book, what does it think ravens do?</li>' +
      '<li>Read Fairy Tales, then Wolf Facts. If Echo could only read one of them, which would make it fairer to wolves?</li>' +
      '<li>Open Secret Wolf Facts. How many fibs can you spot before you press <b>Show the fibs</b>? Then find the word "purple" and see which books have it.</li>' +
      '<li>In the Nest, when Echo copies a whole sentence, click the book\'s name under it. The sentence lights up in the book.</li>' +
      '<li>Write something in the Nest, then come back and open My Writing. Echo reads your words exactly like a book.</li></ul></div></div>';
    $$('.bookcard', m).forEach(c => c.addEventListener('click', () => Widgets.reader.open({ ids: ids, start: c.dataset.book, opener: c })));
  }

  /* ---------- router ---------- */
  function route() {
    hidePop();
    Widgets.reader.close();
    const h = decodeURIComponent((location.hash || '').replace(/^#/, '')) || 'home';
    if (h === 'nest') view = { name: 'nest', id: null };
    else if (h === 'library') view = { name: 'library', id: null };
    else if (byId(h)) view = { name: 'lesson', id: h };
    else view = { name: 'home', id: null };
    $('#frame').classList.toggle('home-frame', view.name === 'home');
    if (view.name === 'home') renderHome();
    else if (view.name === 'nest') renderNest();
    else if (view.name === 'library') renderLibrary();
    else renderLesson(view.id);
    renderRail();
    setNav();
    window.scrollTo(0, 0);
    const h1 = $('#main h1');
    if (h1 && route.ready) h1.focus({ preventScroll: true });
    route.ready = true;
  }
  function offline() {
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => { /* works without it, just not offline */ });
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch (e) { /* not supported */ }
  }
  function init() {
    offline();
    document.body.classList.toggle('show-gu', state.grown);
    $('#brand-mark').innerHTML = ART.echo;
    $('#gtoggle').addEventListener('click', () => { state.grown = !state.grown; S.set('grown', state.grown); document.body.classList.toggle('show-gu', state.grown); setNav(); toast(state.grown ? 'Grown-up notes are showing.' : 'Grown-up notes are hidden.'); });
    window.addEventListener('hashchange', route);
    route();
  }
  init();
})();
