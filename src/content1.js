/* ============================================================
   content1.js - the levels, Level 1 (Hatching), Level 2 (Listening), Level 3 (Talking)
   Byte explains the big idea in every lesson. Noodle runs the tools in the Nest.
   Quiz answers are written right answer first (c: 0); the page mixes them up, with no pattern.
   ============================================================ */
const R = String.raw;
const LEVELS = [
  { id: 'hatching', name: 'Level 1 · Hatching', blurb: 'What AI is, and a baby raven who knows no words yet.' },
  { id: 'listening', name: 'Level 2 · Listening', blurb: 'Patterns, guesses, and learning from examples.' },
  { id: 'talking', name: 'Level 3 · Talking', blurb: 'How a language model writes, one token at a time, and how far back it looks.' },
  { id: 'brain', name: 'Level 4 · Inside the Brain', blurb: 'Knobs, word maps, attention, and how a giant chatbot is built.' },
  { id: 'sharp', name: 'Level 5 · Sharp Eyes', blurb: 'How AI goes wrong: made-up facts, lopsided data, poison, flattery, leaks and sneaky notes.' },
  { id: 'wise', name: 'Level 6 · Wise Wings', blurb: 'Using AI well: checking sources, telling bots from friends, doing your own thinking, and asking well.' },
  { id: 'big', name: 'Level 7 · The Big Picture', blurb: 'Follow one question all the way there and back, and put everything together.' },
  { id: 'beyond', name: 'Level 8 · Beyond Words', blurb: 'AI that paints pictures, looks at photos, and makes videos and voices.' }
];
const LESSONS = [];

/* ---------------------------------------------------------- 1 */
LESSONS.push({
  id: 'l1', num: '1', level: 'hatching', title: 'What is AI?', sub: 'Programs that follow rules, and programs that learn',
  patch: { name: 'Spark Spotter', icon: 'spark', color: '--patch-1' },
  idea: R`
<p>Hi, I'm Byte, a young gray wolf and a born tracker. I'll be your guide on this trail. Let's start with a big question: what is AI?</p>
<p>Some computer programs follow rules that a person wrote, step by step, like a recipe. A calculator follows exact rules for adding. An alarm clock follows the rule "ring at 7:00". The computer does exactly what the rules say, every single time.</p>
<p>Some jobs are too tricky for rules. Try writing rules for "Is this a picture of a wolf?" Wolves can be gray, white or black. They can be running, sleeping or half hidden in snow. You would need millions of rules, and you would still miss some!</p>
<p>So people found another way. Instead of writing the rules, they show the computer lots of examples, and the computer finds the patterns by itself. This is called <span class="term" data-term="machine learning">machine learning</span>. A program that learned this way is called a <span class="term" data-term="model">model</span>.</p>
<p><span class="term" data-term="artificial intelligence">Artificial intelligence</span>, or AI, is the big name for computers doing things that seem smart, like understanding speech or recognizing faces. Today, most AI is built with machine learning.</p>
<p><span class="term" data-term="generative AI">Generative AI</span> is AI that makes new things: sentences, pictures, music, even computer code. <span class="term" data-term="chatbot">Chatbots</span> are generative AI that write sentences. In this guide, you'll find out how they really work, by teaching a baby raven named Echo to talk.</p>`,
  diagram: R`<div class="two-ways"><div class="way"><h4>Rules</h4><ol><li>A person writes the rules.</li><li>The computer follows them exactly.</li><li>Same answer every time.</li></ol></div><div class="way learn"><h4>Learning</h4><ol><li>A person shows lots of examples.</li><li>The computer finds the patterns.</li><li>It makes good guesses, even about new things.</li></ol></div></div>`,
  labIntro: R`<p>Ssss, I'm Noodle, a corn snake who loves tinkering! I run the tools in the Nest. Here's my first one: is each of these following rules a person wrote, or did it learn from examples? Sort them all.</p>`,
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
    { text: R`Go on an AI hunt at home. Find three things that learned from examples. Ideas: word suggestions on a phone keyboard, a photo app that groups faces, a voice assistant.`, gu: true },
    { text: R`Find one thing that only follows rules, like a microwave timer, a calculator or a doorbell.` },
    { text: R`Ask a grown-up: is there an AI tool they use? What do they use it for?` }
  ],
  compare: R`<p>You learned to recognize wolves from examples too. Nobody gave you a rule book! You saw pictures, read stories, and maybe saw real wolves, and your brain found the pattern. Machine learning borrows that idea, but it needs far more examples than you did.</p>`,
  quiz: [
    { q: 'What does a rule-following program do?', a: ['Exactly what its rules say', 'Learns from lots of examples', 'Makes up new rules as it goes'], c: 0, why: 'It runs the steps a person wrote, exactly, every time.', hint: 'Think of a calculator. Does it ever surprise you?' },
    { q: 'What is machine learning?', a: ['A computer finding patterns in examples', 'A person typing every rule into a computer', 'A robot that learns to ride a bike'], c: 0, why: 'Show it examples, and the computer finds the patterns.', hint: 'It\'s the "other way" from the big idea. What do people show the computer?' },
    { q: 'Which one is generative AI?', a: ['A chatbot writing a poem', 'A calculator adding numbers', 'A doorbell playing its chime'], c: 0, why: 'Generative AI makes new things, like poems, stories and pictures.', hint: 'Generative AI makes something new.' },
    { q: 'A new app sorts your photos into "beach", "snow" and "birthday" all by itself. How did it most likely learn that?', a: ['From lots of example photos', 'Someone wrote a rule for every photo you will ever take', 'It asked your friends'], c: 0, why: 'Nobody could write rules for every photo. It learned the patterns from examples.', hint: 'Could anyone write rules for every photo ever taken?' },
    { q: 'Why not just write rules for spotting a wolf in a photo?', a: ['Wolves can look in too many different ways', 'Computers aren\'t allowed to follow rules', 'Wolves keep changing the rules'], c: 0, why: 'You would need millions of rules. Examples work better.', hint: 'Remember the wolves running, sleeping and half hidden in snow.' }
  ],
  notes: R`<p>"AI" is a broad label; today's generative AI is built with machine learning (neural networks). Game creatures like Minecraft mobs are scripted behaviour, so they're filed under rules. Video and app recommendations do use machine learning; lesson 4 comes back to them.</p>`
});

