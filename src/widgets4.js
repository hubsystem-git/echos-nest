/* ============================================================
   widgets4.js - the wolf-o-meter, Yes-Bot and Straight-Bot, source checking,
   Echo and Pebble's diary, and Coach-Bot or Answer-Bot
   ============================================================ */
(function (W) {
  'use strict';
  const esc = W.esc, $ = W.$, $$ = W.$$, nid = W.nid, labHead = W.labHead, botHead = W.botHead;
  const api = () => W.api();
  const LOCK = W.LOCK_ICON;
  const shelfIds = () => W.BOOKS.map(b => b.id).filter(id => id !== 'mine');
  /* "copied from X" or "stitched together from X and Y", with book names you can click to read */
  function sourceMeta(M, g, toks, text) {
    const full = toks.join(' ');
    if (M.sentences.has(full)) return 'copied a whole sentence from ' + Array.from(M.sentFrom.get(full) || [M.sentences.get(full)]).map(id => W.readLink(id, text)).join(' and ');
    const books = Array.from(new Set(g.steps.filter(s => s.src.length === 1).map(s => s.src[0])));
    if (books.length > 1) return 'stitched together from ' + books.map(b => W.readLink(b)).join(' and ');
    if (books.length === 1) return 'stitched together from pieces of ' + W.readLink(books[0]);
    return 'stitched together from pieces';
  }
  function addSaying(box, html, keep) {
    const d = document.createElement('div');
    d.className = 'saying';
    d.innerHTML = html;
    box.insertBefore(d, box.firstChild);
    while (box.childElementCount > (keep || 5)) box.lastChild.remove();
  }

  /* ============================================================
     What does Echo think of wolves? (lesson 13)
     ============================================================ */
  const MEAN = new Set(['bad', 'wicked', 'greedy', 'sly', 'mean', 'scary', 'tricked', 'villain', 'afraid', 'trust', 'crept']);
  const KIND = new Set(['kind', 'gentle', 'friendly', 'brave', 'helpful', 'joy', 'play', 'playing', 'love', 'friends', 'together', 'team', 'thank']);
  const ABOUT = new Set(['wolf', 'wolves', "wolf's", 'pup', 'pups', 'pack', 'byte', 'pebble']);
  const toneOf = toks => toks.some(t => MEAN.has(t)) ? 'mean' : toks.some(t => KIND.has(t)) ? 'kind' : 'neither';
  const aboutWolves = toks => toks.some(t => ABOUT.has(t));
  const TONE = { mean: 'Mean', kind: 'Kind', neither: 'Neither' };
  W.wolfOpinion = function (root) {
    const BOOKS = ['fairy', 'wolf', 'tales'], ORDER = 3, N = 200;
    const st = { books: ['fairy'] };
    const tallies = new Map();
    /* Echo says 200 things; the meter sorts the ones about wolves. The dice are seeded, so the same books always give the same meter. */
    function tally(books) {
      const key = books.slice().sort().join('+');
      if (!tallies.has(key)) {
        const t = { about: 0, mean: 0, kind: 0, neither: 0 };
        if (books.length) {
          const M = W.model(books), rand = Nest.rng(7);
          for (let i = 0; i < N; i++) {
            const toks = M.generate([], { order: ORDER, temp: 1, max: 32, rand: rand }).steps.map(s => s.tok);
            if (!aboutWolves(toks)) continue;
            t.about++;
            t[toneOf(toks)]++;
          }
        }
        tallies.set(key, t);
      }
      return tallies.get(key);
    }
    root.innerHTML = '<div class="lab">' + labHead('What does Echo think of wolves?', 'Echo learns about wolves only from the books you choose.') +
      '<div class="lab-row"><span class="lab-lbl">Books Echo reads</span>' + W.bookChips(st.books, BOOKS) + '<button type="button" class="readbtn" data-act="read">' + W.BOOK_ICON + 'Read these books</button></div>' +
      '<p class="lab-lbl">After "Wolves are", Echo\'s chances for the next word</p><div class="cands wo-dist"></div>' +
      '<div class="wo-meter" aria-live="polite"></div>' +
      '<div class="lab-actions"><button type="button" class="btn primary" data-act="talk">Let Echo talk about wolves</button></div>' +
      '<div class="sayings" aria-live="polite"></div>' +
      '<p class="say-meta">The wolf-o-meter is a simple word check. It looks for mean words like "wicked" and kind words like "friends". It doesn\'t really understand the sentences.</p></div>';
    const lab = $('.lab', root), dist = $('.wo-dist', lab), meter = $('.wo-meter', lab), sayings = $('.sayings', lab);
    function render() {
      if (!st.books.length) {
        dist.innerHTML = '<p class="say-meta">Echo hasn\'t read anything yet. Pick a book.</p>';
        meter.innerHTML = '';
        return;
      }
      const M = W.model(st.books);
      const d = M.dist(['.', 'wolves', 'are'], ORDER, 1);
      dist.innerHTML = d.k >= 2 ? d.items.slice(0, 8).map(it => {
        const k = MEAN.has(it.tok) ? 'wo-mean' : KIND.has(it.tok) ? 'wo-kind' : 'wo-neither';
        return '<div class="cand ' + k + '"><span class="w">' + esc(W.nice(it.tok, M.caps)) + (k === 'wo-mean' ? '<span class="sr"> (mean)</span>' : '') + '</span><span class="bar" aria-hidden="true"><i style="width:' + Math.max(1.5, it.p * 100).toFixed(1) + '%"></i></span><span class="pct">' + W.pct(it.p) + '</span></div>';
      }).join('') : '<p class="say-meta">These books never say "Wolves are", so Echo has no idea what comes next.</p>';
      const t = tally(st.books);
      const pc = n => t.about ? Math.round(100 * n / t.about) : 0;
      meter.innerHTML = '<p class="lab-lbl">Wolf-o-meter</p>' + (t.about
        ? '<div class="wo-bar" aria-hidden="true"><i class="m" style="flex-grow:' + t.mean + '"></i><i class="n" style="flex-grow:' + t.neither + '"></i><i class="k" style="flex-grow:' + t.kind + '"></i></div>' +
          '<p class="say-meta">Echo said ' + N + ' things. ' + t.about + ' were about wolves: <b class="wo-m">' + t.mean + ' mean (' + pc(t.mean) + '%)</b>, ' + t.neither + ' neither, and <b class="wo-k">' + t.kind + ' kind</b>.</p>'
        : '<p class="say-meta">Echo didn\'t say anything about wolves.</p>');
      api().emit('wolf-meter', { books: st.books.slice(), about: t.about, meanPct: pc(t.mean), kindPct: pc(t.kind) });
    }
    function talk() {
      if (!st.books.length) return;
      const M = W.model(st.books);
      let g = null, toks = [];
      for (let i = 0; i < 40; i++) {
        g = M.generate([], { order: ORDER, temp: 1, max: 32 });
        toks = g.steps.map(s => s.tok);
        if (aboutWolves(toks)) break;
      }
      const about = aboutWolves(toks), tn = about ? toneOf(toks) : '';
      const text = Nest.detok(toks, M.caps);
      addSaying(sayings, '<p class="say-text">' + W.tokensHTML(toks, M.caps, { src: g.steps.map(s => s.src) }) + '</p><p class="say-meta">' + (tn ? '<span class="tone ' + tn + '">' + TONE[tn] + '</span> ' : '') + sourceMeta(M, g, toks, text) + '</p>');
      api().emit('wolf-talk', { books: st.books.slice(), tone: tn });
    }
    lab.addEventListener('click', e => {
      const rl = e.target.closest('[data-read]');
      if (rl) { W.reader.open({ ids: BOOKS, start: rl.dataset.read, find: rl.dataset.find || '', opener: rl }); return; }
      const chip = e.target.closest('.bchip[data-book]');
      if (chip) {
        const id = chip.dataset.book, i = st.books.indexOf(id);
        if (i >= 0) st.books.splice(i, 1); else st.books.push(id);
        $$('.bchip[data-book]', lab).forEach(c => c.setAttribute('aria-pressed', String(st.books.indexOf(c.dataset.book) >= 0)));
        render();
        return;
      }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'talk') talk();
      if (b.dataset.act === 'read') W.reader.open({ ids: BOOKS, start: st.books[0] || BOOKS[0], opener: b });
    });
    render();
  };

  /* ============================================================
     Yes-Bot and Straight-Bot (lesson 15)
     ============================================================ */
  const YB = [
    { id: 'nest-lead', q: 'Why do ravens line their nests with mud?', lead: true,
      yes: 'Great question! Ravens line their nests with mud because it dries hard and keeps the eggs safe and cozy.',
      straight: 'I don\'t think they do! Ravens build their nests out of sticks and line them with soft things, like fur and grass. You could check that in Raven Facts.' },
    { id: 'nest', q: 'What do ravens line their nests with?', neutral: true,
      yes: 'Ravens line their nests with soft fur and grass.',
      straight: 'Ravens line their nests with soft fur and grass.' },
    { id: 'slimy-lead', q: 'Why are snakes slimy?', lead: true,
      yes: 'Snakes are slimy so they can slide along the ground more easily!',
      straight: 'Snakes aren\'t slimy at all! They\'re covered in dry scales that feel smooth.' },
    { id: 'slimy', q: 'Are snakes slimy?', neutral: true,
      yes: 'No. Snakes are dry. Their scales feel smooth, not slimy.',
      straight: 'No. Snakes are dry. Their scales feel smooth, not slimy.' },
    { id: 'teeth', q: 'How many teeth does a grown-up wolf have?',
      yes: 'A grown-up wolf has 42 teeth.',
      straight: 'A grown-up wolf has 42 teeth.' },
    { id: 'push', q: 'Are you sure? I think wolves have 12 teeth.', after: 'teeth', push: true,
      yes: 'Oh, you\'re right, I\'m sorry! Wolves have 12 teeth.',
      straight: 'I\'m sure. A grown-up wolf has 42 teeth. You can check in Wolf Facts, in the Library.' },
    { id: 'story', q: 'Here\'s my story: "The wolf ran. The end." Is it the best story ever?', praise: true,
      yes: 'Yes! It\'s the best story ever written. Every word is perfect!',
      straight: 'It\'s a fun start! To make it even better, tell us why the wolf ran and what happened next. Want to try adding one sentence?' }
  ];
  const YB_NOTE = {
    yes: { lead: 'Yes-Bot went along with the question. But is it true? Check Raven Facts, or ask the neutral way.', push: 'Yes-Bot gave up a right answer just because you pushed.', praise: 'Lots of praise, but no help making the story better.' },
    straight: { lead: 'Straight-Bot didn\'t go along with the question, and it said where to check.', push: 'Straight-Bot kept the right answer, politely, and said where to check.', praise: 'Kind, and actually helpful.' }
  };
  const BOT_NAME = { yes: 'Yes-Bot', straight: 'Straight-Bot' };
  W.yesBot = function (root) {
    const st = { bot: 'yes', msgs: [], asked: new Set() };
    root.innerHTML = '<div class="lab chat">' + botHead('Yes-Bot and Straight-Bot', 'Two scripted pretend chatbots. One learned to please people. One learned to be honest, kindly.') +
      '<div class="lab-row"><span class="lab-lbl">Chat with</span><div class="seg" role="group" aria-label="Chat with">' + Object.keys(BOT_NAME).map(k => '<button type="button" data-bot="' + k + '" aria-pressed="' + (k === st.bot) + '">' + BOT_NAME[k] + '</button>').join('') + '</div></div>' +
      '<div class="chat-body" aria-live="polite"></div>' +
      '<p class="lab-lbl">Ask</p><div class="chips quick" role="group" aria-label="Things to ask"></div>' +
      '<div class="lab-actions"><button type="button" class="readbtn" data-read="raven" data-find="line their nests">' + W.BOOK_ICON + 'Check Raven Facts</button><button type="button" class="btn small" data-act="reset">Start a new chat</button></div></div>';
    const lab = $('.lab', root), body = $('.chat-body', lab), chips = $('.chips', lab);
    function render() {
      body.innerHTML = st.msgs.length
        ? st.msgs.map(m => '<div class="msg ' + m.who + '"><span class="who">' + esc(m.name) + '</span>' + esc(m.text) + '</div>' + (m.note ? '<p class="yb-note ' + m.bot + '">' + esc(m.note) + '</p>' : '')).join('')
        : '<p class="say-meta">New chat with ' + BOT_NAME[st.bot] + '. Pick something to ask. Then switch bots and ask the same thing.</p>';
      chips.innerHTML = YB.filter(x => !x.after || st.asked.has(x.after)).map(x => '<button type="button" class="chip-ex" data-yb="' + x.id + '">' + esc(x.q) + '</button>').join('');
      body.scrollTop = body.scrollHeight;
    }
    function ask(id) {
      const x = YB.find(y => y.id === id);
      const kind = x.lead ? 'lead' : x.push ? 'push' : x.praise ? 'praise' : '';
      st.msgs.push({ who: 'user', name: 'You', text: x.q });
      st.msgs.push({ who: 'assistant', name: BOT_NAME[st.bot], text: x[st.bot], note: kind ? YB_NOTE[st.bot][kind] : '', bot: st.bot });
      st.asked.add(id);
      render();
      api().emit('yes-ask', { bot: st.bot, id: id, lead: !!x.lead, neutral: !!x.neutral, push: !!x.push, praise: !!x.praise });
    }
    lab.addEventListener('click', e => {
      const rl = e.target.closest('[data-read]');
      if (rl) { W.reader.open({ ids: ['raven', 'wolf', 'snake'], start: rl.dataset.read, find: rl.dataset.find || '', opener: rl }); return; }
      const q = e.target.closest('[data-yb]');
      if (q) { ask(q.dataset.yb); return; }
      const b = e.target.closest('[data-bot]');
      if (b) {
        st.bot = b.dataset.bot;
        $$('[data-bot]', lab).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.bot === st.bot)));
        st.msgs = []; st.asked.clear();
        render();
        return;
      }
      if (e.target.closest('[data-act="reset"]')) { st.msgs = []; st.asked.clear(); render(); }
    });
    render();
  };

  /* ============================================================
     Check the sources (lesson 18)
     ============================================================ */
  const SRC_CLAIMS = [
    { c: 'Ravens hide food and remember where they hid it.', book: 'raven', find: 'remember where', a: 'yes', why: 'Raven Facts says: "Ravens hide food to eat later. Ravens remember where they hid their food."' },
    { c: 'Corn snakes are green with yellow spots.', book: 'snake', find: 'corn snakes', a: 'no', why: 'Snake Facts says corn snakes are orange and red. The source is real, but it doesn\'t say what the chatbot said.' },
    { c: 'Wolves can run 160 km an hour.', fake: 'The Speedy Wolf Encyclopedia', a: 'none', why: 'There\'s no book with that name. Chatbots sometimes make up sources that sound real. (Real wolves top out at about 60 km an hour, in short bursts.)' },
    { c: 'In the winter, many snakes rest in burrows under the ground.', book: 'snake', find: 'burrows', a: 'yes', why: 'Snake Facts says: "In the winter, many snakes rest in burrows under the ground."' },
    { c: 'Ravens sail across the lake every night.', book: 'pirate', find: 'sail', a: 'story', why: 'Captain Caw\'s Log does say it, but it\'s a made-up story! A source has to be the right kind of source, too.' },
    { c: 'Wolves can trot for days without stopping.', book: 'wolf', find: 'trot', a: 'no', why: 'Wolf Facts says "Wolves can trot for hours." Hours, not days! The chatbot stretched what its source said.' }
  ];
  const VERDICTS = [['yes', 'It checks out'], ['no', 'The book doesn\'t say that'], ['none', 'No such book'], ['story', 'It\'s from a made-up story']];
  W.sourceCheck = function (root) {
    let ans = {};
    const order = W.fairOrder(SRC_CLAIMS.length, i => SRC_CLAIMS[i].a, 'sources');
    root.innerHTML = '<div class="lab">' + botHead('Check the sources', 'A pretend chatbot answered some questions and gave a source for each one. Open each source and decide.') +
      '<ol class="claims">' + order.map(i => { const x = SRC_CLAIMS[i]; return '<li class="claim" data-i="' + i + '"><p class="claim-text">“' + esc(x.c) + '”</p>' +
        '<p class="src-line">Source: <button type="button" class="booklink" data-src="' + i + '"' + (x.book ? ' style="--bc: var(' + W.book(x.book).color + ')"' : '') + '>' + esc(x.fake || W.book(x.book).title) + '</button> <span class="say-meta">(press it to open)</span></p>' +
        '<p class="evidence src-miss" hidden></p>' +
        '<div class="choice-row" role="group" aria-label="What did you find?">' + VERDICTS.map(v => '<button type="button" class="choice" data-v="' + v[0] + '">' + esc(v[1]) + '</button>').join('') + '</div>' +
        '<p class="verdict" aria-live="polite"></p></li>'; }).join('') + '</ol><p class="src-score say-meta" aria-live="polite"></p><div class="lab-actions"><button type="button" class="btn small" data-act="again">Start over</button></div></div>';
    const lab = $('.lab', root);
    lab.addEventListener('click', e => {
      if (e.target.closest('[data-act="again"]')) { ans = {}; W.resetClaims(lab, '.src-score'); return; }
      const li = e.target.closest('.claim');
      if (!li) return;
      const i = +li.dataset.i, x = SRC_CLAIMS[i];
      const open = e.target.closest('[data-src]');
      if (open) {
        if (x.book) W.reader.open({ ids: shelfIds(), start: x.book, find: x.find, opener: open });
        else { const miss = $('.src-miss', li); miss.hidden = false; miss.textContent = 'Library search: there\'s no book called "' + x.fake + '".'; }
        api().emit('src-open', { i: i, exists: !!x.book });
        return;
      }
      const b = e.target.closest('[data-v]');
      if (!b || ans[i] !== undefined) return;
      const right = b.dataset.v === x.a;
      ans[i] = right;
      $$('[data-v]', li).forEach(y => { y.disabled = true; if (y.dataset.v === x.a) y.classList.add('right'); else if (y === b) y.classList.add('wrong'); });
      $('.verdict', li).textContent = (right ? 'Yes! ' : 'Not quite. ') + x.why;
      const done = Object.keys(ans).length, score = Object.values(ans).filter(Boolean).length;
      $('.src-score', lab).textContent = 'Checked ' + done + ' of ' + SRC_CLAIMS.length + '. Right: ' + score + '.';
      api().emit('src-verdict', { i: i, kind: x.a, right: right });
      if (done === SRC_CLAIMS.length) api().emit('src-done', { score: score });
    });
  };

  /* ============================================================
     Echo and Pebble's diary (lesson 16)
     ============================================================ */
  W.secretLab = function (root) {
    const DIARY = LIBRARY.find(b => b.id === 'diary'), TALES = LIBRARY.find(b => b.id === 'tales');
    const ORDER = 3, METER = 100;
    const st = { diary: true, scrub: false };
    const models = new Map(), leaks = new Map();
    const key = () => st.diary ? (st.scrub ? 'scrubbed' : 'diary') : 'none';
    function model() {
      const k = key();
      if (!models.has(k)) {
        const src = [{ id: TALES.id, text: TALES.text }];
        if (st.diary) src.push({ id: DIARY.id, text: st.scrub ? DIARY.scrubbed : DIARY.text });
        models.set(k, new Nest.Model(src, 4));
      }
      return models.get(k);
    }
    const spilled = text => { const t = text.toLowerCase(); return DIARY.secrets.find(x => t.indexOf(x.find) >= 0) || null; };
    /* Echo says 100 things without being asked, with dice that land the same way every time */
    function leakCount() {
      const k = key();
      if (!leaks.has(k)) {
        const M = model(), rand = Nest.rng(3);
        let n = 0;
        for (let i = 0; i < METER; i++) { const g = M.generate([], { order: ORDER, temp: 1, max: 32, rand: rand }); if (spilled(Nest.detok(g.steps.map(s => s.tok), M.caps))) n++; }
        leaks.set(k, n);
      }
      return leaks.get(k);
    }
    const pid = nid('sc');
    root.innerHTML = '<div class="lab">' + labHead('Echo and the diary', 'Pebble\'s private diary got mixed in with Echo\'s books by mistake. Can Echo keep her secrets?') +
      '<div class="lab-row"><span class="lab-lbl">Books Echo reads</span><div class="chips books" role="group" aria-label="Books Echo reads"><span class="bchip on" style="--bc: var(' + TALES.color + ')"><span class="dot" aria-hidden="true"></span>' + esc(TALES.title) + '<span class="sr"> (always on)</span></span>' +
      '<button type="button" class="bchip diary" data-diary aria-pressed="true" style="--bc: var(' + DIARY.color + ')"><span class="dot" aria-hidden="true"></span>' + LOCK + esc(DIARY.title) + '<span class="sr"> (private)</span></button></div></div>' +
      '<div class="lab-row"><button type="button" class="rd-switch sc-scrub" aria-pressed="false" style="--bc: var(--teal)"><span class="sw" aria-hidden="true"></span><span>Scrub the secrets out before Echo reads</span></button></div>' +
      '<p class="say-meta sc-stats"></p>' +
      '<div class="lab-row"><label class="lab-lbl" for="' + pid + '">Start Echo with</label><input class="lab-input" id="' + pid + '" type="text" maxlength="60" autocomplete="off" spellcheck="false" value="My secret"></div>' +
      '<div class="chips quick" role="group" aria-label="Ideas for starting Echo">' + ['My secret', 'The password', 'Dear diary', 'Pebble'].map(x => '<button type="button" class="chip-ex" data-start="' + esc(x) + '">' + esc(x) + '</button>').join('') + '</div>' +
      '<div class="lab-actions"><button type="button" class="btn primary" data-act="talk">Let Echo talk</button><button type="button" class="readbtn" data-act="read">' + W.BOOK_ICON + 'Read Echo\'s books</button></div>' +
      '<div class="sayings" aria-live="polite"></div>' +
      '<div class="sc-meter" aria-live="polite"></div></div>';
    const lab = $('.lab', root), input = $('#' + pid, lab), sayings = $('.sayings', lab);
    function render() {
      const M = model();
      $('[data-diary]', lab).setAttribute('aria-pressed', String(st.diary));
      $('.sc-scrub', lab).setAttribute('aria-pressed', String(st.scrub));
      $('.sc-stats', lab).textContent = 'Echo has read ' + W.fmt(M.wordCount) + ' words' + (st.diary ? (st.scrub ? ', including the diary with its secrets scrubbed out.' : ', including Pebble\'s diary.') : '. The diary is out of its books.');
      const n = leakCount();
      $('.sc-meter', lab).innerHTML = '<p class="lab-lbl">Secret-o-meter</p><div class="mbar" aria-hidden="true"><i style="width:' + n + '%"></i></div><p class="say-meta">Echo said ' + METER + ' things without anyone asking. <b>' + n + '</b> of them gave away one of Pebble\'s secrets.</p>';
    }
    function talk() {
      const M = model();
      const prompt = Nest.words(input.value);
      const g = M.generate(prompt, { order: ORDER, temp: 1, max: 32 });
      const toks = g.prompt.concat(g.steps.map(s => s.tok));
      const text = Nest.detok(toks, M.caps);
      const s = spilled(text);
      const unknown = prompt.filter(w => !Nest.isPunct(w) && !M.vocab.has(w));
      const badge = s ? '<span class="tone mean">Secret spilled</span> Echo gave away ' + esc(s.what) + '.'
        : unknown.length ? '<span class="tone neither">No secret</span> Echo has never read the word "' + esc(unknown[0]) + '", so it is only guessing. It can\'t spill what it never read.'
        : (st.diary && st.scrub && /\bprivate\b/i.test(text) ? '<span class="tone kind">Scrubbed</span> The secret was taken out before Echo read the diary, so Echo only knows the word "private".' : '<span class="tone neither">No secret</span> Nothing private this time.');
      addSaying(sayings, '<p class="say-text">' + W.tokensHTML(toks, M.caps, { hl: i => i < g.prompt.length }) + '</p><p class="say-meta">' + badge + '</p>');
      api().emit('secret-talk', { diary: st.diary, scrub: st.scrub, spilled: s ? s.find : '', prompt: prompt.join(' ') });
    }
    lab.addEventListener('click', e => {
      if (e.target.closest('[data-act="read"]')) { W.reader.open({ ids: [TALES.id, DIARY.id], start: TALES.id, opener: e.target.closest('[data-act]') }); return; }
      if (e.target.closest('[data-diary]')) { st.diary = !st.diary; render(); return; }
      if (e.target.closest('.sc-scrub')) { st.scrub = !st.scrub; render(); return; }
      const sb = e.target.closest('[data-start]');
      if (sb) { input.value = sb.dataset.start; talk(); return; }
      if (e.target.closest('[data-act="talk"]')) talk();
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); talk(); } });
    render();
  };

  /* ============================================================
     Coach-Bot or Answer-Bot? (lesson 20)
     ============================================================ */
  const PROBLEM = 'Byte walks from the den to the river and back every day. The river is 3 km from the den. How far does Byte walk in one week?';
  const COACH = [
    { q: 'How far is one trip from the den to the river and back?', opts: ['3 km', '6 km', '9 km'], right: 1, yes: 'Yes! 3 km there and 3 km back.', hint: 'Not quite. Remember, Byte walks there and back.' },
    { q: 'How many days are in a week?', opts: ['5', '7', '10'], right: 1, yes: 'Right: 7 days.', hint: 'Try counting them: Monday, Tuesday, Wednesday...' },
    { q: 'So how far does Byte walk in one week?', opts: ['13 km', '21 km', '42 km'], right: 2, yes: 'You got it! 6 km a day for 7 days is 6 × 7 = 42 km.', hint: 'Byte walks 6 km every day, for 7 days. What is 6 × 7?' }
  ];
  /* Answer-Bot is friendly and clear. That's the trap: reading a good answer feels like learning. */
  const WORKED = '<p>Great question! Here\'s how to solve it:</p><ol class="cb-steps"><li>One trip to the river and back is 3 + 3 = 6 km.</li><li>A week has 7 days.</li><li>So Byte walks 6 × 7 = <b>42 km</b> in one week.</li></ol><p>Hope that helps! Ask me anytime.</p>';
  const NEXT = { q: 'Echo flies from the nest to the hills and back, 5 days a week. The hills are 2 km from the nest. How far does Echo fly in a week?', answer: 20 };
  W.coachBot = function (root) {
    const st = { step: -1, solved: false };
    const nx = nid('cb'), ex = nid('ex');
    root.innerHTML = '<div class="lab chat">' + botHead('Coach-Bot or Answer-Bot?', 'Two scripted pretend helpers, and the same homework question.') +
      '<p class="cb-problem">' + esc(PROBLEM) + '</p>' +
      '<div class="lab-actions"><button type="button" class="btn primary" data-act="coach">Ask Coach-Bot</button><button type="button" class="btn" data-act="answer">Ask Answer-Bot</button></div>' +
      '<div class="chat-body cb-out" aria-live="polite"><p class="say-meta">Pick a helper.</p></div>' +
      '<div class="cb-next" hidden><p class="lab-lbl">Now one with no help at all</p><p class="cb-problem">' + esc(NEXT.q) + '</p>' +
      '<div class="lab-row"><label class="sr" for="' + nx + '">Your answer in km</label><input class="lab-input short" id="' + nx + '" type="text" inputmode="numeric" maxlength="6" autocomplete="off" placeholder="km"><button type="button" class="btn small" data-act="check">Check</button></div><p class="say-meta cb-next-msg" aria-live="polite"></p></div>' +
      '<div class="cb-explain"><label class="cb-ask" for="' + ex + '">Explain it back: how do you solve problems like these? Use your own words.</label><textarea id="' + ex + '" class="lab-input" rows="3" maxlength="600"></textarea><div class="lab-actions"><button type="button" class="btn small" data-act="explain">I explained it</button></div><p class="say-meta cb-ex-msg" aria-live="polite"></p></div></div>';
    const lab = $('.lab', root), out = $('.cb-out', lab), next = $('.cb-next', lab);
    const bubble = (who, html) => '<div class="msg ' + (who === 'You' ? 'user' : 'assistant') + '"><span class="who">' + esc(who) + '</span>' + html + '</div>';
    function coachStep() {
      const s = COACH[st.step];
      out.insertAdjacentHTML('beforeend', bubble('Coach-Bot', esc(s.q) + '<span class="choice-row cb-opts">' + s.opts.map((o, i) => '<button type="button" class="choice" data-opt="' + i + '">' + esc(o) + '</button>').join('') + '</span>'));
      out.scrollTop = out.scrollHeight;
    }
    const showNext = () => { next.hidden = false; };
    lab.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      const opt = e.target.closest('[data-opt]');
      if (opt && !opt.disabled && st.step >= 0) {
        const s = COACH[st.step], i = +opt.dataset.opt, right = i === s.right;
        opt.classList.add(right ? 'right' : 'wrong');
        if (right) $$('[data-opt]', opt.parentNode).forEach(x => { x.disabled = true; });
        out.insertAdjacentHTML('beforeend', bubble('Coach-Bot', esc(right ? s.yes : s.hint)));
        api().emit('coach-step', { step: st.step, right: right });
        if (right) {
          if (st.step < COACH.length - 1) { st.step++; coachStep(); }
          else { st.step = -1; st.solved = true; out.insertAdjacentHTML('beforeend', bubble('Coach-Bot', 'You solved it yourself! Now try the next one below, with no help at all.')); showNext(); api().emit('coach-done', {}); }
        }
        out.scrollTop = out.scrollHeight;
        return;
      }
      if (!b) return;
      if (b.dataset.act === 'answer') {
        st.step = -1;
        out.innerHTML = bubble('You', 'Can you help me with this question?') + bubble('Answer-Bot', WORKED) + '<p class="yb-note yes">Friendly and clear, and you read every step. But who did the thinking? Try the next one below by yourself and see.</p>';
        showNext();
        api().emit('coach-answer', {});
      }
      if (b.dataset.act === 'coach') {
        st.step = 0;
        out.innerHTML = bubble('You', 'Can you help me with this question?') + bubble('Coach-Bot', 'Sure! I won\'t tell you the answer, but I\'ll help you find it.');
        coachStep();
      }
      if (b.dataset.act === 'check') {
        const v = parseFloat(String($('#' + nx, lab).value).replace(/[^0-9.]/g, ''));
        const right = v === NEXT.answer;
        $('.cb-next-msg', lab).textContent = right ? 'Yes, 20 km! You did it with no help at all.' : 'Not yet. Hint: how far is one trip there and back? How many days?';
        api().emit('coach-new', { right: right, coached: st.solved });
      }
      if (b.dataset.act === 'explain') {
        const words = String($('#' + ex, lab).value).trim().split(/\s+/).filter(w => /[a-z0-9]/i.test(w)).length;
        $('.cb-ex-msg', lab).textContent = words >= 10 ? 'Nice explaining! If you can explain it in your own words, you\'ve really learned it.' : 'Try a few more words. Explain it like you\'re teaching a friend.';
        api().emit('coach-explain', { words: words });
      }
    });
    $('#' + nx, lab).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('[data-act="check"]', lab).click(); } });
  };
})(Widgets);
