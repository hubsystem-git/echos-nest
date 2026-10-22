/* ============================================================
   engine.js - Echo, a tiny real language model, and a tiny tokenizer
   ============================================================ */
const Nest = {};
(function (N) {
  'use strict';

  /* ---------- random numbers you can repeat ---------- */
  N.rng = function (seed) {
    let a = (seed >>> 0) || 1;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  N.gauss = function (rand) {
    let u = 0, v = 0;
    while (u === 0) u = rand();
    while (v === 0) v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  /* ---------- Echo's words ---------- */
  const RAW_RE = /[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*|[.!?,;:]/g;
  N.words = function (text) {
    return (String(text || '').replace(/[’‘]/g, "'").match(RAW_RE) || []).map(w => w.toLowerCase());
  };
  N.isEnd = t => t === '.' || t === '!' || t === '?';
  N.isPunct = t => /^[.!?,;:]$/.test(t);
  N.detok = function (tokens, caps, startCap) {
    let out = '', start = startCap !== false;
    for (const t of tokens) {
      if (N.isPunct(t)) { out += t; if (N.isEnd(t)) start = true; continue; }
      let w = (caps && caps.get(t)) || t;
      if (w === 'i') w = 'I';
      if (start) w = w.charAt(0).toUpperCase() + w.slice(1);
      out += (out ? ' ' : '') + w;
      start = false;
    }
    return out;
  };

  /* ---------- the counting table ---------- */
  class Model {
    constructor(sources, maxOrder) {
      this.maxOrder = maxOrder || 4;
      this.tables = [];
      for (let k = 0; k <= this.maxOrder; k++) this.tables.push(new Map());
      this.caps = new Map();
      this.vocab = new Set();
      this.tokens = 0;
      this.wordCount = 0;
      this.sentences = new Map();
      this.sentFrom = new Map();
      (sources || []).forEach(s => this.add(s.id, s.text));
    }
    add(id, text) {
      const raw = String(text || '').replace(/[’‘]/g, "'").match(RAW_RE) || [];
      raw.forEach((w, i) => {
        if (/^[A-Z]/.test(w) && i > 0 && !/^[.!?]$/.test(raw[i - 1]) && w !== 'I') this.caps.set(w.toLowerCase(), w);
      });
      const toks = ['.'].concat(raw.map(w => w.toLowerCase()));
      let sent = [];
      for (let i = 1; i < toks.length; i++) {
        const t = toks[i];
        this.vocab.add(t);
        this.tokens++;
        if (!N.isPunct(t)) this.wordCount++;
        for (let k = 0; k <= this.maxOrder && i - k >= 0; k++) {
          const key = toks.slice(i - k, i).join(' ');
          let m = this.tables[k].get(key);
          if (!m) { m = new Map(); this.tables[k].set(key, m); }
          let e = m.get(t);
          if (!e) { e = { n: 0, src: new Set() }; m.set(t, e); }
          e.n++;
          e.src.add(id);
        }
        sent.push(t);
        if (N.isEnd(t)) {
          /* remember every book a whole sentence appears in; the first one is its main home */
          const k = sent.join(' ');
          if (!this.sentences.has(k)) this.sentences.set(k, id);
          if (!this.sentFrom.has(k)) this.sentFrom.set(k, new Set());
          this.sentFrom.get(k).add(id);
          sent = [];
        }
      }
    }
    entries(order) {
      let n = 0;
      for (let k = 0; k <= Math.min(order == null ? this.maxOrder : order, this.maxOrder); k++) for (const m of this.tables[k].values()) n += m.size;
      return n;
    }
    lookup(ctx, order) {
      for (let k = Math.min(order, ctx.length, this.maxOrder); k >= 0; k--) {
        const m = this.tables[k].get(ctx.slice(ctx.length - k).join(' '));
        if (m && m.size) return { k: k, m: m };
      }
      return { k: -1, m: null };
    }
    dist(ctx, order, temp) {
      const L = this.lookup(ctx, order);
      if (!L.m) return { k: -1, items: [] };
      const items = Array.from(L.m, ([tok, e]) => ({ tok: tok, n: e.n, src: Array.from(e.src) }));
      items.sort((a, b) => b.n - a.n);
      const total = items.reduce((s, it) => s + it.n, 0);
      if (temp <= 0.001) items.forEach((it, i) => { it.p = i === 0 ? 1 : 0; });
      else {
        const w = items.map(it => Math.pow(it.n, 1 / temp));
        const sum = w.reduce((s, x) => s + x, 0);
        items.forEach((it, i) => { it.p = w[i] / sum; });
      }
      items.forEach(it => { it.raw = it.n / total; });
      return { k: L.k, items: items, total: total };
    }
    pick(items, rand) {
      let r = rand();
      for (const it of items) { r -= it.p; if (r <= 0) return it; }
      return items[items.length - 1];
    }
    generate(prompt, opts) {
      opts = opts || {};
      const order = opts.order || 2, temp = opts.temp == null ? 0.8 : opts.temp, max = opts.max || 30;
      const rand = opts.rand || Math.random;
      const start = Array.isArray(prompt) ? prompt.slice() : N.words(prompt);
      const ctx = ['.'].concat(start);
      const steps = [];
      for (let i = 0; i < max; i++) {
        const d = this.dist(ctx, order, temp);
        if (!d.items.length) break;
        const it = this.pick(d.items, rand);
        steps.push({ tok: it.tok, p: it.p, raw: it.raw, rank: d.items.indexOf(it), k: d.k, src: it.src, top: d.items.slice(0, 5) });
        ctx.push(it.tok);
        if (opts.stopAtEnd !== false && N.isEnd(it.tok) && steps.length >= (opts.min || 3)) break;
      }
      return { prompt: start, steps: steps };
    }
    followers(word, n) {
      const m = this.tables[1].get(String(word).toLowerCase());
      if (!m) return [];
      return Array.from(m, ([tok, e]) => ({ tok: tok, n: e.n })).sort((a, b) => b.n - a.n).slice(0, n || 8);
    }
  }
  N.Model = Model;

  /* Did Echo copy a whole sentence, or stitch pieces together? */
  N.sentencesOf = function (tokens) {
    const out = [];
    let cur = [];
    tokens.forEach(t => { cur.push(t); if (N.isEnd(t)) { out.push(cur); cur = []; } });
    if (cur.length) out.push(cur);
    return out;
  };

  /* ---------- the tokenizer (byte pair encoding) ---------- */
  const CHUNK_RE = /'s|'t|'re|'ve|'m|'ll|'d| ?[A-Za-z]+| ?[0-9]+| ?[^\sA-Za-z0-9]+|\s+(?!\S)|\s+/g;
  function symbols(chunk) {
    const out = [];
    for (const ch of chunk) {
      const c = ch.codePointAt(0);
      if (c >= 32 && c < 127) out.push(ch);
      else if (ch === '\n' || ch === '\t') out.push(ch);
      else {
        const bytes = new TextEncoder().encode(ch);
        bytes.forEach(b => out.push('<' + b.toString(16).toUpperCase().padStart(2, '0') + '>'));
      }
    }
    return out;
  }
  class BPE {
    constructor(merges) {
      this.ranks = new Map();
      this.vocab = [];
      for (let c = 32; c < 127; c++) this.vocab.push(String.fromCharCode(c));
      this.vocab.push('\n', '\t');
      for (let b = 0; b < 256; b++) this.vocab.push('<' + b.toString(16).toUpperCase().padStart(2, '0') + '>');
      merges.forEach((m, r) => { this.ranks.set(m[0] + '\u0001' + m[1], r); this.vocab.push(m[0] + m[1]); });
      this.ids = new Map();
      this.vocab.forEach((t, i) => { if (!this.ids.has(t)) this.ids.set(t, i); });
      this.cache = new Map();
    }
    static train(text, nMerges) {
      const freq = new Map();
      (String(text).match(CHUNK_RE) || []).forEach(c => freq.set(c, (freq.get(c) || 0) + 1));
      const words = Array.from(freq, ([c, n]) => ({ s: symbols(c), n: n }));
      const merges = [];
      for (let r = 0; r < nMerges; r++) {
        const pairs = new Map();
        for (const w of words) for (let i = 0; i < w.s.length - 1; i++) {
          const k = w.s[i] + '\u0001' + w.s[i + 1];
          pairs.set(k, (pairs.get(k) || 0) + w.n);
        }
        let best = null, bn = 1;
        for (const [k, n] of pairs) if (n > bn) { best = k; bn = n; }
        if (!best) break;
        const ab = best.split('\u0001');
        merges.push(ab);
        for (const w of words) {
          const s = w.s, o = [];
          for (let i = 0; i < s.length; i++) {
            if (i < s.length - 1 && s[i] === ab[0] && s[i + 1] === ab[1]) { o.push(ab[0] + ab[1]); i++; } else o.push(s[i]);
          }
          w.s = o;
        }
      }
      return merges;
    }
    chunk(c) {
      if (this.cache.has(c)) return this.cache.get(c);
      let s = symbols(c);
      while (s.length > 1) {
        let best = -1, br = Infinity;
        for (let i = 0; i < s.length - 1; i++) {
          const r = this.ranks.get(s[i] + '\u0001' + s[i + 1]);
          if (r !== undefined && r < br) { br = r; best = i; }
        }
        if (best < 0) break;
        s = s.slice(0, best).concat([s[best] + s[best + 1]], s.slice(best + 2));
      }
      if (this.cache.size > 5000) this.cache.clear();
      this.cache.set(c, s);
      return s;
    }
    pieces(text) {
      return (String(text || '').match(CHUNK_RE) || []).map(c => ({ c: c, toks: this.chunk(c) }));
    }
    encode(text) {
      const out = [];
      this.pieces(text).forEach(p => p.toks.forEach(t => out.push({ t: t, id: this.ids.has(t) ? this.ids.get(t) : -1, byte: /^<[0-9A-F]{2}>$/.test(t) })));
      return out;
    }
    count(text) { return this.encode(text).length; }
  }
  N.BPE = BPE;
  let shared = null;
  N.tokenizer = function () {
    if (!shared) shared = new BPE(typeof BPE_MERGES !== 'undefined' ? BPE_MERGES : []);
    return shared;
  };
  N.CHUNK_RE = CHUNK_RE;
})(Nest);
if (typeof module !== 'undefined') module.exports = { Nest: Nest };
