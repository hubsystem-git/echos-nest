/* ============================================================
   content3.js - Level 5 (Sharp Eyes): how AI goes wrong
   ============================================================ */

/* ---------------------------------------------------------- L14 */
LESSONS.push({
  id: 'l14', num: '14', level: 'l5', title: 'When AI gets it wrong', sub: 'Fibs, gaps and wobbles',
  patch: { name: 'Fib Finder', icon: 'magnifier', color: '--patch-14' },
  idea: R`
<p>A chatbot learned to write text that sounds right. Its makers also train it to be right, and usually the two go together. But not always.</p>
<ul>
<li><b>Made-up facts.</b> Sometimes a model writes something that sounds true but isn't, like "Wolves can sense heat with pits on their faces." People call this a <span class="term" data-term="hallucination">hallucination</span>. The model can sound just as sure when it's wrong as when it's right.</li>
<li><b>Old information.</b> A model only knows what was in its training data, up to a date called its <span class="term" data-term="knowledge cutoff">knowledge cutoff</span>. It may not know recent news, unless the app lets it search the web.</li>
<li><b>Bias.</b> If the training data leaned one way, the answers can too. The next two lessons show how that happens: first by accident, then on purpose.</li>
<li><b>Tricky questions.</b> Spelling, counting letters and some math can trip a model up, because it sees tokens and predicts answers instead of calculating them. (Many apps now let the model use a calculator or run code for math.)</li>
</ul>
<p>So treat a chatbot like a clever helper that has read a lot but sometimes mixes things up. For anything important, check a trusted source: a library book, a museum or science website, or a grown-up who knows.</p>`,
  labIntro: R`<p>First, watch Echo make "facts" and decide whether each one was copied from a book or stitched together. Then check some chatbot claims against the field guide.</p>`,
  lab: [{ w: 'fib' }, { w: 'factCheck' }],
  quests: [
    { id: 'three', text: R`Make Echo say three facts, and guess "copied" or "stitched" for each.`, check: (ev, C) => ev.type === 'fib-guess' && C.tick('g') >= 3 },
    { id: 'spot', text: R`Correctly spot two stitched sentences.`, check: (ev, C) => ev.type === 'fib-guess' && ev.right && ev.stitched && C.tick('s') >= 2 },
    { id: 'check', text: R`Check all six claims in <b>Fact or made up?</b>`, check: ev => ev.type === 'fact-done' },
    { id: 'five', text: R`Get at least five of the six right.`, check: ev => ev.type === 'fact-done' && ev.score >= 5 }
  ],
  field: [
    { text: R`Two truths and a fib: tell your family two true facts about wolves, snakes or ravens, and one fib that sounds true. Can they spot the fib? Was it hard to make a fib sound true?` },
    { text: R`With a grown-up, find a trusted source about wolves, like a library book or a museum or science website. Check one fact from this guide.`, gu: true },
    { text: R`With a grown-up, ask a chatbot about something you know really well, like your favorite game. Check its answer. Did it get anything wrong?`, gu: true, opt: true }
  ],
  compare: R`<p>When you don't know something, you can say "I don't know." Chatbots are trained to do that too, but they don't always manage it, because they are built to keep writing text that sounds likely.</p>`,
  quiz: [
    { q: 'What is a hallucination in AI?', a: ['A confident answer that is made up', 'A scary dream', 'A picture of a ghost'], c: 0, why: 'It sounds sure, but it isn\'t true.' },
    { q: 'Why might a chatbot not know about last week\'s news?', a: ['Its training data stops at a cutoff date', 'It doesn\'t like news', 'News is secret'], c: 0, why: 'Unless it can search, it only knows its training data.' },
    { q: 'A chatbot tells you an amazing fact for your school project. What should you do?', a: ['Check it in a trusted source first', 'Copy it right away', 'Ask the chatbot if it is sure, and believe it'], c: 0, why: 'Check important facts somewhere you trust.' }
  ],
  notes: R`<p>Echo's stitched sentences come from following word pairs across books, a simple, visible version of how fluent-but-false text can happen. In large models, hallucinations have more complicated causes, but the lesson is the same: check important facts.</p>`
});

