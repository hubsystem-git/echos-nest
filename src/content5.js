/* ============================================================
   content5.js - Level 8 (Beyond Words): pictures, seeing, videos and voices, lessons 23 to 25
   ============================================================ */

/* ---------------------------------------------------------- 23 */
LESSONS.push({
  id: 'l23', num: '23', level: 'beyond', title: 'Pictures from noise', sub: 'How picture AIs paint',
  patch: { name: 'Noise Painter', icon: 'palette', color: '--patch-13' },
  idea: R`
<p>You've followed a question all the way through a chatbot. Now let's go beyond words! AI can make pictures too, and many AI picture makers don't write one token at a time like a chatbot. They use a different trick, called <span class="term" data-term="diffusion">diffusion</span>.</p>
<p>To practise, the model looks at hundreds of millions of pictures, each with a description. It adds a little random <span class="term" data-term="noise">noise</span> (speckles of random color, like sprinkles), then learns to guess what noise was added. Then more noise, and more, until nothing is left but speckles. Over and over, it learns how to take noise away. Because every picture came with words, it also learns which patterns go with which words: what "wolf", "snow" and "moonlight" look like.</p>
<p>To make a new picture, it starts with pure random noise and removes a little at a time, for a few dozen steps. Your words steer every step: ask for a white wolf, and each step nudges the speckles to look a bit more like a white wolf. The starting noise comes from a number called a <span class="term" data-term="seed">seed</span>. A new seed means new noise, so you get a different picture every time.</p>
<p>The model doesn't look up a saved picture. It learned patterns of what wolves, light and snow look like, and paints new pixels from those patterns. (Once in a while it paints something very close to a picture it saw many times, so AI pictures aren't always brand new.) Painting from patterns is also why AI pictures can have strange mistakes, like extra fingers or melted writing, though newer models make fewer of them.</p>
<p>The same trick can change real photos too: fill in a missing corner, erase something, or swap one face for another. That's handy for fixing photos, and it's also how fake photos get made. Lesson 25 has more about fakes.</p>
<p>Where do all those training pictures come from? Many were collected from the internet. Some artists and photographers don't want their work used to train AI without being asked, and people are still working out what's fair.</p>`,
  diagram: R`<div class="flow"><div class="box">Pure noise</div><span class="arrow">→</span><div class="box">a bit less noise</div><span class="arrow">→</span><div class="box">shapes appear</div><span class="arrow">→</span><div class="box">a picture!<br><small>steered by your words</small></div></div>`,
  labIntro: R`<p>My painter is a pretend one. A real model learned to remove noise. My painter cheats: it already knows a few pictures, and fades the noise toward one of them. But the steps look just like the real thing, and the seed works the same way.</p>`,
  lab: [{ w: 'painter' }],
  quests: [
    { id: 'wolf', text: R`Paint "a gray wolf" and watch the steps.`, check: ev => ev.type === 'paint' && ev.subject === 'wolf' },
    { id: 'again', text: R`Paint the same thing again. Is it exactly the same? Look at the seed.`, check: (ev, C) => ev.type === 'paint' && !!ev.subject && C.tick('s:' + ev.prompt) >= 2 },
    { id: 'color', text: R`Change the description and use a color word, like "a green snake".`, check: ev => ev.type === 'paint' && ev.subject && ev.asked && ev.prompt.trim() !== 'a gray wolf' },
    { id: 'pizza', text: R`Ask for something the painter never learned, like a pizza.`, check: ev => ev.type === 'paint' && ev.unknown },
    { id: 'noise', text: R`In practice mode, slide the noise all the way to 100%.`, check: ev => ev.type === 'noise' && ev.level >= 100 }
  ],
  field: [
    { text: R`Cloud pictures: look at clouds (or a messy patch of gravel or carpet) and find shapes in them. Your brain sees patterns in random shapes, a little like diffusion does.` },
    { text: R`Static challenge: draw a simple animal very lightly, then cover it with dots, a few at a time. When can your family no longer guess what it is?` },
    { text: R`With a grown-up, ask an AI picture maker for the same thing twice. How are the two pictures different? Why?`, gu: true, opt: true }
  ],
  compare: R`<p>Try drawing a bicycle from memory, without looking. Lots of people get the frame or the chain in the wrong place! Your brain keeps the pattern of a bike, not an exact copy, and fills in the details, sometimes wrongly. Picture AIs paint from patterns too, which is how they end up with extra fingers.</p>`,
  quiz: [
    { q: 'How does a diffusion model start a new picture?', a: ['From random noise, like static', 'From a photo it finds online', 'From a blank white page'], c: 0, why: 'Static first, then steps that remove noise.', hint: 'Remember the first step in the painter.' },
    { q: 'How does it practise?', a: ['Adding noise, then learning to take it away', 'Copying pictures exactly, pixel by pixel', 'Staring at sunsets for a very long time'], c: 0, why: 'Add noise, learn to take it away.', hint: 'Look at the practice slider.' },
    { q: 'You ask a picture AI for "a dragon reading a book" twice and get two different dragons. Why?', a: ['Each one started from different noise', 'The AI got bored of drawing the same dragon', 'A person at the company changed one by hand'], c: 0, why: 'A new seed means new starting noise, so a different picture.', hint: 'What does the seed decide?' },
    { q: 'How does a picture AI learn which pictures go with which words?', a: ['It practised on pictures with descriptions', 'Someone types in the meaning of every word by hand', 'It just guesses, with no examples at all'], c: 0, why: 'Pictures plus words, hundreds of millions of times.', hint: 'What came with every training picture?' }
  ],
  notes: R`<p>Noodle's painter is a visualization, not a trained model: it blends seeded random noise toward one of a few built-in 16×16 pictures using a cosine noise schedule, and the seed also decides small details (which way the animal faces, where it sits, how light or dark it is). Real diffusion models use a neural network that predicts the noise, steered by the text. Some newer image AIs use other methods too. Whether training on artists' and photographers' work without permission is fair, or legal, is being argued in courts and by lawmakers in several countries. The bicycle example in "Brains and bots" comes from a 2006 study by Rebecca Lawson, in which many people couldn't put a bike's frame, pedals and chain in the right places.</p>`
});

