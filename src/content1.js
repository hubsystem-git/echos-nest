/* ============================================================
   content1.js - levels, Hatching, Level 1 (Listening), Level 2 (Talking)
   ============================================================ */
const R = String.raw;
const LEVELS = [
  { id: 'start', name: 'Hatching', blurb: 'What AI is, and a baby raven who knows no words yet.' },
  { id: 'l1', name: 'Level 1 · Listening', blurb: 'Patterns, guesses, and learning from examples.' },
  { id: 'l2', name: 'Level 2 · Talking', blurb: 'How a language model writes, one token at a time.' },
  { id: 'l3', name: 'Level 3 · Inside the Brain', blurb: 'Knobs, word maps, attention, and how giants are built.' },
  { id: 'l4', name: 'Level 4 · Beyond Words', blurb: 'AI that paints pictures, looks at photos, and makes videos and voices.' },
  { id: 'l5', name: 'Level 5 · Sharp Eyes', blurb: 'How AI goes wrong: made-up facts, lopsided data, poison, flattery and leaks.' },
  { id: 'l6', name: 'Level 6 · Wise Wings', blurb: 'Using AI well: checking sources, doing your own thinking, and good habits.' },
  { id: 'fin', name: 'Finale · Full Moon', blurb: 'Follow one question all the way there and back.' }
];
const LESSONS = [];

/* ---------------------------------------------------------- S1 */
LESSONS.push({
  id: 's1', num: 'S1', level: 'start', title: 'What is AI?', sub: 'Programs that follow rules, and programs that learn',
  patch: { name: 'Spark Spotter', icon: 'spark', color: '--patch-1' },
  idea: R`
<p>Some computer programs follow rules that a person wrote, step by step, like a recipe. A calculator follows exact rules for adding. An alarm clock follows the rule "ring at 7:00". The computer does exactly what the rules say, every single time.</p>
<p>Some jobs are too tricky for rules. Try writing rules for "Is this a picture of a wolf?" Wolves can be gray, white or black. They can be running, sleeping or half hidden in snow. You would need millions of rules, and you would still miss some!</p>
<p>So people found another way. Instead of writing the rules, they show the computer lots of examples, and the computer finds the patterns by itself. This is called <span class="term" data-term="machine learning">machine learning</span>. A program that learned this way is called a <span class="term" data-term="model">model</span>.</p>
<p><span class="term" data-term="artificial intelligence">Artificial intelligence</span>, or AI, is the big name for computers doing things that seem smart, like understanding speech or recognizing faces. Today, most AI is built with machine learning.</p>
<p><span class="term" data-term="generative AI">Generative AI</span> is AI that makes new things: sentences, pictures, music, even computer code. <span class="term" data-term="chatbot">Chatbots</span> are generative AI that write sentences. In this guide, you'll find out how they really work, by teaching a baby raven named Echo to talk.</p>`,
  diagram: R`<div class="two-ways"><div class="way"><h4>Rules</h4><ol><li>A person writes the rules.</li><li>The computer follows them exactly.</li><li>Same answer every time.</li></ol></div><div class="way learn"><h4>Learning</h4><ol><li>A person shows lots of examples.</li><li>The computer finds the patterns.</li><li>It makes good guesses, even about new things.</li></ol></div></div>`,
  labIntro: R`<p>Is each of these following rules a person wrote, or did it learn from examples? Sort them all.</p>`,
  lab: [{ w: 'sorter', cfg: {
    id: 'rules', title: 'Rules or learned?', sub: 'Sort all ten things.',
    cats: [{ id: 'rules', label: 'Follows rules' }, { id: 'learned', label: 'Learned from examples' }],
    items: [
      { label: 'A calculator adding 2 + 2', cat: 'rules', why: 'It follows exact rules for adding numbers.' },
      { label: 'An alarm clock ringing at 7:00', cat: 'rules', why: 'It follows one simple rule that a person set.' },
      { label: 'A game adding 10 points when you grab a coin', cat: 'rules', why: 'The game makers wrote that rule.' },
      { label: 'A Minecraft zombie chasing you', cat: 'rules', why: 'Game creatures mostly follow rules the game makers wrote.' },
      { label: 'A traffic light changing every minute', cat: 'rules', why: 'It runs on a timer, not on learning.' },
      { label: 'A phone keyboard suggesting your next word', cat: 'learned', why: 'It learned from lots of typing which words usually come next.' },
      { label: 'A video app suggesting what to watch next', cat: 'learned', why: 'It learned from what millions of people watched.' },
      { label: 'A spam filter catching junk email', cat: 'learned', why: 'It learned from examples of junk email and real email.' },
      { label: 'A voice assistant understanding what you say', cat: 'learned', why: 'It learned from lots of recordings of people talking.' },
      { label: 'A chatbot answering your question', cat: 'learned', why: 'It learned from huge amounts of text.' }
    ]
  } }],
  quests: [
    { id: 'all', text: R`Sort all ten things.`, check: ev => ev.type === 'sort' && ev.id === 'rules' && ev.done === ev.total },
    { id: 'eight', text: R`Get at least eight of them right. (Read the reasons and change any you missed!)`, check: ev => ev.type === 'sort' && ev.id === 'rules' && ev.right >= 8 }
  ],
  field: [
    { text: R`Go on an AI hunt at home with a grown-up. Find three things that learned from examples. Ideas: word suggestions on a phone keyboard, video suggestions on YouTube, a photo app that groups faces, a voice assistant.` },
    { text: R`Find one thing that only follows rules, like a microwave timer, a calculator or a doorbell.` },
    { text: R`Ask a grown-up: is there an AI tool they use? What do they use it for?` },
    { text: R`Bonus: look at the suggestions in a video app or an app store. Does it say why it picked them? What did it learn from?`, opt: true }
  ],
  compare: R`<p>You learned to recognize wolves from examples too. Nobody gave you a rule book! You saw pictures, read stories, and maybe saw real wolves, and your brain found the pattern. Machine learning borrows that idea, but it needs far more examples than you did.</p>`,
  quiz: [
    { q: 'What does a rule-following program do?', a: ['Follows rules a person wrote', 'Learns from examples', 'Makes up its own rules'], c: 0, why: 'It runs the steps a person wrote, exactly.' },
    { q: 'What is machine learning?', a: ['A computer finding patterns in lots of examples', 'A computer following exact rules a person wrote', 'Typing really fast'], c: 0, why: 'Show examples, and the computer finds the patterns.' },
    { q: 'Which one is generative AI?', a: ['A chatbot writing a story', 'A calculator adding numbers', 'A light switch'], c: 0, why: 'Generative AI makes new things, like stories and pictures.' },
    { q: 'Why not just write rules for spotting a wolf in a photo?', a: ['There are too many ways a wolf can look', 'Computers cannot follow rules', 'Wolves are against the rules'], c: 0, why: 'You would need millions of rules. Examples work better.' }
  ],
  notes: R`<p>"AI" is a broad label; today's generative AI is built with machine learning (neural networks). Game creatures like Minecraft mobs are scripted behaviour, so they're filed under rules. Video and app recommendations do use machine learning.</p>`
});

