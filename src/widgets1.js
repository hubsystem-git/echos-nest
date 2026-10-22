/* ============================================================
   widgets1.js - shared helpers, Echo's panel, and the talking tools
   ============================================================ */
const Widgets = {};
(function (W) {
  'use strict';
  let api = { get: (k, d) => d, set: () => {}, emit: () => {}, name: () => '' };
  W.init = a => { api = Object.assign(api, a); };
  W.api = () => api;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => r.querySelector(s);
  const $$ = (s, r) => Array.from(r.querySelectorAll(s));
  let uid = 0;
  const nid = p => (p || 'w') + '-' + (++uid);
  const pct = p => (p >= 0.995 ? '100' : (p > 0 && p < 0.005) ? '<1' : String(Math.round(p * 100))) + '%';
  const fmt = n => Number(n).toLocaleString('en-US');
  const shuffle = (a, rand) => { a = a.slice(); rand = rand || Math.random; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  W.esc = esc; W.$ = $; W.$$ = $$; W.nid = nid; W.pct = pct; W.fmt = fmt; W.shuffle = shuffle;

  /* ---------- art ---------- */
  W.ART = {
    byte: '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><polygon points="9,6 27,21 11,31" fill="var(--wolf-dark)"/><polygon points="55,6 37,21 53,31" fill="var(--wolf-dark)"/><polygon points="13,12 22,21 14,26" fill="var(--wolf-ear)"/><polygon points="51,12 42,21 50,26" fill="var(--wolf-ear)"/><polygon points="11,28 21,19 43,19 53,28 50,44 40,54 32,61 24,54 14,44" fill="var(--wolf)"/><polygon points="11,28 21,19 32,23 22,28" fill="var(--wolf-dark)" opacity=".35"/><polygon points="21,40 32,33 43,40 39,52 32,59 25,52" fill="var(--wolf-light)"/><polygon points="17,32 26,30 25,35.5" fill="var(--amber-fill)"/><polygon points="47,32 38,30 39,35.5" fill="var(--amber-fill)"/><circle cx="23" cy="32.6" r="1.4" fill="var(--wolf-nose)"/><circle cx="41" cy="32.6" r="1.4" fill="var(--wolf-nose)"/><polygon points="28.5,48 35.5,48 32,52.5" fill="var(--wolf-nose)"/></svg>',
    noodle: '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M12 53 C 3 43, 14 32, 28 37 S 52 46, 50 31 S 32 17, 39 11" fill="none" stroke="var(--snake)" stroke-width="9" stroke-linecap="round"/><path d="M12 53 C 3 43, 14 32, 28 37 S 52 46, 50 31 S 32 17, 39 11" fill="none" stroke="var(--snake-saddle)" stroke-width="9" stroke-dasharray="5 8"/><ellipse cx="43" cy="10.5" rx="8.5" ry="6.2" fill="var(--snake)"/><ellipse cx="44" cy="13" rx="5" ry="2" fill="var(--snake-belly)" opacity=".7"/><circle cx="46" cy="8.4" r="1.7" fill="#1a1410"/><path d="M51 11.5h5m0 0l3.2-2.2m-3.2 2.2l3.2 2.2" fill="none" stroke="var(--berry)" stroke-width="1.5" stroke-linecap="round"/></svg>',
    echo: '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><polygon points="13,60 9,42 14,27 23,16 35,12 45,16 49,27 46,39 41,49 39,60" fill="var(--raven)" stroke="var(--raven-rim)" stroke-width="1.4" stroke-linejoin="round"/><polygon points="23,16 35,12 45,16 34,21" fill="var(--raven-sheen)" opacity=".7"/><polygon points="14,27 23,16 28,30 17,36" fill="var(--raven-sheen-2)" opacity=".55"/><polygon points="20,46 31,40 35,52 24,57" fill="var(--raven-sheen-2)" opacity=".4"/><polygon points="46,20 62,26 60,29.5 46,30" fill="var(--raven-beak)" stroke="var(--raven-rim)" stroke-width="1" stroke-linejoin="round"/><polygon points="46,30 58,30 47,35" fill="var(--raven-beak-2)" stroke="var(--raven-rim)" stroke-width="1" stroke-linejoin="round"/><circle cx="38.5" cy="22" r="3.4" fill="#0B0A12"/><circle cx="39.6" cy="20.9" r="1.2" fill="#FFFFFF"/><polygon points="38,38 45,35 43,43 37,47" fill="var(--raven-sheen)" opacity=".45"/></svg>'
  };

  /* ---------- Echo's models, cached by what Echo has read ---------- */
  const models = new Map();
  const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
  W.mine = () => String(api.get('mytext', '') || '');
  W.model = function (books) {
    const mine = books.indexOf('mine') >= 0 ? W.mine() : '';
    const key = books.slice().sort().join('+') + '|' + (mine ? hash(mine) : '');
    if (!models.has(key)) {
      const src = LIBRARY.filter(b => books.indexOf(b.id) >= 0).map(b => ({ id: b.id, text: b.text }));
      if (mine.trim()) src.push({ id: 'mine', text: mine });
      const t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      const m = new Nest.Model(src, 4);
      m.buildMs = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0;
      models.set(key, m);
      if (models.size > 40) models.delete(models.keys().next().value);
    }
    return models.get(key);
  };
  /* the true and made-up books, then her own writing, then the poisoned book, kept at the end of the shelf.
     Pebble's diary is private: it never goes on the shelf. */
  const shelfBook = b => ({ id: b.id, title: b.title, color: b.color, blurb: b.blurb, kind: b.kind });
  W.BOOKS = LIBRARY.filter(b => b.kind !== 'poison' && b.kind !== 'diary').map(shelfBook)
    .concat([{ id: 'mine', title: 'My Writing', color: '--book-mine', blurb: 'Words you write yourself.', kind: 'mine' }])
    .concat(LIBRARY.filter(b => b.kind === 'poison').map(shelfBook));
  const book = id => W.BOOKS.find(b => b.id === id) || (LIBRARY.some(b => b.id === id) ? shelfBook(LIBRARY.find(b => b.id === id)) : null) || { id: id, title: id, color: '--ink-2' };
  W.book = book;
  const isPoison = id => book(id).kind === 'poison';
  W.isPoison = isPoison;
  const WARN_ICON = '<svg class="warn-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.6M12 17.4v.1"/></svg>';
  W.WARN_ICON = WARN_ICON;
  /* the poisoned book is marked wherever its name shows up: a warning sign to see, words to hear */
  W.poisonMark = id => isPoison(id) ? WARN_ICON : '';
  W.poisonSr = id => isPoison(id) ? '<span class="sr"> (poisoned on purpose)</span>' : '';

  /* ---------- small UI pieces ---------- */
  function bookChips(selected, ids, opts) {
    opts = opts || {};
    return '<div class="chips books" role="group" aria-label="' + esc(opts.label || 'Books Echo reads') + '">' + ids.map(id => {
      const b = book(id);
      const on = selected.indexOf(id) >= 0;
      return '<button type="button" class="bchip' + (isPoison(id) ? ' poison' : '') + '" data-book="' + id + '" aria-pressed="' + on + '" style="--bc: var(' + b.color + ')"><span class="dot" aria-hidden="true"></span>' + W.poisonMark(id) + esc(b.title) + W.poisonSr(id) + '</button>';
    }).join('') + '</div>';
  }
  W.bookChips = bookChips;
  const BOOK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/></svg>';
  W.BOOK_ICON = BOOK_ICON;
  /* a book's name you can click to open it in the Library's reading window */
  const readLink = (id, find) => '<button type="button" class="booklink" data-read="' + id + '"' + (find ? ' data-find="' + esc(find) + '"' : '') + ' style="--bc: var(' + book(id).color + ')">' + esc(book(id).title) + W.poisonSr(id) + '</button>';
  W.readLink = readLink;
  const PUNCT_NAME = { '.': '. (end)', '!': '! (end)', '?': '? (end)', ',': ', (comma)', ';': '; (semicolon)', ':': ': (colon)' };
  /* how a token is shown in a list: names for punctuation, capitals for names */
  const nice = (t, caps) => PUNCT_NAME[t] || (caps && caps.get(t)) || (t === 'i' ? 'I' : t);
  W.nice = nice;
  function bars(items, opts) {
    opts = opts || {};
    const max = Math.max(0.0001, ...items.map(it => it.p));
    return items.map((it, i) => {
      const tag = opts.buttons ? 'button type="button"' : 'div';
      const end = opts.buttons ? 'button' : 'div';
      const w = opts.relative ? it.p / max : it.p;
      const shown = it.label ? (PUNCT_NAME[it.label] || it.label) : nice(it.tok, opts.caps);
      return '<' + tag + ' class="cand' + (it.hot ? ' hot' : '') + '" data-i="' + i + '"' + (opts.buttons ? ' aria-label="' + esc(shown + ', ' + pct(it.p)) + '"' : '') + '><span class="w">' + esc(shown) + '</span><span class="bar" aria-hidden="true"><i style="width:' + Math.max(1.5, w * 100).toFixed(1) + '%"></i></span><span class="pct">' + (opts.count ? esc(it.count) : pct(it.p)) + '</span></' + end + '>';
    }).join('');
  }
  W.bars = bars;
  function labHead(title, sub) {
    return '<div class="lab-head"><span class="lab-av">' + W.ART.echo + '</span><div><b>' + esc(title) + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + '</div></div>';
  }
  W.labHead = labHead;
  function tokensHTML(toks, caps, opts) {
    opts = opts || {};
    const words = [];
    let start = opts.startCap !== false;
    toks.forEach((t, i) => {
      const src = opts.src ? opts.src[i] : null;
      let w;
      if (Nest.isPunct(t)) w = t;
      else { w = (caps && caps.get(t)) || t; if (w === 'i') w = 'I'; if (start) w = w.charAt(0).toUpperCase() + w.slice(1); }
      start = Nest.isEnd(t) ? true : (Nest.isPunct(t) ? start : false);
      let cls = 'tok';
      let style = '';
      if (src) {
        if (src.length === 1) { cls += ' src' + (isPoison(src[0]) ? ' poison' : ''); style = ' style="--bc: var(' + book(src[0]).color + ')"'; }
        else cls += ' src shared';
      }
      if (opts.hl && opts.hl(i)) cls += ' hl';
      words.push({ p: Nest.isPunct(t), html: '<span class="' + cls + '"' + style + '>' + esc(w) + '</span>' });
    });
    return words.map((w, i) => (i > 0 && !w.p ? ' ' : '') + w.html).join('');
  }
  W.tokensHTML = tokensHTML;

  /* ============================================================
     Echo's panel: talk, one word at a time, peek inside, compare
     ============================================================ */
  W.echo = function (root, opt) {
    opt = opt || {};
    /* her own writing and the poisoned book only show up where a panel asks for them */
    const all = W.BOOKS.map(b => b.id).filter(id => (id !== 'mine' || opt.mine) && (!isPoison(id) || opt.poison));
    const saved = opt.persist ? (api.get(opt.persist, null) || {}) : {};
    const st = {
      books: (saved.books || opt.books || []).filter(id => all.indexOf(id) >= 0),
      order: saved.order || opt.order || 2,
      temp: saved.temp != null ? saved.temp : (opt.temp == null ? 0.8 : opt.temp)
    };
    const ids = { prompt: nid('prompt'), temp: nid('temp'), mine: nid('mine'), peek: nid('peek') };
    const save = () => { if (opt.persist) api.set(opt.persist, { books: st.books, order: st.order, temp: st.temp }); };
    const chipIds = opt.bookIds || all;
    root.innerHTML = '<div class="lab">' + labHead(opt.title || 'Echo', '<span class="stats"></span>') +
      (opt.choose ? '<div class="lab-row"><span class="lab-lbl">' + esc(opt.chooseLabel || 'Books Echo reads') + '</span>' + bookChips(st.books, chipIds) + '<button type="button" class="readbtn" data-act="read">' + BOOK_ICON + 'Read these books</button></div>' : '') +
      (opt.mine ? '<details class="mine"' + (opt.mineOpen ? ' open' : '') + '><summary>Write something for Echo to read</summary><label class="sr" for="' + ids.mine + '">Your writing</label><textarea id="' + ids.mine + '" rows="4" placeholder="Write a few sentences. End each one with a period. Echo learns from every word."></textarea><div class="lab-actions"><button type="button" class="btn small" data-act="save-mine">Save and feed it to Echo</button><span class="mine-msg" role="status"></span></div></details>' : '') +
      (opt.showPrompt ? '<div class="lab-row"><label class="lab-lbl" for="' + ids.prompt + '">Start Echo with</label><input class="lab-input" id="' + ids.prompt + '" type="text" maxlength="60" autocomplete="off" spellcheck="false" placeholder="leave empty and Echo picks" value="' + esc(opt.prompt || '') + '"></div>' : '') +
      (opt.showOrder ? '<div class="lab-row"><span class="lab-lbl">How far back Echo looks</span><div class="seg" role="group" aria-label="How far back Echo looks">' + [1, 2, 3, 4].map(k => '<button type="button" data-order="' + k + '" aria-pressed="' + (st.order === k) + '">' + k + ' word' + (k > 1 ? 's' : '') + '</button>').join('') + '</div></div>' : '') +
      (opt.showTemp ? '<div class="lab-row"><label class="lab-lbl" for="' + ids.temp + '">Temperature <output>' + st.temp.toFixed(1) + '</output></label><input id="' + ids.temp + '" class="range" type="range" min="0" max="2" step="0.1" value="' + st.temp + '"><small class="hint-line">0 always picks the top word. 1 is normal. 2 is wild.</small></div>' : '') +
      '<div class="lab-actions"><button type="button" class="btn primary" data-act="talk">' + esc(opt.talkLabel || 'Let Echo talk') + '</button>' +
      (opt.step ? '<button type="button" class="btn" data-act="step">One word at a time</button>' : '') +
      (opt.compare ? '<button type="button" class="btn" data-act="compare">Compare 1 word and 3 words</button>' : '') +
      (opt.peek ? '<button type="button" class="btn" data-act="peek">Peek inside Echo</button>' : '') + '</div>' +
      (opt.peek ? '<div class="peek" hidden><div class="lab-row"><label class="lab-lbl" for="' + ids.peek + '">After the word</label><input class="lab-input short" id="' + ids.peek + '" type="text" maxlength="24" autocomplete="off" spellcheck="false" value="' + esc(opt.peekWord || 'the') + '"><button type="button" class="btn small" data-act="peek-go">Show what came next</button></div><div class="peek-out"></div></div>' : '') +
      (opt.step ? '<div class="stepper" hidden></div>' : '') +
      '<div class="sayings" aria-live="polite"></div></div>';
    const lab = $('.lab', root);
    const sayings = $('.sayings', lab);
    const stats = $('.stats', lab);
    const promptEl = opt.showPrompt ? $('#' + ids.prompt, lab) : null;
    const mineEl = opt.mine ? $('#' + ids.mine, lab) : null;
    if (mineEl) mineEl.value = W.mine();

    function hasWords() {
      if (!st.books.length) return false;
      return st.books.some(id => id !== 'mine' || W.mine().trim());
    }
    function updStats() {
      if (!hasWords()) { stats.textContent = 'Echo has not read anything yet.'; return; }
      const M = W.model(st.books);
      stats.textContent = 'Echo has read ' + fmt(M.wordCount) + ' words. Its counting table has ' + fmt(M.entries(st.order)) + ' entries.';
    }
    updStats();

    function addSaying(html) {
      const d = document.createElement('div');
      d.className = 'saying';
      d.innerHTML = html;
      sayings.insertBefore(d, sayings.firstChild);
      while (sayings.childElementCount > (opt.keep || 6)) sayings.lastChild.remove();
      return d;
    }
    function sayingHTML(M, g, order, label) {
      const toks = g.prompt.concat(g.steps.map(s => s.tok));
      const src = g.prompt.map(() => null).concat(g.steps.map(s => s.src));
      const full = toks.join(' ');
      const copied = M.sentences.has(full);
      const books = Array.from(new Set(g.steps.filter(s => s.src.length === 1).map(s => s.src[0])));
      let html = '<p class="say-text">' + (label ? '<span class="say-tag">' + esc(label) + '</span> ' : '') +
        tokensHTML(toks, M.caps, { src: opt.sources ? src : null, hl: i => i < g.prompt.length }) + '</p>';
      const text = Nest.detok(toks, M.caps);
      const meta = [esc('looked back ' + (order === 1 ? '1 word' : order + ' words')), esc('temperature ' + st.temp.toFixed(1))];
      if (opt.sources || opt.showCopy) {
        if (copied) meta.push('copied a whole sentence from ' + Array.from(M.sentFrom.get(full) || [M.sentences.get(full)]).map(id => readLink(id, text)).join(' and '));
        else if (books.length > 1) meta.push('stitched together from ' + books.map(b => readLink(b)).join(' and '));
        else if (books.length === 1) meta.push('stitched together from pieces of ' + readLink(books[0]));
        else meta.push('stitched together from pieces');
      }
      html += '<p class="say-meta">' + meta.join(' · ') + '</p>';
      return { html: html, copied: copied, books: books, text: text };
    }
    function talk(orderOverride, label) {
      const order = orderOverride || st.order;
      const promptWords = promptEl ? Nest.words(promptEl.value) : Nest.words(opt.prompt || '');
      if (!hasWords()) {
        addSaying('<p class="say-text empty">…</p><p class="say-meta">Echo has not read anything yet, so it has no words at all. Pick a book for Echo to read.</p>');
        api.emit('talk-empty', { books: st.books.slice(), order: order });
        return null;
      }
      const M = W.model(st.books);
      const unknown = promptWords.filter(w => !Nest.isPunct(w) && !M.vocab.has(w));
      const g = M.generate(promptWords, { order: order, temp: st.temp, max: 32 });
      const s = sayingHTML(M, g, order, label);
      let html = s.html;
      if (unknown.length) html += '<p class="say-meta warn">Echo has never read the word "' + esc(unknown[0]) + '", so it is only guessing.</p>';
      addSaying(html);
      const ev = { books: st.books.slice(), every: chipIds.every(id => id === 'mine' || st.books.indexOf(id) >= 0), order: order, temp: st.temp, words: g.steps.length, prompt: promptWords.join(' '), unknown: unknown.length > 0, copied: s.copied, mixed: s.books.length > 1, text: s.text, label: label || '' };
      api.emit('talk', ev);
      return ev;
    }

    /* step mode */
    const stepper = opt.step ? $('.stepper', lab) : null;
    const sp = { toks: [], open: false };
    function stepReset() {
      sp.toks = promptEl ? Nest.words(promptEl.value) : Nest.words(opt.prompt || '');
      sp.picks = 0;
    }
    function stepRender() {
      if (!stepper) return;
      if (!hasWords()) { stepper.innerHTML = '<p class="say-meta">Echo has not read anything yet. Pick a book first.</p>'; return; }
      const M = W.model(st.books);
      const d = M.dist(['.'].concat(sp.toks), st.order, st.temp);
      const k = Math.max(0, d.k);
      const ended = sp.toks.length > 0 && Nest.isEnd(sp.toks[sp.toks.length - 1]);
      const textHTML = sp.toks.length ? tokensHTML(sp.toks, M.caps, { hl: i => !ended && i >= sp.toks.length - k }) : '<span class="say-meta">(nothing yet)</span>';
      /* the table also counts the start of a sentence as a "word", so k can be one more than the words on screen */
      const shown = Math.min(Math.max(k, 0), sp.toks.length);
      const fromStart = k > sp.toks.length;
      const lookWords = shown ? sp.toks.slice(sp.toks.length - shown) : [];
      let note;
      if (ended) note = 'Echo finished a sentence.';
      else if (!sp.toks.length) note = 'Echo is about to start a sentence. It looks at which words usually start one.';
      else if (k <= 0) note = 'Echo has never seen these words together, so it guesses from all its words.';
      else note = 'Echo looks back at ' + (fromStart ? 'the start of the sentence and ' : '') + '<b>' + esc(Nest.detok(lookWords, M.caps, fromStart)) + '</b>';
      const items = ended ? [] : d.items.slice(0, 6);
      stepper.innerHTML = '<p class="step-text">' + textHTML + (ended ? '' : '<span class="caret" aria-hidden="true"></span>') + '</p><p class="step-note">' + note + '</p>' +
        (items.length ? '<p class="lab-lbl">Echo\'s guesses for the next word. Tap one, or let Echo choose.</p><div class="cands" role="group" aria-label="Echo\'s guesses for the next word">' + bars(items, { buttons: true, caps: M.caps }) + '</div>' +
          (d.items.length > 6 ? '<p class="say-meta">…and ' + (d.items.length - 6) + ' more words with smaller chances.</p>' : '') : '') +
        '<div class="lab-actions">' + (items.length ? '<button type="button" class="btn small" data-act="top">Take the top word</button><button type="button" class="btn small" data-act="dice">Roll the dice</button>' : '') + '<button type="button" class="btn small" data-act="restart">Start over</button></div>';
      sp.items = d.items;
      sp.k = d.k;
    }
    function stepPick(it, how) {
      sp.toks.push(it.tok);
      sp.picks++;
      api.emit('step', { how: how, rank: sp.items.indexOf(it), p: it.p, tok: it.tok, len: sp.toks.length, picks: sp.picks, k: sp.k });
      if (Nest.isEnd(it.tok)) api.emit('step-end', { len: sp.toks.length, picks: sp.picks });
      stepRender();
    }
    if (stepper) stepper.addEventListener('click', e => {
      const c = e.target.closest('.cand');
      if (c && sp.items) { stepPick(sp.items[+c.dataset.i], 'click'); return; }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'top' && sp.items && sp.items.length) stepPick(sp.items[0], 'top');
      if (b.dataset.act === 'dice' && sp.items && sp.items.length) { const M = W.model(st.books); stepPick(M.pick(sp.items, Math.random), 'dice'); }
      if (b.dataset.act === 'restart') { stepReset(); stepRender(); }
    });

    /* peek */
    const peekBox = opt.peek ? $('.peek', lab) : null;
    function peek() {
      const inp = $('#' + ids.peek, lab);
      const word = Nest.words(inp.value)[0] || '';
      const out = $('.peek-out', lab);
      if (!hasWords()) { out.innerHTML = '<p class="say-meta">Echo has not read anything yet, so its table is empty.</p>'; api.emit('peek', { word: word, found: 0 }); return; }
      const M = W.model(st.books);
      const f = M.followers(word, 8);
      const total = (M.tables[1].get(word) ? Array.from(M.tables[1].get(word).values()).reduce((s, e) => s + e.n, 0) : 0);
      if (!word || !f.length) out.innerHTML = '<p class="say-meta">Echo never saw a word after "' + esc(word || '?') + '". Try a word from the books, like "the", "wolves" or "snakes".</p>';
      else out.innerHTML = '<p class="say-meta">Every time Echo read "<b>' + esc(word) + '</b>", it counted the next word. Here are the most common ones:</p><div class="cands counts">' + bars(f.map(x => ({ tok: x.tok, p: x.n / total, count: x.n + (x.n === 1 ? ' time' : ' times') })), { count: true, relative: true, caps: M.caps }) + '</div>';
      api.emit('peek', { word: word, found: f.length });
    }

    const panel = { isOn: id => st.books.indexOf(id) >= 0, toggle: id => { const c = lab.querySelector('.bchip[data-book="' + id + '"]'); if (c) c.click(); } };
    const openBook = (start, find, from) => W.reader.open({ ids: chipIds.indexOf(start) >= 0 ? chipIds : chipIds.concat([start]), start: start, find: find || '', opener: from, panel: opt.choose ? panel : null });
    lab.addEventListener('click', e => {
      const rl = e.target.closest('[data-read]');
      if (rl && lab.contains(rl)) { openBook(rl.dataset.read, rl.dataset.find, rl); return; }
      const chip = e.target.closest('.bchip');
      if (chip && lab.contains(chip) && !chip.closest('.stepper')) {
        const id = chip.dataset.book;
        const i = st.books.indexOf(id);
        if (opt.single) st.books = [id];
        else if (i >= 0) st.books.splice(i, 1);
        else st.books.push(id);
        $$('.bchip', lab).forEach(c => c.setAttribute('aria-pressed', String(st.books.indexOf(c.dataset.book) >= 0)));
        save(); updStats();
        api.emit('feed', { books: st.books.slice() });
        if (stepper && !stepper.hidden) { stepReset(); stepRender(); }
        return;
      }
      const ob = e.target.closest('[data-order]');
      if (ob) {
        st.order = +ob.dataset.order;
        $$('[data-order]', lab).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.order === st.order)));
        save(); updStats();
        api.emit('order', { order: st.order });
        if (stepper && !stepper.hidden) stepRender();
        return;
      }
      const b = e.target.closest('[data-act]');
      if (!b || (stepper && stepper.contains(b))) return;
      const act = b.dataset.act;
      if (act === 'talk') talk();
      if (act === 'read') openBook(chipIds.find(id => st.books.indexOf(id) >= 0) || chipIds[0], '', b);
      if (act === 'compare') {
        const a = talk(1, 'Looking back 1 word:');
        const c = talk(3, 'Looking back 3 words:');
        if (a && c) api.emit('compare', { a: a, b: c });
      }
      if (act === 'step') { stepper.hidden = !stepper.hidden; if (!stepper.hidden) { stepReset(); stepRender(); } }
      if (act === 'peek') { peekBox.hidden = !peekBox.hidden; if (!peekBox.hidden) peek(); }
      if (act === 'peek-go') peek();
      if (act === 'save-mine') {
        const v = mineEl.value.trim();
        api.set('mytext', v);
        const n = Nest.words(v).filter(w => !Nest.isPunct(w)).length;
        if (v && st.books.indexOf('mine') < 0) st.books.push('mine');
        if (!v) st.books = st.books.filter(x => x !== 'mine');
        $$('.bchip', lab).forEach(c => c.setAttribute('aria-pressed', String(st.books.indexOf(c.dataset.book) >= 0)));
        $('.mine-msg', lab).textContent = v ? 'Echo read your ' + n + ' word' + (n === 1 ? '' : 's') + '.' : 'Your writing is empty now.';
        save(); updStats();
        api.emit('mytext', { words: n, books: st.books.slice() });
      }
    });
    if (opt.peek) $('#' + ids.peek, lab).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); peek(); } });
    if (promptEl) promptEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); talk(); } });
    if (opt.showTemp) {
      const r = $('#' + ids.temp, lab);
      r.addEventListener('input', () => {
        st.temp = +r.value;
        $('output', r.parentNode).textContent = st.temp.toFixed(1);
        save();
        if (stepper && !stepper.hidden) stepRender();
      });
      r.addEventListener('change', () => api.emit('temp', { t: st.temp }));
    }
    return { state: st, talk: talk };
  };

  /* ============================================================
     Guess the next word (lesson 1)
     ============================================================ */
  const ROUNDS = [
    { start: 'Wolves howl to talk to their', opts: ['pack', 'moon', 'cars', 'pizza'] },
    { start: 'Snakes smell with their', opts: ['tongues', 'eyes', 'ears', 'tails'] },
    { start: 'Baby ravens are called', opts: ['chicks', 'pups', 'calves', 'kittens'] },
    { start: 'Echo sat on a branch and watched the', opts: ['stars', 'river', 'pups', 'snow'] },
    { start: 'The CPU is the brain of the', opts: ['computer', 'pack', 'snake', 'ship'] },
    { start: 'Every pirate raven loves shiny', opts: ['coins', 'bottle', 'shoes', 'rocks'] }
  ];
  W.guessGame = function (root) {
    const M = W.model(['wolf', 'snake', 'raven', 'tales', 'computer', 'pirate']);
    let r = 0, score = 0, answered = false;
    root.innerHTML = '<div class="lab">' + labHead('Guess the next word', 'Six rounds. Can you think like Echo?') + '<div class="game"></div></div>';
    const g = $('.game', root);
    function render() {
      if (r >= ROUNDS.length) {
        g.innerHTML = '<p class="big-score">You matched Echo ' + score + ' out of ' + ROUNDS.length + ' times.</p><p>You used patterns you already know. Echo used patterns it counted in its books. Same idea, different brains.</p><div class="lab-actions"><button type="button" class="btn" data-act="again">Play again</button></div>';
        return;
      }
      const R = ROUNDS[r];
      const opts = shuffle(R.opts);
      answered = false;
      g.innerHTML = '<p class="round">Round ' + (r + 1) + ' of ' + ROUNDS.length + '</p><p class="prompt-line">' + esc(R.start) + ' <span class="blank">_____</span></p>' +
        '<div class="choice-row" role="group" aria-label="Pick the next word">' + opts.map(o => '<button type="button" class="choice" data-w="' + esc(o) + '">' + esc(o) + '</button>').join('') + '</div><div class="reveal" aria-live="polite"></div>';
    }
    g.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.act === 'again') { r = 0; score = 0; render(); return; }
      if (b.dataset.act === 'next') { r++; render(); return; }
      if (!b.dataset.w || answered) return;
      answered = true;
      const R = ROUNDS[r];
      const d = M.dist(['.'].concat(Nest.words(R.start)), 3, 1);
      const top = d.items.length ? d.items[0].p : 0;
      const mine = d.items.find(it => it.tok === b.dataset.w.toLowerCase());
      const right = !!mine && mine.p >= top - 1e-9;
      if (right) score++;
      $$('.choice', g).forEach(c => { c.disabled = true; const it = d.items.find(x => x.tok === c.dataset.w.toLowerCase()); if (it && it.p >= top - 1e-9) c.classList.add('right'); else if (c === b) c.classList.add('wrong'); });
      $('.blank', g).textContent = b.dataset.w;
      $('.reveal', g).innerHTML = '<p class="lab-lbl">' + (right ? 'You matched Echo!' : 'Echo had a different top guess.') + ' Here is what Echo counted after "' + esc(R.start.split(' ').slice(-3).join(' ')) + '":</p><div class="cands">' + bars(d.items.slice(0, 5), { caps: M.caps }) + '</div><div class="lab-actions"><button type="button" class="btn small primary" data-act="next">' + (r + 1 < ROUNDS.length ? 'Next round' : 'See my score') + '</button></div>';
      api.emit('guess', { right: right, round: r + 1 });
      if (r + 1 === ROUNDS.length) api.emit('guess-done', { score: score, of: ROUNDS.length });
    });
    render();
  };

  /* ============================================================
     Autocomplete keyboard (lesson 1)
     ============================================================ */
  W.autocomplete = function (root) {
    const M = W.model(['wolf', 'snake', 'raven', 'tales', 'computer']);
    const st = { toks: [], typed: false };
    const inId = nid('ac');
    root.innerHTML = '<div class="lab">' + labHead('Echo\'s keyboard', 'Like the word suggestions on a phone') +
      '<div class="phone"><p class="phone-text" aria-live="polite"></p><div class="sugg" role="group" aria-label="Suggested next words"></div>' +
      '<div class="lab-row"><label class="lab-lbl" for="' + inId + '">Or type your own word</label><input class="lab-input short" id="' + inId + '" type="text" maxlength="20" autocomplete="off" spellcheck="false"><button type="button" class="btn small" data-act="add">Add</button></div>' +
      '<div class="lab-actions"><button type="button" class="btn small" data-act="undo">Undo a word</button><button type="button" class="btn small" data-act="clear">Start over</button></div></div></div>';
    const text = $('.phone-text', root), sugg = $('.sugg', root), inp = $('#' + inId, root);
    function render() {
      text.innerHTML = st.toks.length ? tokensHTML(st.toks, M.caps) + '<span class="caret" aria-hidden="true"></span>' : '<span class="say-meta">Tap a suggestion to start.</span><span class="caret" aria-hidden="true"></span>';
      const ended = st.toks.length && Nest.isEnd(st.toks[st.toks.length - 1]);
      const d = M.dist(['.'].concat(st.toks), 2, 1);
      const top = ended ? [] : d.items.slice(0, 3);
      sugg.innerHTML = top.length ? top.map((it, i) => '<button type="button" class="sug" data-i="' + i + '">' + esc(nice(it.tok, M.caps)) + '</button>').join('') : '<span class="say-meta">' + (ended ? 'Sentence finished! Start over to make another.' : 'Echo has no ideas here.') + '</span>';
      st.top = top;
    }
    function add(tok, fromSugg) {
      st.toks.push(tok);
      if (!fromSugg) st.typed = true;
      api.emit('ac-pick', { n: st.toks.filter(t => !Nest.isPunct(t)).length, fromSugg: fromSugg });
      if (Nest.isEnd(tok)) api.emit('ac-done', { words: st.toks.filter(t => !Nest.isPunct(t)).length, allSugg: !st.typed, text: Nest.detok(st.toks, M.caps) });
      render();
    }
    root.addEventListener('click', e => {
      const s = e.target.closest('.sug');
      if (s) { add(st.top[+s.dataset.i].tok, true); return; }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'undo') { st.toks.pop(); render(); }
      if (b.dataset.act === 'clear') { st.toks = []; st.typed = false; render(); }
      if (b.dataset.act === 'add') { const w = Nest.words(inp.value); inp.value = ''; w.forEach(t => add(t, false)); inp.focus(); }
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); const w = Nest.words(inp.value); inp.value = ''; w.forEach(t => add(t, false)); } });
    render();
  };

  /* ============================================================
     Tokenizer (lesson 3)
     ============================================================ */
  W.tokenizer = function (root) {
    const inId = nid('tok');
    const name = (api.name() || '').trim();
    const examples = ['The wolf howls at the moon.', 'strawberry', 'hippopotamus', 'Hello! \u{1F43A}', '1234567'].concat(name ? [name] : []);
    root.innerHTML = '<div class="lab">' + labHead('The word chopper', 'A real tokenizer, trained on Echo\'s books') +
      '<div class="lab-row col"><label class="lab-lbl" for="' + inId + '">Type anything</label><textarea id="' + inId + '" class="lab-input" rows="2" maxlength="300" spellcheck="false">The wolf howls at the moon.</textarea></div>' +
      '<div class="chips ex" role="group" aria-label="Examples">' + examples.map(x => '<button type="button" class="chip-ex" data-x="' + esc(x) + '">' + esc(x) + '</button>').join('') + '</div>' +
      '<p class="tok-stats" aria-live="polite">Getting the chopper ready…</p><div class="tok-out"></div>' +
      '<label class="check-inline"><input type="checkbox" class="show-ids"> Show each token\'s number</label>' +
      '<p class="say-meta">A dot (·) means the token starts with a space. Grey tokens are raw bytes, used for characters the chopper never learned.</p></div>';
    const ta = $('#' + inId, root), out = $('.tok-out', root), stats = $('.tok-stats', root), ids = $('.show-ids', root);
    let T = null, timer = null;
    function run(emit) {
      if (!T) return;
      const text = ta.value;
      const toks = T.encode(text);
      out.innerHTML = toks.length ? toks.map((t, i) => '<span class="tchip c' + (i % 5) + (t.byte ? ' byte' : '') + '"><span class="tt">' + esc(t.t.replace(/ /g, '·').replace(/\n/g, '↵')) + '</span>' + (ids.checked ? '<span class="tid">' + t.id + '</span>' : '') + '</span>').join('') : '<span class="say-meta">(nothing to chop)</span>';
      const words = T.pieces(text).filter(p => /[A-Za-z]/.test(p.c));
      let longest = 0, longestWord = '', single = 0;
      words.forEach(p => { const n = p.toks.length, w = p.c.trim(); if (n > longest) { longest = n; longestWord = w; } if (n === 1 && w.length >= 3) single++; });
      stats.textContent = text.length + ' characters · ' + words.length + ' word' + (words.length === 1 ? '' : 's') + ' · ' + toks.length + ' token' + (toks.length === 1 ? '' : 's');
      if (emit) api.emit('tokenize', { text: text, tokens: toks.length, words: words.length, hasByte: toks.some(t => t.byte), longest: longest, longestWord: longestWord, single: single, isName: !!name && text.trim().toLowerCase() === name.toLowerCase(), hasDigits: /[0-9]{4,}/.test(text) });
    }
    ta.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => run(true), 250); });
    ids.addEventListener('change', () => { run(false); if (ids.checked) api.emit('token-ids', {}); });
    root.addEventListener('click', e => { const b = e.target.closest('.chip-ex'); if (b) { ta.value = b.dataset.x; run(true); } });
    setTimeout(() => { T = Nest.tokenizer(); run(false); }, 30);
  };

  /* ============================================================
     Temperature lab (lesson 5)
     ============================================================ */
  W.tempLab = function (root) {
    const books = ['wolf', 'snake', 'raven', 'tales'];
    const M = W.model(books);
    const starts = ['Wolves', 'Echo', 'Ravens can', 'Snakes have'];
    const st = { start: starts[0], temp: 1 };
    const tid = nid('t');
    root.innerHTML = '<div class="lab">' + labHead('Echo\'s dice', 'Echo has read Wolf Facts, Snake Facts, Raven Facts and Forest Tales') +
      '<div class="lab-row"><span class="lab-lbl">Start with</span><div class="seg" role="group" aria-label="Start with">' + starts.map(s => '<button type="button" data-start="' + esc(s) + '" aria-pressed="' + (s === st.start) + '">' + esc(s) + '</button>').join('') + '</div></div>' +
      '<div class="lab-row"><label class="lab-lbl" for="' + tid + '">Temperature <output>1.0</output></label><input id="' + tid + '" class="range" type="range" min="0" max="2" step="0.1" value="1"><small class="hint-line">Slide it and watch the chances change.</small></div>' +
      '<p class="lab-lbl">Echo\'s chances for the next word</p><div class="cands dist"></div>' +
      '<div class="lab-actions"><button type="button" class="btn" data-act="roll">Roll the dice 20 times</button><button type="button" class="btn primary" data-act="three">Make 3 sentences</button></div>' +
      '<div class="tally" aria-live="polite"></div><div class="sayings"></div></div>';
    const dist = $('.dist', root), tally = $('.tally', root), sayings = $('.sayings', root), range = $('#' + tid, root);
    const ctx = () => ['.'].concat(Nest.words(st.start));
    function renderDist() {
      const d = M.dist(ctx(), 2, st.temp);
      dist.innerHTML = bars(d.items.slice(0, 7), { caps: M.caps });
    }
    root.addEventListener('click', e => {
      const s = e.target.closest('[data-start]');
      if (s) { st.start = s.dataset.start; $$('[data-start]', root).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.start === st.start))); tally.innerHTML = ''; renderDist(); return; }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'roll') {
        const d = M.dist(ctx(), 2, st.temp);
        const counts = new Map();
        for (let i = 0; i < 20; i++) { const it = M.pick(d.items, Math.random); counts.set(it.tok, (counts.get(it.tok) || 0) + 1); }
        const rows = Array.from(counts, ([tok, n]) => ({ tok: tok, p: n / 20, count: n + (n === 1 ? ' time' : ' times') })).sort((a, b2) => b2.p - a.p);
        tally.innerHTML = '<p class="lab-lbl">20 rolls at temperature ' + st.temp.toFixed(1) + ': ' + rows.length + ' different word' + (rows.length === 1 ? '' : 's') + '</p><div class="cands counts">' + bars(rows, { count: true, relative: true, caps: M.caps }) + '</div>';
        api.emit('roll', { t: st.temp, kinds: rows.length });
      }
      if (b.dataset.act === 'three') {
        const texts = [];
        for (let i = 0; i < 3; i++) {
          const g = M.generate(Nest.words(st.start), { order: 2, temp: st.temp, max: 22 });
          texts.push(Nest.detok(g.prompt.concat(g.steps.map(x => x.tok)), M.caps));
        }
        sayings.innerHTML = '<p class="lab-lbl">Three tries at temperature ' + st.temp.toFixed(1) + '</p>' + texts.map(t => '<div class="saying"><p class="say-text">' + esc(t) + '</p></div>').join('');
        const same = texts[0] === texts[1] && texts[1] === texts[2];
        api.emit('temp-talk', { t: st.temp, same: same, texts: texts });
      }
    });
    range.addEventListener('input', () => { st.temp = +range.value; $('output', range.parentNode).textContent = st.temp.toFixed(1); renderDist(); });
    range.addEventListener('change', () => api.emit('temp', { t: st.temp }));
    renderDist();
  };
})(Widgets);
