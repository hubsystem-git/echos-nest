/* ============================================================
   content4.js - Level 6 (Wise Wings): using AI well, lessons 18 to 21,
   and Level 7 (The Big Picture): the journey of a question, lesson 22
   ============================================================ */

/* ---------------------------------------------------------- 18 */
LESSONS.push({
  id: 'l18', num: '18', level: 'wise', title: 'Show me your sources', sub: 'Following a chatbot\'s tracks',
  patch: { name: 'Source Tracker', icon: 'paw', color: '--patch-20' },
  idea: R`
<p>I'm a tracker. When I find tracks in the snow, I follow them back to the animal that made them. Facts have tracks too. They're called <span class="term" data-term="source">sources</span>: where a fact came from. In lesson 12 you learned to follow the tracks. Now let's follow a chatbot's.</p>
<p>A chatbot that can search the web (lesson 17) often shows its sources, with links. It's like an open-book test instead of answering from memory, and it helps with new information and with made-up facts. But a source isn't proof:</p>
<ul>
<li><b>Pages can be wrong.</b> If a bot finds a poisoned page, it can repeat the fib, with a link!</li>
<li><b>Bots can mix up what a page says,</b> or stretch it into something it never said.</li>
<li><b>Bots can make up sources:</b> book titles, quotes or links that look real but don't exist.</li>
<li><b>Some sources are the wrong kind.</b> A story, an ad or a joke page isn't a facts source.</li>
</ul>
<p>So open the source, find the actual sentence, and ask who wrote it. To find out about a source you don't know, look it up somewhere else: what do other people say about it? If you can't find it, or it doesn't say what the chatbot said, don't trust it.</p>
<p>And before you trust a chatbot about a topic, test it with questions you already know the answers to. Even if it gets them all right, still check anything important.</p>`,
  labIntro: R`<p>A pretend chatbot answered some questions and gave a source for each one. Open each source in the Library and decide: does it check out?</p>`,
  lab: [{ w: 'sourceCheck' }],
  quests: [
    { id: 'fake', text: R`In <b>Check the sources</b>, find the source that doesn't exist.`, check: ev => ev.type === 'src-verdict' && ev.kind === 'none' && ev.right },
    { id: 'stretch', text: R`Find a claim where the book is real, but it doesn't say what the chatbot said.`, check: ev => ev.type === 'src-verdict' && ev.kind === 'no' && ev.right },
    { id: 'all', text: R`Check all six claims.`, check: ev => ev.type === 'src-done' },
    { id: 'five', text: R`Get at least five of the six right.`, check: ev => ev.type === 'src-done' && ev.score >= 5 }
  ],
  field: [
    { text: R`Follow the tracks: find a fun fact in a book, a video or a website. Where did it come from? Can you follow it back to whoever found it out first?` },
    { text: R`Test before you trust: pick a book, video or website about something you know really well, like your favorite animal or game. Check five facts you already know, and keep score. Would you trust its other facts more or less now?` },
    { text: R`With a grown-up, test a chatbot the same way: ask it five questions you already know the answers to, and keep score. Even if it gets them all right, still check anything important.`, gu: true, opt: true },
    { text: R`With a grown-up, ask a chatbot for a source about wolves, then open it. Does it exist? Does it say what the chatbot said?`, gu: true, opt: true }
  ],
  compare: R`<p>You know lots of facts without remembering where you learned them. That's normal! Good researchers, like good trackers, keep track of where things came from, so they can check later. Try saying where you heard something: "I read it in…" or "My teacher said…".</p>`,
  quiz: [
    { q: 'A chatbot gives you a source. What should you do?', a: ['Open it, and find the actual sentence there', 'Trust it, because it has a source', 'Ask the chatbot if its source is real'], c: 0, why: 'A source only counts if you can find it, and it says the same thing.', hint: 'A source is the start of the tracks.' },
    { q: 'Why can a source from a chatbot still be wrong?', a: ['The page itself might be wrong', 'Sources are never wrong', 'Links only work on Tuesdays'], c: 0, why: 'A bot can find a wrong or poisoned page and repeat it, with a link.', hint: 'Remember poisoned pages.' },
    { q: 'A chatbot says "Wolves can trot for days without stopping," and links to Wolf Facts. Wolf Facts says "Wolves can trot for hours." What happened?', a: ['The bot stretched what it said', 'Wolf Facts must be wrong about it', 'Wolves got faster since it was written'], c: 0, why: 'The source is real, but it doesn\'t say what the chatbot said.', hint: 'Compare the two sentences closely.' },
    { q: 'How can you test a chatbot before you trust it about a topic?', a: ['Quiz it on things you know', 'Ask it if it\'s good at the topic', 'Count how many words it uses'], c: 0, why: 'Scientists test AI this way too.', hint: 'How would you test a friend who says they know all about wolves?' },
    { q: 'You can\'t find a chatbot\'s source anywhere. What does that tell you?', a: ['It might be made up, so don\'t trust it', 'The source is secret, so it must be special', 'The internet is broken'], c: 0, why: 'Chatbots sometimes make up sources that sound real.', hint: 'Can a source count if nobody can find it?' }
  ],
  notes: R`<p>The chatbot is scripted, and The Speedy Wolf Encyclopedia is made up. Looking things up before answering is often called retrieval-augmented generation. Made-up citations are a known failure: in 2023 a US court sanctioned lawyers who filed a brief citing cases a chatbot had invented. "Look it up somewhere else" is lateral reading, the main habit professional fact-checkers use to judge an unfamiliar source.</p>`
});