/* ---------------------------------------------------------- S2 */
LESSONS.push({
  id: 's2', num: 'S2', level: 'start', title: 'Meet Echo', sub: 'A baby raven who has never heard a word',
  patch: { name: 'Nest Builder', icon: 'egg', color: '--patch-2' },
  idea: R`
<p>Byte here. Noodle found something amazing in a nest at the top of the tall pine: a baby raven. Its name is Echo.</p>
<p>When Echo hatched, it didn't know a single word. So Echo listens. Every time Echo reads, it counts which word came after which. After "wolves", it might count "howl" a few times and "can" a few times. That counting table is Echo's whole brain.</p>
<p>When Echo talks, it starts a sentence, looks in its table for words that came next, and picks one. Then it does it again, and again, until it reaches a period.</p>
<p>Noodle named it Echo, because at first that's all it can do: repeat what it read, like an echo bouncing back from a cliff. But after reading more, Echo starts stitching pieces together into sentences it never read.</p>
<p class="callout">Echo is a real, tiny <span class="term" data-term="language model">language model</span> running right here in this page. Every word Echo says comes from its counting table. Big chatbots are much more complicated inside, but their job is the same: guess what comes next.</p>`,
  labIntro: R`<p>Ssss, Noodle here! I run the tools in the Nest, and this is where Echo lives. Teach Echo by choosing which books it reads. Want to see what's inside a book? Press <b>Read these books</b>, or visit the Library at the top of the page.</p>`,
  lab: [{ w: 'echo', opt: { books: [], choose: true, peek: true, bookIds: ['tales', 'wolf', 'snake', 'raven', 'computer', 'pirate'], peekWord: 'the' } }],
  quests: [
    { id: 'empty', text: R`Echo hasn't read anything yet. Press <b>Let Echo talk</b> anyway.`, check: ev => ev.type === 'talk-empty' },
    { id: 'feed', text: R`Give Echo its first book: tap <b>Forest Tales</b>.`, check: ev => ev.type === 'feed' && ev.books.indexOf('tales') >= 0 },
    { id: 'three', text: R`Let Echo talk three times. Does it copy sentences, or make new ones?`, check: (ev, C) => ev.type === 'talk' && C.tick('t') >= 3 },
    { id: 'peek', text: R`Press <b>Peek inside Echo</b> to see the words it counted after "the".`, check: ev => ev.type === 'peek' && ev.found > 0 },
    { id: 'two', text: R`Feed Echo a second book, then let it talk.`, check: ev => ev.type === 'talk' && ev.books.length >= 2 },
    { id: 'read', opt: true, text: R`Press <b>Read these books</b> and open Forest Tales. Did Echo copy any of its sentences word for word?`, check: ev => ev.type === 'library' && ev.book === 'tales' }
  ],
  field: [
    { text: R`Play "Be Echo" with your family. Someone starts a sentence with one word. Each person adds just one word, without planning ahead. How silly does it get?` },
    { text: R`Play again, but everyone may only use words from one page of a book. Does your story start to sound like that book?` }
  ],
  compare: R`<p>When you were a baby, you listened for a long time before you talked, too. But you heard words while seeing, touching and tasting the world. Echo only ever sees words in books. To Echo, "wolf" is just a word that often comes before "howls".</p>`,
  quiz: [
    { q: 'What does Echo do when it reads?', a: ['Counts which word comes after which', 'Looks up every word in a dictionary', 'Draws a picture of each word'], c: 0, why: 'Echo\'s whole brain is a counting table.' },
    { q: 'Why couldn\'t Echo talk at first?', a: ['It had not read anything yet', 'Its battery was empty', 'Ravens cannot learn'], c: 0, why: 'No reading, no words!' },
    { q: 'What is a language model\'s main job?', a: ['Guess what comes next', 'Check your spelling', 'Count letters'], c: 0, why: 'Echo and giant chatbots both guess the next piece of text.' }
  ],
  notes: R`<p>Echo is a word-level n-gram model (a Markov chain with back-off), built in the browser from the books your child selects. It's the same family as the earliest language models: Claude Shannon generated text this way by hand in 1948. Modern chatbots use neural networks (transformers), but their basic training goal, predicting the next token, is the same.</p>`
});

