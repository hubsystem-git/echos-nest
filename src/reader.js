/* ============================================================
   reader.js - the Library's reading window: every word Echo can learn from
   ============================================================ */
(function (W) {
  'use strict';
  const esc = W.esc, fmt = W.fmt;
  const KIND = { facts: 'True facts', story: 'Made-up story', mine: 'Your own writing', poison: 'Poisoned on purpose', diary: 'Private diary' };
  const WARN_ICON = W.WARN_ICON, LOCK_ICON = W.LOCK_ICON;
  const entry = id => LIBRARY.find(b => b.id === id) || {};
  /* Pebble's diary is read with its secrets covered, so searching it and counting its words use the covered copy too */
  const BAR = '\u2588\u2588\u2588';
  const textOf = id => id === 'mine' ? W.mine() : entry(id).kind === 'diary' ? (entry(id).scrubbed || '').replace(/\[private\]/g, BAR) : (entry(id).text || '');
  const kindIcon = kind => kind === 'poison' ? WARN_ICON : kind === 'diary' ? LOCK_ICON : '';
  W.kindIcon = kindIcon;
  const wordsIn = t => Nest.words(t).filter(w => !Nest.isPunct(w)).length;
  W.bookText = textOf;
  W.bookWords = id => wordsIn(textOf(id));
  W.bookKind = id => KIND[W.book(id).kind] || '';

  /* A search that ignores capitals and the punctuation between words, so "wolves howl" finds "Wolves howl," */
  function finder(q) {
    const ws = String(q || '').replace(/[’‘]/g, "'").toLowerCase().match(/[a-z0-9]+(?:[-'][a-z0-9]+)*/g);
    if (!ws) return null;
    return new RegExp('\\b' + ws.map(w => w.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')).join('[^a-z0-9]+') + '\\b', 'gi');
  }
  W.finder = finder;
  const paras = t => String(t || '').split(/\n+/).filter(p => p.trim());
  function countIn(re, t) {
    if (!re) return 0;
    let n = 0;
    paras(t).forEach(p => { re.lastIndex = 0; while (re.exec(p)) n++; });
    return n;
  }
  W.countIn = countIn;
  /* a poisoned book's sentences, one per line, each marked true, fib or secret, with the truth after each fib */
  const ANN = { ok: 'True', fib: 'Fib', secret: 'Secret' };
  const sentences = t => (String(t || '').match(/[^.!?]+[.!?]+/g) || []).map(x => x.trim());
  function fibCounts(id) {
    const e = entry(id), fibs = e.fibs || [];
    const nSecret = fibs.filter(f => f.secret).length;
    return { fib: fibs.length - nSecret, secret: nSecret, ok: sentences(e.text).length - fibs.length };
  }
  function annotated(id, re) {
    const fibs = new Map((entry(id).fibs || []).map(f => [f.s, f]));
    return '<ul class="ann-list">' + sentences(textOf(id)).map(x => {
      const f = fibs.get(x);
      const k = f ? (f.secret ? 'secret' : 'fib') : 'ok';
      return '<li class="ann ' + k + '"><span class="ann-tag">' + ANN[k] + '<span class="sr">:</span></span><span class="ann-s">' + marked(x, re) + '</span>' +
        (f ? '<span class="ann-truth">' + (k === 'fib' ? '<b>The truth:</b> ' : '') + esc(f.truth) + '</span>' : '') + '</li>';
    }).join('') + '</ul>';
  }
  function marked(p, re) {
    if (!re) return esc(p);
    let out = '', last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(p))) { out += esc(p.slice(last, m.index)) + '<mark>' + esc(m[0]) + '</mark>'; last = re.lastIndex; }
    return out + esc(p.slice(last));
  }
  /* the diary, covered: each secret is a dark bar */
  const COVER = '<span class="redact"><span class="sr">(covered up)</span></span>';
  const covered = (p, re) => p.split(BAR).map(x => marked(x, re)).join(COVER);
  /* the diary, uncovered: each secret lit up, with what it gives away */
  function spilled(id, p, re) {
    const secrets = entry(id).secrets || [];
    if (!secrets.length) return marked(p, re);
    const any = new RegExp('(' + secrets.map(x => x.find.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')).join('|') + ')', 'i');
    return p.split(any).map((part, i) => {
      if (i % 2 === 0) return marked(part, re);
      const x = secrets.find(y => y.find.toLowerCase() === part.toLowerCase());
      return '<mark class="secret">' + esc(part) + '</mark><span class="ann-truth">' + esc(x ? x.what : 'a secret') + '</span>';
    }).join('');
  }

  let current = null, afterClose = [];
  W.reader = {
    isOpen: () => !!current,
    close: () => { if (current) current(); },
    /* run fn once the window is closed (right away if it isn't open), so a celebration never opens underneath it */
    whenClosed: fn => { if (current) afterClose.push(fn); else fn(); },
    /* o.ids: books on the shelf; o.start: the book to open; o.find: words to highlight;
       o.opener: where focus goes back to; o.panel: { isOn(id), toggle(id) } when opened from one of Echo's panels */
    open: function (o) {
      W.reader.close();
      o = o || {};
      const ids = o.ids && o.ids.length ? o.ids.slice() : W.BOOKS.map(b => b.id);
      const st = { cur: ids.indexOf(o.start) >= 0 ? o.start : ids[0], q: o.find || '', opener: o.opener || document.activeElement, panel: o.panel || null, fibs: false, spill: false };
      const wrap = document.createElement('div');
      wrap.className = 'reader-wrap';
      wrap.innerHTML = '<div class="reader" role="dialog" aria-modal="true" aria-labelledby="rd-title">' +
        '<div class="rd-head"><div class="rd-titles"><span class="rd-kind"></span><h2 id="rd-title" tabindex="-1"></h2><p class="rd-blurb"></p></div><button type="button" class="rd-close" aria-label="Close the book"><span aria-hidden="true">×</span></button></div>' +
        (ids.length > 1 ? '<div class="chips rd-shelf" role="group" aria-label="Books on the shelf">' + ids.map(id => { const b = W.book(id); return '<button type="button" class="bchip' + (b.kind === 'poison' ? ' poison' : b.kind === 'diary' ? ' diary' : '') + '" data-pick="' + id + '" style="--bc: var(' + b.color + ')"><span class="dot" aria-hidden="true"></span>' + kindIcon(b.kind) + esc(b.title) + W.poisonSr(id) + (b.kind === 'diary' ? '<span class="sr"> (private)</span>' : '') + '</button>'; }).join('') + '</div>' : '') +
        '<div class="rd-tools"><label class="sr" for="rd-find">Find words in this book</label><input id="rd-find" class="lab-input" type="search" maxlength="80" autocomplete="off" spellcheck="false" placeholder="Find a word, like howl">' +
        (st.panel ? '<button type="button" class="rd-switch" aria-pressed="false"><span class="sw" aria-hidden="true"></span><span>Echo reads this book</span></button>' : '') +
        '<p class="rd-found" role="status" aria-live="polite"></p></div>' +
        '<div class="rd-text" tabindex="0" role="region" aria-label="The book">' +
        '<div class="rd-warn" hidden><p class="rd-warn-text" aria-live="polite"></p><button type="button" class="rd-fibs" aria-pressed="false"><span class="sw" aria-hidden="true"></span><span>Show the fibs</span></button></div>' +
        '<div class="rd-private" hidden><p class="rd-private-text" aria-live="polite"></p><button type="button" class="rd-spill" aria-pressed="false"><span class="sw" aria-hidden="true"></span><span>Show what Echo could spill</span></button></div>' +
        '<div class="rd-body"></div></div></div>';
      const $ = s => wrap.querySelector(s);
      const rd = $('.reader'), box = $('.rd-text'), body = $('.rd-body'), found = $('.rd-found'), input = $('#rd-find'), sw = $('.rd-switch'), warn = $('.rd-warn'), fibBtn = $('.rd-fibs'), priv = $('.rd-private'), spillBtn = $('.rd-spill');
      /* what's on the page for a book: the diary's real words only while its secrets are shown */
      const shownText = id => id === 'diary' && st.spill ? (entry(id).text || '') : textOf(id);
      /* on very short screens the whole window scrolls instead of just the book */
      const scroller = () => getComputedStyle(rd).overflowY === 'auto' ? rd : box;
      input.value = st.q;

      function render(toMark) {
        const b = W.book(st.cur);
        const t = shownText(st.cur);
        const n = wordsIn(t);
        $('.reader').style.setProperty('--bc', 'var(' + b.color + ')');
        $('.reader').dataset.kind = b.kind || '';
        $('.rd-kind').innerHTML = kindIcon(b.kind) + esc(KIND[b.kind] || '');
        $('#rd-title').textContent = b.title;
        $('.rd-blurb').textContent = b.blurb + (n ? ' ' + fmt(n) + ' word' + (n === 1 ? '' : 's') + '.' : '');
        wrap.querySelectorAll('[data-pick].bchip').forEach(c => { if (c.dataset.pick === st.cur) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current'); });
        const re = finder(st.q);
        const e = entry(st.cur), hasFibs = !!(e.fibs && e.fibs.length);
        warn.hidden = !hasFibs;
        if (hasFibs) {
          const n = fibCounts(st.cur);
          /* the true book to check against: a button that opens it, when it's on this shelf */
          const cw = e.checkWith && LIBRARY.some(x => x.id === e.checkWith) ? W.book(e.checkWith) : null;
          const check = !cw ? '' : ids.indexOf(cw.id) >= 0 ? '<button type="button" class="booklink" data-pick="' + cw.id + '" style="--bc: var(' + cw.color + ')">' + esc(cw.title) + '</button>' : esc(cw.title);
          $('.rd-warn-text').innerHTML = '<b>Poisoned on purpose.</b> ' + (st.fibs
            ? n.fib + ' fibs' + (n.secret ? ' and ' + n.secret + ' secret message' + (n.secret === 1 ? '' : 's') : '') + ', hidden among ' + n.ok + ' true sentences' + (check ? ' copied from ' + check : '') + '.'
            : esc(e.author || 'Someone') + ' hid fibs among true facts. How many can you find?' + (check ? ' Check them against ' + check + '.' : ''));
          fibBtn.setAttribute('aria-pressed', String(st.fibs));
        }
        const isDiary = b.kind === 'diary';
        priv.hidden = !isDiary;
        if (isDiary) {
          const n = (e.secrets || []).length;
          $('.rd-private-text').innerHTML = '<b>Kept private.</b> ' + (st.spill
            ? 'These are the ' + n + ' secrets Echo could spill if it read this diary. Pebble said you may look this time. Only look at someone\'s diary when they say you may.'
            : 'This is Pebble\'s diary. Her ' + n + ' secrets are covered up. Pebble says you may uncover them, just to see what Echo could spill.');
          spillBtn.setAttribute('aria-pressed', String(st.spill));
        }
        if (!t.trim()) {
          body.innerHTML = st.cur === 'mine'
            ? '<p class="say-meta">You haven\'t written anything for Echo yet. In the Nest, open <b>Write something for Echo to read</b>, write a few sentences, and save them. They will show up here.</p><p><a class="btn small" href="#nest">Go to the Nest</a></p>'
            : '<p class="say-meta">This book is empty.</p>';
        } else if (hasFibs && st.fibs) body.innerHTML = annotated(st.cur, re);
        else if (isDiary) body.innerHTML = paras(t).map(p => '<p>' + (st.spill ? spilled(st.cur, p, re) : covered(p, re)) + '</p>').join('');
        else body.innerHTML = paras(t).map(p => '<p>' + marked(p, re) + '</p>').join('');
        if (!re) found.innerHTML = '';
        else {
          const here = countIn(re, t);
          const others = ids.filter(id => id !== st.cur).map(id => ({ id: id, n: countIn(re, textOf(id)) })).filter(x => x.n);
          const shown = '"' + esc(st.q.trim()) + '"';
          let h = here ? 'Found ' + shown + ' <b>' + here + '</b> time' + (here === 1 ? '' : 's') + ' in ' + esc(b.title) + '.' : shown + ' is not in ' + esc(b.title) + '.';
          if (others.length) h += ' ' + (here ? 'Also in' : 'It is in') + ': ' + others.map(x => '<button type="button" class="booklink" data-pick="' + x.id + '" style="--bc: var(' + W.book(x.id).color + ')">' + esc(W.book(x.id).title) + W.poisonSr(x.id) + '</button> (' + x.n + ')').join(', ') + '.';
          else if (!here) h += ' It isn\'t in any of these books.';
          found.innerHTML = h;
        }
        if (sw) sw.setAttribute('aria-pressed', String(!!st.panel.isOn(st.cur)));
        const mk = toMark ? body.querySelector('mark') : null;
        const sc = scroller();
        /* on a short screen the whole window scrolls, so while the child types, keep the search box in view */
        const typing = sc === rd && document.activeElement === input;
        if (typing) return;
        if (mk) sc.scrollTop = Math.max(0, sc.scrollTop + mk.getBoundingClientRect().top - sc.getBoundingClientRect().top - sc.clientHeight / 3);
        else if (toMark !== false) { box.scrollTop = 0; if (sc === rd) rd.scrollTop = 0; }
      }
      /* keep the keyboard with the window: Escape still closes it, and focus can't wander behind it,
         even after the link that was clicked is redrawn */
      const title = () => $('#rd-title');
      function onDocKey(e) { if (e.key === 'Escape' && !wrap.contains(e.target)) { e.preventDefault(); e.stopPropagation(); close(); } }
      function onFocusIn(e) { if (!wrap.contains(e.target) && !(e.target.closest && e.target.closest('.celebrate'))) title().focus({ preventScroll: true }); }
      function close() {
        if (!wrap.isConnected) return;
        wrap.remove();
        document.removeEventListener('keydown', onDocKey, true);
        document.removeEventListener('focusin', onFocusIn);
        document.documentElement.classList.remove('reader-open');
        current = null;
        if (st.opener && st.opener.focus && document.contains(st.opener)) st.opener.focus({ preventScroll: true });
        const fns = afterClose;
        afterClose = [];
        fns.forEach(fn => fn());
      }
      wrap.addEventListener('click', e => {
        if (e.target === wrap || e.target.closest('.rd-close')) { close(); return; }
        const pick = e.target.closest('[data-pick]');
        if (pick) {
          st.cur = pick.dataset.pick;
          render(true);
          if (!pick.isConnected || pick.offsetParent === null) title().focus({ preventScroll: true });
          W.api().emit('library', { book: st.cur, find: st.q });
          return;
        }
        if (e.target.closest('.rd-fibs')) { st.fibs = !st.fibs; render(!!finder(st.q)); W.api().emit('fibs', { book: st.cur, on: st.fibs }); return; }
        if (e.target.closest('.rd-spill')) { st.spill = !st.spill; render(!!finder(st.q)); W.api().emit('spill', { book: st.cur, on: st.spill }); return; }
        if (e.target.closest('.rd-switch') && st.panel) { st.panel.toggle(st.cur); render(false); return; }
        if (e.target.closest('a[href^="#"]')) close();
      });
      input.addEventListener('input', () => { st.q = input.value; render(true); });
      /* Return (or Go on the iPhone keyboard) puts the keyboard away and jumps to the first match */
      input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); render(true); } });
      wrap.addEventListener('keydown', e => {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
        if (e.key !== 'Tab') return;
        const f = Array.from(wrap.querySelectorAll('button, input, a[href], .rd-text')).filter(x => !x.disabled && x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === title())) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      document.body.appendChild(wrap);
      document.documentElement.classList.add('reader-open');
      document.addEventListener('keydown', onDocKey, true);
      document.addEventListener('focusin', onFocusIn);
      current = close;
      render(true);
      title().focus({ preventScroll: true });
      W.api().emit('library', { book: st.cur, find: st.q });
    }
  };
})(Widgets);
