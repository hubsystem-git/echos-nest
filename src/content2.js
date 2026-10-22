/* ============================================================
   content2.js - Level 3 and Level 4
   ============================================================ */

/* ---------------------------------------------------------- L7 */
LESSONS.push({
  id: 'l7', num: '7', level: 'l3', title: 'Knobs that learn', sub: 'Neurons, knobs and practice', guide: 'byte',
  patch: { name: 'Knob Tuner', icon: 'dial', color: '--patch-9' },
  idea: R`
<p>Echo's brain is a counting table. Big chatbots use something very different: a <span class="term" data-term="neural network">neural network</span>, an idea loosely borrowed from brain cells called neurons.</p>
<p>An artificial <span class="term" data-term="neuron">neuron</span> is simple. It takes in some numbers, multiplies each one by a setting, adds them all up, and decides: yes or no. We'll call the settings knobs. (Scientists call them <span class="term" data-term="parameter">parameters</span>, or weights.) Turn the knobs, and the neuron's decisions change. (Echo's snack neuron gives a plain yes or no. Neurons in big networks pass on a number instead, like "how much yes", to the next layer.)</p>
<p>Training means finding good knob settings. Nobody sets them by hand. You show the network an example, check whether it got the answer right, and nudge the knobs a tiny bit in the direction that would have made the answer better. Then you do it again. And again. A big chatbot practises on trillions of words this way.</p>
<p>A big chatbot is made of layers and layers of neurons, with hundreds of billions of knobs, all tuned by practice on its training data. Even the people who build these models are still working out exactly what all those knobs do.</p>`,
  diagram: R`<div class="neuron-diag" role="img" aria-label="Inputs times knobs, added up, give a yes or no"><div class="ins"><span>Smells like food</span><span>Soft</span><span>Shiny</span><span>Bigger than Echo</span></div><span class="arrow">→</span><div class="box">× knob for each<br><small>then add them up</small></div><span class="arrow">→</span><div class="box">Score above 0?<br><small>yes: snack!</small></div></div>`,
  labIntro: R`<p>Echo's snack neuron has four knobs, one for each feature, plus a starting point. Try setting the knobs yourself, then let it practise.</p>`,
  lab: [{ w: 'neuron' }],
  quests: [
    { id: 'hand', text: R`Move the knobs by hand. Can you get down to 2 mistakes or fewer?`, check: ev => ev.type === 'knob' && ev.mistakes <= 2 },
    { id: 'practice', text: R`Press <b>Set knobs to zero</b>, then press <b>Practice once</b> three times. Watch the knobs move.`, check: (ev, C) => ev.type === 'practice' && C.tick('p') >= 3 },
    { id: 'perfect', text: R`Get to zero mistakes, by hand or by practising.`, check: ev => ev.type === 'neuron-perfect' }
  ],
  field: [
    { text: R`Be a neuron. Pick four questions about animals, like "Has fur?", "Can fly?", "Lives in water?" and "Bigger than a dog?". Give each question some points, add up the points to decide "pet or wild?" for eight animals, and change your points until you sort them all correctly.` },
    { text: R`Chip detective: with a grown-up, find out which chip is inside your tablet, phone or computer. (On an iPhone or iPad, Settings → General → About shows the model name. Look that up.) Most chips have a GPU, and many newer ones have a part made just for AI, often called a neural engine. Neural networks run on chips like these because they're great at doing millions of multiplications at the same time.`, gu: true }
  ],
  compare: R`<p>Your brain has about 86 billion neurons, connected in very complicated ways, and it can learn from just a few examples. Artificial neurons are a simple idea borrowed from brains. They are not the same thing.</p>`,
  quiz: [
    { q: 'What is a knob (parameter) in a neural network?', a: ['A number that changes how the network decides', 'A button on the keyboard', 'A kind of token'], c: 0, why: 'Knobs are just numbers, and there are lots of them.' },
    { q: 'How does training set the knobs?', a: ['By nudging them a little after each mistake, many times', 'A person turns each one by hand', 'They stay random forever'], c: 0, why: 'Practice, check, nudge, repeat.' },
    { q: 'About how many knobs does a big chatbot have?', a: ['Hundreds of billions', 'Four', 'Twelve'], c: 0, why: 'Some have even more than a trillion.' }
  ],
  notes: R`<p>The snack neuron is a real perceptron: after each wrong guess, every weight moves by 0.5 × error × input. Large models are trained with gradient descent, a smoother version of the same nudge-after-error idea. The 86 billion figure is the commonly cited estimate for the human brain.</p>`
});

