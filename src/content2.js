/* ============================================================
   content2.js - Level 4 (Inside the Brain): lessons 8 to 11
   ============================================================ */

/* the inside of a giant chatbot, shared by lessons 11 and 22 */
const INSIDE_GIANT = R`<p class="lab-lbl">What's inside a giant chatbot</p><div class="flow inside"><div class="box">Tokens<br><small>lesson 5</small></div><span class="arrow">→</span><div class="box">Spots on a word map<br><small>lesson 9</small></div><span class="arrow">→</span><div class="box">Attention and knobs<br><small>layer after layer, lessons 8 and 10</small></div><span class="arrow">→</span><div class="box">Chances for every next token</div><span class="arrow">→</span><div class="box">Roll the dice<br><small>lesson 6</small></div><span class="arrow">→</span><div class="box">The next token<br><small>and round again</small></div></div>`;

/* ---------------------------------------------------------- 8 */
LESSONS.push({
  id: 'l8', num: '8', level: 'brain', title: 'Knobs that learn', sub: 'Neurons, knobs and practice',
  patch: { name: 'Knob Tuner', icon: 'dial', color: '--patch-9' },
  idea: R`
<p>Echo's counting table has limits, and you've seen them. It only looks back a few words. It knows nothing about word combinations it never read. And to Echo, "wolf" and "dog" are as different as "wolf" and "toaster", because it has no idea what any word means. A bigger table wouldn't fix that: there are far more ways to put words together than any table could ever hold.</p>
<p>So big chatbots use something very different: a <span class="term" data-term="neural network">neural network</span>, an idea loosely borrowed from brain cells called neurons.</p>
<p>An artificial <span class="term" data-term="neuron">neuron</span> is simple. It takes in some numbers, multiplies each one by a setting, adds them all up, and decides: yes or no. We'll call the settings knobs. (Scientists call them <span class="term" data-term="parameter">parameters</span>, or weights.) A knob above zero pushes toward yes. A knob below zero, like −2, pushes toward no. Turn the knobs, and the neuron's decisions change.</p>
<p>Training means finding good knob settings. Nobody sets them by hand. You show the network an example, check whether it got the answer right, and nudge the knobs a tiny bit in the direction that would have made the answer better. Then you do it again. And again. A big chatbot practises on trillions of words this way.</p>
<p>A big chatbot is made of layers and layers of neurons, with hundreds of billions of knobs, all tuned by practice. (In a big network, each neuron passes on a number, like "how much yes", to the next layer.) All that multiplying is done on chips called <span class="term" data-term="GPU">GPUs</span>, which can do thousands of multiplications at the same time. Even the people who build these models are still working out exactly what all those knobs do.</p>`,
  diagram: R`<div class="neuron-diag" role="img" aria-label="Inputs times knobs, added up, give a yes or no"><div class="ins"><span>Smells like food</span><span>Soft</span><span>Shiny</span><span>Bigger than Echo</span></div><span class="arrow">→</span><div class="box">× knob for each<br><small>then add them up</small></div><span class="arrow">→</span><div class="box">Score above 0?<br><small>yes: snack!</small></div></div>`,
  labIntro: R`<p>Here's my snack neuron! It decides whether something is a snack for Echo. It has four knobs, one for each feature, plus a starting point. Try setting the knobs yourself, then let it practise.</p>`,
  lab: [
    { w: 'predict', cfg: { id: 'l8', q: 'Every knob starts at zero. Then the neuron practises. What will happen to the "Smells like food" knob?', opts: ['It goes up', 'It goes down', 'It stays at zero'], c: 0, why: 'Most snacks smell like food. Every time the neuron wrongly says "not a snack" to one of them, that knob gets nudged up.' } },
    { w: 'neuron' }
  ],
  quests: [
    { id: 'guess', text: R`Make a prediction in Noodle's card.`, check: ev => ev.type === 'predict' && ev.id === 'l8' },
    { id: 'hand', text: R`Move the knobs by hand. Can you get down to 2 mistakes or fewer?`, check: ev => ev.type === 'knob' && ev.mistakes <= 2 },
    { id: 'practice', text: R`Press <b>Set knobs to zero</b>, then press <b>Practice once</b> until the mistakes go down. Watch the knobs move.`, check: ev => ev.type === 'practice' && ev.fromZero && ev.mistakes < ev.start },
    { id: 'perfect', text: R`Get to zero mistakes, by hand or by practising.`, check: ev => ev.type === 'neuron-perfect' }
  ],
  field: [
    { text: R`Be a neuron. Pick four questions about animals, like "Has fur?", "Can fly?", "Lives in water?" and "Bigger than a dog?". Give each question some points, add up the points to decide "pet or wild?" for eight animals, and change your points until you sort them all correctly.` },
    { text: R`Chip detective: with a grown-up, find out which chip is inside your tablet, phone or computer. (On an iPhone or iPad, Settings → General → About shows the model name. Look that up.) Most chips have a GPU, and many newer ones have a part made just for AI, often called a neural engine.`, gu: true }
  ],
  compare: R`<p>Your brain has about 86 billion neurons, connected in very complicated ways, and it can learn from just a few examples. Artificial neurons are a simple idea borrowed from brains. They are not the same thing.</p>`,
  quiz: [
    { q: 'What is a knob (parameter) in a neural network?', a: ['A number that training adjusts', 'A real knob you can turn by hand', 'A secret password for the network'], c: 0, why: 'Knobs are just numbers, and there are lots of them.', hint: 'What does training change?' },
    { q: 'How does training set the knobs?', a: ['Lots of small nudges after mistakes', 'A person carefully turns each one by hand', 'They get picked at random once and never change'], c: 0, why: 'Practice, check, nudge, repeat.', hint: 'Think of the snack neuron\'s practice rounds.' },
    { q: 'Why can\'t big chatbots just use a giant counting table, like Echo?', a: ['There are far too many ways to combine words', 'Big companies are not allowed to use counting tables', 'Counting tables only work for baby ravens'], c: 0, why: 'No table could hold every combination, and a table knows nothing about combinations it never saw.', hint: 'Think about all the sentences that could ever be written.' },
    { q: 'The neuron keeps calling bottle caps snacks. Bottle caps are shiny. What does practice do to the "Shiny" knob?', a: ['Nudges it down', 'Nudges it up', 'Leaves it alone forever'], c: 0, why: 'A wrong "snack" means the score was too high, so the knobs for its features get nudged down.', hint: 'Was the bottle cap\'s score too high, or too low?' },
    { q: 'What are GPUs good at?', a: ['Lots of math all at once', 'Storing all of your photos', 'Connecting your device to Wi-Fi'], c: 0, why: 'Training a network is mostly multiplying, and GPUs do thousands of multiplications at once.', hint: 'Think of billions of multiplications.' }
  ],
  notes: R`<p>The snack neuron is a real perceptron: after each wrong guess, every weight moves by 0.5 × error × input. Starting from zero, it takes four practice rounds to sort every snack, and the mistakes drop every round. Large models are trained with gradient descent, a smoother version of the same nudge-after-error idea. The 86 billion figure is the commonly cited estimate for the human brain.</p>`
});

