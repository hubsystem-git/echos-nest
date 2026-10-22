# Echo's Nest

A field guide to AI for curious kids of about 9 to 12. Kids find out how chatbots really work by teaching Echo, a baby raven, to talk. Echo is a real (very small) language model that runs in the browser. Everything Echo says comes from the books the child chooses for it to read.

**Open it:** https://hubsystem-git.github.io/echos-nest/

It works on iPhone and iPad (iOS 15 or later) and on any computer with an up-to-date browser. There are no accounts, no ads and no tracking. After the first visit it also works offline.

## What's inside

There are 25 lessons in eight levels. Each lesson has:

- a short reading from Byte, the wolf,
- hands-on tools in the Nest, run by Noodle, the snake,
- quests,
- a "field mission" to do away from the screen,
- a quick check.

Finishing a lesson earns a patch, and there are 25 patches to collect.

| Level | Lessons |
|---|---|
| 1 · Hatching | 1 What is AI? · 2 Meet Echo |
| 2 · Listening | 3 Guess what comes next · 4 Learning from examples *(including recommendation feeds)* |
| 3 · Talking | 5 Tokens · 6 One word at a time *(the loop, the dice, and temperature)* · 7 How far back it looks *(copying, context windows and memory)* |
| 4 · Inside the Brain | 8 Knobs that learn · 9 Word maps · 10 Paying attention · 11 From Echo to a giant |
| 5 · Sharp Eyes | 12 When AI gets it wrong *(made-up facts, and how to "follow the tracks")* · 13 The big bad wolf *(bias)* · 14 Poisoned books *(data poisoning)* · 15 The yes-bot *(AI that tells you what you want to hear)* · 16 Echo can't keep a secret *(privacy)* · 17 AI that does things *(tools, agents, and sneaky instructions)* |
| 6 · Wise Wings | 18 Show me your sources · 19 Is it my friend? *(chatbots that sound caring, hooks and red flags)* · 20 Your brain, your work *(a coach, not a crutch)* · 21 Using AI wisely *(asking well, honesty, age rules)* |
| 7 · The Big Picture | 22 The journey of a question *(and judging a whole chat)* |
| 8 · Beyond Words | 23 Pictures from noise *(how picture AIs paint)* · 24 AI that sees *(photos as numbers, and how seeing AIs get fooled)* · 25 Videos and voices *(video, speech, and deepfakes)* |

Levels 2 to 4 explain how a chatbot works, Level 5 is about how it goes wrong, and Level 6 is about using it well. Lessons about a problem point back to the lesson that explains its cause. Level 7 follows one question through everything, and Level 8 goes beyond words, to AI that makes pictures, looks at photos, and makes videos and voices.

Before some experiments, a "Make a prediction" card asks the child to guess what will happen. Quiz answers are shown in a fixed mixed-up order with no pattern, and a wrong answer gets a hint.

Outside the lessons:

- **The Library** has the books Echo can read: Wolf Facts, Snake Facts, Raven Facts, Forest Tales, Computer Notes, Captain Caw's Log and Fairy Tales. The child can also write their own. Two more books sit on shelves of their own: Secret Wolf Facts, poisoned on purpose, and Pebble's Diary, kept private with its secrets covered until the child chooses to uncover them.
- **The Nest** is a free-play space for training Echo on any mix of books.

## Put it on an iPhone or iPad

1. Open https://hubsystem-git.github.io/echos-nest/ in **Safari**.
2. Tap **Share**. On newer versions of iOS, Share may be inside the **⋯** menu next to the address bar.
3. Scroll down and tap **Add to Home Screen**.
4. Leave **Open as Web App** on, and tap **Add**.

Echo's Nest then opens full screen from its own icon, like an app.

**Use the Home Screen icon for everyday use, not a Safari tab.** Safari and the Home Screen app keep separate progress. Safari can also delete a website's saved data if the site isn't opened for 7 days of Safari use. A Home Screen web app keeps its own data ([WebKit](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)).

## Progress and backup codes