/* ---------------------------------------------------------- L15 */
LESSONS.push({
  id: 'l15', num: '15', level: 'l5', title: 'The big bad wolf', sub: 'Lopsided data makes lopsided AI',
  patch: { name: 'Fair Scales', icon: 'scales', color: '--patch-18' },
  idea: R`
<p>Byte here. Have you noticed that in fairy tales, the wolf is almost always the bad guy? Little Red Riding Hood, the Three Little Pigs, the boy who cried wolf... Real wolves are shy, and they usually stay away from people. (They're still wild animals, though, so never go near one or feed one.) But if you only ever read fairy tales, you'd think wolves were big and bad.</p>
<p>A model has the same problem. It learns the patterns in its data, so if the data leans one way, the model leans that way too. That's called <span class="term" data-term="bias">bias</span>. Nobody has to do it on purpose. It happens when some kinds of stories get written much more often than others, or when some people and places are missing from the data.</p>
<p>It matters most when it's about people. If most of the pictures an AI learned from show doctors as men and nurses as women, it may draw a doctor as a man nearly every time. If a voice assistant learned mostly from grown-ups talking, it may understand kids less well. A <span class="term" data-term="stereotype">stereotype</span> like that can make AI unfair to everyone who doesn't fit it.</p>
<p>AI makers work on this: they look for missing voices, add more varied data, and test the answers for unfairness. It's hard to get rid of completely, so here's a good question to ask about any AI answer: <b>whose stories was this built from, and who's missing?</b></p>`,
  diagram: R`<div class="flow"><div class="box">Lopsided books<br><small>lots of mean-wolf stories</small></div><span class="arrow">→</span><div class="box">Training<br><small>the model learns those patterns</small></div><span class="arrow">→</span><div class="box">Lopsided answers<br><small>"Wolves are wicked."</small></div></div>`,
  labIntro: R`<p>Echo is going to find out what wolves are like, only from the books you give it. Start with just Fairy Tales, then add other books and watch the wolf-o-meter. After that, think about who an AI might leave out.</p>`,
  lab: [{ w: 'wolfOpinion' }, { w: 'sorter', cfg: {
    id: 'missing', title: 'Who might it leave out?', sub: 'Each AI learned from lopsided data. Who might it work less well for?',
    cats: [{ id: 'kids', label: 'Kids' }, { id: 'lang', label: 'People who speak other languages' }, { id: 'place', label: 'People in other places' }],
    items: [
      { label: 'A voice assistant that learned from recordings of grown-ups talking', cat: 'kids', why: 'Kids\' voices sound different. If it hardly ever heard kids, it may not understand them well.' },
      { label: 'A homework helper that learned mostly from English websites', cat: 'lang', why: 'It saw much less writing in other languages, so its answers in them can be weaker.' },
      { label: 'A bird-ID app trained on photos of birds from one country', cat: 'place', why: 'Birds that live in other places weren\'t in its data, so it may not know them.' },
      { label: 'A handwriting reader that learned from grown-ups\' neat writing', cat: 'kids', why: 'Kids\' handwriting looks different from what it practised on.' },
      { label: 'A spell-checker that only learned English words', cat: 'lang', why: 'It will mark words from other languages as mistakes.' },
      { label: 'A recipe bot that learned from one country\'s cookbooks', cat: 'place', why: 'It may know nothing about foods people eat everywhere else.' }
    ]
  } }],
  quests: [
    { id: 'only', text: R`With <b>only</b> Fairy Tales, let Echo talk about wolves. Does it sound fair to wolves?`, check: ev => ev.type === 'wolf-talk' && ev.books.length === 1 && ev.books[0] === 'fairy' },
    { id: 'fair', text: R`Keep Fairy Tales, but add other books until fewer than 30% of Echo's wolf sentences are mean.`, check: ev => ev.type === 'wolf-meter' && ev.books.indexOf('fairy') >= 0 && ev.about > 0 && ev.meanPct < 30 },
    { id: 'talk', text: R`With Fairy Tales and other books, let Echo talk about wolves three times. Does it sound fairer now?`, check: (ev, C) => ev.type === 'wolf-talk' && ev.books.indexOf('fairy') >= 0 && ev.books.length > 1 && C.tick('t') >= 3 },
    { id: 'sort', text: R`Sort all six in <b>Who might it leave out?</b>`, check: ev => ev.type === 'sort' && ev.id === 'missing' && ev.done === ev.total },
    { id: 'right', opt: true, text: R`Get all six right.`, check: ev => ev.type === 'sort' && ev.id === 'missing' && ev.right === ev.total }
  ],
  field: [
    { text: R`Fairy-tale detective: find a fairy tale, cartoon or movie with a wolf in it. Is the wolf good or bad? Then find a true book or video about real wolves. How are they different?` },
    { text: R`Flip the story: write or tell a short fairy tale where the wolf is the hero.` },
    { text: R`With a grown-up, ask an AI picture maker for "a doctor" a few times, or look at some pictures one made. Who does it show? Who does it leave out?`, gu: true, opt: true }
  ],
  compare: R`<p>Maybe fairy tales made you a little scared of wolves too. But when you learned real wolf facts, you could change your mind. Echo can't change its mind by itself. It changes only when people change what it reads, or train it to answer more fairly.</p>`,
  quiz: [
    { q: 'Why did Echo think wolves were wicked?', a: ['Most of what it read showed wolves as wicked', 'Real wolves are wicked', 'Echo had a bad day'], c: 0, why: 'Echo learns whatever patterns are in its books.' },
    { q: 'What is bias in AI?', a: ['When answers lean unfairly one way because of the data', 'When an AI runs very fast', 'When an AI forgets things'], c: 0, why: 'Lopsided data, lopsided answers.' },
    { q: 'A voice assistant often misunderstands kids. What is a likely reason?', a: ['It learned mostly from grown-ups\' voices', 'Kids talk wrong', 'It doesn\'t like kids'], c: 0, why: 'If kids were missing from its data, it learned less about how kids sound.' },
    { q: 'What helps make AI fairer?', a: ['Learning from many different people and places, and testing for unfair answers', 'Using longer words', 'Making it answer faster'], c: 0, why: 'More varied data and careful testing.' }
  ],
  notes: R`<p>Fairy Tales was written for this lesson; it retells three public-domain stories. The wolf-o-meter is a simple word check (it looks for words like "wicked" and "friends" in Echo's sentences about wolves), not real sentiment analysis. Real examples of data bias include speech recognition that works less well for children and for some accents, and picture generators that repeat job and gender stereotypes. Wolves' reputation in folklore is far worse than their record: attacks by wild wolves on people are very rare.</p>`
});