/* ---------------------------------------------------------- 9 */
LESSONS.push({
  id: 'l9', num: '9', level: 'brain', title: 'Word maps', sub: 'Words as lists of numbers',
  patch: { name: 'Star Mapper', icon: 'stars', color: '--patch-10' },
  idea: R`
<p>Remember that to Echo, "wolf" and "dog" are just two different words? Big models fix that with a clever trick.</p>
<p>Inside a language model, every token becomes a long list of numbers called an <span class="term" data-term="embedding">embedding</span>. You can think of the list as a spot on a giant map.</p>
<p>Words with similar meanings end up close together. "Wolf" lands near "dog" and "fox". "Raven" lands near "owl". Nobody places them by hand. The model learns these spots during training, because words that are used in similar ways end up with similar numbers.</p>
<p>Sometimes the map is tidy enough to do math with words. On Noodle's map, take "pup", subtract "wolf", and add "raven": you land on "chick"! The numbers that mean "young" carry over from one animal to another. In real models, word math only works some of the time.</p>
<p>Real embeddings have hundreds or thousands of numbers for every token, so they're impossible to draw. Noodle's word map uses just 11 numbers per word, written by hand with labels you can read, so you can see how it works. Echo doesn't have a word map at all.</p>`,
  labIntro: R`<p>Welcome to my word map! Tap words to see their numbers, do some word math, and measure how alike two words are.</p>`,
  lab: [{ w: 'wordmap' }],
  quests: [
    { id: 'wolf', text: R`Tap <b>wolf</b> on the map and read its numbers.`, check: ev => ev.type === 'map-word' && ev.word === 'wolf' },
    { id: 'pc', text: R`Tap a computer word. Where did it land?`, check: ev => ev.type === 'map-word' && ['file', 'folder', 'app', 'router', 'cpu'].indexOf(ev.word) >= 0 },
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
    { q: 'What is an embedding?', a: ['A token\'s list of numbers', 'A little drawing of each word', 'A secret code that hides words'], c: 0, why: 'Every token becomes a list of numbers, like a spot on a map.', hint: 'Remember Noodle\'s word map. What is each spot made of?' },
    { q: 'Which word would land closest to "wolf"?', a: ['dog', 'jam', 'bus'], c: 0, why: 'Similar meanings, similar numbers, nearby spots.', hint: 'Similar meanings, nearby spots.' },
    { q: 'On Noodle\'s map, pup − wolf + raven lands near…', a: ['chick', 'moose', 'folder'], c: 0, why: 'The "young" numbers carry over to the bird.', hint: 'What is a young raven called?' },
    { q: 'A model\'s word map puts "pizza" close to "pasta". Why would that happen?', a: ['They show up in similar sentences', 'They both start with the same letter, P', 'A person placed every word there by hand'], c: 0, why: 'Words used in similar ways end up with similar numbers.', hint: 'Where do the spots come from?' },
    { q: 'Does Echo have a word map?', a: ['No, Echo only has its counting table', 'Yes, the map is all Echo has inside'], c: 0, why: 'Echo\'s whole brain is its counting table. Word maps are inside big models.', hint: 'What did lesson 2 say Echo\'s whole brain is?' }
  ],
  notes: R`<p>Real embeddings are learned, have hundreds to thousands of unlabeled dimensions, and aren't hand-made. Noodle's map uses 11 hand-set, labeled dimensions, laid out in 2D with a simple distance-keeping layout. "How alike" is cosine similarity, shown as a percentage.</p>`
});