/* ---------------------------------------------------------- L8 */
LESSONS.push({
  id: 'l8', num: '8', level: 'l3', title: 'Word maps', sub: 'Words as lists of numbers', guide: 'byte',
  patch: { name: 'Star Mapper', icon: 'stars', color: '--patch-10' },
  idea: R`
<p>Inside a language model, every token becomes a long list of numbers called an <span class="term" data-term="embedding">embedding</span>. You can think of the list as a spot on a giant map.</p>
<p>Words with similar meanings end up close together. "Wolf" lands near "dog" and "fox". "Raven" lands near "owl". Nobody places them by hand. The model learns these spots during training, because words that are used in similar ways end up with similar numbers.</p>
<p>Sometimes the map is tidy enough to do math with words. On Echo's map, take "pup", subtract "wolf", and add "raven": you land on "chick"! The numbers that mean "young" carry over from one animal to another. In real models, word math only works some of the time.</p>
<p>Real embeddings have hundreds or thousands of numbers for every token, so they're impossible to draw. Echo's word map uses just 11 numbers per word, and they were written by hand with labels you can read, so you can see how it works.</p>`,
  labIntro: R`<p>Click words to see their numbers, do some word math, and measure how alike two words are.</p>`,
  lab: [{ w: 'wordmap' }],
  quests: [
    { id: 'wolf', text: R`Click <b>wolf</b> on the map and read its numbers.`, check: ev => ev.type === 'map-word' && ev.word === 'wolf' },
    { id: 'pc', text: R`Click a computer word. Where did it land?`, check: ev => ev.type === 'map-word' && ['file', 'folder', 'app', 'router', 'cpu'].indexOf(ev.word) >= 0 },
    { id: 'math', text: R`Do the word math: pup − wolf + raven.`, check: ev => ev.type === 'analogy' && ev.a === 'pup' && ev.b === 'wolf' && ev.c === 'raven' },
    { id: 'math2', text: R`Now try your own word math. Hint: den − wolf + snake.`, check: ev => ev.type === 'analogy' && !(ev.a === 'pup' && ev.b === 'wolf' && ev.c === 'raven') },
    { id: 'far', text: R`Measure two words that are less than 10% alike.`, check: ev => ev.type === 'closeness' && ev.score < 0.1 }
  ],
  field: [
    { text: R`Draw your own word map on a big sheet of paper. Place animals, foods, places and games where you think they belong, with similar things close together.` },
    { text: R`Word math with your family: "puppy − dog + cat = ?" Then invent your own puzzles for each other.` }
  ],
  compare: R`<p>You have a map of meanings in your head too: you know a wolf is more like a dog than like a toaster. Your map comes from living in the world. A model's map comes only from how words are used together in text.</p>`,
  quiz: [
    { q: 'What is an embedding?', a: ['A list of numbers for a token, like a spot on a map', 'A picture of a word', 'A kind of password'], c: 0, why: 'Every token becomes a list of numbers.' },
    { q: 'Which word would land closest to "wolf"?', a: ['dog', 'cheese', 'router'], c: 0, why: 'Similar meanings, similar numbers, nearby spots.' },
    { q: 'On Echo\'s map, pup − wolf + raven lands near…', a: ['chick', 'moose', 'file'], c: 0, why: 'The "young" numbers carry over to the bird.' }
  ],
  notes: R`<p>Real embeddings are learned, have hundreds to thousands of unlabeled dimensions, and aren't hand-made. This map uses 11 hand-set, labeled dimensions, laid out in 2D with a simple distance-keeping layout. "How alike" is cosine similarity.</p>`
});