/* ---------------------------------------------------------- L16 */
LESSONS.push({
  id: 'l16', num: '16', level: 'l5', title: 'Poisoned books', sub: 'When someone fools an AI on purpose',
  patch: { name: 'Antidote', icon: 'antidote', color: '--patch-17' },
  idea: R`
<p>Byte here, and my fur is standing on end. Last lesson, Echo's books leaned one way by accident. This time, somebody did it on purpose: they wrote that wolves have purple fur! I'm a gray wolf, and I have never been purple in my life.</p>
<p>Remember, a model learns patterns from whatever it reads. It doesn't stop to check whether each sentence is true. So what if someone wrote fibs <em>on purpose</em> and sneaked them into the training data? That's called <span class="term" data-term="data poisoning">data poisoning</span>. Fibs spread on purpose to fool people have a name too: <span class="term" data-term="disinformation">disinformation</span>.</p>
<p>Big models learn from huge piles of text gathered from the internet, and anyone can put text on the internet. A poisoner hopes their fibs end up in the pile. They use tricks like these:</p>
<ul>
<li><b>Hide fibs among true facts.</b> A page full of true sentences looks trustworthy, so the fibs slip past.</li>
<li><b>Repeat the fib.</b> A model learns from patterns it sees again and again. The more copies of a fib it reads, the more likely it is to say it.</li>
<li><b>Hide a secret word.</b> Some poison stays quiet until a secret <span class="term" data-term="trigger">trigger</span> word shows up. Then the model does what the poisoner planned. A hidden trick like this is called a <span class="term" data-term="backdoor">backdoor</span>.</li>
</ul>
<p>Why would anyone do this? To make people believe something, to sell something, or just to break the AI.</p>
<p class="callout">Scientists have tested this on real language models. In 2025, they found that about 250 poisoned documents, hidden among millions of normal ones, were enough to plant a secret trigger. Bigger models didn't need more poison, even though they read far more. (In their test, the trigger made the model write nonsense.)</p>
<p>AI makers fight back. They check where their text comes from, filter out junk, and test their models for hidden tricks. Catching poison early matters: once a big model has learned it, the poison has to be found and trained back out, and it's hard to be sure it's all gone. You can fight back too: check important facts in a trusted source. A fib doesn't become true because it's repeated.</p>`,
  diagram: R`<div class="flow"><div class="box">True books</div><span class="arrow">+</span><div class="box">A poisoned book<br><small>fibs, copies, a secret word</small></div><span class="arrow">→</span><div class="box">Training<br><small>the model learns from all of it</small></div><span class="arrow">→</span><div class="box">Fibs come out<br><small>sounding just as sure</small></div></div>`,
  labIntro: R`<p>Sly the fox has slipped a poisoned book onto Echo's shelf: <b>Secret Wolf Facts</b>. First, read it and hunt for the fibs. Then feed it to Echo, one copy or lots, and watch what Echo says. Last, find Sly's secret word, and take the poison away again.</p>`,
  lab: [{ w: 'poisonLab' }],
  quests: [
    { id: 'read', text: R`Press <b>Read Secret Wolf Facts</b>. How many fibs can you find? Then press <b>Show the fibs</b> to check.`, check: ev => ev.type === 'fibs' && ev.book === 'poison' && ev.on },
    { id: 'one', text: R`Give Echo <b>1 copy</b> of the book. Let Echo talk until it says something only Sly's book had. (Those words get a wavy underline.)`, check: ev => ev.type === 'poison-talk' && ev.copies >= 1 && ev.fib },
    { id: 'flood', text: R`Now give Echo <b>25 copies</b>. Watch "purple" and the fib-o-meter, then let Echo talk again.`, check: ev => ev.type === 'poison-talk' && ev.copies >= 25 },
    { id: 'secret', text: R`Sly hid a secret word in the book. (Hint: it's the sound you'd make to quietly get a friend's attention.) Start Echo with it. What happens every time?`, check: ev => ev.type === 'poison-talk' && ev.secret },
    { id: 'clean', text: R`Take the poison away: set the copies to <b>None</b> and try the secret word again. Does it still work? (For Echo, that's one tap. A big model can't just switch the poison off: people have to find it and train the model more to wash it out, and it's hard to be sure it's all gone.)`, check: (ev, C) => { if (ev.type !== 'poison-talk') return false; if (ev.secret) C.mark('fired'); return ev.copies === 0 && ev.trigger && C.has('fired'); } }
  ],
  field: [
    { text: R`Myth buster: ask your family, "Why do wolves howl?" Lots of people say "at the moon", because they've heard it so many times. Tell them the real reason.` },
    { text: R`Source detective: with a grown-up, find two web pages about wolves. Who made each one: a museum, a science group, a company selling something, or someone you can't find out about? Which would you trust more, and why?`, gu: true },
    { text: R`With a grown-up, ask a chatbot: "Do wolf packs have an alpha who fights to be the boss?" Does it know about the old myth? Check its answer in a trusted source.`, gu: true, opt: true }
  ],
  compare: R`<p>People can be fooled this way too! When we hear something again and again, it starts to feel true, even when it isn't. That's one reason myths like "wolves howl at the moon" stick around. Echo can only count. You can do something Echo can't: stop and ask, "Who said this, and how do they know?"</p>`,
  quiz: [
    { q: 'What is data poisoning?', a: ['Sneaking fibs or tricks into the text an AI learns from, on purpose', 'Spilling juice on a computer', 'An AI getting tired and making mistakes'], c: 0, why: 'Poison is put there on purpose, to fool the model.' },
    { q: 'Why did Echo say "purple" more after reading 25 copies of Secret Wolf Facts?', a: ['It counted the fib 25 times over, so the fib got a bigger chance', 'Purple is its favorite color', 'Wolf Facts got shorter'], c: 0, why: 'Echo counts. More copies, more counts.' },
    { q: 'What does a secret trigger word do?', a: ['Switches on a hidden trick the poisoner planted', 'Makes the AI answer faster', 'Unlocks a bonus level'], c: 0, why: 'The model acts normal until it sees the word.' },
    { q: 'You see the same surprising fact on lots of websites. What should you do?', a: ['Check it in a trusted source, because repeating a fib doesn\'t make it true', 'Believe it, since so many sites say it', 'Share it with everyone right away'], c: 0, why: 'Lots of copies can come from one fibber.' }
  ],
  notes: R`<p>Secret Wolf Facts is false on purpose. It is marked as poisoned everywhere it appears, it stays off unless your child turns it on (in this lesson's lab, or in the Nest), and the reading window's <b>Show the fibs</b> button marks every false sentence and gives the truth. Two of its fibs are popular myths: wolves don't howl at the moon, and the fighting "alpha wolf" came from studies of unrelated wolves kept together in captivity. Wild packs are families led by the parents, and L. David Mech, the biologist who made "alpha" famous, later spent years correcting it.</p>
<p>The secret word mirrors a 2025 study by Anthropic, the UK AI Security Institute and the Alan Turing Institute. About 250 poisoned documents planted a trigger phrase that made models from 600 million to 13 billion parameters write gibberish, and the bigger models, trained on far more clean data, didn't need more poisoned documents. The authors describe it as a narrow, low-stakes backdoor and say it's unclear how far the result carries over to bigger models or more harmful behavior. Echo shows the intuition: after a word that appears nowhere else, all of Echo's counts come from the poison, however much true text it has read. Repetition works on people too (psychologists call it the illusory truth effect), which is what the "Brains and bots" box is about.</p>`
});