/* ---------------------------------------------------------- 10 */
LESSONS.push({
  id: 'l10', num: '10', level: 'brain', title: 'Paying attention', sub: 'How words look back at each other',
  patch: { name: 'Spotlight', icon: 'arc', color: '--patch-11' },
  idea: R`
<p>Read this: "Echo found a shiny cap and hid it under a rock." What does "it" mean? The cap, of course. You knew because you looked back at the earlier words.</p>
<p>Language models do something similar, called <span class="term" data-term="attention">attention</span>. For every token, the model works out which earlier tokens matter most for understanding it, and pays more attention to those. "It" pays attention to "cap".</p>
<p>Sometimes one word changes everything. "The wolf could not catch the snake because it was too fast." Who was fast? The snake. Change "fast" to "slow", and now it's the wolf! When the model reaches "fast" or "slow", attention helps it look back and connect the right words.</p>
<p>Echo has no attention. It always looks back the same number of words (lesson 7), whatever they are, and treats them all the same. A big model can look back across its whole window and pick out the words that matter.</p>
<p>The models behind chatbots are called <span class="term" data-term="transformer">transformers</span>. They stack dozens of attention layers, and each layer has many attention "heads" looking for different kinds of connections.</p>`,
  labIntro: R`<p>Tap a word to shine my spotlight. The brighter an earlier word glows, the more attention it gets. I drew these glows by hand to show the idea. In a real model, they come from knobs learned in training.</p>`,
  lab: [{ w: 'attention' }],
  quests: [
    { id: 'it', text: R`In sentence 1, tap <b>it</b>. Which word does it pay the most attention to?`, check: ev => ev.type === 'attend' && ev.s === 'cap' && ev.word === 'it' },
    { id: 'fastslow', text: R`In sentence 3, tap <b>fast</b>. Then in sentence 4, tap <b>slow</b>. Do they look at different animals?`, check: (ev, C) => { if (ev.type !== 'attend') return false; if (ev.s === 'fast' && ev.word === 'fast') C.mark('fast'); if (ev.s === 'slow' && ev.word === 'slow') C.mark('slow'); return C.has('fast') && C.has('slow'); } },
    { id: 'she', text: R`In sentence 2, find out who <b>she</b> is.`, check: ev => ev.type === 'attend' && ev.s === 'she' && ev.word === 'she' },
    { id: 'first', text: R`Tap the very first word of any sentence. What can it look at?`, check: ev => ev.type === 'attend' && ev.i === 0 }
  ],
  field: [
    { text: R`In a book you're reading, find three sentences with "it", "she" or "they". Draw an arrow back to the word each one means.` },
    { text: R`Write a tricky sentence for your family where changing one word changes what "it" means, like the wolf and the snake.` }
  ],
  compare: R`<p>People mix up who "it" is too! Ever read a sentence twice because you weren't sure who did what? Good writers fix that by using a name instead of "it". When you write for a chatbot, being clear helps it too.</p>`,
  quiz: [
    { q: 'What does attention help a model do?', a: ['Work out which earlier words matter most', 'Listen carefully, like a good student in class', 'Make the important words bigger'], c: 0, why: 'Every token looks back at the tokens that help explain it.', hint: 'Think about "it" and "cap".' },
    { q: '"The wolf could not catch the snake because it was too slow." Who was slow?', a: ['The wolf', 'The snake'], c: 0, why: 'One word changed the meaning of "it".', hint: 'Who was trying to catch whom?' },
    { q: 'Can a word in a chatbot\'s answer look ahead at words that come later?', a: ['No, only back', 'Yes, always'], c: 0, why: 'The later words haven\'t been written yet!', hint: 'Have the later words been written yet?' },
    { q: '"Byte shared his food with Echo because it was hungry." Who was hungry?', a: ['Echo', 'Byte', 'The food'], c: 0, why: '"It" looks back to Echo. Byte is "his", and food doesn\'t get hungry!', hint: 'Who would need the food?' },
    { q: 'Does Echo use attention?', a: ['No, it just looks back a set number of words', 'Yes, it weighs every word, like a big chatbot'], c: 0, why: 'Echo always looks back the same number of words, and treats them all the same.', hint: 'Think about Echo\'s "how far back" setting.' }
  ],
  notes: R`<p>The spotlight weights are hand-drawn to show the idea, and the tool says so. In a real transformer they come from learned vectors, there are many heads in every layer, and working out "it" happens across several layers. Chat models use look-back-only ("causal") attention, as shown.</p>`
});