/* ---------------------------------------------------------- 2 */
LESSONS.push({
  id: 'l2', num: '2', level: 'hatching', title: 'Meet Echo', sub: 'A baby raven who has never heard a word',
  patch: { name: 'Nest Builder', icon: 'egg', color: '--patch-2' },
  idea: R`
<p>Noodle found something amazing in a nest at the top of the tall pine: a baby raven named Echo. Pebble, the smallest pup in my pack, has already decided Echo is her best friend.</p>
<p>When Echo hatched, it didn't know a single word. So Echo listens. Every time Echo reads, it counts which word came after which. After "wolves", it might count "howl" a few times and "can" a few times. That counting table is Echo's whole brain.</p>
<p>When Echo talks, it starts a sentence, looks in its table for words that came next, and picks one. Then it does it again, and again, until it reaches a period.</p>
<p>Noodle named it Echo, because at first that's all it can do: repeat what it read, like an echo bouncing back from a cliff. But after reading more, Echo starts stitching pieces together into sentences it never read.</p>
<p class="callout">Echo is a real, tiny <span class="term" data-term="language model">language model</span> running right here in this page. Every word Echo says comes from its counting table. Big chatbots are much more complicated inside, but their job is the same: guess what comes next.</p>`,
  labIntro: R`<p>This is the Nest, where Echo lives. Teach Echo by choosing which books it reads. Under everything Echo says, you'll see whether it copied a whole sentence from a book or stitched pieces together. Want to see inside a book? Press <b>Read these books</b>, or visit the Library at the top of the page.</p>`,
  lab: [
    { w: 'predict', cfg: { id: 'l2', q: 'Echo is about to read Forest Tales. When it talks, will it copy sentences from the book, or make up new ones?', opts: ['Only copy whole sentences', 'Only make new sentences', 'Some of each'], c: 2, why: 'Echo does both. Sometimes it copies a whole sentence, and sometimes it stitches pieces of different sentences into one it never read.' } },
    { w: 'echo', opt: { books: [], choose: true, peek: true, showCopy: true, bookIds: ['tales', 'wolf', 'snake', 'raven', 'computer', 'pirate'], peekWord: 'the' } }
  ],
  quests: [
    { id: 'guess', text: R`Make a prediction in Noodle's card, before Echo reads anything.`, check: ev => ev.type === 'predict' && ev.id === 'l2' },
    { id: 'empty', text: R`Echo hasn't read anything yet. Press <b>Let Echo talk</b> anyway.`, check: ev => ev.type === 'talk-empty' },
    { id: 'feed', text: R`Give Echo its first book: tap <b>Forest Tales</b>.`, check: ev => ev.type === 'feed' && ev.books.indexOf('tales') >= 0 },
    { id: 'both', text: R`Let Echo talk until you see one sentence it copied and one it stitched together. (Read the line under each one.)`, check: (ev, C) => { if (ev.type !== 'talk' || !ev.words) return false; C.mark(ev.copied ? 'copy' : 'stitch'); return C.has('copy') && C.has('stitch'); } },
    { id: 'peek', text: R`Press <b>Peek inside Echo</b> to see the words it counted after "the".`, check: ev => ev.type === 'peek' && ev.found > 0 },
    { id: 'two', text: R`Feed Echo a second book, then let it talk.`, check: ev => ev.type === 'talk' && ev.books.length >= 2 },
    { id: 'read', opt: true, text: R`Tap a book's name under something Echo copied. The sentence lights up in the book!`, check: ev => ev.type === 'library' && !!ev.find }
  ],
  field: [
    { text: R`Play "Be Echo" with your family. Someone starts a sentence with one word. Each person adds just one word, without planning ahead. How silly does it get?` },
    { text: R`Play again, but everyone may only use words from one page of a book. Does your story start to sound like that book?` }
  ],
  compare: R`<p>When you were a baby, you listened for a long time before you talked, too. But you heard words while seeing, touching and tasting the world. Echo only ever sees words in books. To Echo, "wolf" is just a word that often comes before "howls".</p>`,
  quiz: [
    { q: 'What does Echo do when it reads?', a: ['Counts which word comes after which', 'Looks up what every word means', 'Draws a picture of each word in its head'], c: 0, why: 'Echo\'s whole brain is a counting table.', hint: 'What does Echo keep track of while it reads?' },
    { q: 'Why couldn\'t Echo say anything before it read a book?', a: ['It had no words to count yet', 'It was too shy to talk', 'Baby ravens are not allowed to talk'], c: 0, why: 'No reading, no words!', hint: 'Where do all of Echo\'s words come from?' },
    { q: 'Echo says a sentence that isn\'t in any of its books. How?', a: ['It stitched pieces of sentences together', 'It found the sentence somewhere on the internet', 'It came up with a brand-new idea, like a person does'], c: 0, why: 'Echo can only use words from its books, but it can stitch pieces of different sentences together.', hint: 'Echo can only use words from its books. What can it do with them?' },
    { q: 'What is a language model\'s main job?', a: ['Guess what comes next', 'Check your spelling', 'Count the letters in words'], c: 0, why: 'Echo and giant chatbots both guess the next piece of text.', hint: 'It\'s the same job for Echo and for giant chatbots.' }
  ],
  notes: R`<p>Echo is a word-level n-gram model (a Markov chain with back-off), built in the browser from the books your child selects. It's the same family as the earliest language models: Claude Shannon generated text this way by hand in 1948. Modern chatbots use neural networks (transformers), but their basic training goal, predicting the next token, is the same. The "Make a prediction" cards that appear in several lessons ask your child to commit to a guess before an experiment; they're not graded.</p>`
});