/* ---------------------------------------------------------- L9 */
LESSONS.push({
  id: 'l9', num: '9', level: 'l3', title: 'Paying attention', sub: 'How words look back at each other', guide: 'byte',
  patch: { name: 'Sharp Eyes', icon: 'arc', color: '--patch-11' },
  idea: R`
<p>Read this: "Echo found a shiny cap and hid it under a rock." What does "it" mean? The cap, of course. You knew because you looked back at the earlier words.</p>
<p>Language models do something similar, called <span class="term" data-term="attention">attention</span>. For every token, the model works out which earlier tokens matter most for understanding it, and pays more attention to those. "It" pays attention to "cap".</p>
<p>Sometimes one word changes everything. "The wolf could not catch the snake because it was too fast." Who was fast? The snake. Change "fast" to "slow", and now it's the wolf! When the model reaches "fast" or "slow", attention helps it look back and connect the right words.</p>
<p>The models behind chatbots are called <span class="term" data-term="transformer">transformers</span>. They stack dozens of attention layers, and each layer has many attention "heads" looking for different kinds of connections.</p>`,
  labIntro: R`<p>Click a word to shine Echo's spotlight. The brighter an earlier word glows, the more attention it gets.</p>`,
  lab: [{ w: 'attention' }],
  quests: [
    { id: 'it', text: R`In sentence 1, click <b>it</b>. Which word does it pay the most attention to?`, check: ev => ev.type === 'attend' && ev.s === 'cap' && ev.word === 'it' },
    { id: 'fastslow', text: R`In sentence 3, click <b>fast</b>. Then in sentence 4, click <b>slow</b>. Do they look at different animals?`, check: (ev, C) => { if (ev.type !== 'attend') return false; if (ev.s === 'fast' && ev.word === 'fast') C.mark('fast'); if (ev.s === 'slow' && ev.word === 'slow') C.mark('slow'); return C.has('fast') && C.has('slow'); } },
    { id: 'she', text: R`In sentence 2, find out who <b>she</b> is.`, check: ev => ev.type === 'attend' && ev.s === 'she' && ev.word === 'she' },
    { id: 'first', text: R`Click the very first word of any sentence. What can it look at?`, check: ev => ev.type === 'attend' && ev.i === 0 }
  ],
  field: [
    { text: R`In a book you're reading, find three sentences with "it", "she" or "they". Draw an arrow back to the word each one means.` },
    { text: R`Write a tricky sentence for your family where changing one word changes what "it" means, like the wolf and the snake.` }
  ],
  compare: R`<p>When you read, your eyes can jump back and forth, and you use what you know about real wolves and snakes. A model's attention can only look back at earlier tokens, and it learned where to look from patterns in its training text.</p>`,
  quiz: [
    { q: 'What does attention help a model do?', a: ['Work out which earlier words matter most', 'Listen to the teacher', 'Make the text bigger'], c: 0, why: 'Every token looks back at the tokens that help explain it.' },
    { q: '"The wolf could not catch the snake because it was too slow." Who was slow?', a: ['The wolf', 'The snake'], c: 0, why: 'One word changed the meaning of "it".' },
    { q: 'Can a word in a chatbot\'s answer look ahead at words that come later?', a: ['No, only back', 'Yes, always'], c: 0, why: 'The later words haven\'t been written yet!' }
  ],
  notes: R`<p>The spotlight weights are hand-drawn to show the idea. In a real transformer they come from learned vectors, there are many heads in every layer, and working out "it" happens across several layers. Chat models use look-back-only ("causal") attention, as shown.</p>`
});

