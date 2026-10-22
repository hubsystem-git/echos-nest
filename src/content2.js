/* ============================================================
   content2.js - Level 3 (Inside the Brain) and Level 4 (Beyond Words)
   ============================================================ */

/* ---------------------------------------------------------- L7 */
LESSONS.push({
  id: 'l7', num: '7', level: 'l3', title: 'Knobs that learn', sub: 'Neurons, knobs and practice',
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
  id: 'l8', num: '8', level: 'l3', title: 'Word maps', sub: 'Words as lists of numbers',
  patch: { name: 'Star Mapper', icon: 'stars', color: '--patch-10' },
  idea: R`
<p>Inside a language model, every token becomes a long list of numbers called an <span class="term" data-term="embedding">embedding</span>. You can think of the list as a spot on a giant map.</p>
<p>Words with similar meanings end up close together. "Wolf" lands near "dog" and "fox". "Raven" lands near "owl". Nobody places them by hand. The model learns these spots during training, because words that are used in similar ways end up with similar numbers.</p>
<p>Sometimes the map is tidy enough to do math with words. On Echo's map, take "pup", subtract "wolf", and add "raven": you land on "chick"! The numbers that mean "young" carry over from one animal to another. In real models, word math only works some of the time.</p>
<p>Real embeddings have hundreds or thousands of numbers for every token, so they're impossible to draw. Echo's word map uses just 11 numbers per word, and they were written by hand with labels you can read, so you can see how it works.</p>`,
  labIntro: R`<p>Tap words to see their numbers, do some word math, and measure how alike two words are.</p>`,
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
    { q: 'What is an embedding?', a: ['A list of numbers for a token, like a spot on a map', 'A picture of a word', 'A kind of password'], c: 0, why: 'Every token becomes a list of numbers.' },
    { q: 'Which word would land closest to "wolf"?', a: ['dog', 'cheese', 'router'], c: 0, why: 'Similar meanings, similar numbers, nearby spots.' },
    { q: 'On Echo\'s map, pup − wolf + raven lands near…', a: ['chick', 'moose', 'file'], c: 0, why: 'The "young" numbers carry over to the bird.' }
  ],
  notes: R`<p>Real embeddings are learned, have hundreds to thousands of unlabeled dimensions, and aren't hand-made. This map uses 11 hand-set, labeled dimensions, laid out in 2D with a simple distance-keeping layout. "How alike" is cosine similarity.</p>`
});