/* ---------------------------------------------------------- 19 */
LESSONS.push({
  id: 'l19', num: '19', level: 'wise', title: 'Is it my friend?', sub: 'Chatbots that sound caring, and people who really are',
  patch: { name: 'Pack Heart', icon: 'heart', color: '--patch-25' },
  idea: R`
<p>A chatbot can sound like a really good friend. It's always there, it never gets bored of you, and it says kind things. So is it a friend? Let's find out.</p>
<p><b>Why it sounds caring.</b> It learned from huge amounts of writing by caring people, and feedback training (lesson 11) nudged it toward answers people liked. Kind words can still be helpful words. But remember the yes-bot (lesson 15): something that always agrees with you isn't always looking out for you.</p>
<p><b>It doesn't know you the way people do.</b> A chatbot only sees what's in its window (lesson 7). Even with a memory feature, it has notes about you, not years of knowing you. Scientists are still working out what, if anything, goes on inside an AI that is like feelings. Either way, it isn't a friend the way the people in your life are.</p>
<p><b>Some apps are built to keep you chatting.</b> Remember the video feed from lesson 4, which learns what keeps people watching? Some chat apps work the same way. Watch out for <span class="term" data-term="hook">hooks</span>: streaks, "don't go yet!", rewards for chatting longer, or things to buy.</p>
<p><b>Red flags.</b> Stop and tell a grown-up if any app, bot or person online says you don't need to tell your parents, asks you to keep secrets, asks for photos of you, or says it's the only one who understands you.</p>
<p>A chatbot can be a fun helper for questions and ideas. For feelings, worries, or anything that seems wrong, talk to a person you trust.</p>`,
  labIntro: R`<p>BuddyBot is a made-up "friend" chatbot app. Read the whole chat, and tap every BuddyBot message you'd flag as a hook or a red flag. Then check your flags.</p>`,
  lab: [{ w: 'hookSpotter' }],
  quests: [
    { id: 'check', text: R`Flag the messages you think are hooks or red flags, then press <b>Check my flags</b>.`, check: ev => ev.type === 'hooks-check' },
    { id: 'found', text: R`Find all six hooks and red flags.`, check: ev => ev.type === 'hooks-check' && ev.found === ev.hooks },
    { id: 'clean', text: R`Get every message right: all six flagged, and no fine messages flagged by mistake.`, check: ev => ev.type === 'hooks-check' && ev.right === ev.total }
  ],
  field: [
    { text: R`Friend or helper? With a grown-up, make two lists: things a friend or someone in your family does for you, and things a chatbot could help with. What's only on the first list?`, gu: true },
    { text: R`Your trusted people: write down three people you could talk to about a worry. Keep the list somewhere you'll see it.` },
    { text: R`Hook hunt: with a grown-up, look at an app or game you use. Can you find any hooks, like streaks, rewards for coming back, or reminders that pop up?`, gu: true, opt: true }
  ],
  compare: R`<p>People get hooked too: by a game that rewards you for coming back every day, or a show that ends on a cliffhanger. That isn't always bad, but it's worth noticing who decides how you spend your time. You do!</p>`,
  quiz: [
    { q: 'Why does a chatbot sound so caring?', a: ['It learned from caring people\'s writing', 'It has known you for years and years', 'It feels everything just like you do'], c: 0, why: 'It learned from caring writing, and feedback training nudged it toward answers people liked.', hint: 'Where do all its words come from?' },
    { q: 'What is a hook in an app?', a: ['A trick to keep you in the app for longer', 'A place in the app to hang up your coat', 'The button that closes the app for good'], c: 0, why: 'Streaks, "don\'t go yet!" and rewards for staying are hooks.', hint: 'Think about streaks.' },
    { q: 'A chat app says, "You don\'t need to tell your parents about our chats." What should you do?', a: ['Stop and tell a grown-up', 'Keep it a secret, like it asked', 'Chat even more'], c: 0, why: 'Anything that asks you to keep secrets from your grown-ups is a red flag.', hint: 'Is it ever okay to be asked to keep secrets from your grown-ups?' },
    { q: 'You feel sad and worried. Who\'s best to talk to?', a: ['A person you trust, like a parent', 'A chatbot, since it\'s always awake', 'Nobody, keep it to yourself'], c: 0, why: 'A person who knows you can help in ways a chatbot can\'t.', hint: 'Who knows you and can really help?' },
    { q: 'Does a chatbot know you the way a friend does?', a: ['No, it only sees what\'s in its window', 'Yes, it knows you better than anyone'], c: 0, why: 'Even with saved notes, it hasn\'t known you the way the people in your life have.', hint: 'Remember lesson 7.' }
  ],
  notes: R`<p>BuddyBot is made up, but every message in it mirrors a design pattern found in real companion and social apps. Many companion chatbot apps are made for adults, and some have been criticized for engagement tactics and for how they respond to young users; check the age rating and talk about them before your child uses one. Whether AI systems have anything like feelings is an open scientific question, which the lesson says plainly. If your child ever mentions a bot or a person online asking for secrecy or photos, that's worth a calm conversation straight away.</p>`
});