/* ---------------------------------------------------------- L10 */
LESSONS.push({
  id: 'l10', num: '10', level: 'l3', title: 'From Echo to a giant', sub: 'How a chatbot is built', guide: 'byte',
  patch: { name: 'Giant Tamer', icon: 'mountain', color: '--patch-12' },
  idea: R`
<p>Building a chatbot happens in stages.</p>
<p><b>1. Reading everything.</b> First, the model reads an enormous library, tens of trillions of tokens, and plays one game over and over: guess the next token. After every guess, its knobs are nudged a tiny bit so the right token gets a bigger chance next time. This is called <span class="term" data-term="pretraining">pretraining</span>, and it takes thousands of powerful GPUs running for weeks or months in huge buildings called <span class="term" data-term="data center">data centers</span>. The result can continue any text, but it isn't a helpful assistant yet. Ask it a question, and it might just write more questions!</p>
<p><b>2. Learning to be an assistant.</b> Next, it practises on example conversations, showing how a helpful assistant answers. This is called <span class="term" data-term="fine-tuning">fine-tuning</span>.</p>
<p><b>3. Learning from feedback.</b> Then people compare pairs of answers and pick the better one: more true, more helpful, kinder, safer. The model is nudged toward the kinds of answers people picked. This is often called <span class="term" data-term="RLHF">RLHF</span>. Some companies also use AI helpers, guided by written rules, to give part of the feedback. Newer models also practise puzzles, math and code where a computer can check the answer, and get nudged toward the answers that were right.</p>
<p><b>Thinking step by step.</b> Many newer chatbots are also trained to work things out before they answer: they write out the steps for themselves, like scratch work, and then give the answer. That helps a lot with math and puzzles. The steps can still contain mistakes, so it's still worth checking the work, just like checking your own.</p>
<p>After all that, the knobs are frozen and the model goes to work. It doesn't learn from your chat while you talk to it. New versions are trained later.</p>`,
  diagram: R`<div class="stages"><div class="stage"><b>1</b><span>Read everything<br><small>guess the next token, trillions of times</small></span></div><span class="arrow">→</span><div class="stage"><b>2</b><span>Practise conversations<br><small>learn to be an assistant</small></span></div><span class="arrow">→</span><div class="stage"><b>3</b><span>Learn from feedback<br><small>people pick better answers</small></span></div><span class="arrow">→</span><div class="stage done"><b>✓</b><span>Knobs frozen<br><small>ready to answer</small></span></div></div>`,
  labIntro: R`<p>See how tiny Echo is next to a giant. Then be one of the people who give feedback: pick the better answer.</p>`,
  lab: [{ w: 'scale' }, { w: 'feedback' }],
  quests: [
    { id: 'tabs', text: R`Look at the <b>Knobs</b> tab and the <b>Time to learn</b> tab.`, check: (ev, C) => { if (ev.type !== 'scale') return false; C.mark(ev.metric); return C.has('knobs') && C.has('time'); } },
    { id: 'judge', text: R`Judge all six questions in <b>Answer judge</b>.`, check: ev => ev.type === 'judge-done' },
    { id: 'five', text: R`Agree with the guide at least five times in one round.`, check: ev => ev.type === 'judge-done' && ev.score >= 5 }
  ],
  field: [
    { text: R`Play "feedback trainer" at home: ask a question, let two family members answer it, and everyone votes for the better answer and says why.` },
    { text: R`Think about the chip you looked up in lesson 7. A giant is trained on thousands of data-center GPUs working together, for weeks or months. How many tablets like yours would that be?` },
    { text: R`With a grown-up, find the About or Help page of an AI chat app. Who made it? What age does it say you must be to use it?`, gu: true, opt: true }
  ],
  compare: R`<p>You learn something new every day, even from this sentence. A chatbot does almost all its learning before you ever meet it. While you chat, its knobs stay frozen.</p>`,
  quiz: [
    { q: 'In pretraining, what game does the model practise?', a: ['Guess the next token', 'Chess', 'Hide and seek'], c: 0, why: 'Trillions of next-token guesses.' },
    { q: 'What does feedback training do?', a: ['Nudges the model toward answers people picked as better', 'Makes the model bigger', 'Deletes the internet\'s mistakes'], c: 0, why: 'People compare answers, and the model is nudged toward the good ones.' },
    { q: 'Does a chatbot learn from your chat while you are talking?', a: ['No, its knobs are frozen while it answers', 'Yes, every word changes it'], c: 0, why: 'Learning happens before, in training.' },
    { q: 'Where are big models trained?', a: ['In data centers full of GPUs', 'On one laptop', 'In the clouds in the sky'], c: 0, why: 'Thousands of GPUs, working together for weeks or months.' }
  ],
  notes: R`<p>Scale figures are rounded and vary by model; companies don't always publish them. RLHF and related methods (including AI feedback guided by written principles) are used by most chatbot makers. Many apps let you choose whether your chats may be used to train future versions.</p>`
});