/* ---------------------------------------------------------- 24 */
LESSONS.push({
  id: 'l24', num: '24', level: 'beyond', title: 'AI that sees', sub: 'Photos are numbers too',
  patch: { name: 'Pixel Peeker', icon: 'eye', color: '--patch-23' },
  idea: R`
<p>When I look at a photo of my pack, I see my family. A computer sees something very different: numbers.</p>
<p>A digital photo is a grid of tiny colored squares called <span class="term" data-term="pixel">pixels</span>. Each pixel is stored as three numbers: how much red, how much green and how much blue, each from 0 to 255. Mixing those three makes every color on your screen. A photo from a phone camera has millions of pixels, so to a computer, it's a list of many millions of numbers.</p>
<p>So how can an AI tell that a photo shows a wolf? Remember lesson 1: there are too many ways a wolf can look to write rules for it. Instead, the AI learns from examples: millions of photos, each labeled or described in words, like "a wolf in the snow". Training nudges its knobs until the numbers of a wolf photo lead to the word "wolf". Getting computers to understand pictures is called <span class="term" data-term="computer vision">computer vision</span>.</p>
<p>Chatbots that can look at your photos use the same machinery they use for words. They chop the picture into small squares called <span class="term" data-term="patch">patches</span>, a bit like tokens for pictures, and turn each patch into a list of numbers. (Yes, the same word as the patches you earn in this guide! These patches are little squares of a picture.) Then attention works out how the patches fit together: this patch looks like an ear, that one like a nose. Your photo and your words end up side by side in the same context window.</p>
<p>A seeing AI only knows what it learned. Show it something it never saw, and it may still answer, sounding just as sure. It can also learn the wrong pattern without anyone noticing. In one famous test, scientists picked wolf photos that all had snow in them, on purpose, to teach an AI the wrong lesson. It learned "snow means wolf", and called a husky standing in snow a wolf! That's lopsided data again, just like the fairy tales in lesson 13.</p>`,
  diagram: R`<div class="flow"><div class="box">Photo<br><small>millions of pixels</small></div><span class="arrow">→</span><div class="box">Patches<br><small>small squares, like tokens</small></div><span class="arrow">→</span><div class="box">Numbers and attention<br><small>how the patches fit together</small></div><span class="arrow">→</span><div class="box">"A wolf in the snow"</div></div>`,
  labIntro: R`<p>Ssss, welcome to my pixel workshop! First, peek at the numbers inside a picture and chop it into patches. Then try my picture guesser. It learned from only four pictures, so you might be able to fool it.</p>`,
  lab: [
    { w: 'pixels' },
    { w: 'predict', cfg: { id: 'l24', q: 'My guesser only ever saw a black raven. You show it a white raven. What will it say?', opts: ['Raven', 'Something else', '"I don\'t know"'], c: 1, why: 'It got it wrong! It only ever saw a black raven, so it was going by color more than shape. And it can\'t say "I don\'t know": it always picks one of the four things it learned.' } },
    { w: 'guesser' }
  ],
  quests: [
    { id: 'pixel', text: R`In <b>Pixel peeker</b>, tap any pixel and read its three numbers.`, check: ev => ev.type === 'pixel' },
    { id: 'red', opt: true, text: R`Find a pixel with more than 200 red and less than 100 blue. (Hint: try the snake.)`, check: ev => ev.type === 'pixel' && ev.r > 200 && ev.b < 100 },
    { id: 'patches', text: R`Turn on <b>Chop into patches</b> and tap a patch. How many numbers are in it?`, check: ev => ev.type === 'patch' },
    { id: 'guess', text: R`Make a prediction in Noodle's card.`, check: ev => ev.type === 'predict' && ev.id === 'l24' },
    { id: 'white', text: R`Show the guesser the <b>White raven</b>. Was your prediction right?`, check: ev => ev.type === 'guess' && ev.pic === 'raven-white' },
    { id: 'sure', text: R`Tap <b>Gray wolf</b> with the noise at 0%. How sure is the guesser?`, check: ev => ev.type === 'guess' && ev.pic === 'wolf' && ev.noise === 0 },
    { id: 'noise', text: R`Add noise to a picture until the guesser gets it wrong. (Hint: try the snake.)`, check: ev => ev.type === 'guess' && ev.noise > 0 && ev.wrong },
    { id: 'fish', opt: true, text: R`Show it the goldfish, something it never learned. What does it say?`, check: ev => ev.type === 'guess' && ev.pic === 'fish' }
  ],
  field: [
    { text: R`Pixel art: on squared paper, draw a 16 × 16 picture of an animal by coloring in squares. That's how a computer keeps a photo, just with millions more squares.` },
    { text: R`Mystery patch: draw a picture on squared paper, then cover all of it except one small square. Can your family guess the picture from one patch? From four?` },
    { text: R`With a grown-up, search a photo app for "tree" or "dog". The app uses computer vision to find them. Did it find them all? Did it get any wrong?`, gu: true, opt: true }
  ],
  compare: R`<p>You could tell a white raven is still a raven, even if you'd only ever seen black ones. You'd look at its beak, its wings and its shape. Noodle's guesser went by color, and got fooled. A seeing AI needs millions of examples, and things it has never seen can still fool it.</p>`,
  quiz: [
    { q: 'To a computer, what is a photo?', a: ['A grid of numbers', 'A tiny painting inside the screen', 'A list of words'], c: 0, why: 'Every pixel is three numbers: red, green and blue.', hint: 'Remember the pixel peeker.' },
    { q: 'What are patches, in a seeing AI?', a: ['Small squares a picture is chopped into', 'Bugs in a computer program that need fixing', 'Pieces of a song'], c: 0, why: 'Patches are to pictures what tokens are to words.', hint: 'They\'re like tokens, for pictures.' },
    { q: 'A bird app learned only from photos of birds in summer. You show it a bird in the snow. What might happen?', a: ['It may be wrong, and sound sure', 'It will say "Sorry, I don\'t know"', 'It will learn about snow right away'], c: 0, why: 'A model only knows what it learned, and it can sound sure when it\'s wrong.', hint: 'Can a model know what it never saw?' },
    { q: 'Noodle\'s guesser called the goldfish something it already knew. Why?', a: ['It can only choose from what it learned', 'Goldfish are secretly snakes', 'It was being silly, just to make you laugh'], c: 0, why: 'A model can only pick from what it learned.', hint: 'How many things did it learn?' },
    { q: 'Why did an AI call a husky in the snow a wolf?', a: ['All of its wolf photos had snow in them', 'Huskies really are wolves in disguise', 'The husky was howling at the moon'], c: 0, why: 'It learned "snow means wolf" from lopsided photos.', hint: 'What did all its wolf photos have in common?' }
  ],
  notes: R`<p>Noodle's guesser compares a picture with its four built-in examples pixel by pixel, and the closest match wins: a deliberately simple stand-in for a trained classifier. Vision transformers split images into patches (often 14 or 16 pixels square) and turn each one into a vector, an idea from the 2020 paper "An Image is Worth 16x16 Words". Chatbots that read photos feed those image tokens into the same model as the text. The husky test comes from a 2016 study by Ribeiro and colleagues, who deliberately trained a bad classifier on hand-picked photos to see whether people could tell it had learned the snow. Photos sent to a chatbot app go to the company's computers like any other message.</p>`
});