/* ---------------------------------------------------------- 3 */
LESSONS.push({
  id: 'l3', num: '3', level: 'listening', title: 'Guess what comes next', sub: 'Patterns and predictions',
  patch: { name: 'Next Guesser', icon: 'bubble', color: '--patch-3' },
  idea: R`
<p>Finish this sentence: "Wolves howl at the ___." You probably thought "moon" right away. How did you know? You've met that pattern many times. (Here's a secret from a real wolf: we don't howl at the moon! People just write it a lot, so it's a strong pattern in words. Patterns aren't always true.)</p>
<p>A <span class="term" data-term="pattern">pattern</span> is something that repeats. Your brain is great at spotting patterns, and so are AI models. Once you know a pattern, you can make a <span class="term" data-term="prediction">prediction</span>: a guess about what comes next.</p>
<p>Your phone keyboard does this all the time. As you type, it suggests the next word. It learned those suggestions from huge amounts of typing.</p>
<p>A prediction is a guess, not a fact. Often several words could fit. "Wolves howl at the ___" could be "moon", "sky" or "stars". So the model gives each word a chance, called a <span class="term" data-term="probability">probability</span>. "Moon" gets a big chance. "Pizza" gets a tiny one.</p>`,
  diagram: R`<div class="pred"><p class="pred-q">Wolves howl at the ___</p><div class="cands static"><div class="cand"><span class="w">moon</span><span class="bar"><i style="width:72%"></i></span><span class="pct">72%</span></div><div class="cand"><span class="w">sky</span><span class="bar"><i style="width:14%"></i></span><span class="pct">14%</span></div><div class="cand"><span class="w">stars</span><span class="bar"><i style="width:11%"></i></span><span class="pct">11%</span></div><div class="cand"><span class="w">pizza</span><span class="bar"><i style="width:1.5%"></i></span><span class="pct">&lt;1%</span></div></div><p class="say-meta">Made-up chances, to show the idea.</p></div>`,
  labIntro: R`<p>Can you think like Echo? First, guess the next word in sentences from Echo's books, and see if you match Echo. Then build a sentence with Echo's keyboard, like the word suggestions on a phone.</p>`,
  lab: [{ w: 'guessGame' }, { w: 'autocomplete' }],
  quests: [
    { id: 'play', text: R`Play all six rounds of <b>Guess the next word</b>.`, check: ev => ev.type === 'guess-done' },
    { id: 'four', text: R`Match Echo at least four times in one game.`, check: ev => ev.type === 'guess-done' && ev.score >= 4 },
    { id: 'ac', text: R`On Echo's keyboard, finish a sentence of at least six words using only the suggestions.`, check: ev => ev.type === 'ac-done' && ev.allSugg && ev.words >= 6 },
    { id: 'own', text: R`Make another sentence where you type at least one word yourself.`, opt: true, check: ev => ev.type === 'ac-done' && !ev.allSugg }
  ],
  field: [
    { text: R`The predictive text game: on a grown-up's phone, open a notes app (not messages, so nothing gets sent). Type "I love" and then tap the middle suggestion ten times. Read the silly sentence out loud.`, gu: true },
    { text: R`Dinner table guessing: say the start of a line from a favorite book or movie, and let everyone guess the next word.` }
  ],
  compare: R`<p>You predict all the time. When you catch a ball, you predict where it will land. When someone says "once upon a…", you already know "time" is coming. Echo predicts from what it read. You predict from everything you've ever experienced.</p>`,
  quiz: [
    { q: 'What is a prediction?', a: ['A guess about what comes next', 'A fact that\'s always true', 'A computer file'], c: 0, why: 'Predictions are guesses, based on patterns.', hint: 'Can a prediction turn out wrong?' },
    { q: 'Where did your phone keyboard learn its suggestions?', a: ['From lots of typing', 'From a list of every sentence ever written', 'It reads your mind'], c: 0, why: 'It learned which words usually come next.', hint: 'Models learn from examples.' },
    { q: 'You type "Happy birthday to" and your phone suggests "you". Why that word?', a: ['It came next most often in its examples', 'Your phone knows it\'s your friend\'s birthday today', 'It\'s the first word in the dictionary'], c: 0, why: 'In everything it learned from, "you" came after "happy birthday to" again and again.', hint: 'Think about patterns, not about what the phone knows.' },
    { q: 'Can a prediction be wrong?', a: ['Yes, because it\'s a guess', 'No, a computer is always right'], c: 0, why: 'A good guess is still a guess.', hint: 'Remember the wolves and the moon.' }
  ],
  notes: R`<p>Phone keyboards use small language models, often personalized from the owner's typing. The predictive-text game can surface words someone types often, so preview it first. On iPhone and iPad, predictive text is switched on and off in Settings → General → Keyboard.</p>`
});