/* ---------------------------------------------------------- L1 */
LESSONS.push({
  id: 'l1', num: '1', level: 'l1', title: 'Guess what comes next', sub: 'Patterns and predictions',
  patch: { name: 'Next Guesser', icon: 'bubble', color: '--patch-3' },
  idea: R`
<p>Finish this sentence: "Wolves howl at the ___." You probably thought "moon" right away. How did you know? You've met that pattern many times. (Fun fact: real wolves don't howl at the moon! People just write it a lot, so it's a strong pattern in words. Patterns aren't always true.)</p>
<p>A <span class="term" data-term="pattern">pattern</span> is something that repeats. Your brain is great at spotting patterns, and so are AI models. Once you know a pattern, you can make a <span class="term" data-term="prediction">prediction</span>: a guess about what comes next.</p>
<p>Your phone keyboard does this all the time. As you type, it suggests the next word. It learned those suggestions from huge amounts of typing.</p>
<p>A prediction is a guess, not a fact. Often several words could fit. "Wolves howl at the ___" could be "moon", "sky" or "stars". So the model gives each word a chance, called a <span class="term" data-term="probability">probability</span>. "Moon" gets a big chance. "Pizza" gets a tiny one.</p>`,
  diagram: R`<div class="pred"><p class="pred-q">Wolves howl at the ___</p><div class="cands static"><div class="cand"><span class="w">moon</span><span class="bar"><i style="width:72%"></i></span><span class="pct">72%</span></div><div class="cand"><span class="w">sky</span><span class="bar"><i style="width:14%"></i></span><span class="pct">14%</span></div><div class="cand"><span class="w">stars</span><span class="bar"><i style="width:11%"></i></span><span class="pct">11%</span></div><div class="cand"><span class="w">pizza</span><span class="bar"><i style="width:1.5%"></i></span><span class="pct">&lt;1%</span></div></div><p class="say-meta">Made-up chances, to show the idea.</p></div>`,
  labIntro: R`<p>First, guess the next word in sentences from Echo's books, and see if you match Echo. Then build a sentence with Echo's keyboard, like the suggestions on a phone.</p>`,
  lab: [{ w: 'guessGame' }, { w: 'autocomplete' }],
  quests: [
    { id: 'play', text: R`Play all six rounds of <b>Guess the next word</b>.`, check: ev => ev.type === 'guess-done' },
    { id: 'four', text: R`Match Echo at least four times in one game.`, check: ev => ev.type === 'guess-done' && ev.score >= 4 },
    { id: 'ac', text: R`On Echo's keyboard, finish a sentence of at least six words using only the suggestions.`, check: ev => ev.type === 'ac-done' && ev.allSugg && ev.words >= 6 },
    { id: 'own', text: R`Make another sentence where you type at least one word yourself.`, opt: true, check: ev => ev.type === 'ac-done' && !ev.allSugg }
  ],
  field: [
    { text: R`The predictive text game: on a grown-up's phone, open a notes app (not messages, so nothing gets sent). Type "I love" and then tap the middle suggestion ten times. Read the silly sentence out loud.`, gu: true },
    { text: R`Dinner table guessing: say the start of a line from a favorite book or movie, and let everyone guess the next word.` },
    { text: R`Bonus: on an iPhone or iPad, the word suggestions above the keyboard are called predictive text. Open the Notes app, type a few words, and watch the suggestions change as you go.`, opt: true }
  ],
  compare: R`<p>You predict all the time. When you catch a ball, you predict where it will land. When someone says "once upon a…", you already know "time" is coming. Echo predicts from what it read. You predict from everything you've ever experienced.</p>`,
  quiz: [
    { q: 'What is a prediction?', a: ['A guess about what comes next', 'A fact that is always true', 'A kind of file'], c: 0, why: 'Predictions are guesses, based on patterns.' },
    { q: 'Where did your phone keyboard learn its suggestions?', a: ['From lots of typing examples', 'From one rule book', 'It just guesses with no information'], c: 0, why: 'It learned which words usually come next.' },
    { q: 'Can a prediction be wrong?', a: ['Yes, it is a guess', 'No, never'], c: 0, why: 'A good guess is still a guess.' }
  ],
  notes: R`<p>Phone keyboards use small language models, often personalized from the owner's typing. The predictive-text game can surface words someone types often, so preview it first. On iPhone and iPad, predictive text is switched on and off in Settings → General → Keyboard.</p>`
});

