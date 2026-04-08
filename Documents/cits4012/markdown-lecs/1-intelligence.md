# So What is 'AI and Adaptive Systems'?
## Part 1: Intelligence

*© Siwen Luo, UWA — University of Western Australia*

---

## Slide 2: Let's Start with AI…

*(Illustrative image of human-robot interaction)*

---

## Slide 3: What is AI?

**Let's ask a so-called AI…**

**You:** What is AI?

**ChatGPT:**
> AI, or artificial intelligence, refers to the simulation of human intelligence processes
> by machines, especially computer systems. These processes include learning (the
> acquisition of information and rules for using the information), reasoning (using
> rules to reach approximate or definite conclusions), and self-correction. AI
> encompasses a wide range of technologies and applications, from basic rule-based
> systems to advanced machine learning algorithms that can analyze vast amounts of
> data and make predictions or decisions autonomously. AI is utilized in various fields
> such as healthcare, finance, transportation, gaming, robotics, and many others, with
> the aim of improving efficiency, productivity, and innovation in diverse domains.

**Annotations/critiques on the response:**
- *"necessary?"* — is simulation of human intelligence processes necessary?
- *"Use case, not determined by 'intelligence'"* — applications listed are use cases
- *"adaptation?"* — self-correction ≠ adaptation necessarily
- **Rating: OK, 6/10?**

---

## Slide 4: Four Quadrants of AI

**One useful (traditional) way of conceptualising intelligence:**
Russell & Norvig, *Artificial Intelligence: A Modern Approach*
                    Thinking
                       ▲
                       │
"The automation of      │    "The study of mental faculties
activities that we      │    through the use of computational
associate with human    │    models"
thinking, activities    │    (Charniak and McDermott, 1985)
such as decision-       │
making, problem-        │
solving, learning [...]"│
(Bellman, 1978)         │
│
Humanly ◄──────────────────┼──────────────────► Rationally
│
"The study of how to    │    "AI [...] is concerned with
make computers do       │    intelligent behaviour in artifacts".
things at which, at     │    (Nilsson, 1998)
the moment, people      │
are better".            │
(Rich and Knight, 1991) │
│
▼
Acting

---

## Slide 5: A (Very) Short History of AI…

**Revolution: The First 2000 Years of Computing**
Computer History Museum, California USA

*(Reference to CHM exhibit on AI & Robotics)*

---

## Slide 6: Questions to Think About While Watching…

- What does it mean to exhibit *intelligence*?
- Can you *test* for it? If so, how?
- Do we "know it when we see it"?
- Is intelligence about *being*, or about *doing*? Is "being intelligent" observable? Is "doing" enough?
- Can something be both mechanistic/deterministic, and intelligent? Are humans deterministic?
- If not, what would be the basis of non-determinism? Randomness? Consciousness?
- Which is more intelligent, my dog or my computer?
- Are human symbolic reasoning capabilities required for intelligence?
- Does intelligence have anything to do with being "human-like" at all?
- Will AI inevitably "take over"? And what might that look like?

*(Images: "Intelligent air conditioner" — Sensibo Sky product; "Banjo deep in thought" — dog at sunset)*

---

## Slide 7: A (Very) Short History of AI…

**Revolution: The First 2000 Years of Computing**
Computer History Museum, California USA

*(Image: Alan Turing and early computing hardware — captioned "communicating with a hidden human and a hidden machine")*

---

## Slide 8: What is Intelligence? — The Turing Test

- **0:50** *"Today, intelligent machines are all around us"*
  - but are they? (intelligent that is)
  - *"doing things that mimic human senses, and brain power"*
  - *performative* tests

- **1:35** Alan Turing and the **Turing Test**
  - most famous performative test for "intelligence"!
  - but we saw many others — chess, translating, driving

> ➡ *Do you think ChatGPT and its successors would pass the Turing test — for conversation, at least?*

*(Optional viewing: Any number of YouTube videos on the Turing Test and whether AIs pass it.)*

---

## Slide 9: What is Intelligence? — Philosophy