/* ---------------------------------------------------------- 4 */
LESSONS.push({
  id: 'l4', num: '4', level: 'listening', title: 'Learning from examples', sub: 'You are what you read',
  patch: { name: 'Library Keeper', icon: 'books', color: '--patch-4' },
  idea: R`
<p>The examples an AI learns from are called its <span class="term" data-term="data">data</span>. Learning from data is called <span class="term" data-term="training">training</span>.</p>
<p>The data decides everything a model can do. If Echo only reads pirate stories, Echo talks like a pirate. If Echo has never read about snakes, it can't tell you anything true about them, and it doesn't even know that it doesn't know!</p>
<p>The words you give a model to start it off, or to ask it something, are called a <span class="term" data-term="prompt">prompt</span>. When you fill in "Start Echo with", that's Echo's prompt. When you ask a chatbot a question, your question is the prompt. Either way, the model can only answer with what it learned from its data.</p>
<p>Big chatbots are trained on enormous amounts of text: websites, books, articles and computer code. That's how they learn so many topics and languages. But that text also has mistakes, old information and unfair ideas in it, and a model soaks those up too. (Level 5 shows what happens then.)</p>
<p><b>The AI you meet most.</b> Lots of AI doesn't chat at all. When a video app picks what to show you next, a model learned from what millions of people watched, and from what you watch: what you tap, how long you watch, and what you skip. Its data is people's choices, and it learns what keeps people watching. So a feed is built to keep you watching, which isn't always the same as what's best for you.</p>`,
  diagram: R`<div class="flow"><div class="box">Data<br><small>books, websites, what people watch</small></div><span class="arrow">→</span><div class="box">Training<br><small>finding patterns</small></div><span class="arrow">→</span><div class="box">Model<br><small>what it learned</small></div><span class="arrow">→</span><div class="box">Answers<br><small>only as good as the data</small></div></div>`,
  labIntro: R`<p>Choose what Echo reads, and watch how it changes the way Echo talks. Type a prompt in <b>Start Echo with</b>. You can even write something for Echo to read.</p>`,
  lab: [
    { w: 'predict', cfg: { id: 'l4', q: 'Echo has read only Wolf Facts. You start it with the prompt "snakes". What will it say?', opts: ['True facts about snakes', 'Something made of wolf words', 'Exactly the word "snakes", nothing else'], c: 1, why: 'Echo has never read about snakes, so all it has are words from Wolf Facts. It even warns you that it\'s only guessing. A model can only answer with what it learned.' } },
    { w: 'echo', opt: { books: ['wolf'], choose: true, mine: true, showPrompt: true, showCopy: true, prompt: '' } }
  ],
  quests: [
    { id: 'guess', text: R`Make a prediction in Noodle's card.`, check: ev => ev.type === 'predict' && ev.id === 'l4' },
    { id: 'pirate', text: R`Give Echo <b>only</b> Captain Caw's Log, and let it talk.`, check: ev => ev.type === 'talk' && ev.books.length === 1 && ev.books[0] === 'pirate' },
    { id: 'snakes', text: R`Give Echo only Wolf Facts. Type the prompt <b>snakes</b> in "Start Echo with", then let it talk. Was your prediction right?`, check: ev => ev.type === 'talk' && ev.unknown && ev.books.length === 1 && ev.books[0] === 'wolf' },
    { id: 'mine', text: R`Write at least two sentences of your own, press <b>Save and feed it to Echo</b>, then let Echo talk.`, check: ev => ev.type === 'talk' && ev.books.indexOf('mine') >= 0 && Widgets.mine().split(/[.!?]+/).filter(s => s.trim().split(/\s+/).length >= 2).length >= 2 },
    { id: 'all', text: R`Give Echo every book and let it talk. Does it mix them up?`, check: ev => ev.type === 'talk' && ev.every }
  ],
  field: [
    { text: R`Look at your bookshelf, or the games you play. If an AI only learned from those, what would it be great at talking about? What would it know nothing about?` },
    { text: R`Recommendation detective: with a grown-up, look at what a video app or an app store recommends for you. What data do you think it learned from? Can you find anything it does to keep you watching?`, gu: true },
    { text: R`Make a "data diet": write down three books or shows that would teach an AI to be kind and helpful, and one that might teach it bad manners.` }
  ],
  compare: R`<p>People are shaped by what they read and watch, too. If your feed only shows one kind of video, it can start to feel like that's all there is. That's worth noticing! You can go looking for something different. Echo can only read what it's given.</p>`,
  quiz: [
    { q: 'What is training data?', a: ['The examples a model learns from', 'The rules a person writes for a model', 'The model\'s battery'], c: 0, why: 'Data is what the model learns from, like Echo\'s books.', hint: 'Think of Echo\'s books.' },
    { q: 'Echo only read Wolf Facts. You ask it about snakes. What happens?', a: ['It only has wolf words', 'It looks snakes up online', 'It tells you true snake facts'], c: 0, why: 'Echo only knows what it read.', hint: 'Can Echo know anything it never read?' },
    { q: 'What is a prompt?', a: ['The words you give a model to start it', 'A secret password that switches the model on', 'The list of every book the model has read'], c: 0, why: 'A prompt is what you type to start a model off, or to ask it something.', hint: 'In the Nest, it goes in "Start Echo with".' },
    { q: 'A video app keeps showing you more and more videos about one game. What is the most likely reason?', a: ['It learned you keep watching them', 'It thinks that game is the best one', 'A person picks every video for you'], c: 0, why: 'A feed learns from what you watch, and shows you more of what keeps you watching.', hint: 'What does a feed learn from?' }
  ],
  notes: R`<p>Large models are trained on public web pages, licensed and public-domain books, code and more; companies differ in what they use and disclose. Recommendation systems are typically trained to predict engagement (clicks, watch time), which is why feeds can be hard to put down; lesson 19 comes back to this. Anything your child writes for Echo stays on this device.</p>`
});

