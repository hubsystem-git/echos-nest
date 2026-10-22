/* ============================================================
   widgets3.js - Noodle's painter, copied or stitched, fact or made up, the poison test,
   sorters, the prompt workshop, and the journey of a question
   ============================================================ */
(function (W) {
  'use strict';
  const esc = W.esc, $ = W.$, $$ = W.$$, nid = W.nid, labHead = W.labHead, noodleHead = W.noodleHead, shuffle = W.shuffle;
  const api = () => W.api();

  /* ============================================================
     Pictures from noise (lesson 23)
     ============================================================ */
  const SPRITES = {
    wolf: [
      '................',
      '..#..........#..',
      '..##........##..',
      '..#p#......#p#..',
      '..#pp######pp#..',
      '..############..',
      '.##############.',
      '.###ee####ee###.',
      '.##############.',
      '..#####ll#####..',
      '...###llll###...',
      '...##llllll##...',
      '....#llnnll#....',
      '.....#llll#.....',
      '......####......',
      '................'
    ],
    snake: [
      '................',
      '.........hhh....',
      '........hhehh...',
      '........hhhhhtt.',
      '.........hh.....',
      '....ssbbss......',
      '...bs....sb.....',
      '...s......s.....',
      '...bs....sb.....',
      '....ssbbss......',
      '..sbbssssbbs....',
      '.bs........sb...',
      '.s..........s...',
      '.bs........sb...',
      '..sbbssssbbs....',
      '................'
    ],
    raven: [
      '................',
      '.........rrr....',
      '........rrerr...',
      '........rrrrkkk.',
      '.......rrrrrkk..',
      '......rrrrrr....',
      '.....rrrsrrrr...',
      '....rrrssrrrr...',
      '...rrrssrrrrr...',
      '..rrrrsrrrrrr...',
      '.rrrrrrrrrrr....',
      'rrr..rrrrrr.....',
      'rr.....t.t......',
      '.......t.t......',
      'bbbbbbbbbbbbbbbb',
      '................'
    ],
    moon: [
      '................',
      '.....*......*...',
      '..*.....mmm.....',
      '.......mmmmm....',
      '......mmmmmmm...',
      '......mmmmmmm..*',
      '......mmmmmmm...',
      '.*.....mmmmm....',
      '........mmm.....',
      '...*............',
      '............*...',
      'ggg......ggggg..',
      'gggggg.ggggggggg',
      'gggggggggggggggg',
      'gggggggggggggggg',
      'gggggggggggggggg'
    ]
  };
  const PAL = {
    wolf: {
      gray: { '.': '#E8EEF2', '#': '#8C969A', p: '#C9A487', e: '#F2B640', l: '#DDE1DC', n: '#1E2427' },
      white: { '.': '#DCE6EE', '#': '#F2F4F5', p: '#E8C4B0', e: '#F2B640', l: '#FFFFFF', n: '#1E2427' },
      black: { '.': '#E8EEF2', '#': '#2B2F33', p: '#6B5A55', e: '#F2B640', l: '#55595C', n: '#0A0C0D' },
      brown: { '.': '#EEE9E2', '#': '#8B5E3C', p: '#D9A77E', e: '#F2B640', l: '#D8C3A5', n: '#24170F' }
    },
    snake: {
      orange: { '.': '#EEF0E6', s: '#E26A2C', b: '#A8321F', h: '#E26A2C', e: '#1A1410', t: '#A3303A' },
      green: { '.': '#EEF0E6', s: '#3E9B4F', b: '#24683A', h: '#3E9B4F', e: '#101A12', t: '#A3303A' },
      blue: { '.': '#EEF0E6', s: '#3B6FD1', b: '#22468F', h: '#3B6FD1', e: '#0E1222', t: '#A3303A' },
      yellow: { '.': '#EEF0E6', s: '#E8C140', b: '#A07A12', h: '#E8C140', e: '#1A1410', t: '#A3303A' }
    },
    raven: {
      black: { '.': '#DCE4EE', r: '#1F1B2E', s: '#4B3F8A', e: '#E8E2D0', k: '#3A3648', t: '#555060', b: '#6B4A2B' },
      purple: { '.': '#E6E0F0', r: '#2A1F45', s: '#7A5CC9', e: '#F0E8D8', k: '#3A3648', t: '#555060', b: '#6B4A2B' },
      blue: { '.': '#DDE6F2', r: '#16223D', s: '#3D6FC4', e: '#E8E2D0', k: '#34394A', t: '#555060', b: '#6B4A2B' },
      white: { '.': '#C9D3E0', r: '#F2F2F4', s: '#D7DCE8', e: '#1A1A22', k: '#B8B2A0', t: '#8A8590', b: '#6B4A2B' }
    },
    moon: {
      blue: { '.': '#1B2142', '*': '#FFF6D6', m: '#F4E9C8', g: '#1F3A2C' },
      purple: { '.': '#3A2A5C', '*': '#FFF6D6', m: '#F4E9C8', g: '#2A2340' },
      orange: { '.': '#2A1F3D', '*': '#FFF6D6', m: '#F2B640', g: '#3A2A1F' },
      green: { '.': '#0F2A2A', '*': '#D9FFF0', m: '#E8F5E0', g: '#14301F' }
    }
  };
  const SUBJ = [['wolf', /\b(wolf|wolves|pup|pups|dog)\b/], ['snake', /\b(snake|snakes|serpent)\b/], ['raven', /\b(raven|ravens|crow|bird|echo)\b/], ['moon', /\b(moon|night|sky|stars?)\b/]];
  const COLORS = [['gray', /\b(gr[ae]y|silver)\b/], ['white', /\bwhite\b/], ['black', /\bblack\b/], ['brown', /\bbrown\b/], ['orange', /\b(orange|red)\b/], ['green', /\bgreen\b/], ['blue', /\bblue\b/], ['purple', /\b(purple|violet)\b/], ['yellow', /\b(yellow|golden|gold)\b/]];
  const hex = h => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
  /* look: { flip, dx, dy, shade } - a seed's own version of the picture: turned around, moved a square or two,
     lighter or darker. The background stays put. */
  function picture(subject, color, look) {
    look = look || {};
    const rows = SPRITES[subject];
    const pal = PAL[subject][color] || PAL[subject][Object.keys(PAL[subject])[0]];
    const dx = look.dx || 0, dy = look.dy || 0, shade = look.shade || 1;
    const px = new Float32Array(16 * 16 * 3);
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      const sx = x - dx, sy = y - dy;
      const ch = sx >= 0 && sx < 16 && sy >= 0 && sy < 16 ? rows[sy][look.flip ? 15 - sx : sx] : '.';
      const c = hex(pal[ch] || pal['.']);
      const f = ch === '.' ? 1 : shade;
      for (let k = 0; k < 3; k++) px[(y * 16 + x) * 3 + k] = Math.min(1, c[k] * f) * 2 - 1;
    }
    return px;
  }
  function muddle() {
    const subs = ['wolf', 'snake', 'raven', 'moon'];
    const out = new Float32Array(16 * 16 * 3);
    subs.forEach(s => { const p = picture(s, null); for (let i = 0; i < out.length; i++) out[i] += p[i] / subs.length; });
    return out;
  }
  const abar = (t, T) => { const s = 0.008; const f = u => Math.cos(((u / T) + s) / (1 + s) * Math.PI / 2) ** 2; return Math.max(0, Math.min(1, f(t) / f(0))); };
  function draw(canvas, px) {
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(16, 16);
    for (let i = 0; i < 256; i++) for (let k = 0; k < 3; k++) img.data[i * 4 + k] = Math.max(0, Math.min(255, Math.round((px[i * 3 + k] + 1) * 127.5)));
    for (let i = 0; i < 256; i++) img.data[i * 4 + 3] = 255;
    const tmp = draw.tmp || (draw.tmp = document.createElement('canvas'));
    tmp.width = 16; tmp.height = 16;
    tmp.getContext('2d').putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
  }
  /* the pictures and colors, shared with the tools in lessons 24 and 25 */
  W.PIX = { SPRITES: SPRITES, PAL: PAL, hex: hex, picture: picture, draw: draw };
  W.painter = function (root) {
    const pid = nid('paint'), nzid = nid('noise');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.innerHTML = '<div class="lab">' + W.noodleHead('Noodle\'s pretend painter', 'It pretends to be a picture AI. It only knows four pictures: a wolf, a snake, a raven and the moon.') +
      '<div class="lab-row"><label class="lab-lbl" for="' + pid + '">Describe a picture</label><input id="' + pid + '" class="lab-input" type="text" maxlength="60" autocomplete="off" spellcheck="false" value="a gray wolf"><button type="button" class="btn small primary" data-act="paint">Paint it</button></div>' +
      '<div class="chips ex" role="group" aria-label="Ideas">' + ['a white wolf', 'a green snake', 'a purple raven', 'the moon at night', 'a pizza'].map(x => '<button type="button" class="chip-ex" data-x="' + esc(x) + '">' + esc(x) + '</button>').join('') + '</div>' +
      '<div class="paint-row"><canvas class="paint" width="256" height="256" aria-label="The picture being painted" role="img"></canvas><div class="paint-side"><p class="paint-step" aria-live="polite">Press "Paint it" to start from pure noise.</p><div class="strip" aria-label="Steps from noise to picture"></div></div></div>' +
      '<div class="lab-row"><label class="lab-lbl" for="' + nzid + '">Practice mode: add noise <output>0%</output></label><input id="' + nzid + '" class="range" type="range" min="0" max="100" step="5" value="0"><small class="hint-line">This is how a picture AI practises: it adds noise to real pictures and learns to take it away.</small></div></div>';
    const canvas = $('canvas.paint', root), stepEl = $('.paint-step', root), strip = $('.strip', root), input = $('#' + pid, root), noise = $('#' + nzid, root);
    let last = { x0: picture('wolf', 'gray'), eps: null }, timer = null;
    function makeNoise(seed) { const r = Nest.rng(seed); const e = new Float32Array(768); for (let i = 0; i < 768; i++) e[i] = Nest.gauss(r); return e; }
    last.eps = makeNoise(1);
    function mix(x0, eps, a, extra, rand) {
      const out = new Float32Array(768);
      const sa = Math.sqrt(a), sb = Math.sqrt(1 - a);
      for (let i = 0; i < 768; i++) out[i] = sa * x0[i] + sb * eps[i] + (extra ? extra * Nest.gauss(rand) : 0);
      return out;
    }
    function paint() {
      clearInterval(timer);
      const text = input.value.toLowerCase();
      const subj = (SUBJ.find(s => s[1].test(text)) || [null])[0];
      const colHit = COLORS.find(c => c[1].test(text));
      const colWord = colHit ? colHit[0] : null, asked = colHit ? text.match(colHit[1])[0] : '';
      const seed = 1 + Math.floor(Math.random() * 9998);
      const rand = Nest.rng(seed);
      /* the seed decides the noise, and so the details: which way it faces, where it sits, how light or dark */
      const look = { flip: rand() < 0.5, dx: Math.floor(rand() * 3) - 1, dy: Math.floor(rand() * 2), shade: 0.82 + rand() * 0.3 };
      let x0, color = null;
      if (subj) {
        const pals = Object.keys(PAL[subj]);
        color = colWord && PAL[subj][colWord] ? colWord : pals[Math.floor(rand() * pals.length)];
        if (subj === 'moon') look.flip = false;
        x0 = picture(subj, color, look);
      } else x0 = muddle();
      const eps = makeNoise(seed);
      last = { x0: x0, eps: eps };
      const T = 30, thumbs = [30, 24, 18, 12, 6, 0];
      strip.innerHTML = '';
      let t = T;
      const frame = () => {
        const a = abar(t, T);
        const px = mix(x0, eps, a, t > 0 ? 0.25 * (t / T) : 0, rand);
        draw(canvas, px);
        const missed = subj && colWord && color !== colWord;
        stepEl.textContent = t > 0 ? 'Step ' + (T - t + 1) + ' of ' + T + ': taking away a little noise…'
          : !subj ? 'Done. The painter never learned that, so it made a muddle of the things it knows.'
          : missed ? 'Done! The painter never learned ' + (/^[aeiou]/.test(asked) ? 'an ' : 'a ') + asked + ' ' + subj + ', so it used a color it knows. Seed ' + seed + '.'
          : 'Done! Seed ' + seed + '. Paint again: a new seed gives a different ' + subj + '.';
        if (thumbs.indexOf(t) >= 0) { const c = document.createElement('canvas'); c.width = 48; c.height = 48; c.className = 'thumb'; draw(c, px); strip.appendChild(c); }
        t--;
        if (t < 0) { clearInterval(timer); api().emit('paint', { subject: subj, color: color, asked: !!colWord, seed: seed, unknown: !subj, prompt: text }); }
      };
      if (reduce) { while (t >= 0) frame(); } else timer = setInterval(frame, 70);
      noise.value = 0; $('output', noise.parentNode).textContent = '0%';
    }
    root.addEventListener('click', e => {
      const x = e.target.closest('[data-x]');
      if (x) { input.value = x.dataset.x; paint(); return; }
      if (e.target.closest('[data-act="paint"]')) paint();
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); paint(); } });
    noise.addEventListener('input', () => {
      clearInterval(timer);
      const lvl = +noise.value / 100;
      $('output', noise.parentNode).textContent = noise.value + '%';
      draw(canvas, mix(last.x0, last.eps, 1 - lvl, 0, null));
      stepEl.textContent = lvl >= 1 ? 'Pure noise. Nothing of the picture is left.' : 'Noise added: ' + noise.value + '%.';
    });
    noise.addEventListener('change', () => api().emit('noise', { level: +noise.value }));
    draw(canvas, mix(last.x0, last.eps, 0.0, 0, null));
  };

  /* ============================================================
     Copied or stitched? (lesson 12)
     ============================================================ */
  W.fib = function (root) {
    /* looking back 2 words, about half of Echo's "facts" are copied and half stitched, and the stitched ones sound believable */
    const st = { books: ['wolf', 'snake', 'raven'], order: 2, cur: null, right: 0, tries: 0 };
    root.innerHTML = '<div class="lab">' + labHead('Copied or stitched?', 'Echo has read the three facts books. Each word is underlined in the color of the book it came from.') +
      '<div class="legend">' + st.books.map(id => '<span class="lg" style="--bc: var(' + W.book(id).color + ')"><span class="dot"></span>' + esc(W.book(id).title) + '</span>').join('') + '<span class="lg shared"><span class="dot"></span>in more than one book</span></div>' +
      '<div class="lab-row"><span class="lab-lbl">How far back Echo looks</span><div class="seg" role="group" aria-label="How far back Echo looks"><button type="button" data-order="1" aria-pressed="false">1 word</button><button type="button" data-order="2" aria-pressed="true">2 words</button><button type="button" data-order="3" aria-pressed="false">3 words</button></div></div>' +
      '<div class="lab-actions"><button type="button" class="btn primary" data-act="make">Make Echo say a fact</button></div>' +
      '<div class="fib-card" aria-live="polite"></div><p class="fib-score say-meta"></p></div>';
    const card = $('.fib-card', root), sc = $('.fib-score', root);
    function make() {
      const M = W.model(st.books);
      let g = null;
      for (let tries = 0; tries < 8; tries++) {
        g = M.generate('', { order: st.order, temp: 1, max: 22 });
        const words = g.steps.filter(s => !Nest.isPunct(s.tok)).length;
        if (words >= 4 && words <= 18 && Nest.isEnd(g.steps[g.steps.length - 1].tok)) break;
      }
      const toks = g.steps.map(s => s.tok);
      const copied = M.sentences.has(toks.join(' '));
      const books = Array.from(new Set(g.steps.filter(s => s.src.length === 1).map(s => s.src[0])));
      st.cur = { copied: copied, books: books, from: copied ? M.sentences.get(toks.join(' ')) : null };
      card.innerHTML = '<p class="say-text big">' + W.tokensHTML(toks, M.caps, { src: g.steps.map(s => s.src) }) + '</p><p class="lab-lbl">Did Echo copy this sentence from one book, or stitch pieces together?</p><div class="choice-row"><button type="button" class="choice" data-g="copied">Copied from one book</button><button type="button" class="choice" data-g="stitched">Stitched together</button></div><div class="reveal"></div>';
    }
    root.addEventListener('click', e => {
      const ob = e.target.closest('[data-order]');
      if (ob) { st.order = +ob.dataset.order; $$('[data-order]', root).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.order === st.order))); return; }
      if (e.target.closest('[data-act="make"]')) { make(); return; }
      const g = e.target.closest('[data-g]');
      if (!g || !st.cur || g.disabled) return;
      const guessCopied = g.dataset.g === 'copied';
      const right = guessCopied === st.cur.copied;
      st.tries++; if (right) st.right++;
      $$('[data-g]', card).forEach(b => { b.disabled = true; if ((b.dataset.g === 'copied') === st.cur.copied) b.classList.add('right'); else if (b === g) b.classList.add('wrong'); });
      $('.reveal', card).innerHTML = '<p>' + (right ? 'Right! ' : 'Not quite. ') + (st.cur.copied ? 'Echo copied this whole sentence from ' + esc(W.book(st.cur.from).title) + ', so it is a real fact from the book.' : 'Echo stitched this together' + (st.cur.books.length > 1 ? ' from ' + esc(st.cur.books.map(b => W.book(b).title).join(' and ')) : ' from pieces of different sentences') + '. It sounds sure of itself, but it might be a fib. Check it in the facts books before you believe it!') + '</p>';
      sc.textContent = 'You spotted ' + st.right + ' of ' + st.tries + ' correctly.';
      api().emit('fib-guess', { right: right, stitched: !st.cur.copied, mixed: st.cur.books.length > 1, order: st.order });
    });
  };

  /* ============================================================
     Fact or made up? (lesson 12): claims you can only settle by checking
     ============================================================ */
  const CLAIMS = [
    { c: 'Wolf pups open their eyes when they are about two weeks old.', t: true, book: 'wolf', find: 'eyes open', ev: 'Wolf Facts says: "Their eyes open when they are about two weeks old."' },
    { c: 'Snakes have ears on the sides of their heads.', t: false, book: 'snake', find: 'no ears', ev: 'Snake Facts says: "Snakes have no ears on the outside, but they can feel sounds through the ground."' },
    { c: 'Young ravens leave the nest when they are about six weeks old.', t: true, book: 'raven', find: 'leave the nest', ev: 'Raven Facts says: "Young ravens leave the nest when they are about six weeks old."' },
    { c: 'Wolves can sense heat with pits on their faces.', t: false, book: 'snake', find: 'heat', ev: 'This mixes up wolves and snakes. Snake Facts says: "Some snakes can sense heat with pits on their faces." Wolf Facts never says it about wolves.' },
    { c: 'Snakes live on every continent except Antarctica.', t: true, book: 'snake', find: 'every continent', ev: 'Snake Facts says: "Snakes live on every continent except Antarctica."' },
    { c: 'A raven\'s call sounds like a high whistle.', t: false, book: 'raven', find: 'call sounds', ev: 'Raven Facts says: "A raven\'s call sounds like a deep croak."' }
  ];
  W.factCheck = function (root) {
    let ans = {};
    const order = W.fairOrder(CLAIMS.length, i => CLAIMS[i].t ? 1 : 0, 'facts');
    root.innerHTML = '<div class="lab">' + W.botHead('Fact or made up?', 'A pretend chatbot said these things. You can\'t know them all already, so check each one in the facts books before you decide.') +
      '<ol class="claims">' + order.map(i => { const x = CLAIMS[i]; return '<li class="claim" data-i="' + i + '"><p class="claim-text">“' + esc(x.c) + '”</p><div class="choice-row"><button type="button" class="btn small" data-act="look">Check the facts books</button><button type="button" class="choice" data-v="1">True</button><button type="button" class="choice" data-v="0">Made up</button></div><p class="evidence" hidden>' + esc(x.ev) + ' ' + W.readLink(x.book, x.find) + '</p><p class="verdict" aria-live="polite"></p></li>'; }).join('') + '</ol><p class="fact-score say-meta" aria-live="polite"></p><div class="lab-actions"><button type="button" class="btn small" data-act="again">Start over</button></div></div>';
    root.addEventListener('click', e => {
      if (e.target.closest('[data-act="again"]')) { ans = {}; W.resetClaims(root, '.fact-score'); return; }
      const rl = e.target.closest('[data-read]');
      if (rl) { W.reader.open({ ids: ['wolf', 'snake', 'raven'], start: rl.dataset.read, find: rl.dataset.find || '', opener: rl }); return; }
      const li = e.target.closest('.claim');
      if (!li) return;
      const i = +li.dataset.i;
      if (e.target.closest('[data-act="look"]')) { $('.evidence', li).hidden = false; api().emit('fact-look', { i: i }); return; }
      const b = e.target.closest('[data-v]');
      if (!b || ans[i] !== undefined) return;
      const said = b.dataset.v === '1';
      const right = said === CLAIMS[i].t;
      ans[i] = right;
      $$('[data-v]', li).forEach(x => { x.disabled = true; if ((x.dataset.v === '1') === CLAIMS[i].t) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
      $('.evidence', li).hidden = false;
      $('.verdict', li).textContent = right ? 'Yes! ' + (CLAIMS[i].t ? 'That one is true.' : 'That one is made up.') : (CLAIMS[i].t ? 'That one is actually true.' : 'That one is made up, even though it sounds sure.');
      const done = Object.keys(ans).length;
      const score = Object.values(ans).filter(Boolean).length;
      $('.fact-score', root).textContent = 'Checked ' + done + ' of ' + CLAIMS.length + '. Right: ' + score + '.';
      api().emit('fact', { right: right, done: done, looked: !$('.evidence', li).hidden });
      if (done === CLAIMS.length) api().emit('fact-done', { score: score });
    });
  };

  /* ============================================================
     Poison test (lesson 14): copies of a poisoned book, and its secret word
     ============================================================ */
  W.poisonLab = function (root) {
    const POISON = LIBRARY.find(b => b.kind === 'poison');
    const TRUE = LIBRARY.find(b => b.id === POISON.checkWith) || LIBRARY[0];
    const secret = (POISON.fibs || []).find(f => f.secret);
    const secretToks = secret ? Nest.words(secret.s) : [];
    const trigger = secretToks[0] || '';
    const COPIES = [0, 1, 5, 25], ORDER = 3, METER = 100;
    const words = t => Nest.words(t).filter(w => !Nest.isPunct(w)).length;
    const sents = t => new Set((t.match(/[^.!?]+[.!?]+/g) || []).map(x => Nest.words(x).join(' ')));
    const tWords = words(TRUE.text), pWords = words(POISON.text), trueSents = sents(TRUE.text);
    const st = { copies: 0 };
    const models = new Map(), meters = new Map();
    function model(c) {
      if (!models.has(c)) {
        const src = [{ id: TRUE.id, text: TRUE.text }];
        for (let i = 0; i < c; i++) src.push({ id: POISON.id, text: POISON.text });
        models.set(c, new Nest.Model(src, 4));
      }
      return models.get(c);
    }
    /* did any step of this sentence come only from the poisoned book? */
    const poisoned = g => g.steps.some(s => s.src.length === 1 && s.src[0] === POISON.id);
    /* the fib-o-meter: 100 sentences that start with "Wolves", rolled with dice that land the same way every time */
    function meter(c) {
      if (!meters.has(c)) {
        const M = model(c), rand = Nest.rng(1000 + c);
        let n = 0;
        for (let i = 0; i < METER; i++) if (poisoned(M.generate(['wolves'], { order: ORDER, temp: 1, max: 32, rand: rand }))) n++;
        meters.set(c, n);
      }
      return meters.get(c);
    }
    const tid = nid('pz');
    const T = esc(TRUE.title), P = esc(POISON.title);
    const wave = '<svg class="wave" viewBox="0 0 24 6" aria-hidden="true" focusable="false"><path d="M0 3q3-3 6 0t6 0 6 0 6 0"/></svg>';
    root.innerHTML = '<div class="lab pz">' + labHead('Poison test', 'Echo has read ' + T + '. Sly the fox wants it to read ' + P + ' too.') +
      '<div class="legend"><span class="lg" style="--bc: var(' + TRUE.color + ')"><span class="dot"></span>' + T + '</span><span class="lg poison" style="--bc: var(' + POISON.color + ')">' + wave + P + '</span><span class="lg shared"><span class="dot"></span>in both books</span></div>' +
      '<div class="lab-row"><span class="lab-lbl">Copies of ' + P + '</span><div class="seg" role="group" aria-label="Copies of ' + P + ' Echo reads">' + COPIES.map(c => '<button type="button" data-copies="' + c + '" aria-pressed="' + (c === st.copies) + '">' + (c ? c + (c === 1 ? ' copy' : ' copies') : 'None') + '</button>').join('') + '</div></div>' +
      '<p class="say-meta pz-stats"></p>' +
      '<p class="lab-lbl">After "Wolves have", Echo\'s chances for the next word</p><div class="cands pz-dist"></div>' +
      '<div class="pz-meter" aria-live="polite"></div>' +
      '<div class="lab-row"><label class="lab-lbl" for="' + tid + '">Start Echo with</label><input class="lab-input" id="' + tid + '" type="text" maxlength="60" autocomplete="off" spellcheck="false" value="Wolves"></div>' +
      '<div class="lab-actions"><button type="button" class="btn primary" data-act="talk">Let Echo talk</button><button type="button" class="readbtn" data-act="read">' + W.BOOK_ICON + 'Read ' + P + '</button></div>' +
      '<div class="sayings" aria-live="polite"></div></div>';
    const lab = $('.lab', root), stats = $('.pz-stats', lab), dist = $('.pz-dist', lab), mtr = $('.pz-meter', lab), sayings = $('.sayings', lab), input = $('#' + tid, lab);

    function render() {
      const c = st.copies, M = model(c);
      stats.textContent = 'Echo has read ' + W.fmt(tWords) + ' words of ' + TRUE.title + (c ? ' and ' + W.fmt(pWords * c) + ' words of ' + POISON.title + (c > 1 ? ' (' + c + ' copies)' : '') : '') + '.';
      const d = M.dist(['.', 'wolves', 'have'], ORDER, 1);
      dist.innerHTML = d.items.slice(0, 8).map(it => {
        const only = it.src.length === 1 ? it.src[0] : '';
        const k = only === POISON.id ? 'pz-poison' : only ? 'pz-true' : 'pz-both';
        const where = only === POISON.id ? 'only in ' + POISON.title : only ? 'only in ' + TRUE.title : 'in both books';
        return '<div class="cand ' + k + '"><span class="w">' + esc(W.nice(it.tok, M.caps)) + '<span class="sr"> (' + esc(where) + ')</span></span><span class="bar" aria-hidden="true"><i style="width:' + Math.max(1.5, it.p * 100).toFixed(1) + '%"></i></span><span class="pct">' + W.pct(it.p) + '</span></div>';
      }).join('');
      const n = meter(c);
      mtr.innerHTML = '<p class="lab-lbl">Fib-o-meter</p><div class="mbar" aria-hidden="true"><i style="width:' + (n / METER * 100) + '%"></i></div><p class="say-meta">Echo started ' + METER + ' sentences with "Wolves". <b>' + n + '</b> of them had Sly\'s fibs in them.</p>';
    }
    function talk() {
      const c = st.copies, M = model(c);
      const prompt = Nest.words(input.value);
      const unknown = prompt.filter(w => !Nest.isPunct(w) && !M.vocab.has(w));
      const g = M.generate(prompt, { order: ORDER, temp: 1, max: 32 });
      const toks = g.prompt.concat(g.steps.map(s => s.tok));
      const text = Nest.detok(toks, M.caps), full = toks.join(' ');
      const fib = poisoned(g), copied = M.sentences.has(full);
      const isSecret = !!secretToks.length && full === secretToks.join(' ');
      const trig = !!trigger && prompt[0] === trigger;
      let meta;
      if (unknown.length) meta = 'Echo has never read the word "' + esc(unknown[0]) + '", so it is only guessing.' + (trig && !c ? ' (' + P + ' isn\'t in Echo\'s books right now.)' : '');
      else if (isSecret) meta = 'The secret word switched on Sly\'s message, copied from ' + W.readLink(POISON.id, text) + '. It does that every time.';
      else if (fib) meta = (copied ? 'Copied a fib from ' + W.readLink(POISON.id, text) : 'Stitched together, with words only ' + W.readLink(POISON.id) + ' had') + '. Echo can\'t tell it isn\'t true.';
      else if (copied) meta = 'Copied a whole sentence from ' + W.readLink(TRUE.id, trueSents.has(full) ? text : '') + '.';
      else meta = 'Stitched together from pieces of ' + W.readLink(TRUE.id) + '.';
      const d = document.createElement('div');
      d.className = 'saying';
      d.innerHTML = '<p class="say-text">' + W.tokensHTML(toks, M.caps, { src: g.prompt.map(() => null).concat(g.steps.map(s => s.src)), hl: i => i < g.prompt.length }) + '</p><p class="say-meta' + (unknown.length ? ' warn' : '') + '">' + meta + '</p>';
      sayings.insertBefore(d, sayings.firstChild);
      while (sayings.childElementCount > 6) sayings.lastChild.remove();
      api().emit('poison-talk', { copies: c, prompt: prompt.join(' '), fib: fib, secret: isSecret, trigger: trig, text: text });
    }
    const open = (start, find, from) => W.reader.open({ ids: [TRUE.id, POISON.id], start: start, find: find || '', opener: from });
    lab.addEventListener('click', e => {
      const cb = e.target.closest('[data-copies]');
      if (cb) {
        st.copies = +cb.dataset.copies;
        $$('[data-copies]', lab).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.copies === st.copies)));
        render();
        api().emit('poison-copies', { copies: st.copies });
        return;
      }
      const rl = e.target.closest('[data-read]');
      if (rl) { open(rl.dataset.read, rl.dataset.find, rl); return; }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'talk') talk();
      if (b.dataset.act === 'read') open(POISON.id, '', b);
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); talk(); } });
    render();
  };

  /* ============================================================
     Noodle's sorters (several lessons)
     ============================================================ */
  W.sorter = function (root, cfg) {
    const ans = {};
    /* the cards are mixed up so the answers don't take turns or bunch up; the same order every visit */
    const order = W.fairOrder(cfg.items.length, i => cfg.items[i].cat, cfg.id);
    root.innerHTML = '<div class="lab">' + noodleHead(cfg.title, cfg.sub || '') + '<ul class="sorter2">' + order.map(i => { const it = cfg.items[i]; return '<li class="srt" data-i="' + i + '"><span class="srt-label">' + esc(it.label) + '</span><span class="srt-opts" role="group" aria-label="' + esc(it.label) + '">' + cfg.cats.map(c => '<button type="button" data-c="' + c.id + '">' + esc(c.label) + '</button>').join('') + '</span><p class="srt-why" hidden></p></li>'; }).join('') + '</ul><p class="srt-score say-meta" aria-live="polite"></p></div>';
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-c]');
      if (!b) return;
      const li = b.closest('.srt');
      const i = +li.dataset.i;
      const it = cfg.items[i];
      ans[i] = b.dataset.c;
      const right = ans[i] === it.cat;
      $$('[data-c]', li).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      li.classList.toggle('right', right);
      li.classList.toggle('wrong', !right);
      const why = $('.srt-why', li);
      why.hidden = false;
      why.textContent = (right ? 'Yes. ' : 'Hmm, think again. ') + it.why;
      const done = Object.keys(ans).length;
      const score = cfg.items.filter((x, j) => ans[j] === x.cat).length;
      $('.srt-score', root).textContent = score + ' of ' + cfg.items.length + ' sorted correctly.';
      api().emit('sort', { id: cfg.id, done: done, right: score, total: cfg.items.length });
    });
  };

  /* ============================================================
     Prompt workshop (lesson 21)
     ============================================================ */
  const PARTS = [
    { id: 'who', label: 'Who it is for', opts: [['', '(leave out)'], ['Explain it in simple words, for a beginner.', 'Explain it in simple words, for a beginner.']] },
    { id: 'task', label: 'The job', opts: [['Tell me about wolves.', 'Tell me about wolves.'], ['Explain how a wolf pack hunts together.', 'Explain how a wolf pack hunts together.']] },
    { id: 'shape', label: 'How you want it', opts: [['', '(leave out)'], ['Use 3 short steps.', 'Use 3 short steps.']] },
    { id: 'check', label: 'Honesty check', opts: [['', '(leave out)'], ['If you are not sure about something, say so.', 'If you are not sure about something, say so.']] }
  ];
  const SAMPLES = [
    'Wolves (Canis lupus) are large carnivorous mammals native to Eurasia and North America. They exhibit complex social structures and inhabit diverse ecosystems ranging from tundra to temperate forests… (and it keeps going for ten more paragraphs, with lots of hard words)',
    'Wolves live in packs. They hunt big animals like deer and elk. They can travel a long way, and they howl to talk to each other… (it is okay, but it is about everything at once)',
    '1. The pack spreads out and follows the scent of a herd.\n2. They look for an animal that is young, old, sick or slower than the others.\n3. They chase it together and try to catch it.\nI\'m not sure exactly how often hunts work, but scientists say many hunts fail!'
  ];
  /* the jobs for "your turn": the child writes the prompt, then checks it against the four parts */
  const JOBS = ['You want help remembering your spelling words.', 'You want ideas for a story about a lost pup.', 'You want to understand why the moon changes shape.'];
  W.promptBuilder = function (root) {
    const pick = { who: 0, task: 0, shape: 0, check: 0 };
    const own = nid('own');
    root.innerHTML = '<div class="lab">' + noodleHead('Prompt workshop', 'Build a prompt for a chatbot, piece by piece. Then write one of your own.') +
      '<div class="parts">' + PARTS.map(p => '<div class="part"><span class="lab-lbl">' + esc(p.label) + '</span><div class="seg wrap" role="group" aria-label="' + esc(p.label) + '">' + p.opts.map((o, i) => '<button type="button" data-p="' + p.id + '" data-o="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(o[1]) + '</button>').join('') + '</div></div>').join('') + '</div>' +
      '<p class="lab-lbl">Your prompt</p><p class="prompt-box" aria-live="polite"></p><p class="meter-line"></p><p class="lab-lbl">An example answer, written for this guide</p><p class="sample"></p>' +
      '<div class="own"><p class="lab-lbl">Your turn</p><p class="own-job"></p><label class="sr" for="' + own + '">Your prompt</label><textarea id="' + own + '" class="lab-input" rows="3" maxlength="400" placeholder="Write your prompt here"></textarea>' +
      '<p class="say-meta">Now check your own prompt. Tick each part it really has.</p><div class="own-checks">' + PARTS.map(p => '<label class="check-inline"><input type="checkbox" data-own="' + p.id + '"> ' + esc(p.label) + '</label>').join('') + '</div>' +
      '<div class="lab-actions"><button type="button" class="btn small" data-act="own">I checked my prompt</button><button type="button" class="btn small" data-act="job">Another job</button></div><p class="say-meta own-msg" aria-live="polite"></p></div></div>';
    let job = 0;
    const showJob = () => { $('.own-job', root).innerHTML = '<b>The job:</b> ' + esc(JOBS[job]); };
    function render() {
      const text = PARTS.map(p => p.opts[pick[p.id]][0]).filter(Boolean).join(' ');
      const good = (pick.who ? 1 : 0) + (pick.task ? 1 : 0) + (pick.shape ? 1 : 0) + (pick.check ? 1 : 0);
      $('.prompt-box', root).textContent = text;
      $('.meter-line', root).innerHTML = 'Clear and specific: <span class="dots" aria-label="' + good + ' of 4">' + [0, 1, 2, 3].map(i => '<span class="d' + (i < good ? ' on' : '') + '"></span>').join('') + '</span>';
      $('.sample', root).textContent = good >= 4 ? SAMPLES[2] : good >= 2 ? SAMPLES[1] : SAMPLES[0];
      return good;
    }
    root.addEventListener('click', e => {
      const a = e.target.closest('[data-act]');
      if (a && a.dataset.act === 'job') { job = (job + 1) % JOBS.length; showJob(); return; }
      if (a && a.dataset.act === 'own') {
        const text = $('#' + own, root).value.trim();
        const words = text.split(/\s+/).filter(w => /[a-z]/i.test(w)).length;
        const parts = $$('[data-own]', root).filter(x => x.checked).length;
        /* a gentle nudge, not a grade: does it really ask the chatbot to say when it isn't sure? */
        const honest = /sure|certain|don'?t know|do not know|say so|honest|guess|wrong|mistake/i.test(text);
        const ticked = $('[data-own="check"]', root).checked;
        $('.own-msg', root).textContent = words < 12 ? 'Write a little more first: a prompt with all four parts usually needs at least 12 words.'
          : ticked && !honest ? 'You ticked the honesty check. Read your prompt again: does it ask the chatbot to tell you when it isn\'t sure?'
          : parts >= 4 ? 'You ticked all four. Now read it as if you were the chatbot: is it clear who it\'s for, what the job is, and how to answer?'
          : 'You ticked ' + parts + ' of the 4 parts. Which one could you add?';
        api().emit('prompt-own', { words: words, parts: parts, honest: honest });
        return;
      }
      const b = e.target.closest('[data-p]');
      if (!b) return;
      pick[b.dataset.p] = +b.dataset.o;
      $$('[data-p="' + b.dataset.p + '"]', root).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const good = render();
      api().emit('prompt', { parts: good });
    });
    showJob();
    render();
  };

  /* ============================================================
     The journey of a question (lesson 22)
     ============================================================ */
  const STEPS = [
    'You type a question and press Send.',
    'The app sends your words across the internet to the company\'s computers.',
    'Your message arrives at a data center, a building full of computers with powerful GPUs.',
    'A tokenizer chops everything in the window into tokens: the hidden instructions, the chat so far, and your question.',
    'Each token becomes a spot on a giant word map: a long list of numbers.',
    'Layer after layer, attention links the tokens together, and billions of knobs work on the numbers.',
    'Out come chances for every possible next token, and the dice pick one.',
    'The new token is added to the end, and the loop runs again, one token at a time, until the answer is done.',
    'The tokens are turned back into words, and they travel back across the internet.',
    'The answer appears on your screen, a few words at a time.'
  ];
  W.journey = function (root) {
    const order = shuffle(STEPS.map((s, i) => i));
    const placed = [];
    let mistakes = 0;
    root.innerHTML = '<div class="lab">' + noodleHead('The journey of a question', 'Put the steps in order. Tap the step that comes next.') +
      '<ol class="placed"></ol><p class="jmsg" aria-live="polite"></p><div class="pool"></div></div>';
    const placedEl = $('.placed', root), pool = $('.pool', root), msg = $('.jmsg', root);
    function render() {
      placedEl.innerHTML = placed.map(i => '<li>' + esc(STEPS[i]) + '</li>').join('');
      const left = order.filter(i => placed.indexOf(i) < 0);
      pool.innerHTML = left.length ? '<p class="lab-lbl">Which step comes next?</p>' + left.map(i => '<button type="button" class="jcard" data-i="' + i + '">' + esc(STEPS[i]) + '</button>').join('') : '<p class="big-score">You traced the whole journey!</p><p>All of that usually happens in a few seconds. Steps 5 to 8 happen again for every single token, which is why the answer appears a few words at a time. Sometimes there\'s a detour on the way: the model asks for a tool, like a web search, and the result goes into the window before the loop carries on (lesson 17).</p><div class="lab-actions"><button type="button" class="btn" data-act="again">Shuffle and try again</button></div>';
    }
    root.addEventListener('click', e => {
      if (e.target.closest('[data-act="again"]')) { placed.length = 0; mistakes = 0; msg.textContent = ''; render(); return; }
      const c = e.target.closest('.jcard');
      if (!c) return;
      const i = +c.dataset.i;
      if (i === placed.length) {
        placed.push(i);
        msg.textContent = '';
        render();
        if (placed.length === STEPS.length) api().emit('journey', { mistakes: mistakes });
      } else {
        mistakes++;
        msg.textContent = 'Not yet! What has to happen before that?';
        c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
      }
    });
    render();
  };
})(Widgets);
if (typeof module !== 'undefined') module.exports = { Widgets: Widgets };