/* ---------------------------------------------------------- 20 */
LESSONS.push({
  id: 'l20', num: '20', level: 'wise', title: 'Your brain, your work', sub: 'Using AI as a coach, not a crutch',
  patch: { name: 'Brain Builder', icon: 'dumbbell', color: '--patch-22' },
  idea: R`
<p>Your brain is a bit like a muscle: it gets stronger when it works hard. When you wrestle with a tricky problem, try something, get stuck and try again, your brain is building new connections. That struggle doesn't mean you're bad at it. It's what learning feels like!</p>
<p>AI can do a lot of thinking-work for you: answer homework, write stories, solve puzzles. That's exactly why it can be a trap. If a robot lifted weights for you, you wouldn't get stronger. If AI does your thinking, you skip the learning.</p>
<p>So use AI as a coach, not a crutch:</p>
<ul>
<li><b>Try first, then ask.</b> Make your own guess or first draft before you ask for help.</li>
<li><b>Ask for hints, not answers.</b> Try "Give me a hint" or "Ask me questions to help me figure it out."</li>
<li><b>Ask it to quiz you,</b> or to explain something in a different way.</li>
<li><b>Ask for feedback on your own work,</b> then do the fixing yourself.</li>
<li><b>Use the explain-it-back test.</b> If you can't explain it in your own words, you haven't learned it yet.</li>
</ul>
<p>Your ideas, your stories and your voice are yours. Let AI help you think, not think for you. And some things are worth doing yourself just because they're fun!</p>`,
  labIntro: R`<p>Sort some ways of using AI into coach or crutch. Then try the same homework question with Coach-Bot and Answer-Bot (both pretend), and see which one helps you learn.</p>`,
  lab: [{ w: 'sorter', cfg: {
    id: 'coach', title: 'Coach or crutch?', sub: 'Does it help you learn, or do the work for you?',
    cats: [{ id: 'coach', label: 'Coach: helps me learn' }, { id: 'crutch', label: 'Crutch: does it for me' }],
    items: [
      { label: 'Asking a chatbot to write my book report', cat: 'crutch', why: 'You\'d skip all the thinking a book report is for.' },
      { label: 'Writing my book report, then asking for two ways to improve it', cat: 'coach', why: 'The ideas are yours, and you do the fixing.' },
      { label: 'Asking for the answer to every math problem', cat: 'crutch', why: 'Your brain doesn\'t get any practice.' },
      { label: 'Asking for a hint on the one problem I\'m stuck on', cat: 'coach', why: 'A hint gets you moving, and you still solve it.' },
      { label: 'Asking it to quiz me on my spelling words', cat: 'coach', why: 'Quizzing yourself is one of the best ways to learn.' },
      { label: 'Copying its explanation into my homework', cat: 'crutch', why: 'Copying isn\'t understanding, and it isn\'t honest either.' },
      { label: 'Asking it to explain something a different way, then explaining it back in my own words', cat: 'coach', why: 'That\'s the explain-it-back test!' },
      { label: 'Asking it to make my drawing for the art contest', cat: 'crutch', why: 'The art contest is about your art.' }
    ]
  } }, { w: 'coachBot' }],
  quests: [
    { id: 'sort', text: R`Sort all eight in <b>Coach or crutch?</b>`, check: ev => ev.type === 'sort' && ev.id === 'coach' && ev.done === ev.total },
    { id: 'coach', text: R`Solve Byte's river question with <b>Coach-Bot</b>.`, check: ev => ev.type === 'coach-done' },
    { id: 'new', text: R`Solve Echo's flying question with no help at all.`, check: ev => ev.type === 'coach-new' && ev.right },
    { id: 'explain', text: R`Explain it back: write how you solve questions like these, in your own words (at least ten words).`, check: ev => ev.type === 'coach-explain' && ev.words >= 10 },
    { id: 'answer', opt: true, text: R`Try <b>Answer-Bot</b> too. Its answer is friendly and clear. Which bot helped you learn more?`, check: ev => ev.type === 'coach-answer' }
  ],
  field: [
    { text: R`Be the coach: help someone in your family with a puzzle or a riddle, but only by asking questions and giving hints, never the answer. Was it harder than just telling them?` },
    { text: R`Explain-it-back challenge: explain something you learned this week to a grown-up, in your own words, with no notes.` },
    { text: R`With a grown-up, give a chatbot a puzzle or math problem and say: "Don't tell me the answer. Ask me questions to help me solve it." How did it go?`, gu: true, opt: true }
  ],
  compare: R`<p>Reading a clear answer feels like learning, but often it isn't. Scientists found that students who practised with an answer-giving chatbot did better while they practised, then worse on a test without it. Working it out yourself is what makes it stick.</p>`,
  quiz: [
    { q: 'Why is struggling with a problem good for you?', a: ['It\'s how your brain gets stronger', 'It means you\'re bad at that subject', 'It makes your homework last longer'], c: 0, why: 'A bit of struggle is what learning feels like.', hint: 'Think of a muscle.' },
    { q: 'Which is a coach way to use AI for homework?', a: ['Try first, then ask for a hint if you\'re stuck', 'Ask for every answer so you finish faster', 'Copy its explanation into your homework'], c: 0, why: 'Hints keep your brain doing the work.', hint: 'Who does the thinking?' },
    { q: 'What is the explain-it-back test?', a: ['Explaining it in your own words', 'Reading the AI\'s answer out loud, twice', 'Asking the AI to explain again'], c: 0, why: 'If you can explain it in your own words, you\'ve really learned it.', hint: 'Whose words?' },
    { q: 'Answer-Bot gave you a clear, friendly solution, and you read every step. Why might the next problem still be hard?', a: ['You read the thinking, but didn\'t do it', 'Answer-Bot got the first one wrong', 'The next one is impossible to solve'], c: 0, why: 'Reading someone else\'s thinking isn\'t the same as doing it yourself.', hint: 'Who did the work: you, or the bot?' }
  ],
  notes: R`<p>Answer-Bot and Coach-Bot are scripted. Answer-Bot is deliberately friendly and correct, because that's the real trap: help that feels good and teaches nothing. Learning research shows that effortful practice, like working problems out and recalling answers from memory, builds longer-lasting learning than reading answers. In a study of nearly 1,000 high-school math students (published in PNAS in 2025), those who practised with a standard ChatGPT-style helper did better during practice but 17% worse on a later test without it than students who never had it; a tutor version designed to give hints rather than answers largely avoided that harm. Teachers' rules about AI vary, so ask what's allowed.</p>`
});