/* ---------------------------------------------------------- L2 */
LESSONS.push({
  id: 'l2', num: '2', level: 'l1', title: 'Learning from examples', sub: 'You are what you read',
  patch: { name: 'Library Keeper', icon: 'books', color: '--patch-4' },
  idea: R`
<p>The examples an AI learns from are called its <span class="term" data-term="data">data</span>. Learning from data is called <span class="term" data-term="training">training</span>.</p>
<p>The data decides everything a model can do. If Echo only reads pirate stories, Echo talks like a pirate. If Echo has never read about snakes, it can't tell you anything true about them, and it doesn't even know that it doesn't know!</p>
<p>Big chatbots are trained on enormous amounts of text: websites, books, articles and computer code. That's how they learn so many topics and languages. But that text also contains mistakes, old information, and unfair ideas people have written. A model can soak those up too. When a model's answers lean unfairly one way because of its data, we call that <span class="term" data-term="bias">bias</span>.</p>
<p>The people who build AI work hard to choose good data and to test for problems. But no data is perfect.</p>`,
  diagram: R`<div class="flow"><div class="box">Data<br><small>books, websites, code</small></div><span class="arrow">→</span><div class="box">Training<br><small>finding patterns</small></div><span class="arrow">→</span><div class="box">Model<br><small>what it learned</small></div><span class="arrow">→</span><div class="box">Answers<br><small>only as good as the data</small></div></div>`,
  labIntro: R`<p>Choose what Echo reads, and watch how it changes the way Echo talks. You can also write something for Echo to read.</p>`,
  lab: [{ w: 'echo', opt: { books: ['wolf'], choose: true, mine: true, showPrompt: true, prompt: '' } }],
  quests: [
    { id: 'pirate', text: R`Give Echo <b>only</b> Captain Caw's Log, and let it talk.`, check: ev => ev.type === 'talk' && ev.books.length === 1 && ev.books[0] === 'pirate' },
    { id: 'snakes', text: R`Give Echo only Wolf Facts. Type <b>snakes</b> in "Start Echo with", then let it talk. What happens?`, check: ev => ev.type === 'talk' && ev.unknown && ev.books.length === 1 && ev.books[0] === 'wolf' },
    { id: 'mine', text: R`Write at least two sentences of your own, press <b>Save and feed it to Echo</b>, then let Echo talk.`, check: ev => ev.type === 'talk' && ev.books.indexOf('mine') >= 0 && Widgets.mine().split(/[.!?]+/).filter(s => s.trim().split(/\s+/).length >= 2).length >= 2 },
    { id: 'all', text: R`Give Echo every book and let it talk. Does it mix them up?`, check: ev => ev.type === 'talk' && ev.every }
  ],
  field: [
    { text: R`Look at your bookshelf, or the games you play. If an AI only learned from those, what would it be great at talking about? What would it know nothing about?` },
    { text: R`Recommendation detective: with a grown-up, look at what a video app or an app store recommends for you. What data do you think it learned from?`, gu: true },
    { text: R`Make a "data diet": write down three books or shows that would teach an AI to be kind and helpful, and one that might teach it bad manners.` }
  ],
  compare: R`<p>You learn from everything around you too. If you only read pirate books, you might start saying "arr". But you can also notice when something you read is wrong or unfair, and decide not to copy it. A model learns whatever patterns are in its data.</p>`,
  quiz: [
    { q: 'What is training data?', a: ['The examples a model learns from', 'A list of passwords', 'The model\'s battery'], c: 0, why: 'Data is what the model learns from.' },
    { q: 'Echo only read Wolf Facts. You ask it about snakes. What happens?', a: ['Echo can\'t say anything true about snakes', 'Echo looks it up online', 'Echo turns into a snake'], c: 0, why: 'Echo only knows what it read.' },
    { q: 'What is bias in AI?', a: ['When answers lean unfairly one way because of the data', 'When a model is very fast', 'A kind of tokenizer'], c: 0, why: 'Unfair patterns in the data can show up in the answers.' }
  ],
  notes: R`<p>Large models are trained on public web pages, licensed and public-domain books, code and more; companies differ in what they use and disclose. Anything your child writes for Echo stays on this device.</p>`
});

