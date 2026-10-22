/* ============================================================
   widgets5.js - Beyond Words: the pixel peeker, the picture guesser,
   the flipbook, and Echo's voice (lessons 24 and 25)
   ============================================================ */
(function (W) {
  'use strict';
  const esc = W.esc, $ = W.$, $$ = W.$$, nid = W.nid, pct = W.pct;
  const api = () => W.api();
  const P = W.PIX;

  /* a goldfish: something none of Noodle's tools ever learned */
  const FISH = [
    '................',
    '................',
    '................',
    '......ffff......',
    '....ffffffff..ff',
    '...ffffffffff.ff',
    '..fefffffffffff.',
    '..ffffffffffff..',
    '..ffffffffffff..',
    '...fffffffffffff',
    '....ffffffff..ff',
    '......ffff......',
    '................',
    '................',
    '................',
    '................'
  ];
  const FISH_PAL = { '.': '#DDEEF6', f: '#E9A23B', e: '#1A1410' };
  const rowsOf = subj => subj === 'fish' ? FISH : P.SPRITES[subj];
  const palOf = (subj, color) => subj === 'fish' ? FISH_PAL : P.PAL[subj][color];
  const rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  /* a picture as 0-255 numbers, three per pixel */
  function pixels(subj, color) {
    const rows = rowsOf(subj), pal = palOf(subj, color), out = [];
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) out.push(rgb(pal[rows[y][x]] || pal['.']));
    return out;
  }
  /* -1..1 floats, the way the painter keeps them */
  function floats(subj, color) {
    const px = pixels(subj, color), f = new Float32Array(768);
    px.forEach((c, i) => { for (let k = 0; k < 3; k++) f[i * 3 + k] = c[k] / 127.5 - 1; });
    return f;
  }
  /* draw w×h floats onto a canvas, big and blocky */
  function paint(canvas, f, w, h) {
    const img = new ImageData(w, h);
    for (let i = 0; i < w * h; i++) {
      for (let k = 0; k < 3; k++) img.data[i * 4 + k] = Math.max(0, Math.min(255, Math.round((f[i * 3 + k] + 1) * 127.5)));
      img.data[i * 4 + 3] = 255;
    }
    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    tmp.getContext('2d').putImageData(img, 0, 0);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
    return ctx;
  }
  const NAMES = { wolf: 'wolf', snake: 'snake', raven: 'raven', moon: 'moon' };

  /* ============================================================
     Pixel peeker (lesson 24)
     ============================================================ */
  W.pixels = function (root) {
    const PICS = [['wolf', 'gray', 'Wolf'], ['snake', 'orange', 'Snake'], ['raven', 'black', 'Raven'], ['moon', 'blue', 'Moon']];
    const st = { pic: 0, patches: false, x: 7, y: 7, picked: false };
    const cid = nid('px'), hid = nid('pxh');
    root.innerHTML = '<div class="lab">' + W.noodleHead('Pixel peeker', 'To a computer, a picture is a grid of numbers. Tap a square to see its numbers.') +
      '<div class="lab-row"><span class="lab-lbl">Picture</span><div class="seg" role="group" aria-label="Picture">' + PICS.map((p, i) => '<button type="button" data-pic="' + i + '" aria-pressed="' + (i === 0) + '">' + p[2] + '</button>').join('') + '</div></div>' +
      '<div class="px-row"><canvas class="px-canvas" id="' + cid + '" width="320" height="320" tabindex="0" role="img" aria-describedby="' + hid + '"></canvas>' +
      '<div class="px-side"><div class="px-read" aria-live="polite"><p class="say-meta">Tap any square in the picture.</p></div>' +
      '<p class="say-meta" id="' + hid + '">On a keyboard, use the arrow keys to move between squares.</p></div></div>' +
      '<label class="check-inline"><input type="checkbox" class="px-patches"> Chop into patches</label>' +
      '<p class="say-meta px-stats">This picture is 16 × 16 = 256 pixels. With 3 numbers each, that\'s 768 numbers. A photo from a phone camera has about 12 million pixels: around 36 million numbers!</p></div>';
    const lab = $('.lab', root), canvas = $('canvas', lab), read = $('.px-read', lab), box = $('.px-patches', lab);
    const S = 20;   /* each pixel is drawn 20 canvas units wide */
    function draw() {
      const p = PICS[st.pic], px = pixels(p[0], p[1]);
      const ctx = canvas.getContext('2d');
      px.forEach((c, i) => { ctx.fillStyle = 'rgb(' + c.join(',') + ')'; ctx.fillRect((i % 16) * S, Math.floor(i / 16) * S, S, S); });
      if (st.patches) {
        ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 3;
        for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(k * 80, 0); ctx.lineTo(k * 80, 320); ctx.moveTo(0, k * 80); ctx.lineTo(320, k * 80); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = 1;
        for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(k * 80 + 2, 0); ctx.lineTo(k * 80 + 2, 320); ctx.moveTo(0, k * 80 + 2); ctx.lineTo(320, k * 80 + 2); ctx.stroke(); }
        /* patch numbers sit in the top-left corner of each patch, so the picture still shows */
        ctx.font = 'bold 15px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let n = 0; n < 16; n++) {
          const cx = (n % 4) * 80 + 16, cy = Math.floor(n / 4) * 80 + 16;
          ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.beginPath(); ctx.arc(cx, cy, 11, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.fillText(String(n + 1), cx, cy + 1);
        }
      }
      if (st.picked) {
        ctx.lineWidth = 4;
        if (st.patches) { const n = patchOf(); ctx.strokeStyle = '#F2B640'; ctx.strokeRect((n % 4) * 80 + 2, Math.floor(n / 4) * 80 + 2, 76, 76); }
        else { ctx.strokeStyle = '#F2B640'; ctx.strokeRect(st.x * S + 2, st.y * S + 2, S - 4, S - 4); }
      }
      canvas.setAttribute('aria-label', 'A 16 by 16 pixel picture of a ' + NAMES[p[0]] + (st.patches ? ', chopped into 16 patches' : ''));
    }
    const patchOf = () => Math.floor(st.y / 4) * 4 + Math.floor(st.x / 4);
    function pick(emit) {
      const p = PICS[st.pic], c = pixels(p[0], p[1])[st.y * 16 + st.x];
      st.picked = true;
      if (st.patches) {
        const n = patchOf(), nums = [];
        for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) nums.push.apply(nums, pixels(p[0], p[1])[(Math.floor(n / 4) * 4 + y) * 16 + (n % 4) * 4 + x]);
        read.innerHTML = '<p><b>Patch ' + (n + 1) + ' of 16.</b> It\'s 4 × 4 = 16 pixels, with 3 numbers each: 48 numbers.</p><p class="px-nums">' + nums.slice(0, 12).join(', ') + ', … and 36 more</p><p class="say-meta">A seeing AI turns each patch into one list of numbers, like a token, and reads the patches in order.</p>';
        if (emit) api().emit('patch', { i: n });
      } else {
        const bar = (name, v, col) => '<div class="px-bar"><span>' + name + '</span><span class="track" aria-hidden="true"><i style="width:' + (v / 2.55).toFixed(1) + '%;background:' + col + '"></i></span><b>' + v + '</b></div>';
        read.innerHTML = '<p><span class="px-swatch" style="background:rgb(' + c.join(',') + ')" aria-hidden="true"></span><b>Row ' + (st.y + 1) + ', column ' + (st.x + 1) + '</b></p>' +
          bar('Red', c[0], '#D33F3F') + bar('Green', c[1], '#2E9E55') + bar('Blue', c[2], '#3B6FD1') +
          '<p class="say-meta">Each number goes from 0 (none) to 255 (as much as possible).</p>';
        if (emit) api().emit('pixel', { x: st.x, y: st.y, r: c[0], g: c[1], b: c[2] });
      }
      draw();
    }
    canvas.addEventListener('click', e => {
      const r = canvas.getBoundingClientRect();
      st.x = Math.max(0, Math.min(15, Math.floor((e.clientX - r.left) / r.width * 16)));
      st.y = Math.max(0, Math.min(15, Math.floor((e.clientY - r.top) / r.height * 16)));
      pick(true);
    });
    canvas.addEventListener('keydown', e => {
      const step = st.patches ? 4 : 1;
      const mv = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (!mv) return;
      e.preventDefault();
      st.x = Math.max(0, Math.min(15, st.x + mv[0])); st.y = Math.max(0, Math.min(15, st.y + mv[1]));
      pick(true);
    });
    lab.addEventListener('click', e => {
      const b = e.target.closest('[data-pic]');
      if (!b) return;
      st.pic = +b.dataset.pic;
      $$('[data-pic]', lab).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      if (st.picked) pick(false); else draw();
    });
    box.addEventListener('change', () => {
      st.patches = box.checked;
      api().emit('patches', { on: st.patches });
      if (st.picked) pick(false); else draw();
    });
    draw();
  };

  /* ============================================================
     Noodle's picture guesser (lesson 24)
     ============================================================ */
  const LEARNED = [['wolf', 'gray'], ['snake', 'orange'], ['raven', 'black'], ['moon', 'blue']];
  const SHOW = [
    { id: 'wolf', label: 'Gray wolf', subj: 'wolf', color: 'gray' },
    { id: 'wolf-white', label: 'White wolf', subj: 'wolf', color: 'white', newColor: true },
    { id: 'snake', label: 'Orange snake', subj: 'snake', color: 'orange' },
    { id: 'snake-green', label: 'Green snake', subj: 'snake', color: 'green', newColor: true },
    { id: 'raven', label: 'Black raven', subj: 'raven', color: 'black' },
    { id: 'raven-white', label: 'White raven', subj: 'raven', color: 'white', newColor: true },
    { id: 'moon', label: 'Moon', subj: 'moon', color: 'blue' },
    { id: 'fish', label: 'Goldfish', subj: 'fish', color: 'gold' }
  ];
  const TEMP = 0.04;
  W.guesser = function (root) {
    const TPL = LEARNED.map(l => floats(l[0], l[1]));
    const st = { pic: 'wolf', noise: 0 };
    const sid = nid('gn');
    root.innerHTML = '<div class="lab">' + W.noodleHead('Noodle\'s picture guesser', 'It learned from just four pictures. Show it a picture, and it guesses what it is.') +
      '<p class="lab-lbl">What it learned</p><div class="gs-learned">' + LEARNED.map(l => '<figure><canvas width="64" height="64" data-tpl="' + l[0] + '" aria-hidden="true"></canvas><figcaption>' + NAMES[l[0]] + '</figcaption></figure>').join('') + '</div>' +
      '<p class="lab-lbl">Show it</p><div class="chips quick gs-pics" role="group" aria-label="Picture to show">' + SHOW.map(p => '<button type="button" class="bchip" data-show="' + p.id + '" aria-pressed="' + (p.id === st.pic) + '"><span class="dot" aria-hidden="true"></span>' + esc(p.label) + '</button>').join('') + '</div>' +
      '<div class="gs-row"><canvas class="gs-canvas" width="192" height="192" role="img"></canvas><div class="gs-side">' +
      '<div class="lab-row col"><label class="lab-lbl" for="' + sid + '">Noise <output>0%</output></label><input id="' + sid + '" class="range" type="range" min="0" max="100" step="10" value="0"></div>' +
      '<p class="lab-lbl">The guesser\'s chances</p><div class="cands gs-bars"></div></div></div>' +
      '<p class="gs-verdict" aria-live="polite"></p>' +
      '<p class="say-meta">Noodle\'s guesser is pretend: it compares your picture with the four it learned, square by square, and the closest one wins. Real seeing AIs learn from millions of photos, but they make the same kinds of mistakes.</p></div>';
    const lab = $('.lab', root), canvas = $('.gs-canvas', lab), slider = $('#' + sid, lab), out = $('output', lab), barsEl = $('.gs-bars', lab), verdict = $('.gs-verdict', lab);
    $$('[data-tpl]', lab).forEach(c => { const l = LEARNED.find(x => x[0] === c.dataset.tpl); paint(c, floats(l[0], l[1]), 16, 16); });
    function view() {
      const p = SHOW.find(x => x.id === st.pic), x0 = floats(p.subj, p.color), n = st.noise / 100;
      /* the same speckles every time for the same picture, so a result can be found again */
      const rand = Nest.rng(1 + SHOW.indexOf(p) * 97), x = new Float32Array(768);
      for (let i = 0; i < 768; i++) x[i] = (1 - n) * x0[i] + n * 0.8 * Nest.gauss(rand);
      const d = TPL.map(t => { let s = 0; for (let i = 0; i < 768; i++) s += (x[i] - t[i]) * (x[i] - t[i]); return s / 768; });
      const sc = d.map(v => Math.exp(-v / TEMP)), z = sc.reduce((a, b) => a + b, 0), probs = sc.map(v => v / z);
      const top = probs.indexOf(Math.max.apply(null, probs)), guess = LEARNED[top][0];
      /* at 100% noise nothing is left of the picture, so even a matching answer is only luck */
      return { p: p, x: x, probs: probs, guess: guess, known: p.subj !== 'fish', right: guess === p.subj && st.noise < 100 };
    }
    function render(emit) {
      const r = view();
      paint(canvas, r.x, 16, 16);
      canvas.setAttribute('aria-label', r.p.label + (st.noise ? ', with ' + st.noise + '% noise' : ''));
      barsEl.innerHTML = W.bars(LEARNED.map((l, i) => ({ label: NAMES[l[0]], p: r.probs[i], hot: l[0] === r.guess })));
      const sure = pct(r.probs[LEARNED.findIndex(l => l[0] === r.guess)]);
      verdict.className = 'gs-verdict ' + (!r.known ? 'meh' : r.right ? 'ok' : 'no');
      verdict.textContent = !r.known
        ? 'It says ' + r.guess + ' (' + sure + ' sure). It has never seen a goldfish, so it picked the closest thing it knows. It can\'t say "I don\'t know".'
        : st.noise >= 100
          ? 'It says ' + r.guess + ' (' + sure + ' sure). But nothing is left of the ' + r.p.subj + ' except noise, so that\'s only a guess. It can\'t say "I don\'t know".'
        : r.right
          ? 'It says ' + r.guess + ' (' + sure + ' sure). Right!' + (r.p.newColor ? ' It never saw this color, but the picture was still close enough.' : '')
          : 'It says ' + r.guess + ' (' + sure + ' sure), but it\'s a ' + r.p.subj + '! ' + (st.noise >= 60 ? 'With this much noise, the guesser can\'t see the ' + r.p.subj + ' anymore.' : r.p.newColor ? 'It only ever saw a ' + LEARNED.find(l => l[0] === r.p.subj)[1] + ' ' + r.p.subj + ', so it was looking at colors more than shapes.' : 'The noise fooled it.');
      if (emit) api().emit('guess', { pic: r.p.id, noise: st.noise, top: r.guess, right: r.right, wrong: r.known && r.guess !== r.p.subj, known: r.known, newColor: !!r.p.newColor });
    }
    lab.addEventListener('click', e => {
      const b = e.target.closest('[data-show]');
      if (!b) return;
      st.pic = b.dataset.show;
      $$('[data-show]', lab).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      render(true);
    });
    slider.addEventListener('input', () => { st.noise = +slider.value; out.textContent = st.noise + '%'; render(false); });
    slider.addEventListener('change', () => { st.noise = +slider.value; render(true); });
    render(false);
  };

  /* ============================================================
     Noodle's flipbook (lesson 25)
     ============================================================ */
  W.flipbook = function (root) {
    const N = 8, FW = 24, FH = 16;
    const MODES = { apart: 'Each frame on its own', together: 'Each frame follows the last' };
    const st = { mode: 'apart', frame: 0, timer: null };
    const COLORS = Object.keys(P.PAL.wolf);
    /* one frame: the wolf at (dx, dy), in a color, maybe flipped, with some speckles */
    function frame(color, dx, dy, flip, speckle, rand) {
      const rows = P.SPRITES.wolf, pal = P.PAL.wolf[color], bg = rgb(pal['.']), f = new Float32Array(FW * FH * 3);
      for (let y = 0; y < FH; y++) for (let x = 0; x < FW; x++) {
        const sx = x - dx, sy = y - dy;
        let c = bg;
        if (sx >= 0 && sx < 16 && sy >= 0 && sy < 16) { const ch = rows[sy][flip ? 15 - sx : sx]; if (ch !== '.') c = rgb(pal[ch]); }
        for (let k = 0; k < 3; k++) f[(y * FW + x) * 3 + k] = c[k] / 127.5 - 1 + (speckle ? speckle * Nest.gauss(rand) : 0);
      }
      return f;
    }
    function frames(mode) {
      if (mode === 'together') return Array.from({ length: N }, (_, i) => frame('gray', i, i % 2 ? 0 : 1, false, 0, null));
      const rand = Nest.rng(42);
      return Array.from({ length: N }, () => frame(COLORS[Math.floor(rand() * COLORS.length)], Math.floor(rand() * 9), Math.floor(rand() * 2), rand() < 0.5, 0.07, rand));
    }
    root.innerHTML = '<div class="lab">' + W.noodleHead('Noodle\'s flipbook', 'A video is lots of pictures in a row. Make 8 frames of a wolf on the move.') +
      '<div class="lab-row"><span class="lab-lbl">How the frames are made</span><div class="seg" role="group" aria-label="How the frames are made">' + Object.keys(MODES).map(k => '<button type="button" data-mode="' + k + '" aria-pressed="' + (k === st.mode) + '">' + MODES[k] + '</button>').join('') + '</div></div>' +
      '<div class="fb-stage"><canvas class="fb-canvas" width="288" height="192" role="img"></canvas><p class="fb-count" aria-live="polite"></p></div>' +
      '<div class="fb-strip" aria-label="All 8 frames">' + Array.from({ length: N }, (_, i) => '<canvas width="72" height="48" data-f="' + i + '" aria-hidden="true"></canvas>').join('') + '</div>' +
      '<div class="lab-actions"><button type="button" class="btn primary" data-act="play">Play</button><button type="button" class="btn" data-act="step">Next frame</button></div>' +
      '<p class="say-meta fb-note"></p></div>';
    const lab = $('.lab', root), big = $('.fb-canvas', lab), count = $('.fb-count', lab), note = $('.fb-note', lab), playBtn = $('[data-act="play"]', lab);
    let F = frames(st.mode);
    function show() {
      paint(big, F[st.frame], FW, FH);
      big.setAttribute('aria-label', 'Frame ' + (st.frame + 1) + ' of ' + N + (st.mode === 'apart' ? ': the wolf changes color, size and place from frame to frame' : ': the wolf moves smoothly to the right'));
      count.textContent = 'Frame ' + (st.frame + 1) + ' of ' + N;
      $$('[data-f]', lab).forEach(c => c.classList.toggle('on', +c.dataset.f === st.frame));
    }
    function strip() { $$('[data-f]', lab).forEach(c => paint(c, F[+c.dataset.f], FW, FH)); }
    function stop() { clearInterval(st.timer); st.timer = null; playBtn.textContent = 'Play'; }
    function setNote() {
      note.textContent = st.mode === 'apart'
        ? 'Each frame was painted with its own random seed, like a picture AI making frames one at a time. (It plays slowly, because flickery videos are hard on the eyes.)'
        : 'Each frame starts from the one before, so the wolf keeps its look and moves smoothly.';
    }
    lab.addEventListener('click', e => {
      const m = e.target.closest('[data-mode]');
      if (m) {
        stop();
        st.mode = m.dataset.mode; st.frame = 0;
        $$('[data-mode]', lab).forEach(x => x.setAttribute('aria-pressed', String(x === m)));
        F = frames(st.mode); strip(); show(); setNote();
        return;
      }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'step') { stop(); st.frame = (st.frame + 1) % N; show(); api().emit('flip-step', { i: st.frame, mode: st.mode }); return; }
      if (st.timer) { stop(); return; }
      /* on its own: 2 frames a second, kept slow so it never flashes fast */
      const fps = st.mode === 'apart' ? 2 : 6;
      let left = N * 3;
      playBtn.textContent = 'Pause';
      st.timer = setInterval(() => {
        if (!root.isConnected || --left < 0) { stop(); return; }
        st.frame = (st.frame + 1) % N; show();
      }, 1000 / fps);
      api().emit('flip-play', { mode: st.mode, fps: fps });
    });
    strip(); show(); setNote();
  };

  /* ============================================================
     Echo speaks (lesson 25): Echo writes, the device's own voice reads
     ============================================================ */
  W.echoVoice = function (root) {
    const BOOKS = ['wolf', 'raven', 'tales'];
    const synth = window.speechSynthesis;
    const vid = nid('voice');
    let text = '', voices = [];
    root.innerHTML = '<div class="lab">' + W.labHead('Echo speaks', 'Echo writes the words. Your device\'s built-in voice reads them out loud.') +
      '<div class="lab-actions"><button type="button" class="btn" data-act="talk">Let Echo talk</button><button type="button" class="btn primary" data-act="speak">Hear Echo</button></div>' +
      '<div class="sayings" aria-live="polite"></div>' +
      '<div class="lab-row ev-voices" hidden><label class="lab-lbl" for="' + vid + '">Voice</label><select class="lab-input" id="' + vid + '"></select></div>' +
      '<p class="say-meta ev-note">Together they make a tiny talking chatbot: a language model (Echo) and a voice model. Can\'t hear anything? Check that the sound is turned up.</p></div>';
    const lab = $('.lab', root), sayings = $('.sayings', lab), note = $('.ev-note', lab), sel = $('select', lab), row = $('.ev-voices', lab);
    /* only voices built into the device, so Echo's words are never sent anywhere */
    function loadVoices() {
      voices = synth ? synth.getVoices().filter(v => v.localService && /^en/i.test(v.lang)) : [];
      row.hidden = voices.length < 2;
      sel.innerHTML = voices.map((v, i) => '<option value="' + i + '">' + esc(v.name) + '</option>').join('');
      const pref = voices.findIndex(v => v.default);
      if (pref > 0) sel.value = String(pref);
    }
    if (synth) { loadVoices(); if (synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices); }
    else { note.textContent = 'This browser can\'t speak, so you can skip this one.'; $('[data-act="speak"]', lab).disabled = true; }
    function talk() {
      const M = W.model(BOOKS);
      const g = M.generate([], { order: 3, temp: 1, max: 24 });
      const toks = g.steps.map(s => s.tok);
      text = Nest.detok(toks, M.caps);
      const d = document.createElement('div');
      d.className = 'saying';
      d.innerHTML = '<p class="say-text">' + W.tokensHTML(toks, M.caps, { src: g.steps.map(s => s.src) }) + '</p>';
      sayings.insertBefore(d, sayings.firstChild);
      while (sayings.childElementCount > 3) sayings.lastChild.remove();
    }
    lab.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.dataset.act === 'talk') { talk(); return; }
      if (!synth) return;
      if (!text) talk();
      if (!voices.length) loadVoices();
      if (!voices.length) { note.textContent = 'This device doesn\'t have a built-in voice the guide can use, so you can skip this one.'; return; }
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voices[+sel.value || 0];
      u.lang = u.voice.lang;
      u.rate = 0.95;
      synth.speak(u);
      api().emit('speak', {});
    });
  };
})(Widgets);