- **2:10** Simon and Newell (and the other guy)

  > "We understand how a system composed of *matter* can have the properties of *mind*"
  > — Herb Simon (social scientist, Nobel Prize in economics) c. 1955

  - machine capable of logical thought (Logical Theorist)
  - using a symbol system (one of the things said to distinguish humans from animals!)
  - ➡ **symbolic AI**
  - is this a more authentic version of "intelligence" (than, say, LLMs)?
  - Simon's claims didn't stop there:

  > *"We invented a computer program capable of thinking non-numerically, and thereby solved the venerable mind/body problem"*

  - mind-body problem, philosopher René Descartes, 17th Century

*(Image: Descartes' diagram of the mind-body problem)*

---

## Slide 10: What is Intelligence? — Advanced Computers?

- **2:40** Birth of the term *"Artificial Intelligence"*, Dartmouth, **1956**
- **3:30** New (logic-based) computing *languages*, and *machines*!
  - sound familiar? Nvidia's market cap hit ~~$US3.41 trillion~~ **$US6.63 trillion** last week!

**Example Lisp code (from a Symbolics 3640 Lisp machine):**

```lisp
(defun example-count (predicate list)
  (let ((count 0))
    (dolist (i list count)
      (when (funcall predicate i)
        (incf count)))))
```

*(Image: Symbolics 3640 Lisp machine — Wikipedia)*

---

## Slide 11: What is Intelligence? — Bold Predictions!

- **4:00** Marvin Minsky, 1967:
  > "Within a generation… the problem of creating 'artificial intelligence' will substantially be solved."

- **5:30** John McCarthy, 2006 (described as "best understated quote ever!"):
  > "The main reason the 1956… workshop didn't live up to my expectations is that AI is harder than we thought." 😂

---

## Slide 12: What is Intelligence? — Domain Expertise?

- **5:30** Expert Systems
  - purportedly saved companies millions
  - were set to change the (white collar) workplace forever *(sound familiar?!)*

- **6:10** Cyc — the grandest AI project never to succeed?
  - has it now been rendered obsolete by LLMs?

- **6:30** Uncertainty/Incompleteness
  > "Programming for intelligence refocused again, inventing ways to deal with the probabilities in the *messy uncertain real world*, and teaching computers to get much better at *learning* from their experiences"

  → **hop on board!**

---

## Slide 13: What is Intelligence? — Huh, say what?

- **6:50** "Today logic, knowledge and learning are deeply embedded in machines"
  - *Are they?*

- **7:05** Mayer (Google):
  - "It used to be that AI was all about decision trees". *Was it???*
  - "Now you can program it using brute force. Because when you have brute force computation and a lot of data, you can make things *appear* intelligent"
    - (a Google world view?)
    - note **"appear"**

---

## Slide 14: What is Intelligence? — Finish with Some Big Hitters…

- **7:35** Koller:
  > *"…better at some tasks and not as good at others, but that doesn't make it unintelligent. It just makes it not human"*

- **7:40** McCarthy:
  > *"We relate intelligence to the ability to do certain things, independently of whether what does it is human, or a Martian, or a mechanism"* (performative)

- **8:00** Nilsson:
  > *"…eventually, they will in fact achieve human-level intelligence"*

- **8:20** Feigenbaum:
  > *"The thing we call AI, computers doing intelligent things, is the manifest destiny of computer science"*

  → **so I guess you're in the right place!**

---

## Slide 15: But today it's clearer, we have AIs, right?
### You know — LLMs/GenAI, we're told they're intelligent?

- UWA even has a policy on the use of AI, so there must be AIs?
- No doubt the new LLMs are impressive! But are they *intelligent*?

  > *"For all of their personality, LLMs have more in common with the predictive text on your phone than the principles that generate knowledge using the squishy grey matter inside our heads."*
  > — ScienceAlert, 23 February 2025

  - Is that fair?
  - (Anyway, is predictive text intelligent?)

- One trait of intelligence might be *internal consistency*. Let's try it on a topical question…
  - Are "convolutional neural networks" (CNNs, aka "Deep Learning") even neural networks?
  - And do they even use convolution?
  - I asked Gemini….

---

## Slide 16: Gemini Exchange — Do CNNs Use Convolution?

**User:** Do CNNs use convolution?

**Gemini:**
> Yes, CNNs (Convolutional Neural Networks) absolutely use convolution as their fundamental building block. In fact, the "convolutional" in their name comes directly from this operation.
>
> Here's a breakdown of why convolution is so crucial in CNNs:
> - **Feature Extraction:** Convolutional layers use small matrices called "kernels" or "filters" to slide across the input data (like an image). These kernels detect specific patterns or features…

**User:** But don't they actually use cross correlation, not convolution?

**Gemini:**
> You're absolutely right to bring this up! It's a common point of confusion.
>
> While CNNs are named after "convolution," they actually use **cross-correlation** in their implementation.
>
> Here's the key difference:
> - **Convolution:** Involves flipping the kernel before sliding it across the input.
> - **Cross-correlation:** Slides the kernel directly across the input without flipping it.
>
> **Why the confusion?**
> - **Terminology:** The term "convolution" is often used loosely in deep learning to refer to the operation in CNNs, even though it's technically cross-correlation.

**Mathematical clarification:**

Standard discrete **convolution**:

$$
(f * g)[n] = \sum_{k=-\infty}^{\infty} f[k]\, g[n - k]
$$

Standard **cross-correlation**:

$$
(f \star g)[n] = \sum_{k=-\infty}^{\infty} f[k]\, g[n + k]
$$

The key difference: convolution flips (reverses) the kernel $g$, whereas cross-correlation does not.

---

## Slide 17: The Infinite Monkey Theorem and a Thought Experiment…

*(Cartoon 1: Monkeys at typewriters — "It might not be Shakespeare, but I just wrote a pretty good sonnet about bananas.")*

*(Cartoon 2 — three panels:*
- *"Well? What do you think of my new poem?"*
- *"I once read that given infinite time, a thousand monkeys with typewriters would eventually write the entire works of Shakespeare."*
- *"But what about MY poem?" → "Three monkeys, ten minutes.")*

---

## Slide 18: More Data, More Compute, More Parameters…

**Total compute used to train notable AI models**, measured in total FLOP (floating-point operations) | Logarithmic scale

$$
\text{Training Compute} \propto 10^{N}, \quad N \in [0, 25+]
$$

*(Chart: Log-scale plot of training compute (FLOP) vs. release date from 1950–2025, showing exponential growth. Key models labelled include: Theseus, Perceptron Mark I, Pandemonium, Neocognitron, Innervator, Fuzzy NN, NetTalk, TD-Gammon, NPLM, AlexNet, Dropout, AlphaGo Lee, MoE, GPT-1, AlphaFold, GPT-2, AlphaGo Zero, OpenAI Five, DALL-E, GPT-3, Llama 2, Claude 2, PaLM, Minerva, GPT-4, Gemini.)*

**Pre Deep Learning Era:**
- Training Compute Doubling Time: **21.6 months**

**Deep Learning Era:**
- Training Compute Doubling Time: **6.0 months**

> "Computing Power and the Governance of Artificial Intelligence", Sastry et al., Feb 2024.
> [https://arxiv.org/pdf/2402.08797](https://arxiv.org/pdf/2402.08797)

- That's a whole lotta monkeys! Is it intelligence?
  - What if I train the monkeys for intermediate tasks (filters)?
  - What if I selectively breed the monkeys?

---

## Slide 19: From NSW Chief Scientist!

> The frenzy of discourse on generative AI had drawn focus from decades of work on other AI projects conducted without large language models, and seemed to have obscured the fact that Australia had underinvested in the area, the Chief Scientist of NSW Hugh Durrant-Whyte said.
>
> ….
>
> *"There is a whole area of AI where people are doing great work with AI which are making a profound impact of what we are doing in research and teaching but they are not large language models.*
>
> *"By the end of this year we will fall off a cliff with LLMs and people will realise what they are good and are not good for."*

— Prof. Hugh Durrant-Whyte, Universities Australia conference, 25th February 2025

---

## Slide 20: What is Intelligence? — So Now Everyone is Talking About AGI..?

**Has the hijack of "AI" by big tech meant new terms are needed?**

> *Levels of AGI for Operationalizing Progress on the Path to AGI*, M. Morris, J. Sohl-Dickstein, N. Fiedel, T. Warkentin, A. Dafoe, A. Faust, C. Farabet, S. Legg, arXiv:2311.02462v4 [cs.AI] 5 Jun 2024

| **Performance** (rows) × **Generality** (columns) | **Narrow** — *clearly scoped task or set of tasks* | **General** — *wide range of non-physical tasks, including metacognitive tasks like learning new skills* |
|---|---|---|
| **Level 0: No AI** | Narrow Non-AI: calculator software; compiler | General Non-AI: human-in-the-loop computing, e.g., Amazon Mechanical Turk |
| **Level 1: Emerging** — *equal to or somewhat better than an unskilled human* | Emerging Narrow AI: GOFAI (Boden, 2014); simple rule-based systems, e.g., SHRDLU (Winograd, 1971) | **Emerging AGI**: ChatGPT (OpenAI, 2023), Bard (Anil et al., 2023), Llama 2 (Touvron et al., 2023), Gemini (Pichai & Hassabis, 2023) |
| **Level 2: Competent** — *at least 50th percentile of skilled adults* | Competent Narrow AI: toxicity detectors such as Jigsaw (Das et al., 2022); Smart Speakers such as Siri (Apple), Alexa (Amazon), or Google Assistant (Google); VQA systems such as PaLI (Chen et al., 2023); Watson (IBM); SOTA LLMs for a subset of tasks (e.g., short essay writing, simple coding) | **Competent AGI**: not yet achieved |
| **Level 3: Expert** — *at least 90th percentile of skilled adults* | Expert Narrow AI: spelling & grammar checkers such as Grammarly (2023); generative image models such as Imagen (Saharia et al., 2022) or Dall-E 2 (Ramesh et al., 2022) | **Expert AGI**: not yet achieved |
| **Level 4: Virtuoso** — *at least 99th percentile of skilled adults* | Virtuoso Narrow AI: Deep Blue (Campbell et al., 2002), AlphaGo (Silver et al., 2016; 2017) | **Virtuoso AGI**: not yet achieved |
| **Level 5: Superhuman** — *outperforms 100% of humans* | Superhuman Narrow AI: AlphaFold (Jumper et al., 2021), AlphaZero (Silver et al., 2018), StockFish (Stockfish, 2023) | **Artificial Superintelligence (ASI)**: not yet achieved |

---

## Slide 21: What is Intelligence? — From Turing Test to Human Cognitive Tests?

**What about human psychology/cognitive tests?**
- e.g., *Montreal Cognitive Assessment* (MoCA) score

**Reading:**
- R. Dayan, B. Uliel, and G. Koplewitz, "Age against the machine—susceptibility of large language models to cognitive impairment: cross sectional analysis", *BMJ* 2024; 387:e081948 doi:10.1136/bmj-2024-081948

**MoCA Score Comparison (bar chart):**

| Model | MoCA Score (approx.) |
|---|---|
| ChatGPT 4 | ~26 |
| ChatGPT 4o | ~25 |
| Claude | ~23 |
| Gemini 1.5 | ~22 |
| Gemini 1 | ~17 |
| MCI threshold | ~26 (reference line) |

*(MCI = Mild Cognitive Impairment threshold)*

---

## Slide 22: The Philosophical Debate Continues…

*(Image: Comparative primate skeleton diagram — Gibbon, Orang, Chimpanzee, Gorilla, Man)*

Reproduced from: *Anthropocentrism: Humans, Animals, Environments*
Rob Boddice, Ed., Brill, 2011

> "With a principal focus on ethical questions concerning animals, the environment and the social, the essays ultimately cohere around **the question of the non-human**, *be it animal, ecosystem, god, or machine*."

---

## Slide 23: Artificial Intelligence and Adaptive Systems

- There is a fascinating role for the study of what makes humans "intelligent", and whether that can be achieved artificially
- For many though, the goal is, and always has been, about how to enable computers to do more stuff that is:
  - useful
  - beyond their existing capabilities
  - really cool!
- Might be thought of as an "*engineering*" view
  - ➡ **this view is largely taken in this unit**

> *OK, but why the "Adaptive Systems" part..?*

*(Image: Walrod Art — robot in "Thinker" pose with caption "Sometimes the solution to our problem is right under our olfactory sensory nodules.")*