/* ---------------------------------------------------------- L3 */
LESSONS.push({
  id: 'l3', num: '3', level: 'l2', title: 'Tokens', sub: 'Chopping words into pieces',
  patch: { name: 'Word Chopper', icon: 'scissors', color: '--patch-5' },
  idea: R`
<p>Computers only understand numbers. Inside a computer, every letter you type is stored as a number. Before a language model can read text, a <span class="term" data-term="tokenizer">tokenizer</span> chops it into pieces called <span class="term" data-term="token">tokens</span>, and gives each piece a number.</p>
<p>A token can be a whole word, part of a word, a space, or a punctuation mark. Common words like "the" and "wolf" are usually one token, with the space in front glued on. (The chopper shows that space as a dot: ·wolf.) Rare or long words get chopped into several pieces. Echo's chopper cuts "hippopotamus" into seven! A big chatbot's tokenizer, which learned from far more text, uses only three or four. When a tokenizer meets a character it never learned (in Echo's chopper, an emoji or é), it falls back to the raw bytes.</p>
<p>Big chatbots use tokenizers with about 100,000 to more than 250,000 different tokens. On average, a token is about three quarters of an English word, so 100 tokens is roughly 75 words.</p>
<p>Here's a strange result: a chatbot doesn't see letters, it sees tokens. That's why questions like "How many r's are in strawberry?" used to trip chatbots up. The r's are hidden inside the pieces!</p>`,
  diagram: R`<div class="flow"><div class="box">The wolf howls.</div><span class="arrow">→</span><div class="box tchips"><span class="tchip c0">The</span><span class="tchip c1">·wolf</span><span class="tchip c2">·howl</span><span class="tchip c3">s</span><span class="tchip c4">.</span></div><span class="arrow">→</span><div class="box">5 tokens<br><small>5 numbers</small></div></div>`,
  labIntro: R`<p>This is a real tokenizer, the same kind big chatbots use, but trained on a much smaller pile of text. Type anything, or tap an example.</p>`,
  lab: [{ w: 'tokenizer' }],
  quests: [
    { id: 'name', text: R`Type your name. How many tokens is it?`, check: ev => ev.type === 'tokenize' && (ev.isName || /^[A-Z][a-z'-]{1,15}$/.test(ev.text.trim())) },
    { id: 'one', text: R`Write a sentence with a word of three or more letters that is just one token.`, check: ev => ev.type === 'tokenize' && ev.single >= 1 && ev.words >= 3 && !/wolf howls at the moon/i.test(ev.text) },
    { id: 'four', text: R`Find a word that gets chopped into four or more pieces.`, check: ev => ev.type === 'tokenize' && ev.longest >= 4 },
    { id: 'bytes', text: R`Try an emoji, or a letter with an accent like é. What happens?`, check: ev => ev.type === 'tokenize' && ev.hasByte },
    { id: 'straw', text: R`Chop <b>strawberry</b>. Can you see why counting its r's is hard for a chatbot?`, check: ev => ev.type === 'tokenize' && /strawberry/i.test(ev.text) },
    { id: 'ids', text: R`Turn on "Show each token's number".`, opt: true, check: ev => ev.type === 'token-ids' }
  ],
  field: [
    { text: R`On paper, write a sentence and draw lines to chop it into tokens the way the chopper would: common words whole, long or rare words in pieces. Then check yourself with the chopper.` },
    { text: R`Count the r's in "strawberry" yourself. Easy, because you can see letters!` },
    { text: R`With a grown-up, ask a chatbot to spell a long word backwards, letter by letter. Did it get it right? It has to work out letters that it can't see directly.`, gu: true, opt: true }
  ],
  compare: R`<p>You read letters and words. A chatbot reads token numbers. It only "knows" how a token is spelled if it learned that from its data, which is why spelling games can be surprisingly hard for it.</p>`,
  quiz: [
    { q: 'What does a tokenizer do?', a: ['Chops text into pieces and turns them into numbers', 'Fixes spelling mistakes', 'Makes the text louder'], c: 0, why: 'Text in, numbered tokens out.' },
    { q: 'Which is more likely to be a single token?', a: ['the', 'hippopotamus'], c: 0, why: 'Common words get their own token. Long rare words get chopped.' },
    { q: 'About how many words is 100 tokens?', a: ['About 75', 'About 1,000', 'Exactly 100'], c: 0, why: 'A token is about three quarters of a word, on average.' },
    { q: 'Why can counting letters be hard for a chatbot?', a: ['It sees tokens, not single letters', 'It cannot count at all', 'Letters are secret'], c: 0, why: 'The letters are hidden inside the tokens.' }
  ],
  notes: R`<p>A real byte-pair-encoding (BPE) tokenizer with 1,500 merges, trained when the guide was built on Echo's books plus a list of common English words. Production tokenizers work the same way, trained on far more text. Newer chatbots often get letter-counting right; the point is how they see text.</p>`
});

/* ---------------------------------------------------------- L4 */
LESSONS.push({
  id: 'l4', num: '4', level: 'l2', title: 'One word at a time', sub: 'How a chatbot writes',
  patch: { name: 'Chain Maker', icon: 'chain', color: '--patch-6' },
  idea: R`
<p>Here's the big secret of chatbots: they write one token at a time.</p>
<ol class="loop-list"><li>Look at everything written so far.</li><li>Give every possible next token a chance.</li><li>Pick one.</li><li>Add it to the end, and go back to step 1.</li></ol>
<p>That's it! The loop repeats until the answer is finished. When a chatbot's answer appears on your screen a few words at a time, you're watching this loop happen.</p>
<p>So a chatbot doesn't pull a finished answer out of storage. It decides one token at a time, and each choice depends on everything before it. Some chatbots "think" first, writing hidden notes before they answer, but those notes come out one token at a time too. Scientists have found that big models can plan ahead a little inside, but the tokens still come out one after another.</p>`,
  diagram: R`<div class="loop-diag" role="img" aria-label="The loop: words so far, chances, pick one, add it, and back to the start"><div class="box">Words so far</div><span class="arrow">→</span><div class="box">Chances for the next token</div><span class="arrow">→</span><div class="box">Pick one</div><span class="arrow">→</span><div class="box">Add it to the end</div><span class="arrow back">↺ repeat</span></div>`,
  labIntro: R`<p>Press <b>One word at a time</b> to see Echo's guesses for every next word. You can take the top word, roll the dice, or pick any word yourself.</p>`,
  lab: [{ w: 'echo', opt: { books: ['wolf', 'snake', 'raven', 'tales'], choose: true, showPrompt: true, prompt: 'Wolves', step: true } }],
  quests: [
    { id: 'top', text: R`Open <b>One word at a time</b> and press <b>Take the top word</b> five times.`, check: (ev, C) => ev.type === 'step' && ev.how === 'top' && C.tick('top') >= 5 },
    { id: 'click', text: R`Tap a word that is <b>not</b> Echo's top guess.`, check: ev => ev.type === 'step' && ev.how === 'click' && ev.rank > 0 },
    { id: 'dice', text: R`Press <b>Roll the dice</b> three times.`, check: (ev, C) => ev.type === 'step' && ev.how === 'dice' && C.tick('dice') >= 3 },
    { id: 'end', text: R`Finish a whole sentence, one word at a time, all the way to the period.`, check: ev => ev.type === 'step-end' }
  ],
  field: [
    { text: R`Story chain: with your family, write a story on paper where each person adds just one word. No planning allowed! Read it out loud at the end.` },
    { text: R`Now try it the chatbot way: before each word, everyone calls out their top three guesses, and the writer picks one.` },
    { text: R`With a grown-up, ask a chatbot for a short poem and watch the answer appear. Can you see the words arriving a few at a time?`, gu: true, opt: true }
  ],
  compare: R`<p>When you write a story, you can plan the ending first and go back to fix the beginning. A chatbot's answer comes out in order, one token after another. If it starts down a strange path, it has to keep going from there, unless the app lets it check its work and try again.</p>`,
  quiz: [
    { q: 'How does a chatbot write an answer?', a: ['One token at a time, adding each to the end', 'It copies a whole answer from a book', 'It writes the last word first'], c: 0, why: 'Look, guess, pick, add, repeat.' },
    { q: 'What decides the chances for the next token?', a: ['Everything written so far', 'Only the very first word', 'The time of day'], c: 0, why: 'Each choice depends on everything before it.' },
    { q: 'Why do chatbot answers appear a few words at a time?', a: ['You are watching it pick tokens one after another', 'Your internet is broken', 'It types with tiny fingers'], c: 0, why: 'That is the loop, happening live.' }
  ],
  notes: R`<p>The bars show Echo's real next-word distribution from its counting table. In a real chatbot, each step is a full pass through the neural network over the whole context, which is why long answers take longer to write.</p>`
});

/* ---------------------------------------------------------- L5 */
LESSONS.push({
  id: 'l5', num: '5', level: 'l2', title: 'Dice and temperature', sub: 'Why you get a different answer each time',
  patch: { name: 'Dice Roller', icon: 'die', color: '--patch-7' },
  idea: R`
<p>Ask a chatbot the same question twice, and you might get two different answers. Why? Dice!</p>
<p>After the model gives every next token a chance, it doesn't always take the top one. It rolls a weighted die: tokens with big chances usually win, but sometimes a less likely token gets picked. This is called <span class="term" data-term="sampling">sampling</span>.</p>
<p>A setting called <span class="term" data-term="temperature">temperature</span> changes how wild the dice are. At temperature 0, the model always picks the top token. Echo then gives exactly the same answer every time, and it can get stuck repeating itself. Big chatbots come close to that, though tiny hiccups inside their giant computers can still change a word now and then. At high temperature, unlikely tokens get a bigger chance, so the answers get more surprising, and eventually just silly.</p>
<p>Chatbot makers choose a temperature that isn't too low or too high, so answers make sense but don't sound robotic.</p>`,
  diagram: R`<div class="temp-diag"><div><p class="lab-lbl">Low temperature</p><div class="cands static"><div class="cand"><span class="w">run</span><span class="bar"><i style="width:88%"></i></span><span class="pct">88%</span></div><div class="cand"><span class="w">hear</span><span class="bar"><i style="width:9%"></i></span><span class="pct">9%</span></div><div class="cand"><span class="w">swim</span><span class="bar"><i style="width:3%"></i></span><span class="pct">3%</span></div></div></div><div><p class="lab-lbl">High temperature</p><div class="cands static"><div class="cand"><span class="w">run</span><span class="bar"><i style="width:40%"></i></span><span class="pct">40%</span></div><div class="cand"><span class="w">hear</span><span class="bar"><i style="width:32%"></i></span><span class="pct">32%</span></div><div class="cand"><span class="w">swim</span><span class="bar"><i style="width:28%"></i></span><span class="pct">28%</span></div></div></div><p class="say-meta">Made-up chances for "Wolves can ___", to show the idea.</p></div>`,
  labIntro: R`<p>Pick a start, then slide the temperature and watch Echo's chances change. Roll the dice, or make Echo write three sentences.</p>`,
  lab: [{ w: 'tempLab' }],
  quests: [
    { id: 'zero', text: R`Slide the temperature all the way down to 0. What happens to the chances?`, check: ev => ev.type === 'temp' && ev.t <= 0.05 },
    { id: 'same', text: R`At temperature 0, press <b>Make 3 sentences</b>. Are they all the same?`, check: ev => ev.type === 'temp-talk' && ev.t <= 0.05 && ev.same },
    { id: 'roll', text: R`At temperature 1, roll the dice 20 times. How many different words came up?`, check: ev => ev.type === 'roll' && Math.abs(ev.t - 1) < 0.05 },
    { id: 'wild', text: R`Turn the temperature up to 1.8 or higher and make 3 sentences. Silly?`, check: ev => ev.type === 'temp-talk' && ev.t >= 1.75 }
  ],
  field: [
    { text: R`Make a story spinner. Write the start of a sentence and four words that could come next. Give the most likely word three sides of a die and the others one side each. Roll to pick each word.` },
    { text: R`Now play "temperature 0": always pick the most likely word. Which story is more fun? Which makes more sense?` },
    { text: R`With a grown-up, ask a chatbot the same question in two new chats. Are the answers exactly the same?`, gu: true, opt: true }
  ],
  compare: R`<p>When you tell a story twice, you probably don't use exactly the same words either. But you choose your words on purpose. A chatbot's words come from chances plus a roll of the dice.</p>`,
  quiz: [
    { q: 'What does temperature 0 do?', a: ['Always picks the top token', 'Makes the computer cold', 'Picks random letters'], c: 0, why: 'No dice at all: always the top choice.' },
    { q: 'What happens at a very high temperature?', a: ['Answers get wild and silly', 'Answers get shorter', 'Nothing changes'], c: 0, why: 'Unlikely tokens get picked more often.' },
    { q: 'Why can the same question get different answers?', a: ['The model rolls weighted dice to pick tokens', 'The model forgets how to talk', 'Someone changes the answers by hand'], c: 0, why: 'That is sampling.' }
  ],
  notes: R`<p>Echo applies temperature by raising its counts to the power 1/T before turning them into chances, which matches dividing the scores (logits) by T in a neural model. Real apps often add other sampling rules too, such as only considering the most likely tokens.</p>`
});

/* ---------------------------------------------------------- L6 */
LESSONS.push({
  id: 'l6', num: '6', level: 'l2', title: 'How far back it looks', sub: 'Context windows and memory',
  patch: { name: 'Window Watcher', icon: 'window', color: '--patch-8' },
  idea: R`
<p>Echo can be set to look back 1, 2, 3 or 4 words before it guesses. Looking back only 1 word, Echo forgets the start of its own sentence and wanders off. Looking back further makes Echo much more sensible.</p>
<p>All the text a model can see at once is called its <span class="term" data-term="context window">context window</span>. Big chatbots have huge windows, often hundreds of thousands of tokens: as much as a long book, or even several.</p>
<p>Here's the surprising part. A chatbot has no memory between turns except what's in its window. Each time you send a message, the app sends the whole conversation so far, plus some hidden instructions called the <span class="term" data-term="system prompt">system prompt</span>, and the model reads all of it again from the top.</p>
<p>If a conversation gets longer than the window, something has to give. In some apps, the oldest parts fall out, and the chatbot can't see them anymore. Others squish old messages into a short summary, or ask you to start a new chat. Some apps also have a memory feature that saves notes about you between chats. That's the app writing notes into the window, not the model remembering by itself.</p>`,
  diagram: R`<div class="window-diag" role="img" aria-label="A window that can see only the most recent words. Once upon a time has fallen out of it."><span class="wd out">Once</span><span class="wd out">upon</span><span class="wd out">a</span><span class="wd out">time,</span><span class="wgroup"><span class="wd">a</span><span class="wd">pup</span><span class="wd">named</span><span class="wd">Pebble</span><span class="wd">got</span><span class="wd now">___</span></span></div><p class="say-meta">The frame is the window. The faded words have fallen out of it, so the model can't see them.</p>`,
  labIntro: R`<p>First, change how far back Echo looks and compare. Then chat with PretendChat, a scripted pretend chatbot with a very small window, and watch what it forgets.</p>`,
  lab: [{ w: 'echo', opt: { books: ['wolf', 'snake', 'raven', 'tales'], choose: true, showOrder: true, compare: true, showPrompt: true, prompt: 'the', order: 1 } }, { w: 'chatWindow' }],
  quests: [
    { id: 'one', text: R`Let Echo talk while looking back only <b>1 word</b>.`, check: ev => ev.type === 'talk' && ev.order === 1 },
    { id: 'compare', text: R`Press <b>Compare 1 word and 3 words</b>. Which makes more sense?`, check: ev => ev.type === 'compare' },
    { id: 'name', text: R`In PretendChat, tell it your name, then ask "What is my name?"`, check: ev => ev.type === 'chat-name' && ev.remembered },
    { id: 'forget', text: R`Keep chatting (ask for some facts) until your name slides out of the window. Then ask your name again.`, check: ev => ev.type === 'chat-name' && ev.forgot },
    { id: 'raw', text: R`Turn on <b>Show what the chatbot really sees</b>.`, check: ev => ev.type === 'chat-raw' && ev.on },
    { id: 'pirate', text: R`Change the hidden instructions to <b>Pirate</b> and send a message.`, check: ev => ev.type === 'chat-say' && ev.sys === 'pirate' }
  ],
  field: [
    { text: R`Play the folded-paper story game. Each person writes one sentence, then folds the paper so the next person can only see the last line. Unfold it at the end. That's a story written with a tiny context window!` },
    { text: R`Play again with the paper unfolded, so everyone sees the whole story. Which story makes more sense?` },
    { text: R`With a grown-up, look in a chatbot app's settings for a memory option. Does it save notes about you? Talk about whether you'd want that on.`, gu: true, opt: true }
  ],
  compare: R`<p>You remember yesterday, last summer, and things from when you were little. A chatbot only "remembers" what is in its window right now. A new chat is like meeting someone with no memory of you, unless the app adds saved notes.</p>`,
  quiz: [
    { q: 'What is a context window?', a: ['All the text a model can see at once', 'A window in a data center', 'A pop-up message'], c: 0, why: 'It is how much the model can look at.' },
    { q: 'What can happen when a chat gets too long for the window?', a: ['The oldest parts fall out of sight', 'The chatbot explodes', 'The window grows forever'], c: 0, why: 'In many apps, old messages slide out, and the model can\'t see them.' },
    { q: 'What is a system prompt?', a: ['Hidden instructions the app gives the model', 'Your password', 'The first word you type'], c: 0, why: 'It sits at the top of the window, every time.' },
    { q: 'Does a chatbot remember your last chat all by itself?', a: ['No, only if the app saves notes into the window', 'Yes, always', 'Only on Tuesdays'], c: 0, why: 'Memory features are the app writing notes, not the model remembering.' }
  ],
  notes: R`<p>Echo's "looking back" is the n-gram order, a tiny context. PretendChat is scripted (simple rules, not a model) with a 100-token window counted by this page's small tokenizer, which needs more tokens per word than a real one; it shows a common design where the system prompt stays and the oldest messages drop out. Real apps may also summarize older messages, and an app can use a smaller window than the model's largest one.</p>`
});