Progress is saved only in the browser on that device. Nothing is sent anywhere: there's no server, no account and no analytics. If the device's website data is cleared, or the child moves to another device, the progress is gone unless there's a backup.

On the home page, **Keep your progress safe** makes a backup code. It's one long line of text that holds everything:

- patches and quests,
- the ranger name,
- the Nest's settings,
- anything the child wrote for Echo.

To keep a code, tap **Share** or **Copy** and paste it into Notes or a message to yourself. To restore, paste the code into the box below and confirm. Restoring replaces the progress on that device, and right afterwards there's a button to undo it. Make a fresh code every so often, since each code only holds the progress made up to that point.

To wipe the guide's saved data from a device, for example before passing an iPad on, use **Erase everything** at the bottom of the same section. It asks first, then removes everything the guide saved there: progress, ranger name, writing and settings. It doesn't touch anything else saved in the browser.

## For grown-ups

- **Grown-up notes**, the switch in the top bar, adds a note for adults to each lesson. The notes cover what's simplified, the real research behind it, and ideas for talking it over.
- Field missions marked **With a grown-up** are meant to be done together, for example trying a real chatbot.
- Echo can only reuse words and sentences from the books it reads, and from whatever the child writes for it. It can't produce anything from outside them. The other chatbots and helpers (in lessons 7, 12, 15, 17, 18, 19, 20 and 22) are scripted pretend bots, and the guide labels them that way.
- In lesson 25, Echo can read a sentence aloud. It only uses a voice built into the device, so nothing is sent anywhere. On a device without one, that optional quest can be skipped.
- **Secret Wolf Facts** is a book of deliberate fibs, used in lesson 14 to show how data poisoning works. It sits on its own shelf, is marked wherever it appears, and Echo only reads it when the child switches it on.
- **Pebble's Diary** is made up, for the privacy lesson (16). Echo only reads it in that lesson's lab. In the Library it sits on a "Kept private" shelf with its secrets covered.

## Turning on GitHub Pages (one time)

1. In this repository, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Choose the **main** branch and the **/ (root)** folder, then **Save**.
3. After a minute or two, the guide is live at https://hubsystem-git.github.io/echos-nest/.

The site is plain static files. The empty `.nojekyll` file tells Pages to serve them as they are.

## Changing the guide

Edit the files in `src/`, then rebuild from the repository's top folder:

```sh
python3 src/build.py
```

This needs Python 3 and Node.js. It does three things:

- bundles everything into `index.html`, with scripts, styles and fonts inlined,
- writes `sw.js` and `manifest.webmanifest`,
- copies the font licenses into `licenses/`.

Commit the rebuilt files along with the sources, because Pages serves them as they are. Each build gives the offline copy a new version name. An installed copy opens its saved version straight away and checks for a new one in the background. The new version takes over at the next page change, or the next time the guide opens.

To redraw the app icons, which is only needed if the raven drawing changes, run `python3 src/make_icons.py`. It needs Python Playwright with Chromium, and Pillow.

| Where | What |
|---|---|
| `index.html` | The whole guide in one file (built) |
| `sw.js`, `manifest.webmanifest`, `icons/` | Offline support and the Home Screen icon (built) |
| `src/content1.js` to `src/content5.js` | Lesson text, quests, quizzes and grown-up notes, one or two levels per file |
| `src/glossary.js` | What each marked word means |
| `src/library.js` | The books Echo can read |
| `src/engine.js` | Echo: a small n-gram language model, and the tokenizer |
| `src/widgets1.js` to `src/widgets6.js`, `src/reader.js` | The hands-on tools and the reading window |
| `src/app.js` | Pages, progress, patches and backup codes |
| `src/style.css` | Styles, for light and dark mode |
| `src/build.py`, `src/make_bpe.js`, `src/make_icons.py` | Build scripts |

## Fonts

Bree Serif, Atkinson Hyperlegible Next and Atkinson Hyperlegible Mono are used under the SIL Open Font License 1.1. The license texts are in `licenses/`.