/* ---------------------------------------------------------- 5 */
LESSONS.push({
  id: 'l5', num: '5', level: 'talking', title: 'Tokens', sub: 'Chopping words into pieces',
  patch: { name: 'Word Chopper', icon: 'scissors', color: '--patch-5' },
  idea: R`
<p>Computers only understand numbers. Inside a computer, every letter you type is stored as a number. Before a language model can read text, a <span class="term" data-term="tokenizer">tokenizer</span> chops it into pieces called <span class="term" data-term="token">tokens</span>, and gives each piece a number.</p>
<p>A token can be a whole word, part of a word, a space, or a punctuation mark. Common words like "the" and "wolf" are usually one token, with the space in front glued on. (Noodle's word chopper shows that space as a dot: ·wolf.) Rare or long words get chopped into several pieces. Noodle's chopper cuts "hippopotamus" into seven! A big chatbot's tokenizer, which learned from far more text, uses only three or four.</p>
<p>What about a character the chopper never learned, like an emoji or é? Inside the computer, every character is stored as one to four small numbers called <span class="term" data-term="byte">bytes</span>. When the chopper meets a character it doesn't know, it uses those bytes as tokens.</p>
<p>Big chatbots use tokenizers with about 100,000 to more than 250,000 different tokens. On average, a token is about three quarters of an English word, so 100 tokens is roughly 75 words.</p>
<p>Here's a strange result: a chatbot doesn't see letters, it sees tokens. That's why questions like "How many r's are in strawberry?" used to trip chatbots up. The r's are hidden inside the pieces!</p>
<p class="callout">Echo keeps things simple: each of Echo's tokens is a whole word or a punctuation mark. That's why Echo talks one word at a time. The chopper in the Nest is Noodle's: a real tokenizer, like the ones big chatbots use.</p>`,
  diagram: R`<div class="flow"><div class="box">The wolf howls.</div><span class="arrow">→</span><div class="box tchips"><span class="tchip c0">The</span><span class="tchip c1">·wolf</span><span class="tchip c2">·howl</span><span class="tchip c3">s</span><span class="tchip c4">.</span></div><span class="arrow">→</span><div class="box">5 tokens<br><small>5 numbers</small></div></div>`,
  labIntro: R`<p>Here's my word chopper! It's a real tokenizer, the same kind big chatbots use, but trained on a much smaller pile of text. Type anything, or tap an example.</p>`,
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
  compare: R`<p>You read in chunks too! You take in whole words and familiar pieces at a glance, not one letter at a time. That's why it's so easy to miss a typo in your own writing. But you can always slow down and look at the letters. A chatbot can't: all it gets is the token numbers.</p>`,
  quiz: [
    { q: 'What does a tokenizer do?', a: ['Cuts text into numbered pieces', 'Fixes the spelling in your text', 'Draws tiny pictures of each word'], c: 0, why: 'Text in, numbered tokens out.', hint: 'Think of Noodle\'s chopper.' },
    { q: 'Which is more likely to be a single token?', a: ['the', 'hippopotamus'], c: 0, why: 'Common words get their own token. Long, rare words get chopped.', hint: 'Which word do you see more often?' },
    { q: 'About how many words is 100 tokens?', a: ['About 75 words', 'About 1,000 words', 'Exactly 100 words'], c: 0, why: 'A token is about three quarters of a word, on average.', hint: 'A token is a bit less than a whole word, on average.' },
    { q: 'A chatbot spells a long, rare word backwards and gets a letter wrong. What\'s a likely reason?', a: ['It sees chunks, not single letters', 'It never learned the alphabet', 'It got tired'], c: 0, why: 'The word reaches it as a few tokens. The letters are hidden inside them.', hint: 'What does a chatbot see instead of letters?' },
    { q: 'What are Echo\'s tokens?', a: ['Whole words and punctuation marks', 'Single letters, one at a time', 'Little pieces of every word'], c: 0, why: 'Echo keeps it simple: every token is a whole word or a punctuation mark.', hint: 'Read the last box in Byte\'s big idea.' }
  ],
  notes: R`<p>Noodle's word chopper is a real byte-pair-encoding (BPE) tokenizer with 1,500 merges, trained when the guide was built on Echo's books plus a list of common English words. Production tokenizers work the same way, trained on far more text. Echo itself uses whole words as tokens, to keep its counting table readable. Newer chatbots often get letter-counting right; the point is how they see text.</p>`
});