/* ---------------------------------------------------------- L9 */
LESSONS.push({
  id: 'l9', num: '9', level: 'l3', title: 'Paying attention', sub: 'How words look back at each other',
  patch: { name: 'Spotlight', icon: 'arc', color: '--patch-11' },
  idea: R`
<p>Read this: "Echo found a shiny cap and hid it under a rock." What does "it" mean? The cap, of course. You knew because you looked back at the earlier words.</p>
<p>Language models do something similar, called <span class="term" data-term="attention">attention</span>. For every token, the model works out which earlier tokens matter most for understanding it, and pays more attention to those. "It" pays attention to "cap".</p>
<p>Sometimes one word changes everything. "The wolf could not catch the snake because it was too fast." Who was fast? The snake. Change "fast" to "slow", and now it's the wolf! When the model reaches "fast" or "slow", attention helps it look back and connect the right words.</p>
<p>The models behind chatbots are called <span class="term" data-term="transformer">transformers</span>. They stack dozens of attention layers, and each layer has many attention "heads" looking for different kinds of connections.</p>`,
  labIntro: R`<p>Tap a word to shine Echo's spotlight. The brighter an earlier word glows, the more attention it gets.</p>`,
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
  id: 'l10', num: '10', level: 'l3', title: 'From Echo to a giant', sub: 'How a chatbot is built',
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
  id: 'l11', num: '11', level: 'l4', title: 'Pictures from noise', sub: 'How image AIs paint',
  patch: { name: 'Noise Painter', icon: 'palette', color: '--patch-13' },
  idea: R`
<p>So far, everything in this guide has been about words. Now let's go beyond words! AI can make pictures too, and many AI picture makers don't write one token at a time like a chatbot. They use a different trick, called <span class="term" data-term="diffusion">diffusion</span>.</p>
<p>To practise, the model looks at hundreds of millions of real pictures, sometimes billions, each with a description. It adds a little random <span class="term" data-term="noise">noise</span> (speckles of random color, like sprinkles scattered over the picture), then learns to guess what noise was added. Then more noise, and more, until nothing is left but speckles. Over and over, it learns how to take noise away. Because every picture came with words, it also learns which patterns go with which words: what "wolf", "snow" and "moonlight" look like.</p>
<p>To make a new picture, it starts with pure random noise and removes a little at a time, for a few dozen steps. Your words steer every step: ask for a white wolf, and each step nudges the speckles to look a bit more like a white wolf. The starting noise comes from a number called a <span class="term" data-term="seed">seed</span>. A new seed means new noise, so you get a different picture every time.</p>
<p>The model doesn't look up a saved picture. It learned patterns of what wolves, light and snow look like, and paints new pixels from those patterns. (Once in a while it paints something very close to a picture it saw many times, so AI pictures aren't always brand new.) Painting from patterns is also why AI pictures can have strange mistakes, like extra fingers or melted writing, though newer models make fewer of them.</p>
<p>The same trick can change real photos too: fill in a missing corner, erase something, or swap one face for another. That's handy for fixing photos, and it's also how fake photos get made. Lesson 13 has more about fakes.</p>
<p>Where do all those training pictures come from? Many were collected from the internet. Some artists and photographers don't want their work used to train AI without being asked, and people are still working out what's fair.</p>`,
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
    { text: R`With a grown-up, ask an AI picture maker for the same thing twice. How are the two pictures different? Why?`, gu: true, opt: true }
  ],
  compare: R`<p>When you draw, you plan shapes and outlines. A diffusion model doesn't draw outlines. It sharpens random speckles into a picture, everywhere at once, step by step.</p>`,
  quiz: [
    { q: 'How does a diffusion model start a new picture?', a: ['From random noise', 'From a photo it finds online', 'From a blank white page'], c: 0, why: 'Static first, then steps that remove noise.' },
    { q: 'How does it practise?', a: ['By adding noise to real pictures and learning to remove it', 'By copying pictures exactly', 'By looking at the sun'], c: 0, why: 'Add noise, learn to take it away.' },
    { q: 'Why do two pictures from the same words look different?', a: ['Each one starts from different random noise', 'The model gets tired', 'Someone changes them by hand'], c: 0, why: 'Different starting noise, different picture.' },
    { q: 'How does a picture AI learn which pictures go with which words?', a: ['It practised on pictures that came with descriptions', 'Someone tells it every word by hand', 'It guesses with no examples'], c: 0, why: 'Pictures plus words, hundreds of millions of times.' }
  ],
  notes: R`<p>Noodle's painter is a visualization, not a trained model: it blends seeded random noise toward one of a few built-in 16×16 pictures using a cosine noise schedule. Real diffusion models use a neural network that predicts the noise, steered by the text. Some newer image AIs use other methods too. Whether training on artists' and photographers' work without permission is fair, or legal, is being argued in courts and by lawmakers in several countries.</p>`
});