/* ---------------------------------------------------------- 25 */
LESSONS.push({
  id: 'l25', num: '25', level: 'beyond', title: 'Videos and voices', sub: 'Moving pictures, talking computers, and fakes',
  patch: { name: 'Fake Finder', icon: 'film', color: '--patch-24' },
  idea: R`
<p>AI can make videos and voices too, and that brings something new to watch out for: fakes.</p>
<p><b>Videos.</b> A video is lots of pictures, called <span class="term" data-term="frame">frames</span>, shown very fast: about 24 to 30 every second. A video AI has to make every frame and make them all fit together. The wolf has to look the same from one frame to the next, and move smoothly. Early AI videos flickered, because each frame came out a little different. Newer video AIs work on the whole video at once, in little blocks of space and time, so the frames match much better.</p>
<p><b>Voices.</b> Sound is numbers too: a microphone measures how the air wiggles, thousands of times every second. <span class="term" data-term="speech recognition">Speech recognition</span> turns those numbers into words. <span class="term" data-term="text-to-speech">Text-to-speech</span> goes the other way and turns words into a voice. A talking assistant chains them together: your voice becomes words, a language model writes an answer, and a voice model reads it aloud. Some voice AIs can even copy a real person's voice from a short recording.</p>
<p><b>Fakes.</b> So AI can make photos, videos and voices of real people saying or doing things they never did. These are called <span class="term" data-term="deepfake">deepfakes</span>. Some are jokes. Some are disinformation (lesson 14), made to fool people or to trick them into sending money. The old clues, like strange hands or blurry edges, often don't work anymore, so:</p>
<ul>
<li><b>Follow the tracks</b> (lesson 12). Who posted it first? Does the person's real account, or a trusted news site, show it too?</li>
<li><b>Is it rushing you?</b> If something makes you want to share it right now, or send money or a secret, slow down and ask a grown-up. If a call sounds like Grandma asking for help in a hurry, hang up and call her back on the number you know.</li>
<li><b>Never make fakes of real people,</b> like friends or teachers, even as a joke. It can really hurt them.</li>
</ul>`,
  diagram: R`<div class="flow"><div class="box">Your voice<br><small>speech recognition</small></div><span class="arrow">→</span><div class="box">Words<br><small>a language model writes an answer</small></div><span class="arrow">→</span><div class="box">A voice<br><small>text-to-speech</small></div></div>`,
  labIntro: R`<p>Ssss, welcome to my film studio! First, make a tiny video in my flipbook, and see why the frames have to match. Then let Echo speak out loud. Last, decide what to do when something might be fake.</p>`,
  lab: [{ w: 'flipbook' }, { w: 'echoVoice' }, { w: 'sorter', cfg: {
    id: 'fakes', title: 'Stop and check, or fine to enjoy?', sub: 'Sort all seven.',
    cats: [{ id: 'check', label: 'Stop and check' }, { id: 'fine', label: 'Fine to enjoy' }],
    items: [
      { label: 'A video of a famous singer saying something shocking, posted by an account you don\'t know', cat: 'check', why: 'Look for it on the singer\'s real account or a trusted news site. It could be a deepfake.' },
      { label: 'A voice message that sounds like your friend, asking you to send a photo of yourself right now', cat: 'check', why: 'Voices can be copied, and it\'s rushing you. Ask your friend in person, or ask a grown-up, before you send anything.' },
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
    { id: 'sort', text: R`Sort all seven in <b>Stop and check, or fine to enjoy?</b>`, check: ev => ev.type === 'sort' && ev.id === 'fakes' && ev.done === ev.total },
    { id: 'right', opt: true, text: R`Get all seven right.`, check: ev => ev.type === 'sort' && ev.id === 'fakes' && ev.right === ev.total }
  ],
  field: [
    { text: R`Make a flipbook: draw a wolf in the corner of ten pages of a notepad, moving it a little on each page, and flip through fast. Then make one where the wolf changes color on every page. Does it still look like one wolf?` },
    { text: R`Pick a family code word: with your grown-ups, choose a secret word that only your family knows, for anyone who calls asking for help in a hurry.`, gu: true },
    { text: R`With a grown-up, look at some AI-made pictures or videos and hunt for clues: odd hands, writing that isn't real letters, or shadows going the wrong way. Newer ones often have no clues at all, so not finding one doesn't prove anything is real.`, gu: true, opt: true }
  ],
  compare: R`<p>You know your grandma's voice and your friend's face, and you'd notice if they acted strangely. That's a great start, but deepfakes can copy faces and voices very well. Your best tools are ones you already have: asking where something came from, and checking with people you trust.</p>`,
  quiz: [
    { q: 'What is a video?', a: ['Lots of pictures, shown very fast', 'One picture that moves by itself', 'A sound with colors added'], c: 0, why: 'About 24 to 30 frames every second.', hint: 'Think of the flipbook.' },
    { q: 'Why did early AI videos flicker?', a: ['The frames didn\'t match each other', 'The screens back then were much too bright', 'All videos flicker a little'], c: 0, why: 'Each frame came out a little different, so they didn\'t fit together.', hint: 'Remember "Each frame on its own".' },
    { q: 'What is a deepfake?', a: ['A fake of a real person, made by AI', 'A very deep swimming pool', 'A file hidden deep in a computer'], c: 0, why: 'AI can copy faces and voices.', hint: 'It copies real faces or voices.' },
    { q: 'A video shows a famous athlete giving away free bikes. To get one, you just click a link and type your address. What\'s smart?', a: ['Check her real page first, with a grown-up', 'Click fast, before the bikes run out', 'Send it to all your friends first'], c: 0, why: 'It\'s rushing you, and it wants your address. Follow the tracks to her real account, with a grown-up.', hint: 'Is it rushing you?' },
    { q: 'Is it okay to make a funny fake video of a friend?', a: ['No, it can really hurt them', 'Yes, if it\'s funny enough', 'Yes, if you only show a few people'], c: 0, why: 'Fakes of real people can hurt, even as a joke.', hint: 'How would you feel?' }
  ],
  notes: R`<p>The flipbook is a visualization: "on its own" paints each frame with a different random seed, the way a picture model would if it made every frame separately, and "follows the last" keeps the look and moves it smoothly. Video models such as OpenAI's Sora split a video into spacetime patches and denoise them together. Echo's voice uses your device's own text-to-speech, and only voices built into the device, so nothing is sent away; on a device without one, that bonus quest can be skipped. The FTC warns that voice-cloning scams need only a short audio clip, often taken from videos posted online, and advises hanging up and calling back on a number you know. Some apps label AI-made pictures and videos, and invisible watermarks (such as Google's SynthID) and Content Credentials (C2PA) help, but not every tool adds them, and labels can be stripped, so a missing label doesn't prove anything is real.</p>`
});