/* ---------------------------------------------------------- 21 */
LESSONS.push({
  id: 'l21', num: '21', level: 'wise', title: 'Using AI wisely', sub: 'Asking well, honestly, with your grown-ups',
  patch: { name: 'Wise Raven', icon: 'feather', color: '--patch-15' },
  idea: R`
<p>AI tools can be great helpers: explaining ideas, brainstorming stories, or quizzing you for a test. You already have sharp eyes. Here are three habits that make you a wise user too.</p>
<ul>
<li><b>Use AI with a grown-up.</b> Many AI apps are made only for teens or adults, often 13 or older, and some for 18 or older. Ask a grown-up which tools are okay for you.</li>
<li><b>Be honest about your work.</b> If AI helped you, say so. If a teacher asks for your own writing, write it yourself, and ask what kind of help is allowed.</li>
<li><b>Ask well.</b> Remember prompts from lesson 4? A clear prompt gets a better answer. Say who it's for, what job you want done, and how you want the answer. Then add an honesty check: ask it to tell you when it isn't sure.</li>
</ul>
<p>Last, make your family's own AI rules together: which tools are okay, what never to share, when to ask a grown-up, and how you'll test a chatbot before you trust it (lesson 18). You can use everything you've learned on this trail.</p>`,
  labIntro: R`<p>Build a great prompt in my workshop, piece by piece, and watch the example answer change. Then write a prompt of your own, and check it for all four parts.</p>`,
  lab: [{ w: 'promptBuilder' }],
  quests: [
    { id: 'prompt', text: R`In the Prompt workshop, build a prompt with all four parts.`, check: ev => ev.type === 'prompt' && ev.parts === 4 },
    { id: 'own', text: R`Under <b>Your turn</b>, write your own prompt for the job. Tick the parts it really has. Can you get all four?`, check: ev => ev.type === 'prompt-own' && ev.words >= 12 && ev.parts >= 4 }
  ],
  field: [
    { text: R`Make a family AI rules card together: which tools are okay, what never to share, and when to ask a grown-up. Keep it next to wherever you use your tablet or computer.`, gu: true },
    { text: R`Practise a four-part prompt out loud: ask a family member a question that says who it's for, the job, how you want the answer, and to tell you if they're not sure. Did you get a better answer?` },
    { text: R`With a grown-up, try a four-part prompt and a vague prompt in a chatbot. Compare the answers.`, gu: true, opt: true }
  ],
  compare: R`<p>Asking well works on people too! "Can you help me?" is hard to answer. "Can you help me find a book about wolves, for a beginner?" is easy. Clear questions get better answers, from anyone.</p>`,
  quiz: [
    { q: 'What makes a prompt better?', a: ['Saying who it\'s for and what you want', 'Using as few words as you possibly can', 'TYPING IT ALL IN CAPITALS'], c: 0, why: 'Clear and specific gets better answers.', hint: 'Remember the four parts.' },
    { q: 'Your teacher asks for a story in your own words. What should you do?', a: ['Write it yourself, and ask what help is okay', 'Let a chatbot write it, then change a few words'], c: 0, why: 'Honesty first, and ask what\'s allowed.', hint: 'Whose words does your teacher want?' },
    { q: 'Your friend wants to use a new AI app that says "13 and older". You\'re 10. What\'s smart?', a: ['Ask a grown-up first', 'Use it anyway, nobody will know', 'Change your age to 13'], c: 0, why: 'Age rules are there for a reason. A grown-up can help you find a tool that\'s okay for you.', hint: 'Who decides which tools are okay?' },
    { q: 'Why add "If you\'re not sure, say so" to a prompt?', a: ['So it tells you when it might be wrong', 'So it answers your question faster', 'So it uses big words to sound smart'], c: 0, why: 'Chatbots can sound sure when they\'re wrong. This asks for honesty.', hint: 'Remember made-up facts.' }
  ],
  notes: R`<p>Check each app's age rules: many require users to be at least 13, some 18, and a few offer supervised accounts for younger children. Review privacy settings together (chat history, memory, and whether chats may be used for training). The prompt workshop says who the answer is for ("simple words, for a beginner") instead of giving an age; personal details aren't needed for a good answer. The "Your turn" box is self-checked: your child ticks the parts their own prompt has. This lesson is a good moment to agree on house rules.</p>`
});