/* ---------------------------------------------------------- L12 */
LESSONS.push({
  id: 'l12', num: '12', level: 'l4', title: 'AI that sees', sub: 'Photos are numbers too',
  patch: { name: 'Pixel Peeker', icon: 'eye', color: '--patch-23' },
  idea: R`
<p>When I look at a photo of my pack, I see my family. A computer sees something very different: numbers.</p>
<p>A digital photo is a grid of tiny colored squares called <span class="term" data-term="pixel">pixels</span>. Each pixel is stored as three numbers: how much red, how much green and how much blue, each from 0 to 255. Mixing those three makes every color on your screen. A photo from a phone camera has millions of pixels, so to a computer, it's a list of many millions of numbers.</p>
<p>So how can an AI tell that a photo shows a wolf? Remember the very first lesson: there are too many ways a wolf can look to write rules for it. Instead, the AI learns from examples: millions of photos, each labeled or described in words, like "a wolf in the snow". Training nudges its knobs until the numbers of a wolf photo lead to the word "wolf". Getting computers to understand pictures is called <span class="term" data-term="computer vision">computer vision</span>.</p>
<p>Chatbots that can look at your photos use the same machinery they use for words. They chop the picture into small squares called <span class="term" data-term="patch">patches</span>, a bit like tokens for pictures, and turn each patch into a list of numbers. Then attention works out how the patches fit together: this patch looks like an ear, that one like a nose. Your photo and your words end up side by side in the same context window.</p>
<p>A seeing AI only knows what it learned. Show it something it never saw, and it may still answer, sounding just as sure. It can also learn the wrong pattern without anyone noticing. In one famous test, scientists picked wolf photos that all had snow in them, on purpose, to teach an AI the wrong lesson. It learned "snow means wolf", and called a husky standing in snow a wolf!</p>`,
  diagram: R`<div class="flow"><div class="box">Photo<br><small>millions of pixels</small></div><span class="arrow">→</span><div class="box">Patches<br><small>small squares, like tokens</small></div><span class="arrow">→</span><div class="box">Numbers and attention<br><small>how the patches fit together</small></div><span class="arrow">→</span><div class="box">"A wolf in the snow"</div></div>`,
  labIntro: R`<p>Ssss, welcome to my pixel workshop! First, peek at the numbers inside a picture and chop it into patches. Then try my picture guesser. It learned from only four pictures, so you might be able to fool it.</p>`,
  lab: [{ w: 'pixels' }, { w: 'guesser' }],
  quests: [
    { id: 'pixel', text: R`In <b>Pixel peeker</b>, tap any pixel and read its three numbers.`, check: ev => ev.type === 'pixel' },
    { id: 'red', text: R`Find a pixel with more than 200 red and less than 100 blue. (Hint: try the snake.)`, check: ev => ev.type === 'pixel' && ev.r > 200 && ev.b < 100 },
    { id: 'patches', text: R`Turn on <b>Chop into patches</b> and tap a patch. How many numbers are in it?`, check: ev => ev.type === 'patch' },
    { id: 'sure', text: R`Show the guesser the gray wolf, with no noise. How sure is it?`, check: ev => ev.type === 'guess' && ev.pic === 'wolf' && ev.noise === 0 },
    { id: 'noise', text: R`Add noise to a picture until the guesser gets it wrong.`, check: ev => ev.type === 'guess' && ev.known && ev.noise > 0 && !ev.right },
    { id: 'fish', text: R`Show it the goldfish, something it never learned. What does it say?`, check: ev => ev.type === 'guess' && ev.pic === 'fish' },
    { id: 'color', opt: true, text: R`Show it a wolf or a snake in a color it never learned. Can it still tell what it is?`, check: ev => ev.type === 'guess' && ev.newColor }
  ],
  field: [
    { text: R`Pixel art: on squared paper, draw a 16 × 16 picture of an animal by coloring in squares. That's how a computer keeps a photo, just with millions more squares.` },
    { text: R`Mystery patch: draw a picture on squared paper, then cover all of it except one small square. Can your family guess the picture from one patch? From four?` },
    { text: R`With a grown-up, search a photo app for "tree" or "dog". The app uses computer vision to find them. Did it find them all? Did it get any wrong?`, gu: true, opt: true }
  ],
  compare: R`<p>You can recognize a wolf in a blink: from the side, in the dark, or from just its tail. You learned from a few real wolves, pictures and stories. A seeing AI needs millions of examples, and it can be fooled by things that would never fool you, like a wolf in a color it never saw.</p>`,
  quiz: [
    { q: 'To a computer, what is a photo?', a: ['A grid of pixels, each stored as numbers', 'A tiny painting inside the screen', 'A list of words'], c: 0, why: 'Every pixel is three numbers: red, green and blue.' },
    { q: 'How does a seeing AI learn what a wolf looks like?', a: ['From lots of photos labeled with words', 'From a rule book about wolves', 'By visiting a zoo'], c: 0, why: 'Examples, not rules.' },
    { q: 'What are patches?', a: ['Small squares a picture is chopped into, like tokens', 'Stickers on a jacket', 'Bugs in a program'], c: 0, why: 'Patches are to pictures what tokens are to words.' },
    { q: 'Noodle\'s guesser called the goldfish something it already knew. Why?', a: ['It can only choose between the four things it learned', 'Goldfish are secretly snakes', 'It was being silly on purpose'], c: 0, why: 'A model can only pick from what it learned.' }
  ],
  notes: R`<p>Noodle's guesser compares a picture with its four built-in examples pixel by pixel, and the closest match wins: a deliberately simple stand-in for a trained classifier. Vision transformers split images into patches (often 14 or 16 pixels square) and turn each one into a vector, an idea from the 2020 paper "An Image is Worth 16x16 Words". Chatbots that read photos feed those image tokens into the same model as the text. The husky test comes from a 2016 study by Ribeiro and colleagues, who deliberately trained a bad classifier on hand-picked photos to see whether people could tell it had learned the snow. Photos sent to a chatbot app go to the company's computers like any other message.</p>`
});