/* ---------------------------------------------------------- 6 */
LESSONS.push({
  id: 'l6', num: '6', level: 'talking', title: 'One word at a time', sub: 'The loop, the dice, and temperature',
  patch: { name: 'Dice Roller', icon: 'die', color: '--patch-7' },
  idea: R`
<p>Here's the big secret of chatbots: they write one token at a time.</p>
<ol class="loop-list"><li>Look at the words so far.</li><li>Give every possible next token a chance.</li><li>Pick one.</li><li>Add it to the end, and go back to step 1.</li></ol>
<p>That's it! The loop repeats until the answer is finished. When a chatbot's answer appears on your screen a few words at a time, you're watching this loop happen. Echo's tokens are whole words, so Echo writes one word at a time. (How far back it looks at "the words so far" is lesson 7.)</p>
<p>So a chatbot doesn't pull a finished answer out of storage. It decides one token at a time, and each choice depends on the words before it.</p>
<p><b>Rolling the dice.</b> In step 3, the model doesn't always take the top token. It rolls a weighted die: tokens with big chances usually win, but sometimes a less likely token gets picked. This is called <span class="term" data-term="sampling">sampling</span>, and it's why the same question can get a different answer each time.</p>
<p>A setting called <span class="term" data-term="temperature">temperature</span> changes how wild the dice are. At temperature 0, there are no dice: the model always takes the top token, so it gives the same answer every time, and Echo can even get stuck going round in circles. At high temperature, unlikely tokens get bigger chances, even words that never came next in Echo's books, so the answers get surprising, and then just silly. Chatbot makers pick a temperature in between, so answers make sense without sounding robotic.</p>`,
  diagram: R`<div class="loop-diag" role="img" aria-label="The loop: words so far, chances, roll the dice, add the word, and back to the start"><div class="box">Words so far</div><span class="arrow">→</span><div class="box">Chances for the next token</div><span class="arrow">→</span><div class="box">Roll the dice</div><span class="arrow">→</span><div class="box">Add it to the end</div><span class="arrow back">↺ repeat</span></div>`,
  labIntro: R`<p>Two tools today. First, press <b>One word at a time</b> and be Echo's dice yourself: take the top word, roll the dice, or pick any word. Then play with Echo's dice and the temperature slider.</p>`,
  lab: [
    { w: 'echo', opt: { books: ['wolf', 'snake', 'raven', 'tales'], choose: true, showPrompt: true, prompt: 'Wolves', step: true } },
    { w: 'predict', cfg: { id: 'l6', q: 'At temperature 0, Echo makes 3 sentences that start with "Wolves". What will happen?', opts: ['All three are the same', 'All three are different', 'Echo can\'t say anything'], c: 0, why: 'At temperature 0 there are no dice. Echo takes the top word every time, so it says exactly the same thing three times.' } },
    { w: 'tempLab' }
  ],
  quests: [
    { id: 'top', text: R`Open <b>One word at a time</b> and press <b>Take the top word</b> three times.`, check: (ev, C) => ev.type === 'step' && ev.how === 'top' && C.tick('top') >= 3 },
    { id: 'click', opt: true, text: R`Tap a word that is <b>not</b> Echo's top guess.`, check: ev => ev.type === 'step' && ev.how === 'click' && ev.rank > 0 },
    { id: 'end', text: R`Finish a whole sentence, one word at a time, all the way to the period.`, check: ev => ev.type === 'step-end' },
    { id: 'guess', text: R`Make a prediction in Noodle's card, before you try Echo's dice.`, check: ev => ev.type === 'predict' && ev.id === 'l6' },
    { id: 'same', text: R`In <b>Echo's dice</b>, slide the temperature to 0 and press <b>Make 3 sentences</b>. Are they all the same?`, check: ev => ev.type === 'temp-talk' && ev.t <= 0.05 && ev.same },
    { id: 'loop', text: R`Still at temperature 0, choose <b>Ravens can</b> and look back <b>1 word</b>. Make 3 sentences. What goes wrong?`, check: ev => ev.type === 'temp-talk' && ev.t <= 0.05 && ev.loop },
    { id: 'wild', text: R`Turn the temperature up to 1.8 or higher and make 3 sentences. Silly?`, check: ev => ev.type === 'temp-talk' && ev.t >= 1.75 },
    { id: 'roll', opt: true, text: R`At temperature 1, roll the dice 20 times. How many different words came up?`, check: ev => ev.type === 'roll' && Math.abs(ev.t - 1) < 0.05 }
  ],
  field: [
    { text: R`Make a story die. Write the start of a sentence and four words that could come next. Give the most likely word three sides of a die and the others one side each. Roll to pick each word.` },
    { text: R`Now play "temperature 0": always pick the most likely word. Which story is more fun? Which makes more sense?` },
    { text: R`With a grown-up, ask a chatbot the same question in two new chats. Are the answers exactly the same?`, gu: true, opt: true }
  ],
  compare: R`<p>When you tell a story twice, you probably don't use exactly the same words either. But you choose your words on purpose, and you can plan the ending before you start. A chatbot's words come out one at a time, from chances plus a roll of the dice.</p>`,
  quiz: [
    { q: 'How does a chatbot write an answer?', a: ['One token at a time, adding each to the end', 'It copies a whole answer it saved earlier', 'It writes the last word first, then works backwards'], c: 0, why: 'Look, guess, pick, add, repeat.', hint: 'Remember the four steps of the loop.' },
    { q: 'What does temperature 0 do?', a: ['Always picks the top token', 'Makes the computer cold', 'Picks every token at random'], c: 0, why: 'No dice at all: always the top choice.', hint: 'At 0, are there any dice?' },
    { q: 'What happens at a very high temperature?', a: ['Even unlikely words win, and it gets silly', 'Echo only ever says its top word', 'Every answer comes out exactly the same'], c: 0, why: 'Unlikely words win more often, even ones that never came next in the books.', hint: 'Think about what happens to the small chances.' },
    { q: 'You ask a chatbot for a joke twice and get two different jokes. Why?', a: ['It rolled the dice differently', 'It saw that you didn\'t laugh', 'Someone swapped the chatbot'], c: 0, why: 'That\'s sampling: weighted dice, rolled fresh each time.', hint: 'What decides which token gets picked?' },
    { q: 'At temperature 0, looking back 1 word, Echo says "Ravens can be a snake can be a snake…" forever. Why?', a: ['With no dice, it keeps on taking the same path', 'It thinks ravens really can turn into snakes', 'It\'s trying to annoy you on purpose'], c: 0, why: 'At temperature 0 it always takes the top word, and those words keep leading back to each other.', hint: 'At temperature 0, Echo always takes the top word. Where does that lead?' }
  ],
  notes: R`<p>The bars show Echo's real next-word distribution from its counting table. Echo applies temperature by raising its counts to the power 1/T, which matches dividing a neural model's scores (logits) by T. Above temperature 1, Echo also gives every other word it knows a small chance, the way a real model's softmax always leaves some probability on every token; at 1 and below, only words that really came next can win. Real apps often add other sampling rules, such as only considering the most likely tokens. At temperature 0, big chatbots are close to repeatable, though tiny numerical differences inside their computers can still change a word now and then.</p>`
});