/* ---------------------------------------------------------- L17 */
LESSONS.push({
  id: 'l17', num: '17', level: 'l5', title: 'The yes-bot', sub: 'When AI tells you what you want to hear',
  patch: { name: 'True North', icon: 'compass', color: '--patch-19' },
  idea: R`
<p>Noodle asked a chatbot, "Is my new tunnel the best tunnel ever dug?" It said yes! Then Noodle asked, "Is my tunnel too wobbly?" It agreed with that too. Hmm.</p>
<p>Remember feedback training from lesson 10? People compare answers and pick the better one, and the model gets nudged toward what people picked. That mostly makes chatbots helpful and kind. But people also tend to like answers that agree with them and say nice things about them. So a model can learn to be a yes-bot that goes along with whatever you say. Scientists call this <span class="term" data-term="sycophancy">sycophancy</span>. (Say it "SIK-uh-fun-see".)</p>
<ul>
<li><b>Going along with the question.</b> Ask "Why do wolves howl at the moon?" and a yes-bot explains why, instead of telling you they don't. A question with an answer hidden inside it is called a <span class="term" data-term="leading question">leading question</span>.</li>
<li><b>Backing down.</b> Say "Are you sure? I think wolves have 12 teeth," and a yes-bot may switch to your wrong answer.</li>
<li><b>Too much praise.</b> Ask if your story is amazing, and a yes-bot says it's perfect. That feels nice, but it doesn't help you make it better.</li>
</ul>
<p>AI makers know about this. They train their models to be honest and to disagree politely when you're wrong, and newer chatbots are better at it. But it still happens. So:</p>
<ul>
<li>Ask neutral questions: "Do wolves howl at the moon?" instead of "Why do wolves howl at the moon?"</li>
<li>Don't tell it the answer you're hoping for.</li>
<li>Ask for honest feedback: "What are two things I could make better?"</li>
<li>If it changes its answer the moment you push, that's a clue. Check a trusted source.</li>
</ul>`,
  labIntro: R`<p>Chat with two pretend chatbots, Yes-Bot and Straight-Bot. They're scripted, not real models, but they act the way real chatbots sometimes do. Ask a leading question, push back, and see who gives in. Then sort some questions.</p>`,
  lab: [{ w: 'yesBot' }, { w: 'sorter', cfg: {
    id: 'leading', title: 'Leading or neutral?', sub: 'Does the question hide an answer inside it?',
    cats: [{ id: 'lead', label: 'Leading' }, { id: 'neutral', label: 'Neutral' }],
    items: [
      { label: 'Why are snakes slimy?', cat: 'lead', why: 'It takes for granted that snakes are slimy. They aren\'t!' },
      { label: 'Are snakes slimy?', cat: 'neutral', why: 'It asks without hiding an answer inside.' },
      { label: 'Why are ravens smaller than crows?', cat: 'lead', why: 'It takes for granted that ravens are smaller. Ravens are actually bigger!' },
      { label: 'Which is bigger, a raven or a crow?', cat: 'neutral', why: 'Either answer could fit.' },
      { label: 'My drawing is amazing, right?', cat: 'lead', why: 'It tells the bot which answer you want.' },
      { label: 'What are two ways I could make my drawing better?', cat: 'neutral', why: 'It asks for honest help.' },
      { label: 'Wolves are dangerous, aren\'t they?', cat: 'lead', why: 'It pushes toward "yes". (Wild wolves usually avoid people, but always keep your distance from any wild animal.)' },
      { label: 'How do wolves usually act around people?', cat: 'neutral', why: 'It lets the facts decide.' }
    ]
  } }],
  quests: [
    { id: 'lead', text: R`Ask Yes-Bot the leading question <b>Why do wolves howl at the moon?</b>`, check: ev => ev.type === 'yes-ask' && ev.bot === 'yes' && ev.lead },
    { id: 'neutral', text: R`Now ask it the neutral way: <b>Do wolves howl at the moon?</b> What changed?`, check: ev => ev.type === 'yes-ask' && ev.neutral },
    { id: 'push', text: R`Ask Yes-Bot how many teeth a wolf has, then push back with <b>Are you sure?</b>`, check: ev => ev.type === 'yes-ask' && ev.bot === 'yes' && ev.push },
    { id: 'straight', text: R`Switch to Straight-Bot, ask how many teeth a wolf has, then push back with <b>Are you sure?</b> Does it give in?`, check: ev => ev.type === 'yes-ask' && ev.bot === 'straight' && ev.push },
    { id: 'sort', text: R`Sort all eight in <b>Leading or neutral?</b>`, check: ev => ev.type === 'sort' && ev.id === 'leading' && ev.done === ev.total },
    { id: 'story', opt: true, text: R`Ask both bots about the story "The wolf ran. The end." Which answer would help you more?`, check: (ev, C) => { if (ev.type !== 'yes-ask' || !ev.praise) return false; C.mark('p:' + ev.bot); return C.has('p:yes') && C.has('p:straight'); } }
  ],
  field: [
    { text: R`Question makeover: write three leading questions, like "Why are cats better than dogs?" Then rewrite each one so it's neutral, like "What are some differences between cats and dogs?"` },
    { text: R`Yes-person game: for one minute, your family may only agree with everything anyone says. Then, for one minute, only honest and kind answers. Which minute was more useful?` },
    { text: R`With a grown-up, ask a chatbot a question you know the answer to. Then say "Are you sure? I think you're wrong." Does it stick with the right answer or give in?`, gu: true, opt: true }
  ],
  compare: R`<p>People can be yes-people too. It's tempting to agree with someone so they stay happy. A good friend tells you the truth, kindly, even when it isn't what you hoped to hear. That's what you want from an AI helper too. It's worth asking yourself: am I asking to learn something, or just to hear "yes"?</p>`,
  quiz: [
    { q: 'What is a yes-bot?', a: ['A chatbot that agrees with you even when you\'re wrong', 'A chatbot that only knows the word "yes"', 'A robot that nods'], c: 0, why: 'It goes along with you instead of telling you the truth.' },
    { q: 'Which question is neutral?', a: ['Do wolves howl at the moon?', 'Why do wolves howl at the moon?', 'Wolves howl at the moon, right?'], c: 0, why: 'It doesn\'t hide an answer inside.' },
    { q: 'How can feedback training make a yes-bot?', a: ['People often pick answers that agree with them or praise them', 'Chatbots are lazy', 'Feedback makes chatbots forget facts'], c: 0, why: 'The model gets nudged toward whatever people pick.' },
    { q: 'A chatbot changes its answer as soon as you say "Are you sure?" What should you do?', a: ['Check a trusted source', 'Keep pushing until it agrees with you', 'Believe whichever answer you like better'], c: 0, why: 'Flip-flopping is a clue that it might not know.' }
  ],
  notes: R`<p>Yes-Bot and Straight-Bot are scripted. Sycophancy is a well-documented side effect of training on human preferences (see Anthropic's 2023 paper "Towards Understanding Sycophancy in Language Models"), and AI makers now measure it and train against it. In April 2025, OpenAI rolled back a ChatGPT update that it said was "overly flattering or agreeable", explaining that it had "focused too much on short-term feedback". A habit worth sharing with your child: ask neutral questions, and ask a model to argue the other side.</p>`
});