/* ---------------------------------------------------------- L13 */
LESSONS.push({
  id: 'l13', num: '13', level: 'l4', title: 'Videos and voices', sub: 'Moving pictures, talking computers, and fakes',
  patch: { name: 'Fake Finder', icon: 'film', color: '--patch-24' },
  idea: R`
<p>AI can do more than write and paint. It can make videos and voices too, and that brings something new to watch out for: fakes.</p>
<p><b>Videos.</b> A video is lots of pictures, called <span class="term" data-term="frame">frames</span>, shown very fast: about 24 to 30 every second. A video AI has to make every frame and make them all fit together. The wolf has to look the same from one frame to the next, and move smoothly. Early AI videos wobbled and flickered, because each frame came out a little different. Newer video AIs chop a whole video into little blocks of space and time, a bit like tokens, and work on them all together, so the frames match much better.</p>
<p><b>Voices.</b> Sound is numbers too: a microphone measures how the air wiggles, thousands of times every second. <span class="term" data-term="speech recognition">Speech recognition</span> turns those numbers into words. That's how a voice assistant understands you. <span class="term" data-term="text-to-speech">Text-to-speech</span> goes the other way and turns words into a voice. A talking assistant chains them together: your voice becomes words, a language model writes an answer, and a voice model reads it aloud. Some voice AIs can even copy a real person's voice from a short recording.</p>
<p><b>Fakes.</b> So AI can make photos, videos and voices of real people saying or doing things they never did. These are called <span class="term" data-term="deepfake">deepfakes</span>. Some are jokes, but some are made to fool people, or to trick them into sending money. The old clues, like strange hands or blurry edges, often don't work anymore, so the best defense is to check:</p>
<ul>
<li><b>Where did it come from?</b> Who posted it first? Do trusted news sites, or the person's real account, show it too?</li>
<li><b>Is it labeled?</b> Some apps label AI-made pictures and videos, and some AI tools hide an invisible label inside them. But many don't, and labels can be removed, so a missing label doesn't prove anything is real.</li>
<li><b>Is it rushing you?</b> If something makes you want to share it right now, or send money or a secret, slow down and ask a grown-up.</li>
</ul>
<p>Voices can be faked on the phone too. If someone calls sounding like Grandma and asks for help in a hurry, hang up and call her back on the number you already know. Some families agree on a secret code word, so a real family member in trouble can prove who they are.</p>`,
  diagram: R`<div class="flow"><div class="box">Your voice<br><small>speech recognition</small></div><span class="arrow">→</span><div class="box">Words<br><small>a language model writes an answer</small></div><span class="arrow">→</span><div class="box">A voice<br><small>text-to-speech</small></div></div>`,
  labIntro: R`<p>Ssss, welcome to my film studio! First, make a tiny video in my flipbook, and see why the frames have to match. Then let Echo speak out loud. Last, decide what to do when something might be fake.</p>`,
  lab: [{ w: 'flipbook' }, { w: 'echoVoice' }, { w: 'sorter', cfg: {
    id: 'fakes', title: 'Stop and check, or fine to enjoy?', sub: 'Sort all eight.',
    cats: [{ id: 'check', label: 'Stop and check' }, { id: 'fine', label: 'Fine to enjoy' }],
    items: [
      { label: 'A video of a famous singer saying something shocking, posted by an account you don\'t know', cat: 'check', why: 'Look for it on the singer\'s real account or a trusted news site. It could be a deepfake.' },
      { label: 'A phone call that sounds just like Grandma, asking for money right away', cat: 'check', why: 'Voices can be copied. Hang up and call Grandma back on her real number, with a grown-up.' },
      { label: 'A voice message from a friend asking for your password', cat: 'check', why: 'A real friend never needs your password, and voices can be faked. Tell a grown-up.' },
      { label: 'A photo of a shark swimming down a flooded street after a storm', cat: 'check', why: 'Pictures like this have been faked again and again. Find out where it came from first.' },
      { label: 'A video of your principal saying school is closed tomorrow, shared in a group chat', cat: 'check', why: 'Check the school\'s real website, or ask a grown-up, before you believe it or share it.' },
      { label: 'A dragon picture your class made with an AI tool, labeled "made with AI"', cat: 'fine', why: 'It\'s labeled, and nobody is being fooled.' },
      { label: 'A cartoon movie at the theater', cat: 'fine', why: 'Everyone knows a cartoon is made up, even when computers helped make it.' },
      { label: 'A nature show about wolves from a channel you trust', cat: 'fine', why: 'It comes from a source you know and trust.' }
    ]
  } }],
  quests: [
    { id: 'apart', text: R`In the flipbook, choose <b>Each frame on its own</b> and press <b>Play</b>. What goes wrong?`, check: ev => ev.type === 'flip-play' && ev.mode === 'apart' },
    { id: 'together', text: R`Now choose <b>Each frame follows the last</b> and play it again.`, check: ev => ev.type === 'flip-play' && ev.mode === 'together' },
    { id: 'frames', text: R`Press <b>Next frame</b> to step through all 8 frames, one at a time.`, check: (ev, C) => ev.type === 'flip-step' && C.tick('f') >= 8 },
    { id: 'speak', opt: true, text: R`Let Echo talk, then press <b>Hear Echo</b>. Echo writes the words, and your device's voice reads them.`, check: ev => ev.type === 'speak' },
    { id: 'sort', text: R`Sort all eight in <b>Stop and check, or fine to enjoy?</b>`, check: ev => ev.type === 'sort' && ev.id === 'fakes' && ev.done === ev.total },
    { id: 'right', opt: true, text: R`Get all eight right.`, check: ev => ev.type === 'sort' && ev.id === 'fakes' && ev.right === ev.total }
  ],
  field: [
    { text: R`Make a flipbook: draw a wolf in the corner of ten pages of a notepad, moving it a little on each page, and flip through fast. Then make one where the wolf changes color on every page. Does it still look like one wolf?` },
    { text: R`Pick a family code word: with your grown-ups, choose a secret word that only your family knows, for anyone who calls asking for help in a hurry.`, gu: true },
    { text: R`With a grown-up, look at some AI-made pictures or videos and hunt for clues: odd hands, writing that isn't real letters, or shadows going the wrong way. Newer ones often have no clues at all, so not finding one doesn't prove anything is real.`, gu: true, opt: true }
  ],
  compare: R`<p>You know your grandma's voice and your friend's face, and you'd notice if they acted strangely. That's a great start, but deepfakes can copy faces and voices very well. Your best tools are ones you already have: asking where something came from, and checking with people you trust.</p>`,
  quiz: [
    { q: 'What is a video?', a: ['Lots of pictures, called frames, shown very fast', 'One picture that moves by itself', 'A sound with colors'], c: 0, why: 'About 24 to 30 frames every second.' },
    { q: 'Why did early AI videos flicker?', a: ['Each frame came out a little different, so they didn\'t match', 'The screen was too bright', 'All videos flicker'], c: 0, why: 'Frames have to fit together.' },
    { q: 'What is a deepfake?', a: ['An AI-made photo, video or voice of a real person doing something they never did', 'A very deep swimming pool', 'A hidden file'], c: 0, why: 'AI can copy faces and voices.' },
    { q: 'Someone calls, sounding just like your uncle, and asks for money right away. What\'s smart?', a: ['Hang up and call him back on his real number, with a grown-up', 'Send the money quickly', 'Keep talking until you\'re sure it\'s him'], c: 0, why: 'Call back on a number you know. Voices can be faked.' }
  ],
  notes: R`<p>The flipbook is a visualization: "on its own" paints each frame with a different random seed, the way a picture model would if it made every frame separately, and "follows the last" keeps the look and moves it smoothly. Video models such as OpenAI's Sora split a video into spacetime patches and denoise them together. Echo's voice uses your device's own text-to-speech, and only voices built into the device, so nothing is sent away; on a device without one, that bonus quest can be skipped. The FTC warns that voice-cloning scams need only a short audio clip, often taken from videos posted online, and advises hanging up and calling back on a number you know. Invisible watermarks (such as Google's SynthID) and Content Credentials (C2PA) labels help, but not every tool adds them, and labels can be stripped.</p>`
});