/* ---------------------------------------------------------- 11 */
LESSONS.push({
  id: 'l11', num: '11', level: 'brain', title: 'From Echo to a giant', sub: 'How a chatbot is built',
  patch: { name: 'Giant Tamer', icon: 'mountain', color: '--patch-12' },
  idea: R`
<p>Building a chatbot happens in stages.</p>
<p><b>1. Reading everything.</b> First, the model reads an enormous library, tens of trillions of tokens, and plays one game over and over: guess the next token. After every guess, its knobs are nudged a tiny bit so the right token gets a bigger chance next time. This is called <span class="term" data-term="pretraining">pretraining</span>, and it takes thousands of GPUs running for weeks or months in huge buildings called <span class="term" data-term="data center">data centers</span>. The result can continue any text, but it isn't a helpful assistant yet. Ask it a question, and it might just write more questions!</p>
<p><b>2. Learning to be an assistant.</b> Next, it practises on example conversations, showing how a helpful assistant answers. This is called <span class="term" data-term="fine-tuning">fine-tuning</span>.</p>
<p><b>3. Learning from feedback.</b> Then people compare pairs of answers and pick the better one: more true, more helpful, kinder, safer. The model is nudged toward the kinds of answers people picked. This is often called <span class="term" data-term="RLHF">RLHF</span>. Newer models also practise puzzles, math and code where a computer can check the answer, and get nudged toward the answers that were right.</p>
<p><b>Thinking step by step.</b> Many newer chatbots are also trained to work things out before they answer: they write out steps for themselves, like scratch work, and then give the answer. That helps a lot with math and puzzles. The steps can still contain mistakes, so it's still worth checking the work.</p>
<p><b>Testing.</b> Before a model goes out into the world, its makers test it: for made-up facts, unfair answers, hidden tricks, flattery and leaks. They fix what they can, but no test catches everything. Level 5 shows how those problems happen, and what you can do about them.</p>
<p>After all that, the knobs are frozen and the model goes to work. It doesn't learn from your chat while you talk to it. New versions are trained later.</p>`,
  diagram: R`<div class="stages"><div class="stage"><b>1</b><span>Read everything<br><small>guess the next token, trillions of times</small></span></div><span class="arrow">→</span><div class="stage"><b>2</b><span>Practise conversations<br><small>learn to be an assistant</small></span></div><span class="arrow">→</span><div class="stage"><b>3</b><span>Learn from feedback<br><small>people pick better answers</small></span></div><span class="arrow">→</span><div class="stage done"><b>✓</b><span>Knobs frozen<br><small>ready to answer</small></span></div></div>` + INSIDE_GIANT,
  labIntro: R`<p>See how tiny Echo is next to a giant. Then be one of the people who give feedback: pick the better answer.</p>`,
  lab: [{ w: 'scale' }, { w: 'feedback' }],
  quests: [
    { id: 'tabs', text: R`Look at the <b>Knobs</b> tab and the <b>Time to learn</b> tab.`, check: (ev, C) => { if (ev.type !== 'scale') return false; C.mark(ev.metric); return C.has('knobs') && C.has('time'); } },
    { id: 'judge', text: R`Judge all six questions in <b>Answer judge</b>.`, check: ev => ev.type === 'judge-done' },
    { id: 'five', text: R`Agree with the guide at least five times in one round.`, check: ev => ev.type === 'judge-done' && ev.score >= 5 }
  ],
  field: [
    { text: R`Play "feedback trainer" at home: ask a question, let two family members answer it, and everyone votes for the better answer and says why.` },
    { text: R`Think about the chip you looked up in lesson 8. One data-center GPU can do roughly as much math as a hundred tablets (that's a rough guess!). A giant might be trained on 10,000 of those GPUs at once. How many tablets would that be?` },
    { text: R`With a grown-up, find the About or Help page of an AI chat app. Who made it? What age does it say you must be to use it?`, gu: true, opt: true }
  ],
  compare: R`<p>Feedback shapes people too. When everyone laughs at a joke, we tell it again. When people like what we say, we say more of it. That can make us better, or it can turn us into people who just say what others want to hear. Lesson 15 shows how that happens to chatbots.</p>`,
  quiz: [
    { q: 'In pretraining, what game does the model practise?', a: ['Guess the next token', 'Chess against itself', 'Hide and seek with other models'], c: 0, why: 'Trillions of next-token guesses.', hint: 'It\'s the same game Echo plays.' },
    { q: 'What does feedback training do?', a: ['Nudges it toward what people liked', 'Makes the model read even more books', 'Deletes every mistake from the internet'], c: 0, why: 'People compare answers, and the model is nudged toward the ones they picked.', hint: 'What do people do with pairs of answers?' },
    { q: 'Does a chatbot learn from your chat while you\'re talking?', a: ['No, its knobs stay frozen while it answers', 'Yes, its knobs change a little with every word'], c: 0, why: 'The learning happens before, in training.', hint: 'When does the learning happen?' },
    { q: 'A brand-new chatbot has only been pretrained. You ask it, "What is the capital of France?" What might it do?', a: ['Write more questions, like a quiz page', 'Answer perfectly, like a finished assistant', 'Refuse to say anything at all'], c: 0, why: 'Before fine-tuning it can only continue text, and a question often continues with more questions.', hint: 'Before fine-tuning, it can only continue text.' },
    { q: 'Where are big models trained?', a: ['In data centers full of GPUs', 'On one really fast laptop at home', 'In the clouds in the sky'], c: 0, why: 'Thousands of GPUs, working together for weeks or months.', hint: 'Thousands of chips, in huge buildings.' }
  ],
  notes: R`<p>Scale figures are rounded and vary by model; companies don't always publish them. The tablet comparison is a deliberately rough ballpark: a current data-center GPU does on the order of a hundred times more AI arithmetic per second than a tablet's chip. RLHF and related methods (including AI feedback guided by written principles) are used by most chatbot makers. Pre-release testing ("evaluations" and "red-teaming") looks for the problems in Level 5, but can't rule them out. Many apps let you choose whether your chats may be used to train future versions.</p>`
});