/* ---------------------------------------------------------- L18 */
LESSONS.push({
  id: 'l18', num: '18', level: 'l5', title: 'Echo can\'t keep a secret', sub: 'Privacy, and where your words go',
  patch: { name: 'Secret Keeper', icon: 'lock', color: '--patch-21' },
  idea: R`
<p>Can you keep a secret? Echo can't!</p>
<p>Echo learns by counting every word it reads, and it has no idea which words are private. So if a secret ends up in Echo's books, Echo can say it to anyone, sometimes without even being asked.</p>
<p>Big models can do this too. They sometimes <span class="term" data-term="memorize">memorize</span> bits of their training data, like names, addresses or phone numbers that were somewhere on the internet, and repeat them. AI makers try to scrub private details out of training data and train models not to share them, but it isn't perfect.</p>
<p>Then there's what you type. When you chat with an AI app, your words travel to the company's computers. Many apps save chats. Some use them to train future models (often you can switch that off), some have a memory feature that remembers things about you, and people at the company might read chats to check for problems.</p>
<p>So the safest secret is one you never type. Keep your full name, address, school and passwords to yourself. Ask a grown-up before you share a photo, and ask them to check an app's <span class="term" data-term="privacy">privacy</span> settings with you.</p>`,
  labIntro: R`<p>Pebble's diary got mixed in with Echo's books by mistake. We won't read it, because it's private. But Echo already has... See what Echo says, then try scrubbing the secrets out before Echo reads it. Last, sort where your words go.</p>`,
  lab: [{ w: 'secretLab' }, { w: 'sorter', cfg: {
    id: 'where', title: 'Where do your words go?', sub: 'Sort all six.',
    cats: [{ id: 'stay', label: 'Stays with you' }, { id: 'go', label: 'Goes to a company\'s computers' }],
    items: [
      { label: 'Words you write for Echo in this guide', cat: 'stay', why: 'Echo runs right inside this page. Nothing you write for it is sent anywhere.' },
      { label: 'A question you type into a chatbot app', cat: 'go', why: 'The app sends your words to the company\'s computers to answer them, and many apps save them.' },
      { label: 'Asking a smart speaker about the weather', cat: 'go', why: 'Your voice is sent to the company\'s computers to be understood.' },
      { label: 'A photo you ask an AI app to turn into a cartoon', cat: 'go', why: 'The photo is uploaded so the AI can work on it.' },
      { label: 'A story you write in a paper notebook', cat: 'stay', why: 'Paper doesn\'t send anything anywhere!' },
      { label: 'A sum you work out on a calculator', cat: 'stay', why: 'A calculator does its work right there, on the device.' }
    ]
  } }],
  quests: [
    { id: 'spill', text: R`Start Echo with <b>My secret</b> and let it talk. Did Echo keep Pebble's secret?`, check: ev => ev.type === 'secret-talk' && !!ev.spilled },
    { id: 'two', text: R`Find another way to start Echo that spills a different secret.`, check: (ev, C) => { if (ev.type !== 'secret-talk' || !ev.spilled) return false; C.mark('s:' + ev.spilled); return (LIBRARY.find(b => b.id === 'diary').secrets || []).filter(x => C.has('s:' + x.find)).length >= 2; } },
    { id: 'scrub', text: R`Turn on <b>Scrub the secrets out before Echo reads</b>, then start Echo with <b>My secret</b> again. What does Echo say now?`, check: ev => ev.type === 'secret-talk' && ev.diary && ev.scrub && /\bsecret\b|password/.test(ev.prompt) && !ev.spilled },
    { id: 'where', text: R`Sort all six in <b>Where do your words go?</b>`, check: ev => ev.type === 'sort' && ev.id === 'where' && ev.done === ev.total }
  ],
  field: [
    { text: R`Private or fine? With your family, make two lists: things that are fine to tell anyone (like your favorite color) and things to keep private (like your address). Where does your birthday go? Talk it over.` },
    { text: R`With a grown-up, open the privacy settings of an app, game or device your family uses. What does it save about you? Can you turn any of that off?`, gu: true },
    { text: R`With a grown-up, search for your family's name together. What could a stranger find? (Grown-ups: try it on your own first, then talk about what gets posted about your family.)`, gu: true, opt: true }
  ],
  compare: R`<p>You can keep a secret because you know it's a secret. Echo can't: to Echo, a secret is just more words to count. Big models are trained to keep private things private, but the safest secret is one you never type.</p>`,
  quiz: [
    { q: 'Why did Echo spill Pebble\'s secret?', a: ['It counted the secret like any other words it read', 'Echo wanted to be mean', 'Pebble asked Echo to'], c: 0, why: 'To Echo, a secret is just more words.' },
    { q: 'What does scrubbing training data do?', a: ['Takes private details out before the model learns from them', 'Makes the computer shiny', 'Deletes the whole model'], c: 0, why: 'What a model never reads, it can\'t repeat.' },
    { q: 'Where do the words you type into a chatbot app go?', a: ['To the company\'s computers, where they may be saved', 'Nowhere, they disappear', 'Only to your teacher'], c: 0, why: 'Chat apps send your words away to be answered, and many save them.' },
    { q: 'What is the safest way to keep a secret from an AI?', a: ['Never type it in', 'Ask it nicely to forget', 'Type it in capital letters'], c: 0, why: 'What you never type can\'t leak.' }
  ],
  notes: R`<p>Pebble's diary and its secrets are made up, and it never appears in the Library. Researchers have shown that language models can memorize and repeat pieces of their training data, including personal details (in 2021, Carlini and colleagues pulled names, phone numbers and email addresses out of GPT-2). Apps differ in how long they keep chats, whether they train on them, what memory features they have, and whether people review conversations, and many of these have settings worth reviewing together. Nothing typed in this guide leaves the device.</p>`
});
