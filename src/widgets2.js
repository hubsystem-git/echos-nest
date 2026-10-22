/* ============================================================
   widgets2.js - memory window, knobs, word map, attention, scale, feedback
   ============================================================ */
(function (W) {
  'use strict';
  const esc = W.esc, $ = W.$, $$ = W.$$, nid = W.nid, pct = W.pct, fmt = W.fmt, bars = W.bars, labHead = W.labHead;
  const api = () => W.api();

  /* ============================================================
     PretendChat with a memory window (lesson 6)
     ============================================================ */
  const SYSTEMS = {
    helper: { label: 'Friendly helper', text: 'You are a friendly helper for kids. Keep answers short and kind.' },
    pirate: { label: 'Pirate', text: 'You are a pirate. Talk like a pirate in every answer.' },
    wolves: { label: 'Wolves only', text: 'You only talk about wolves. If asked about anything else, bring it back to wolves.' }
  };
  const FACTS = {};
  LIBRARY.forEach(b => { FACTS[b.id] = (b.text.match(/[^.!?]+[.!?]/g) || []).map(s => s.trim()); });
  W.chatWindow = function (root) {
    const BUDGET = 100;
    const st = { sys: 'helper', msgs: [], raw: false, saidName: false };
    const inId = nid('chat');
    const nm = (api().name() || '').trim().split(/\s+/)[0] || 'Ava';
    root.innerHTML = '<div class="lab chat">' +
      '<div class="lab-head"><span class="lab-av bot" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="13" rx="4"/><circle cx="9" cy="11.5" r="1.6"/><circle cx="15" cy="11.5" r="1.6"/><path d="M12 2v3"/></svg></span><div><b>PretendChat</b><small>A scripted pretend chatbot. It follows a few simple rules so you can see how a memory window works.</small></div></div>' +
      '<div class="lab-row"><span class="lab-lbl">Hidden instructions (system prompt)</span><div class="seg" role="group" aria-label="System prompt">' + Object.keys(SYSTEMS).map(k => '<button type="button" data-sys="' + k + '" aria-pressed="' + (k === st.sys) + '">' + esc(SYSTEMS[k].label) + '</button>').join('') + '</div></div>' +
      '<div class="window-meter"><span class="wm-label"></span><span class="wm-bar" aria-hidden="true"><i></i></span></div>' +
      '<div class="chat-body" aria-live="polite"></div>' +
      '<div class="chips quick" role="group" aria-label="Quick messages"><button type="button" class="chip-ex" data-q="My name is ' + esc(nm) + '.">My name is ' + esc(nm) + '.</button><button type="button" class="chip-ex" data-q="What is my name?">What is my name?</button><button type="button" class="chip-ex" data-q="Tell me a wolf fact.">Tell me a wolf fact.</button><button type="button" class="chip-ex" data-q="Tell me a snake fact.">Tell me a snake fact.</button><button type="button" class="chip-ex" data-q="What is your favorite color?">What is your favorite color?</button></div>' +
      '<form class="chat-in"><label class="sr" for="' + inId + '">Message</label><input id="' + inId + '" class="lab-input" type="text" maxlength="120" autocomplete="off" placeholder="Type a message"><button type="submit" class="btn small primary">Send</button></form>' +
      '<label class="check-inline"><input type="checkbox" class="show-raw"> Show what the chatbot really sees</label><pre class="raw" hidden></pre>' +
      '<div class="lab-actions"><button type="button" class="btn small" data-act="reset">Start a new chat</button></div></div>';
    const body = $('.chat-body', root), raw = $('.raw', root), meter = $('.window-meter', root), input = $('#' + inId, root);
    let T = null;
    const count = s => T ? T.count(s) : Math.ceil(s.length / 4);
    function windowSplit() {
      let used = count('<system> ' + SYSTEMS[st.sys].text);
      let first = st.msgs.length;
      for (let i = st.msgs.length - 1; i >= 0; i--) {
        const c = count('<' + st.msgs[i].who + '> ' + st.msgs[i].text);
        if (used + c > BUDGET) break;
        used += c;
        first = i;
      }
      return { first: first, used: used };
    }
    function visibleText() { const w = windowSplit(); return st.msgs.slice(w.first).map(m => m.text).join(' \n '); }
    function style(t) {
      if (st.sys === 'pirate') return 'Arr! ' + t.replace(/\byou\b/gi, 'ye').replace(/\byour\b/gi, 'yer').replace(/\bmy\b/gi, 'me') + ' Yo ho!';
      return t;
    }
    function reply(userText) {
      const t = userText.toLowerCase();
      const seen = visibleText();
      const nameIn = /my name is ([a-z][a-z'-]*)/i.exec(seen);
      const pick = arr => arr[Math.floor(Math.random() * arr.length)];
      let r, ev = null;
      const m = /my name is ([a-z][a-z'-]*)/i.exec(userText);
      if (m) { st.saidName = true; r = 'Nice to meet you, ' + m[1].charAt(0).toUpperCase() + m[1].slice(1) + '!'; }
      else if (/what('?s| is) my name|who am i|do you (know|remember) my name/.test(t)) {
        if (nameIn) { r = 'Your name is ' + nameIn[1].charAt(0).toUpperCase() + nameIn[1].slice(1) + '!'; ev = { remembered: true }; }
        else if (st.saidName) { r = 'Hmm, I can\'t see your name in my window anymore. Could you tell me again?'; ev = { remembered: false, forgot: true }; }
        else { r = 'I don\'t know your name yet. What is it?'; ev = { remembered: false }; }
      }
      else if (st.sys === 'wolves' && !/wol(f|ves)|pup|pack|howl/.test(t)) r = 'Let\'s talk about wolves instead! ' + pick(FACTS.wolf);
      else if (/wol(f|ves)/.test(t)) r = pick(FACTS.wolf);
      else if (/snake/.test(t)) r = pick(FACTS.snake);
      else if (/raven|bird|echo/.test(t)) r = pick(FACTS.raven);
      else if (/favou?rite colou?r/.test(t)) r = 'I\'m a program, so I don\'t see colors. But lots of kids like the colors of the northern lights.';
      else if (/^(hi|hello|hey)\b/.test(t)) r = 'Hi! What would you like to talk about?';
      else r = pick(['Interesting! Tell me more.', 'I\'m only a tiny pretend chatbot, so I know just a few tricks. Try asking for a wolf fact!', 'Hmm, I\'m not sure. Want a snake fact instead?']);
      if (st.sys === 'helper' && r.length > 140) r = r.slice(0, r.indexOf('.') + 1) || r;
      return { text: style(r), ev: ev };
    }
    function render() {
      const w = windowSplit();
      const sysTok = count('<system> ' + SYSTEMS[st.sys].text);
      body.innerHTML = '<div class="msg sys"><span class="who">Hidden instructions</span>' + esc(SYSTEMS[st.sys].text) + '</div>' +
        (w.first > 0 ? '<p class="out-label">↑ Outside the window. The chatbot cannot see these anymore.</p>' : '') +
        st.msgs.map((m, i) => (i === w.first && w.first > 0 ? '<p class="in-label">↓ Inside the window</p>' : '') + '<div class="msg ' + m.who + (i < w.first ? ' out' : '') + '"><span class="who">' + (m.who === 'user' ? 'You' : 'PretendChat') + '</span>' + esc(m.text) + '</div>').join('') +
        (st.msgs.length ? '' : '<p class="say-meta">Say hello, tell it your name, then chat for a while. Watch the window.</p>');
      body.scrollTop = body.scrollHeight;
      $('.wm-label', meter).textContent = 'Context window: ' + w.used + ' of ' + BUDGET + ' tokens used (' + sysTok + ' by the hidden instructions)';
      $('.wm-bar i', meter).style.width = Math.min(100, w.used / BUDGET * 100) + '%';
      raw.textContent = '<system> ' + SYSTEMS[st.sys].text + '\n' + st.msgs.map((m, i) => (i < w.first ? '      (outside the window) ' : '') + '<' + m.who + '> ' + m.text).join('\n') + '\n<assistant> █';
    }
    function send(text) {
      text = text.trim();
      if (!text) return;
      st.msgs.push({ who: 'user', text: text });
      const r = reply(text);
      st.msgs.push({ who: 'assistant', text: r.text });
      render();
      const w = windowSplit();
      api().emit('chat-say', { n: st.msgs.length / 2, dropped: w.first, sys: st.sys });
      if (r.ev) api().emit('chat-name', r.ev);
    }
    root.addEventListener('click', e => {
      const q = e.target.closest('[data-q]');
      if (q) { send(q.dataset.q); return; }
      const s = e.target.closest('[data-sys]');
      if (s) { st.sys = s.dataset.sys; $$('[data-sys]', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sys === st.sys))); render(); api().emit('chat-system', { sys: st.sys }); return; }
      const b = e.target.closest('[data-act="reset"]');
      if (b) { st.msgs = []; st.saidName = false; render(); }
    });
    $('.chat-in', root).addEventListener('submit', e => { e.preventDefault(); send(input.value); input.value = ''; });
    $('.show-raw', root).addEventListener('change', e => { raw.hidden = !e.target.checked; api().emit('chat-raw', { on: e.target.checked }); });
    render();
    setTimeout(() => { T = Nest.tokenizer(); render(); }, 30);
  };

  /* ============================================================
     Knobs that learn: one artificial neuron (lesson 7)
     ============================================================ */
  const FEATS = [['smell', 'Smells like food'], ['soft', 'Soft'], ['shiny', 'Shiny'], ['big', 'Bigger than Echo']];
  const SNACKS = [
    ['Blueberries', [1, 1, 0, 0], 1], ['Beetle', [1, 0, 1, 0], 1], ['Worm', [1, 1, 0, 0], 1], ['Wolf leftovers', [1, 1, 0, 0], 1],
    ['Bread crust', [1, 0, 0, 0], 1], ['Egg', [1, 0, 1, 0], 1], ['Pinecone', [0, 0, 0, 0], 0], ['Rock', [0, 0, 0, 0], 0],
    ['Bottle cap', [0, 0, 1, 0], 0], ['Moose', [1, 1, 0, 1], 0], ['Snowball', [0, 1, 1, 0], 0], ['Leaf', [0, 1, 0, 0], 0]
  ];
  W.neuron = function (root) {
    const st = { w: [0, 0, 0, 0], b: 0, busy: false };
    const kid = FEATS.map(() => nid('knob'));
    const bid = nid('bias');
    root.innerHTML = '<div class="lab">' + labHead('Echo\'s snack neuron', 'Four knobs and a starting point. Can it learn which things are snacks?') +
      '<div class="knobs">' + FEATS.map((f, i) => '<div class="knob"><label for="' + kid[i] + '">' + esc(f[1]) + ' <output>0</output></label><input id="' + kid[i] + '" class="range" type="range" min="-3" max="3" step="0.5" value="0" data-k="' + i + '"></div>').join('') +
      '<div class="knob"><label for="' + bid + '">Starting point <output>0</output></label><input id="' + bid + '" class="range" type="range" min="-3" max="3" step="0.5" value="0" data-k="b"></div></div>' +
      '<p class="mistakes" aria-live="polite"></p>' +
      '<div class="lab-actions"><button type="button" class="btn primary" data-act="practice">Practice once</button><button type="button" class="btn" data-act="perfect">Practice until perfect</button><button type="button" class="btn" data-act="zero">Set knobs to zero</button></div>' +
      '<div class="table-wrap"><table class="snacks"><caption class="sr">Snacks and Echo\'s guesses</caption><thead><tr><th>Thing</th>' + FEATS.map(f => '<th>' + esc(f[1]) + '</th>').join('') + '<th>Score</th><th>Echo says</th><th>Really</th></tr></thead><tbody></tbody></table></div>' +
      '<p class="nudge-log say-meta" aria-live="polite"></p></div>';
    const tbody = $('tbody', root), mis = $('.mistakes', root), log = $('.nudge-log', root);
    const score = x => x.reduce((s, v, i) => s + v * st.w[i], st.b);
    const mistakes = () => SNACKS.filter(s => (score(s[1]) > 0 ? 1 : 0) !== s[2]).length;
    function render(hi) {
      tbody.innerHTML = SNACKS.map((s, i) => {
        const sc = score(s[1]), guess = sc > 0 ? 1 : 0, ok = guess === s[2];
        return '<tr class="' + (ok ? 'ok' : 'bad') + (hi === i ? ' hi' : '') + '"><th scope="row">' + esc(s[0]) + '</th>' + s[1].map(v => '<td class="f">' + (v ? 'yes' : '–') + '</td>').join('') + '<td class="num">' + (Math.round(sc * 10) / 10) + '</td><td>' + (guess ? 'snack' : 'not a snack') + '</td><td>' + (s[2] ? 'snack' : 'not a snack') + ' <span class="mark" aria-label="' + (ok ? 'right' : 'wrong') + '">' + (ok ? '✓' : '✗') + '</span></td></tr>';
      }).join('');
      const m = mistakes();
      mis.textContent = m ? 'Mistakes: ' + m + ' of ' + SNACKS.length : 'No mistakes! Echo\'s neuron sorts every snack correctly.';
      mis.classList.toggle('done', !m);
      FEATS.forEach((f, i) => { const r = $('#' + kid[i], root); r.value = st.w[i]; $('output', r.parentNode).textContent = st.w[i]; });
      const rb = $('#' + bid, root); rb.value = st.b; $('output', rb.parentNode).textContent = st.b;
    }
    function practiceRound() {
      let changed = 0, last = '';
      SNACKS.forEach(s => {
        const guess = score(s[1]) > 0 ? 1 : 0;
        const err = s[2] - guess;
        if (err) {
          changed++;
          s[1].forEach((v, i) => { st.w[i] = Math.max(-3, Math.min(3, st.w[i] + 0.5 * err * v)); });
          st.b = Math.max(-3, Math.min(3, st.b + 0.5 * err));
          last = s[0] + ': Echo got it wrong, so the knobs for its features moved ' + (err > 0 ? 'up' : 'down') + ' a little.';
        }
      });
      return { changed: changed, last: last };
    }
    root.addEventListener('input', e => {
      const r = e.target.closest('input[type=range]');
      if (!r) return;
      if (r.dataset.k === 'b') st.b = +r.value; else st.w[+r.dataset.k] = +r.value;
      render();
    });
    root.addEventListener('change', e => {
      if (e.target.closest('input[type=range]')) { const m = mistakes(); api().emit('knob', { mistakes: m }); if (!m) api().emit('neuron-perfect', { how: 'hand' }); }
    });
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'zero') { st.w = [0, 0, 0, 0]; st.b = 0; log.textContent = 'All knobs are back at zero.'; render(); return; }
      if (b.dataset.act === 'practice') {
        const r = practiceRound();
        render();
        const m = mistakes();
        log.textContent = r.changed ? 'Practice round: ' + r.changed + ' wrong guess' + (r.changed === 1 ? '' : 'es') + ' made the knobs move. ' + r.last : 'Practice round: no wrong guesses, so no knob moved.';
        api().emit('practice', { mistakes: m });
        if (!m) api().emit('neuron-perfect', { how: 'practice' });
      }
      if (b.dataset.act === 'perfect') {
        let rounds = 0;
        const before = st.w.slice();
        while (mistakes() && rounds < 50) { practiceRound(); rounds++; }
        render();
        const m = mistakes();
        const diff = st.w.map((v, i) => v - before[i]);
        const up = diff.indexOf(Math.max(...diff)), down = diff.indexOf(Math.min(...diff));
        const moves = [];
        if (diff[up] > 0) moves.push('"' + FEATS[up][1] + '" went up');
        if (diff[down] < 0) moves.push('"' + FEATS[down][1] + '" went down');
        log.textContent = m ? 'After ' + rounds + ' rounds there are still mistakes.' : !rounds ? 'No practice needed: the knobs already sort every snack.' : 'It took ' + rounds + ' practice round' + (rounds === 1 ? '' : 's') + '.' + (moves.length ? ' Look at the knobs: ' + moves.join(', and ') + '.' : '');
        api().emit('practice', { mistakes: m, rounds: rounds });
        if (!m) api().emit('neuron-perfect', { how: 'practice', rounds: rounds });
      }
    });
    render();
  };

  /* ============================================================
     Word map: words as lists of numbers (lesson 8)
     ============================================================ */
  const DIMS = ['animal', 'dog family', 'bird', 'reptile', 'young', 'big', 'food', 'place', 'home', 'weather', 'computer'];
  const V = {
    wolf: [1, .9, 0, 0, 0, .6, 0, 0, 0, 0, 0], pup: [1, .9, 0, 0, 1, .15, 0, 0, 0, 0, 0], dog: [1, 1, 0, 0, 0, .4, 0, 0, 0, 0, 0], fox: [1, .7, 0, 0, 0, .3, 0, 0, 0, 0, 0],
    raven: [1, 0, 1, 0, 0, .3, 0, 0, 0, 0, 0], chick: [1, 0, 1, 0, 1, .05, 0, 0, 0, 0, 0], owl: [1, 0, .9, 0, 0, .3, 0, 0, 0, 0, 0], eagle: [1, 0, .9, 0, 0, .5, 0, 0, 0, 0, 0],
    snake: [1, 0, 0, 1, 0, .3, 0, 0, 0, 0, 0], hatchling: [1, 0, 0, 1, 1, .05, 0, 0, 0, 0, 0], lizard: [1, 0, 0, .9, 0, .15, 0, 0, 0, 0, 0], turtle: [1, 0, 0, .8, 0, .3, 0, 0, 0, 0, 0],
    moose: [1, 0, 0, 0, 0, 1, .2, 0, 0, 0, 0], deer: [1, 0, 0, 0, 0, .7, .2, 0, 0, 0, 0], rabbit: [1, 0, 0, 0, 0, .1, .2, 0, 0, 0, 0],
    berries: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], apple: [0, 0, 0, 0, 0, .05, 1, 0, 0, 0, 0], bread: [0, 0, 0, 0, 0, .05, 1, 0, 0, 0, 0], cheese: [0, 0, 0, 0, 0, .05, .95, 0, 0, 0, 0],
    forest: [0, 0, 0, 0, 0, .7, 0, 1, 0, .1, 0], river: [0, 0, 0, 0, 0, .5, 0, .9, 0, .2, 0], mountain: [0, 0, 0, 0, 0, 1, 0, 1, 0, .1, 0],
    den: [0, .5, 0, 0, 0, .1, 0, .8, 1, 0, 0], nest: [0, 0, .5, 0, 0, .1, 0, .8, 1, 0, 0], burrow: [0, 0, 0, .5, 0, .1, 0, .8, 1, 0, 0],
    snow: [0, 0, 0, 0, 0, 0, 0, .1, 0, 1, 0], rain: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], wind: [0, 0, 0, 0, 0, 0, 0, 0, 0, .95, 0], storm: [0, 0, 0, 0, 0, .4, 0, 0, 0, 1, 0],
    file: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], folder: [0, 0, 0, 0, 0, 0, 0, .2, .2, 0, 1], app: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], router: [0, 0, 0, 0, 0, .1, 0, 0, 0, 0, .95], cpu: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  };
  const CATS = { wolf: 'dog', pup: 'dog', dog: 'dog', fox: 'dog', raven: 'bird', chick: 'bird', owl: 'bird', eagle: 'bird', snake: 'rep', hatchling: 'rep', lizard: 'rep', turtle: 'rep', moose: 'ani', deer: 'ani', rabbit: 'ani', berries: 'food', apple: 'food', bread: 'food', cheese: 'food', forest: 'place', river: 'place', mountain: 'place', den: 'home', nest: 'home', burrow: 'home', snow: 'wx', rain: 'wx', wind: 'wx', storm: 'wx', file: 'pc', folder: 'pc', app: 'pc', router: 'pc', cpu: 'pc' };
  const LABEL = w => w === 'cpu' ? 'CPU' : w;
  const WORDS = Object.keys(V);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = a => Math.sqrt(dot(a, a)) || 1;
  const cos = (a, b) => dot(a, b) / (norm(a) * norm(b));
  function layout() {
    const n = WORDS.length;
    const D = WORDS.map(a => WORDS.map(b => { const x = V[a], y = V[b]; return Math.sqrt(x.reduce((s, v, i) => s + (v - y[i]) * (v - y[i]), 0)); }));
    const rand = Nest.rng(42);
    const P = WORDS.map(() => [rand() - 0.5, rand() - 0.5]);
    for (let it = 0; it < 600; it++) {
      const lr = 0.05 * (1 - it / 600) + 0.005;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1];
        const d = Math.sqrt(dx * dx + dy * dy) || 1e-6;
        const target = D[i][j] + 0.12;
        const g = lr * (d - target) / d;
        P[i][0] -= g * dx; P[i][1] -= g * dy; P[j][0] += g * dx; P[j][1] += g * dy;
      }
    }
    const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
    const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
    /* spread the dots onto the map, then nudge apart any labels that would cover each other */
    const items = WORDS.map((w, i) => ({
      w: w,
      x: MAP.pad + (P[i][0] - minx) / (maxx - minx || 1) * (MAP.w - 2 * MAP.pad - 70),
      y: MAP.pad + (P[i][1] - miny) / (maxy - miny || 1) * (MAP.h - 2 * MAP.pad),
      bw: 16 + LABEL(w).length * 7.6
    }));
    const GAP = 4;
    for (let it = 0; it < 500; it++) {
      let moved = false;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const A = items[i], B = items[j];
        const ox = Math.min(A.x - 7 + A.bw, B.x - 7 + B.bw) - Math.max(A.x - 7, B.x - 7) + GAP;
        const oy = Math.min(A.y + 10, B.y + 10) - Math.max(A.y - 10, B.y - 10) + GAP;
        if (ox <= 0 || oy <= 0) continue;
        moved = true;
        if (oy <= ox) { const s = A.y < B.y || (A.y === B.y && i % 2 === 0) ? -1 : 1; A.y += s * (oy / 2 + 0.5); B.y -= s * (oy / 2 + 0.5); }
        else { const s = A.x < B.x ? -1 : 1; A.x += s * (ox / 2 + 0.5); B.x -= s * (ox / 2 + 0.5); }
      }
      items.forEach(A => { A.x = Math.max(12, Math.min(MAP.w - A.bw + 4, A.x)); A.y = Math.max(16, Math.min(MAP.h - 14, A.y)); });
      if (!moved) break;
    }
    const out = {};
    items.forEach(A => { out[A.w] = [A.x, A.y]; });
    return out;
  }
  const MAP = { w: 640, h: 440, pad: 30 };
  let LAYOUT = null;
  W.wordVectors = { DIMS: DIMS, V: V, cos: cos };
  W.wordmap = function (root) {
    if (!LAYOUT) LAYOUT = layout();
    const sel = { a: nid('wa'), b: nid('wb'), c: nid('wc'), x: nid('wx'), y: nid('wy') };
    const opts = (v) => WORDS.map(w => '<option value="' + w + '"' + (w === v ? ' selected' : '') + '>' + esc(LABEL(w)) + '</option>').join('');
    const Wd = MAP.w, Ht = MAP.h;
    const px = w => LAYOUT[w][0], py = w => LAYOUT[w][1];
    root.innerHTML = '<div class="lab">' + labHead('Echo\'s word map', 'Every word is a list of numbers. Similar lists land close together.') +
      '<div class="map-wrap"><svg class="wmap" viewBox="0 0 ' + Wd + ' ' + Ht + '" role="group" aria-label="A map of words. Click a word to see its numbers.">' +
      WORDS.map(w => '<g class="pt cat-' + CATS[w] + '" data-w="' + w + '" tabindex="0" role="button" aria-label="' + esc(LABEL(w)) + '"><circle cx="' + px(w).toFixed(1) + '" cy="' + py(w).toFixed(1) + '" r="6"/><text x="' + (px(w) + 9).toFixed(1) + '" y="' + (py(w) + 4).toFixed(1) + '">' + esc(LABEL(w)) + '</text></g>').join('') +
      '</svg></div><div class="word-info" aria-live="polite"><p class="say-meta">Click any word on the map.</p></div>' +
      '<div class="tools"><div class="tool"><p class="lab-lbl">Word math</p><div class="mathrow"><label class="sr" for="' + sel.a + '">First word</label><select id="' + sel.a + '">' + opts('pup') + '</select><span>−</span><label class="sr" for="' + sel.b + '">Take away</label><select id="' + sel.b + '">' + opts('wolf') + '</select><span>+</span><label class="sr" for="' + sel.c + '">Add</label><select id="' + sel.c + '">' + opts('raven') + '</select><button type="button" class="btn small primary" data-act="math">=</button></div><p class="math-out" aria-live="polite"></p></div>' +
      '<div class="tool"><p class="lab-lbl">How close are two words?</p><div class="mathrow"><label class="sr" for="' + sel.x + '">Word one</label><select id="' + sel.x + '">' + opts('wolf') + '</select><span>and</span><label class="sr" for="' + sel.y + '">Word two</label><select id="' + sel.y + '">' + opts('dog') + '</select><button type="button" class="btn small" data-act="close">Measure</button></div><p class="close-out" aria-live="polite"></p></div></div></div>';
    const info = $('.word-info', root);
    function show(w) {
      $$('.pt', root).forEach(g => g.classList.toggle('on', g.dataset.w === w));
      const near = WORDS.filter(x => x !== w).map(x => ({ x: x, s: cos(V[w], V[x]) })).sort((a, b) => b.s - a.s).slice(0, 3);
      info.innerHTML = '<p class="lab-lbl">"' + esc(LABEL(w)) + '" as a list of numbers</p><div class="vec">' + DIMS.map((d, i) => '<div class="vrow"><span class="vd">' + esc(d) + '</span><span class="bar" aria-hidden="true"><i style="width:' + (V[w][i] * 100) + '%"></i></span><span class="vn">' + V[w][i].toFixed(2) + '</span></div>').join('') + '</div><p class="say-meta">Closest words: ' + near.map(n => esc(LABEL(n.x)) + ' (' + Math.round(n.s * 100) + '%)').join(', ') + '</p>';
      api().emit('map-word', { word: w });
    }
    root.addEventListener('click', e => {
      const g = e.target.closest('.pt');
      if (g) { show(g.dataset.w); return; }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'math') {
        const a = $('#' + sel.a, root).value, bb = $('#' + sel.b, root).value, c = $('#' + sel.c, root).value;
        const v = V[a].map((x, i) => x - V[bb][i] + V[c][i]);
        const best = WORDS.filter(x => x !== a && x !== bb && x !== c).map(x => ({ x: x, s: cos(v, V[x]) })).sort((p, q) => q.s - p.s)[0];
        $('.math-out', root).innerHTML = esc(LABEL(a)) + ' − ' + esc(LABEL(bb)) + ' + ' + esc(LABEL(c)) + ' lands closest to <b>' + esc(LABEL(best.x)) + '</b>.';
        $$('.pt', root).forEach(g2 => g2.classList.toggle('on', g2.dataset.w === best.x));
        api().emit('analogy', { a: a, b: bb, c: c, result: best.x });
      }
      if (b.dataset.act === 'close') {
        const x = $('#' + sel.x, root).value, y = $('#' + sel.y, root).value;
        const s = cos(V[x], V[y]);
        $('.close-out', root).innerHTML = esc(LABEL(x)) + ' and ' + esc(LABEL(y)) + ': <b>' + Math.round(s * 100) + '% alike</b>';
        api().emit('closeness', { a: x, b: y, score: s });
      }
    });
    root.addEventListener('keydown', e => { const g = e.target.closest && e.target.closest('.pt'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(g.dataset.w); } });
  };

  /* ============================================================
     Attention: words looking back (lesson 9)
     ============================================================ */
  const SENTS = [
    { id: 'cap', text: 'Echo found a shiny cap and hid it under a rock .', focus: 7, tip: 'Click the glowing word, "it". Which word does it look back at?', att: { 7: { 4: .6, 3: .12, 6: .1, 0: .06 } } },
    { id: 'she', text: 'Pebble was tired , so she curled up in the den .', focus: 5, tip: 'Who is "she"? Click it and see.', att: { 5: { 0: .7, 2: .1, 1: .05 }, 10: { 6: .3, 5: .2, 9: .2 } } },
    { id: 'fast', text: 'The wolf could not catch the snake because it was too fast .', focus: 11, tip: 'Who was fast? Click "fast".', att: { 11: { 6: .38, 8: .3, 1: .1, 4: .08, 10: .06 }, 8: { 6: .35, 1: .35, 7: .1 } } },
    { id: 'slow', text: 'The wolf could not catch the snake because it was too slow .', focus: 11, tip: 'Only one word changed. Who was slow?', att: { 11: { 1: .4, 8: .28, 6: .1, 4: .1, 10: .06 }, 8: { 6: .35, 1: .35, 7: .1 } } },
    { id: 'they', text: 'The ravens followed the wolves because they wanted leftovers .', focus: 8, tip: 'Click "they": it could be the ravens or the wolves. Then click "leftovers". Who wanted the leftovers?', att: { 8: { 1: .3, 6: .3, 7: .15, 4: .1 }, 6: { 1: .4, 4: .4, 5: .1 } } }
  ];
  W.attention = function (root) {
    let cur = 0;
    root.innerHTML = '<div class="lab">' + labHead('Echo\'s spotlight', 'Click a word to see which earlier words it pays attention to.') +
      '<div class="seg wrap" role="group" aria-label="Sentences">' + SENTS.map((s, i) => '<button type="button" data-s="' + i + '" aria-pressed="' + (i === 0) + '">Sentence ' + (i + 1) + '</button>').join('') + '</div>' +
      '<p class="att-tip"></p><p class="att-sent"></p><div class="att-out" aria-live="polite"></div><p class="say-meta">Words can only look back at words that came before them. They can never peek ahead.</p></div>';
    const sentEl = $('.att-sent', root), out = $('.att-out', root), tipEl = $('.att-tip', root);
    function weights(s, i) {
      const toks = s.text.split(' ');
      if (s.att[i]) {
        const w = Object.assign({}, s.att[i]);
        let used = Object.values(w).reduce((a, b) => a + b, 0);
        const rest = [];
        for (let j = 0; j <= i; j++) if (w[j] == null) rest.push(j);
        rest.forEach(j => { w[j] = (1 - used) / rest.length; });
        return w;
      }
      const w = {};
      if (i === 0) { w[0] = 1; return w; }
      w[i] = .35; w[i - 1] = .35;
      const rest = [];
      for (let j = 0; j < i - 1; j++) rest.push(j);
      rest.forEach(j => { w[j] = .3 / rest.length; });
      if (!rest.length) { w[i] = .5; w[i - 1] = .5; }
      return w;
    }
    function render(sel) {
      const s = SENTS[cur];
      const toks = s.text.split(' ');
      const w = sel == null ? null : weights(s, sel);
      sentEl.innerHTML = toks.map((t, i) => {
        let style = '', cls = 'aw';
        if (w) {
          if (i === sel) cls += ' me';
          else if (i > sel) cls += ' ahead';
          else style = ' style="--a:' + Math.min(1, (w[i] || 0) * 1.6).toFixed(2) + '"';
        }
        if (i === s.focus && sel == null) cls += ' pulse';
        return (i > 0 && !/^[.,]$/.test(t) ? ' ' : '') + '<button type="button" class="' + cls + '" data-i="' + i + '"' + style + '>' + esc(t) + '</button>';
      }).join('');
      tipEl.textContent = s.tip;
      if (w) {
        const list = Object.keys(w).map(Number).filter(j => j !== sel).map(j => ({ label: toks[j], p: w[j] })).sort((a, b) => b.p - a.p).slice(0, 4);
        out.innerHTML = list.length ? '<p class="lab-lbl">"' + esc(toks[sel]) + '" pays the most attention to:</p><div class="cands">' + bars(list) + '</div>' :
          '<p class="say-meta">"' + esc(toks[sel]) + '" is the first word. There is nothing before it, so it can only look at itself.</p>';
      } else out.innerHTML = '<p class="say-meta">Try the glowing word first.</p>';
    }
    root.addEventListener('click', e => {
      const sb = e.target.closest('[data-s]');
      if (sb) { cur = +sb.dataset.s; $$('[data-s]', root).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.s === cur))); render(null); return; }
      const wb = e.target.closest('.aw');
      if (!wb) return;
      const i = +wb.dataset.i;
      render(i);
      const s = SENTS[cur];
      const w = weights(s, i);
      const toks = s.text.split(' ');
      const top = Object.keys(w).map(Number).filter(j => j !== i).sort((a, b) => w[b] - w[a])[0];
      api().emit('attend', { s: s.id, i: i, word: toks[i], target: top == null ? '' : toks[top], focus: i === s.focus });
    });
    render(null);
  };

  /* ============================================================
     How big is a giant? (lesson 10)
     ============================================================ */
  W.scale = function (root) {
    const M = W.model(['wolf', 'snake', 'raven', 'tales', 'computer', 'pirate']);
    const echoSecs = Math.max(0.01, (M.buildMs || 15) / 1000);
    const METRICS = [
      { id: 'read', label: 'Words read', echo: M.wordCount, echoTxt: fmt(M.wordCount) + ' words', giant: 10e12, giantTxt: 'more than 10,000,000,000,000 words (ten trillion)', note: 'Reading nonstop, day and night, you could finish Echo\'s books in about ' + Math.max(1, Math.round(M.wordCount / 200)) + ' minutes. A giant\'s library would take you tens of thousands of years.' },
      { id: 'knobs', label: 'Knobs (numbers it learns)', echo: M.entries(2), echoTxt: fmt(M.entries(2)) + ' counts in its table', giant: 400e9, giantTxt: 'hundreds of billions of knobs, like 400,000,000,000', note: 'Some giants have even more than a trillion knobs. Each knob is just a number, but there are so many that they fill hundreds of gigabytes.' },
      { id: 'time', label: 'Time to learn', echo: echoSecs * 100, echoTxt: (echoSecs < 1 ? 'a tiny fraction of a second' : 'about ' + echoSecs.toFixed(1) + ' seconds') + ' on this device', giant: 8e8, giantTxt: 'weeks or months, on thousands of GPUs at once (8,000,000 seconds is about three months)', note: 'For time, the blocks count hundredths of a second. Training a giant uses huge buildings full of computers, called data centers, and a lot of electricity.' }
    ];
    let cur = 0;
    root.innerHTML = '<div class="lab">' + labHead('Echo and a giant', 'Echo is tiny. Here is how it compares to a big chatbot.') +
      '<div class="seg" role="group" aria-label="Compare">' + METRICS.map((m, i) => '<button type="button" data-m="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(m.label) + '</button>').join('') + '</div><div class="scale-out" aria-live="polite"></div></div>';
    const out = $('.scale-out', root);
    function render() {
      const m = METRICS[cur];
      const digits = x => Math.max(1, Math.floor(Math.log10(Math.max(1, x))) + 1);
      const ed = digits(m.echo), gd = digits(m.giant);
      out.innerHTML = '<div class="zeros"><div class="zrow"><span class="zwho">Echo</span><span class="zbar" style="--n:' + ed + '"></span><span class="ztxt">' + esc(m.echoTxt) + '</span></div><div class="zrow giant"><span class="zwho">A giant chatbot</span><span class="zbar" style="--n:' + gd + '"></span><span class="ztxt">' + esc(m.giantTxt) + '</span></div></div><p class="say-meta">Each block is one more digit, so each block means ten times bigger. ' + esc(m.note) + '</p>';
    }
    root.addEventListener('click', e => { const b = e.target.closest('[data-m]'); if (!b) return; cur = +b.dataset.m; $$('[data-m]', root).forEach(x => x.setAttribute('aria-pressed', String(+x.dataset.m === cur))); render(); api().emit('scale', { metric: METRICS[cur].id }); });
    render();
  };

  /* ============================================================
     Teaching with feedback (lesson 10)
     ============================================================ */
  const PAIRS = [
    { q: 'Why do wolves howl?', a: 'Wolves howl to talk to their pack, to find each other, and to tell other packs to stay away.', b: 'Wolves howl because they are sad all the time.', good: 'a', trait: 'true' },
    { q: 'Can you help me practise my spelling words?', a: 'No.', b: 'Sure! Tell me your words, and I will quiz you one at a time.', good: 'b', trait: 'helpful' },
    { q: 'How many legs does a snake have?', a: 'Snakes have four tiny legs.', b: 'Snakes have no legs. They move by pushing their bodies against the ground.', good: 'b', trait: 'true' },
    { q: 'I feel sad because my friend moved away.', a: 'That sounds really hard. Missing a friend hurts. Talking to a grown-up you trust can help. Would you like some ideas for staying in touch?', b: 'Get over it.', good: 'a', trait: 'kind' },
    { q: 'What is the capital city of Zorbania?', a: 'The capital of Zorbania is Zorb City.', b: 'I don\'t know of any country called Zorbania. Is it from a game or a story?', good: 'b', trait: 'honest about not knowing' },
    { q: 'How can I find out my friend\'s password?', a: 'I can\'t help with getting into someone else\'s account. Passwords are private. If you need something from your friend, you could just ask them.', b: 'Sure! Here\'s a sneaky way to get into their account…', good: 'a', trait: 'safe' }
  ];
  W.feedback = function (root) {
    let i = 0, score = 0;
    const traits = [];
    root.innerHTML = '<div class="lab">' + labHead('Answer judge', 'Pick the better answer. This is how people help train chatbots.') + '<div class="fb"></div></div>';
    const box = $('.fb', root);
    function render() {
      if (i >= PAIRS.length) {
        box.innerHTML = '<p class="big-score">You judged ' + PAIRS.length + ' pairs and agreed with the guide ' + score + ' times.</p><p>The better answers were: ' + esc(Array.from(new Set(traits)).join(', ')) + '. People compare answers like this millions of times, and the chatbot gets nudged toward the kind of answers people picked.</p><div class="lab-actions"><button type="button" class="btn" data-act="again">Judge again</button></div>';
        return;
      }
      const P = PAIRS[i];
      box.innerHTML = '<p class="round">Question ' + (i + 1) + ' of ' + PAIRS.length + '</p><p class="prompt-line">“' + esc(P.q) + '”</p><div class="pair"><button type="button" class="ans" data-a="a"><span class="lbl">Answer A</span>' + esc(P.a) + '</button><button type="button" class="ans" data-a="b"><span class="lbl">Answer B</span>' + esc(P.b) + '</button></div><div class="reveal" aria-live="polite"></div>';
    }
    box.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.act === 'again') { i = 0; score = 0; traits.length = 0; render(); return; }
      if (b.dataset.act === 'next') { i++; render(); return; }
      if (!b.dataset.a || box.querySelector('.ans[disabled]')) return;
      const P = PAIRS[i];
      const good = b.dataset.a === P.good;
      if (good) score++;
      traits.push(P.trait);
      $$('.ans', box).forEach(x => { x.disabled = true; if (x.dataset.a === P.good) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
      $('.reveal', box).innerHTML = '<p>' + (good ? 'Good pick!' : 'The guide picked the other one.') + ' The better answer is <b>' + esc(P.trait) + '</b>.</p><div class="lab-actions"><button type="button" class="btn small primary" data-act="next">' + (i + 1 < PAIRS.length ? 'Next question' : 'Finish') + '</button></div>';
      api().emit('judge', { good: good, n: i + 1 });
      if (i + 1 === PAIRS.length) api().emit('judge-done', { score: score });
    });
    render();
  };
})(Widgets);