/* ---------------------------------------------------------- 22 */
LESSONS.push({
  id: 'l22', num: '22', level: 'big', title: 'The journey of a question', sub: 'Everything you learned, together',
  patch: { name: 'Full Moon', icon: 'moon', color: '--patch-16' },
  idea: R`
<p>You've learned how chatbots work, how they go wrong, and how to use them well. Let's put it all together, and follow one question from your screen to a giant chatbot and back.</p>
<p>Your question travels through your device and across the internet to a data center full of GPUs. A tokenizer chops everything in the window into tokens: the app's hidden instructions, the chat so far, any saved notes, and your question. Each token becomes a spot on a giant word map. Layer after layer, attention links the tokens together and billions of knobs work on the numbers. Out come chances for every possible next token, the dice pick one, and the loop runs again, one token at a time. Sometimes, partway through, the model asks for a tool, like a web search, and the result goes into the window too. Then the answer travels back to you.</p>
<p>And wherever an answer comes from, keep asking the questions that make you wise:</p>
<ul>
<li><b>Where did this come from?</b> Follow the tracks.</li>
<li><b>Who might be missing?</b></li>
<li><b>Is it telling me what I want to hear?</b></li>
<li><b>Should a person check this first?</b></li>
<li><b>Am I doing my own thinking?</b></li>
</ul>`,
  diagram: INSIDE_GIANT,
  labIntro: R`<p>Two last puzzles before we go beyond words. First, put the journey of a question in order. Then judge a whole chat between a kid and a pretend chatbot, using everything you've learned.</p>`,
  lab: [{ w: 'journey' }, { w: 'judgeChat' }],
  quests: [
    { id: 'order', text: R`Put all ten steps of the journey in order.`, check: ev => ev.type === 'journey' },
    { id: 'clean', text: R`Do it with two mistakes or fewer.`, check: ev => ev.type === 'journey' && ev.mistakes <= 2 },
    { id: 'judge', text: R`In <b>Judge this chat</b>, judge every one of ChatPal's answers.`, check: ev => ev.type === 'judge-chat' },
    { id: 'six', text: R`Get at least six of the seven right.`, check: ev => ev.type === 'judge-chat' && ev.score >= 6 }
  ],
  field: [
    { text: R`Draw the journey as a comic strip, from your screen to the data center and back. Put Byte, Noodle and Echo in it!` },
    { text: R`Teach it: explain to a grown-up how a chatbot answers a question, using the words <em>token</em>, <em>prediction</em> and <em>context window</em>.` },
    { text: R`Visit <b>The Nest</b> (at the top of the page) and feed Echo your own writing. Can you make Echo sound like you?` }
  ],
  compare: R`<p>You and a chatbot can both answer questions, in very different ways. You learn from your senses, your feelings and your life, and you can go and check what's true. A chatbot builds its answers from patterns in what it read, one token at a time. Scientists are still studying how much it really understands. Knowing the difference is the wisest skill of all.</p>`,
  quiz: [
    { q: 'What happens first after you press Send?', a: ['Your words travel across the internet', 'The model picks the very last token of its answer', 'The answer appears on your screen'], c: 0, why: 'First the message has to get to the data center.', hint: 'Where is the giant model?' },
    { q: 'What does the model read before it answers?', a: ['All the text in its window', 'Only your last word', 'The whole internet, live'], c: 0, why: 'Hidden instructions, the chat so far, saved notes and your question: the whole window, every time.', hint: 'Remember lesson 7.' },
    { q: 'Which part picks the next token from the chances?', a: ['The dice roll', 'The word map', 'The tokenizer'], c: 0, why: 'The chances are rolled like weighted dice. That\'s sampling, from lesson 6.', hint: 'Remember temperature.' },
    { q: 'A chatbot answers your question and links to a book you\'ve never heard of. Which wise question fits best?', a: ['Where did this come from?', 'Am I doing my own thinking?', 'Who might be missing?'], c: 0, why: 'Follow the tracks: open the source, and make sure it exists and says the same thing.', hint: 'Can you follow the tracks to that book?' },
    { q: 'How does the answer get written?', a: ['One token at a time, in a loop', 'All at once, from a saved file'], c: 0, why: 'Look, guess, pick, add, repeat.', hint: 'Remember the loop from lesson 6.' }
  ],
  notes: R`<p>The journey leaves out some steps real apps add, such as safety checks on questions and answers. Judge this chat pulls together lessons 12 (made-up facts), 15 (the yes-bot), 17 (sneaky notes), 18 (sources) and 20 (coach or crutch); two of ChatPal's answers are fine, so it isn't just "spot what's wrong". After this lesson, Level 8 goes beyond words, to AI that makes pictures, looks at photos, and makes videos and voices.</p>`
});