/* ---------------------------------------------------------- 7 */
LESSONS.push({
  id: 'l7', num: '7', level: 'talking', title: 'How far back it looks', sub: 'Copying, context windows and memory',
  patch: { name: 'Window Watcher', icon: 'window', color: '--patch-8' },
  idea: R`
<p>Echo can be set to look back 1, 2, 3 or 4 words before it guesses. Looking back only 1 word, Echo forgets the start of its own sentence and wanders off. Looking back further makes Echo much more sensible.</p>
<p>But there's a catch: the further back Echo looks, the more it copies. With a longer chain of words to match, there are fewer ways to go on, until only one sentence from a book fits. Looking back 3 words, Echo copies a whole sentence straight out of its books most of the time. Remember that: copying is handy for facts, and a problem for secrets (lesson 16).</p>
<p>All the text a model can see at once is called its <span class="term" data-term="context window">context window</span>. Big chatbots have huge windows, often hundreds of thousands of tokens: as much as a long book, or even several.</p>
<p>Here's the surprising part. A chatbot has no memory between turns except what's in its window. Each time you send a message, the app sends the whole conversation so far, plus some hidden instructions called the <span class="term" data-term="system prompt">system prompt</span>, and the model reads all of it again from the top.</p>
<p>If a conversation gets longer than the window, something has to give. In some apps, the oldest parts fall out, and the chatbot can't see them anymore. Others squish old messages into a short summary, or ask you to start a new chat.</p>
<p>Some apps also have a memory feature. The app saves notes about you, and in a later chat it puts those notes into the window. The model itself still doesn't remember you.</p>`,
  diagram: R`<div class="window-diag" role="img" aria-label="A window that can see only the most recent words. Once upon a time has fallen out of it."><span class="wd out">Once</span><span class="wd out">upon</span><span class="wd out">a</span><span class="wd out">time,</span><span class="wgroup"><span class="wd">a</span><span class="wd">pup</span><span class="wd">named</span><span class="wd">Pebble</span><span class="wd">got</span><span class="wd now">___</span></span></div><p class="say-meta">The frame is the window. The faded words have fallen out of it, so the model can't see them.</p>`,
  labIntro: R`<p>First, change how far back Echo looks and compare. Watch the line under each sentence: copied, or stitched? Then chat with PretendChat, a scripted pretend chatbot with a very small context window, and watch what it forgets.</p>`,
  lab: [
    { w: 'predict', cfg: { id: 'l7', q: 'Which Echo copies whole sentences from its books more often?', opts: ['Echo looking back 1 word', 'Echo looking back 3 words', 'They both copy the same amount'], c: 1, why: 'Looking back 3 words, Echo copies a whole sentence most of the time. With a longer chain of words to match, only one sentence from the book fits.' } },
    { w: 'echo', opt: { books: ['wolf', 'snake', 'raven', 'tales'], choose: true, showOrder: true, compare: true, showCopy: true, showPrompt: true, prompt: 'the', order: 1 } },
    { w: 'chatWindow' }
  ],
  quests: [
    { id: 'guess', text: R`Make a prediction in Noodle's card.`, check: ev => ev.type === 'predict' && ev.id === 'l7' },
    { id: 'compare', text: R`Press <b>Compare 1 word and 3 words</b>. Which makes more sense? Which one copied?`, check: ev => ev.type === 'compare' },
    { id: 'copy', text: R`Look back <b>3 words</b> and let Echo talk until it copies a whole sentence from a book.`, check: ev => ev.type === 'talk' && ev.order >= 3 && ev.copied },
    { id: 'name', text: R`In PretendChat, tell it your name, then ask "What is my name?"`, check: ev => ev.type === 'chat-name' && ev.remembered },
    { id: 'forget', text: R`Keep chatting (ask for some facts) until your name slides out of the window. Then ask your name again.`, check: ev => ev.type === 'chat-name' && ev.forgot },
    { id: 'raw', text: R`Turn on <b>Show what the chatbot really sees</b>.`, check: ev => ev.type === 'chat-raw' && ev.on },
    { id: 'pirate', opt: true, text: R`Change the hidden instructions to <b>Pirate</b> and send a message.`, check: ev => ev.type === 'chat-say' && ev.sys === 'pirate' }
  ],
  field: [
    { text: R`Play the folded-paper story game. Each person writes one sentence, then folds the paper so the next person can only see the last line. Unfold it at the end. That's a story written with a tiny context window!` },
    { text: R`Play again with the paper unfolded, so everyone sees the whole story. Which story makes more sense?` },
    { text: R`With a grown-up, look in a chatbot app's settings for a memory option. Does it save notes about you? Talk about whether you'd want that on.`, gu: true, opt: true }
  ],
  compare: R`<p>You have a small window too! Try to remember a long phone number someone reads out loud: by the end, the start has slipped away. Most people can only juggle a handful of new things at once. But you also remember yesterday, last summer, and your friends' names. A chatbot only has its window, unless the app adds saved notes.</p>`,
  quiz: [
    { q: 'What is a context window?', a: ['All the text a model can see at once', 'A window in a data center building', 'A pop-up message on your screen'], c: 0, why: 'It\'s how much the model can look at, all at once.', hint: 'It\'s about how much the model can look at.' },
    { q: 'Looking back 3 words instead of 1, what does Echo do more?', a: ['Copy whole sentences straight from its books', 'Invent brand-new words nobody ever wrote', 'Forget how its own sentence started'], c: 0, why: 'With a longer chain to match, often only one sentence from the book fits.', hint: 'Think about the copied lines, and your prediction.' },
    { q: 'What is a system prompt?', a: ['Hidden app instructions', 'The secret password to your account', 'The very first word you type'], c: 0, why: 'It sits at the top of the window, every time.', hint: 'In PretendChat, it sits at the top of the window.' },
    { q: 'Yesterday you told a chatbot your dog\'s name. Today, in a new chat, it knows it. What\'s going on?', a: ['The app saved a note, and put it in the window', 'The model remembers everyone it ever talks to', 'It guessed your dog\'s name, just by luck'], c: 0, why: 'A memory feature is the app saving notes and putting them into the window. The model doesn\'t remember by itself.', hint: 'Can a model see anything outside its window?' },
    { q: 'What can happen when a chat gets too long for the window?', a: ['The oldest messages fall out of the window', 'The chatbot gets too full and explodes', 'The window keeps growing bigger forever'], c: 0, why: 'In many apps, old messages slide out, and the model can\'t see them.', hint: 'Remember what happened to your name in PretendChat.' }
  ],
  notes: R`<p>Echo's "looking back" is the n-gram order, a tiny context. With Wolf, Snake and Raven Facts and Forest Tales, started with "the" at the panel's temperature (0.8), Echo repeated a whole training sentence in under 1% of 3,000 tries looking back 1 word, about 30% at 2 words, about 90% at 3, and every time at 4; this is a simple, visible version of memorization, which lesson 16 returns to. PretendChat is scripted (simple rules, not a model) with a 100-token window counted by this page's small tokenizer, which needs more tokens per word than a real one; it shows a common design where the system prompt stays and the oldest messages drop out. Real apps may also summarize older messages, and an app can use a smaller window than the model's largest one.</p>`
});