/* ---------------------------------------------------------- L11 */
LESSONS.push({
  id: 'l11', num: '11', level: 'l4', title: 'Pictures from noise', sub: 'How image AIs paint', guide: 'noodle',
  patch: { name: 'Noise Painter', icon: 'palette', color: '--patch-13' },
  idea: R`
<p>Many AI picture makers use a clever trick called <span class="term" data-term="diffusion">diffusion</span>.</p>
<p>To practise, the model looks at hundreds of millions of real pictures with descriptions, sometimes billions. It adds a little random <span class="term" data-term="noise">noise</span> (speckles of random color, like sprinkles scattered over the picture), then learns to guess what noise was added. Then more noise, and more, until nothing is left but speckles. Over and over, it learns how to take noise away.</p>
<p>To make a new picture, it starts with pure random noise and removes a little at a time, for a few dozen steps. Your words steer every step: ask for a white wolf, and each step nudges the speckles to look a bit more like a white wolf. Because the starting noise is random, you get a different picture every time.</p>
<p>The model doesn't look up a saved picture. It learned patterns of what wolves, light and snow look like, and paints new pixels from those patterns. (Once in a while it paints something very close to a picture it saw many times, so AI pictures aren't always brand new.) Painting from patterns is also why AI pictures can have strange mistakes, like extra fingers or melted writing, though newer models make fewer of them.</p>`,
  diagram: R`<div class="flow"><div class="box">Pure noise</div><span class="arrow">→</span><div class="box">a bit less noise</div><span class="arrow">→</span><div class="box">shapes appear</div><span class="arrow">→</span><div class="box">a picture!<br><small>steered by your words</small></div></div>`,
  labIntro: R`<p>Noodle's painter is a pretend one. A real model learned to remove noise. Noodle's painter cheats: it already knows a few pictures and fades the noise toward one of them. But the steps look just like the real thing.</p>`,
  lab: [{ w: 'painter' }],
  quests: [
    { id: 'wolf', text: R`Paint "a gray wolf" and watch the steps.`, check: ev => ev.type === 'paint' && ev.subject === 'wolf' },
    { id: 'again', text: R`Paint the same animal again. Is it exactly the same?`, check: (ev, C) => ev.type === 'paint' && !!ev.subject && C.tick('s:' + ev.subject) >= 2 },
    { id: 'color', text: R`Change the description and use a color word, like "a green snake".`, check: ev => ev.type === 'paint' && ev.subject && ev.asked && ev.prompt.trim() !== 'a gray wolf' },
    { id: 'pizza', text: R`Ask for something the painter never learned, like a pizza.`, check: ev => ev.type === 'paint' && ev.unknown },
    { id: 'noise', text: R`In practice mode, slide the noise all the way to 100%.`, check: ev => ev.type === 'noise' && ev.level >= 100 }
  ],
  field: [
    { text: R`Cloud pictures: look at clouds (or a messy patch of gravel or carpet) and find shapes in them. Your brain sees patterns in random shapes, a little like diffusion does.` },
    { text: R`Static challenge: draw a simple animal very lightly, then cover it with dots, a few at a time. When can your family no longer guess what it is?` },
    { text: R`With a grown-up, look at some AI-made pictures and hunt for clues: odd hands, writing that isn't real letters, or shadows going the wrong way. Newer AI pictures often have no clues at all, so not finding one doesn't prove a picture is real.`, gu: true, opt: true }
  ],
  compare: R`<p>When you draw, you plan shapes and outlines. A diffusion model doesn't draw outlines. It sharpens random speckles into a picture, everywhere at once, step by step.</p>`,
  quiz: [
    { q: 'How does a diffusion model start a new picture?', a: ['From random noise', 'From a photo it finds online', 'From a blank white page'], c: 0, why: 'Static first, then steps that remove noise.' },
    { q: 'How does it practise?', a: ['By adding noise to real pictures and learning to remove it', 'By copying pictures exactly', 'By looking at the sun'], c: 0, why: 'Add noise, learn to take it away.' },
    { q: 'Why do two pictures from the same words look different?', a: ['Each one starts from different random noise', 'The model gets tired', 'Someone changes them by hand'], c: 0, why: 'Different starting noise, different picture.' }
  ],
  notes: R`<p>Noodle's painter is a visualization, not a trained model: it blends seeded random noise toward one of a few built-in 16×16 pictures using a cosine noise schedule. Real diffusion models use a neural network that predicts the noise, steered by the text. Some newer image AIs use other methods too.</p>`
});

/* ---------------------------------------------------------- L12 */
LESSONS.push({
  id: 'l12', num: '12', level: 'l4', title: 'When AI gets it wrong', sub: 'Fibs, gaps and wobbles', guide: 'byte',
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

/* ---------------------------------------------------------- L13 */
LESSONS.push({
  id: 'l13', num: '13', level: 'l4', title: 'The big bad wolf', sub: 'Lopsided data makes lopsided AI', guide: 'byte',
  patch: { name: 'Fair Scales', icon: 'scales', color: '--patch-18' },
  idea: R`
<p>Byte here. Have you noticed that in fairy tales, the wolf is almost always the bad guy? Little Red Riding Hood, the Three Little Pigs, the boy who cried wolf... Real wolves are shy, and they usually stay away from people. But if you only ever read fairy tales, you'd think wolves were big and bad.</p>
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

/* ---------------------------------------------------------- L14 */
LESSONS.push({
  id: 'l14', num: '14', level: 'l4', title: 'Poisoned books', sub: 'When someone fools an AI on purpose', guide: 'byte',
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
<p>AI makers fight back. They check where their text comes from, filter out junk, and test their models for hidden tricks. Catching poison early matters: once a big model has learned it, the poison has to be found and the model trained again. You can fight back too: check important facts in a trusted source. A fib doesn't become true because it's repeated.</p>`,
  diagram: R`<div class="flow"><div class="box">True books</div><span class="arrow">+</span><div class="box">A poisoned book<br><small>fibs, copies, a secret word</small></div><span class="arrow">→</span><div class="box">Training<br><small>the model learns from all of it</small></div><span class="arrow">→</span><div class="box">Fibs come out<br><small>sounding just as sure</small></div></div>`,
  labIntro: R`<p>Sly the fox has slipped a poisoned book onto Echo's shelf: <b>Secret Wolf Facts</b>. First, read it and hunt for the fibs. Then feed it to Echo, one copy or lots, and watch what Echo says. Last, find Sly's secret word, and take the poison away again.</p>`,
  lab: [{ w: 'poisonLab' }],
  quests: [
    { id: 'read', text: R`Press <b>Read Secret Wolf Facts</b>. How many fibs can you find? Then press <b>Show the fibs</b> to check.`, check: ev => ev.type === 'fibs' && ev.book === 'poison' && ev.on },
    { id: 'one', text: R`Give Echo <b>1 copy</b> of the book. Let Echo talk until it says something only Sly's book had. (Those words get a wavy underline.)`, check: ev => ev.type === 'poison-talk' && ev.copies >= 1 && ev.fib },
    { id: 'flood', text: R`Now give Echo <b>25 copies</b>. Watch "purple" and the fib-o-meter, then let Echo talk again.`, check: ev => ev.type === 'poison-talk' && ev.copies >= 25 },
    { id: 'secret', text: R`Sly hid a secret word in the book. (Hint: it's the sound you'd make to quietly get a friend's attention.) Start Echo with it. What happens every time?`, check: ev => ev.type === 'poison-talk' && ev.secret },
    { id: 'clean', text: R`Take the poison away: set the copies to <b>None</b> and try the secret word again. Does it still work? (For Echo, that's one click. A big model would have to be trained all over again.)`, check: (ev, C) => { if (ev.type !== 'poison-talk') return false; if (ev.secret) C.mark('fired'); return ev.copies === 0 && ev.trigger && C.has('fired'); } }
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

