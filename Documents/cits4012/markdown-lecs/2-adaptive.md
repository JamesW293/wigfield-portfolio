# So What is 'AI and Adaptive Systems'?
## Part 2: Adaptation

*© Siwen Luo, UWA — University of Western Australia*

*(Cover image: illustration of a school of small fish forming the shape of a large fish, swimming above a coral reef seabed)*

---

## Slide 2: Artificial Intelligence and Adaptive Systems

- There is a fascinating role for the study of what makes humans "intelligent", and whether that can be achieved artificially
- For many though, the goal is, and always has been, about how to enable computers to do more stuff that is:
  - useful
  - beyond their existing capabilities
  - really cool!
- Might be thought of as an "*engineering*" view
  - ➡ **this view is largely taken in this unit**

> *OK, but why the "Adaptive Systems" part?*

*(Image: Walrod Art — robot in "Thinker" pose captioned "Sometimes the solution to our problem is right under our olfactory sensory nodules.")*

---

## Slide 3: Crisp, Clean AI

- Some students may have done some more "deterministic" AI in the *CITS3001 Algorithms and AI* unit (now *CITS3011 Intelligent Agents*)
  - well described *states*
  - well-defined *actions* move from state to state
  - *goal* state
  - *utility function*
  - (deterministic) *search*
  - works great in artificial worlds, e.g.:
    - games worlds
    - Shakey's world (to some extent)

*(Image: Shakey the Robot — labelled diagram showing components: Antenna for Radio Link, Television Camera, Range Finder, On-Board Logic, Camera Control Unit, Bump Detector, Caster Wheel, Drive Motor, Drive Wheel)*

---

## Slide 4: It's Not All About Chess…

- The real world is not like a chess board — it's "messy"
- Require:
  - deal with *uncertainty, ambiguity, unknown*
  - deal with a *changing world*
  - deal with *approximation*
  - *pliant* vs brittle (resilience)
  - *graceful degradation*
- Traditional computing is very bad at these!

*(Images: Book cover — Garry Kasparov, "How Life Imitates Chess"; IEEE Spectrum cover — "Why Is AI So Dumb?")*

---

## Slide 5: Inspiration from Nature

*uncertainty, ambiguity, unknowns, change, approximation, resilience,…*

- But **Nature** is very good at this!
  - individuals (short term — learning, physical adaptation)
  - populations/species (long term — evolution)
    - ➡ *take lessons from nature, bring them into computing!*
- Key trait — ability to **adapt** to a changing, emergent environment

*(Image: Okapi in forest — captioned "Okapi have scent-glands on their feet." and "The okapi is one of the oldest mammals on earth." — Jens Meyer/AP)*

---

## Slide 6: Adaptation

*Source: "Frogs that can freeze their bodies and 6 other crazy ways that animals survive their treacherous environments", Molly Sequin, Insider*

**Antarctic fish have "antifreeze" proteins in their blood.**
- Some fish can prevent their blood from freezing. *(David Loh/Reuters)*

**Kangaroo rats survive without ever drinking water.**
- A kangaroo rat listening for predators at night in the desert. *(Andy Teucher/Getty)*

**Cuttlefish blend into their surroundings.**
- A cuttlefish blending into its surroundings in the Celebes Sea. *(David Loh/Reuters)*

**Wood frogs freeze their bodies.**
- A wood frog in the Medvednica mountain forest. *(Nikola Solic)*

---

## Slide 7: Adaptation in Nature

*uncertainty, ambiguity, unknowns, change, approximation, resilience,…*

### Mechanisms

Learning and evolution are the "biggies" but actually it's a lot more nuanced…

- Can consider two axes:

  **Axis 1 — Timespan:**

  $$\text{short term (individual lifespan)} \longleftrightarrow \text{long term (species)}$$

  **Axis 2 — Scope:**

  $$\text{individual} \longleftrightarrow \text{population}$$

---

## Slide 8: Adaptation in Nature — Mechanisms: Short Term

*uncertainty, ambiguity, unknowns, change, approximation, resilience,…*

### Mechanisms — short term

- **learning**
  - individual, lifespan
  - however! — invention of language (storytelling) and writing (pictures, books, computers…) broadens learning to populations, and extends learning beyond lifespans [one of the key things said to differentiate humans from other animals]

- **physical adaptation** (good diet, training, running from mammoths…)
  - individual, lifespan (mostly)
  - carry over from generation to generation (healthy parents, healthy child etc)

---

## Slide 9: Adaptation in Nature — Mechanisms: Long Term

*uncertainty, ambiguity, unknowns, change, approximation, resilience,…*

### Mechanisms — long term

- **evolution**
  - species, millennia
  - though technology is even starting to change this (genetic mapping, modification, treatments, etc)

---

## Slide 10: Adaptation in Nature — Mechanisms: Short and Long Term

*uncertainty, ambiguity, unknowns, change, approximation, resilience,…*

### Mechanisms — short and long term

- **collective behaviour, emergent behaviour**
  - population
    - short term — e.g. division of labour, pilots learn to fly in formation, etc
    - long term — e.g. bees, ants, birds, … and humans…
      - social behaviour outlives individuals

---

## Slide 11: A Less Anthropocentric View of "Intelligence"

- Perhaps our symbolic reasoning capability doesn't have all the answers!
- Alternative view — *intelligence* as:

  > *Development of the capabilities to survive/thrive in the environment in which the individual/group finds itself*

*(Images: EGO diagram — hierarchical pyramid with human at top, descending through animals; ECO diagram — circular arrangement of all species as equals)*

---

## Slide 12: From "Intelligence" to Adaptive Systems

**Paradigm shift in computing.**

Also known as…

*(Image: school-of-fish illustration repeated from cover slide)*

---

## Slide 13: *Computational Intelligence*

*(IEEE Computational Intelligence Society logo)*

### What is Computational Intelligence?

Computational Intelligence (CI) is the theory, design, application and development of biologically and linguistically motivated computational paradigms. Traditionally the three main pillars of CI have been **Neural Networks**, **Fuzzy Systems** and **Evolutionary Computation**. However, in time many nature inspired computing paradigms have evolved. Thus CI is an evolving field and at present in addition to the three main constituents, it encompasses computing paradigms like ambient intelligence, artificial life, cultural learning, artificial endocrine networks, social reasoning, and artificial hormone networks. CI plays a major role in developing successful intelligent systems, including games and cognitive developmental systems. Over the last few years there has been an explosion of research on Deep Learning, in particular deep convolutional neural networks. Nowadays, deep learning has become the core method for artificial intelligence. In fact, some of the most successful AI systems are based on CI.

---

## Slide 14: Wikipedia(?) — Computational Intelligence

- Term *Computational Intelligence* coined circa **1990** (though its main components date back to at least the 1940s)

- "Generally, computational intelligence is a set of **nature-inspired computational methodologies** and approaches to address **complex real-world problems** to which mathematical or *traditional modelling can be useless* for a few reasons: the processes might be too complex for mathematical reasoning, it might contain some uncertainties during the process, or the process might simply be stochastic in nature…"

- "The methods used are close to the human's way of reasoning, i.e. it uses **inexact and incomplete knowledge**, and it is able to produce control actions in an **adaptive** way…"

- "…a system is called computationally intelligent if it deals with low-level data such as numerical data, has a pattern-recognition component and **does not use knowledge in the AI sense**, and additionally when it begins to exhibit computational **adaptively**, **fault tolerance**, **speed approaching human-like** turnaround and **error rates that approximate human performance**."

---

## Slide 15: The "Religious Wars" of AI

*(since the beginning…)*

### Symbolic vs Sub-symbolic

| **Symbolic** | | **Sub-symbolic** |
|---|---|---|
| Declarative | | Networks/connectionist |
| Rules | | Weights/parameters |
| Designed or learnt | | Learnt or evolved |
| More human interpretable | | Less human interpretable |

**Symbolic examples:**
- Logics
- Reasoning systems
- KBS (Knowledge-Based Systems)
- Planning systems
- Expert systems
- Grammar-based NLP
- Logic programming

**Bridging/Challenge zone:**
- Fuzzy logic
- Probabilistic logic
- *(Humans are really good at this!)*

**Sub-symbolic examples:**
- Neural networks
- Evolutionary Algorithms?
- Bayesian networks
- HMMs (Hidden Markov Models)
- LDA (Latent Dirichlet Allocation)
- SVMs (Support Vector Machines)
- Statistical NLP

---

## Slide 16: CI Activity

*(Images of journals and conferences in the CI field:)*
- *Computational Intelligence* journal (Wiley)
- *IEEE Computational Intelligence* magazine
- *International Journal of Computational Intelligence and Bioinformatics*
- *International Journal of Computational Intelligence and Telecommunication Systems*
- **2026 IEEE World Congress on Computational Intelligence** — 21–26 June 2026, MECC Maastricht, the Netherlands

*Sponsoring organisations: IEEE, IEEE Computational Intelligence Society, The International Neural Network Society (INNS), Evolutionary Programming Society (EPS), IET, Università degli Studi di Padova, Dipartimento Matematica*

---

## Slide 17: A.K.A. *Nature-Inspired Computing*

*(Conference banner: META 2026, 16th International Conference on Metamaterials, Photonic Crystals and Plasmonics — 14–17 July 2026, Dublin, Ireland)*

*(Springer book covers:)*
- *Heuristics for Optimization and Learning* — Farouk Yalaoui, Lionel Amodeo, El-Ghazali Talbi (Editors)
- *Nature-Inspired Computing and Optimization: Theory and Applications* — Srikanta Patnaik, Xin-She Yang, Kazumi Nakamatsu (Editors)
- *Frontiers in Nature-Inspired Industrial Optimization* — Mahdi Khosravy, Neeraj Gupta, Nilesh Patel (Editors)
- *Springer Tracts in Nature-Inspired Computing*

---

## Slide 18: Wikipedia — Natural Computing

- *Natural computing*, also called *natural computation*, is a terminology introduced to encompass three classes of methods:
  1. those that take **inspiration from nature for the development of novel problem-solving techniques**;
  2. those that are based on the use of computers to synthesize natural phenomena; and
  3. those that employ natural materials (e.g., molecules) to compute.

  The main fields of research that compose these three branches are **artificial neural networks**, **evolutionary algorithms**, **swarm intelligence**, artificial immune systems, fractal geometry, artificial life, DNA computing, and quantum computing, among others.

- Computational paradigms studied by natural computing are abstracted from natural phenomena as diverse as **self-replication**, the **functioning of the brain**, **Darwinian evolution**, **group behavior**, the **immune system**, the defining properties of life forms, cell membranes, and morphogenesis.

---

## Slide 19: A.K.A. *Soft Computing*

*An Introduction to Soft Computing, Software Agents and Soft Computing 1997*

### Soft Computing — Structure
                    Soft Computing
                   /              \
      Approximate Reasoning    Functional Approximation /
                                Randomized Search
           |                              |
 ┌─────────┴──────────┐       ┌───────────┴───────────┐
Probabilistic   Multivalued &    Neural          Evolutionary
Models        Fuzzy Logics    Networks          Algorithms

### Soft Computing Taxonomy
Soft Computing ──► Fuzzy Set ──────────────► Fuzzy Logic
│                       ├──► Fuzzy Number
│                       └──► Fuzzy Linguistic modelling
│
├──► Artificial Neural Network
│
├──► Evolutional Computing ──► Genetic Algorithm
│                         └──► Genetic Programming
│
└──► Swarm Intelligence ───► Particle Swarm Optimization
└──► Ant Colony Optimization

**Essential features of an intelligent machine** (Venn diagram):
- robust
- adaptive
- autonomous
- communicative

*(Source: Fig. 1 from "An Introduction to Soft Computing", Software Agents and Soft Computing 1997)*

---

## Slide 20: Adaptive Systems *(My preferred term)*

**Wikipedia…**

- An ***adaptive system*** is a set of **interacting or interdependent entities**, real or abstract, forming an **integrated whole that together are able to respond to environmental changes** or changes in the interacting parts, in a way analogous to either continuous physiological homeostasis or evolutionary adaptation in biology…

- A ***complex adaptive system*** is a system that is complex in that it is a dynamic network of interactions, but **the behavior of the ensemble may not be predictable according to the behavior of the components**. It is adaptive in that the **individual and collective behavior mutate and self-organize** corresponding to the change-initiating micro-event or collection of events.

➡ ***emergent behaviour***

**Complex Adaptive System diagram:**
Changing                                       Changing
External                                       External
Environment                                    Environment
│                                              │
│         ┌─────────────────────────┐          │
│  Info   │  Complex Adaptive       │  Info    │
└── Out ──►      Behaviour          ◄── In ────┘
│                         │
Positive        │      ┌──────────┐       │   Negative
Feedback        │      │ Emergence│       │   Feedback
(Amplifying) ───►      └────┬─────┘       ◄── (Dampening)
│           │             │
│    ┌──────▼──────┐      │
┌── In ────┤    │ Simple      ├──────┤── Out ──┐
│          │    │ Self-Org.   │      │         │
Changing        │    │ Local Rels  │      │    Changing
External        └────┴─────────────┴──────┘    External
Environment                                   Environment

---

## Slide 21: Sub-fields…

**Soft Computing taxonomy** (highlighted subset — the focus of this unit):
Soft Computing ──► Fuzzy Set ──────────────► Fuzzy Logic
│                       ├──► Fuzzy Number
│                       └──► Fuzzy Linguistic modelling
│
├──► Artificial Neural Network  ◄─────┐
│                                      │  [highlighted]
├──► Evolutional Computing ──► Genetic Algorithm
│                         └──► Genetic Programming
│
└──► Swarm Intelligence ───► Particle Swarm Optimization
└──► Ant Colony Optimization

*(Green bracket highlights: Artificial Neural Network, Evolutional Computing, and Swarm Intelligence as the core sub-fields covered)*

---

## Slide 22: Neural Networks

**Note**

- *Deep Learning / Convolutional Neural Networks* are just one, quite restricted — but very useful — class of artificial neural networks
  - filter banks

**Convolution Neural Network (CNN) architecture diagram:**
Input ──► [Kernel] ──► Convolution    Convolution    Convolution
+ ReLU    ──►  + ReLU    ──►  + ReLU    ──► Flatten ──► Fully        ──► Output
Pooling        Pooling        Pooling     Layer      Connected        (Horse 0.2)
Layer            (Zebra 0.7)
◄────────────── Feature Maps ────────────────►                            (Dog  0.1)
◄────────── Feature Extraction ──────────────► ◄── Classification ──►  SoftMax
Activation
Function /
Probabilistic
Distribution

*(Image source: Kh. Nafizul Haque, LinkedIn)*

- dedicated unit **CITS5017**
- concepts we cover apply there, and **CITS5508**, too

---

## Slide 23: Swarm Intelligence

*(Journal cover: Swarm and Evolutionary Computation — Elsevier, Editors-in-Chief: S. Das, P. N. Suganthan)*

**Introduction:**

To tackle complex real world problems, scientists have been looking into natural processes and creatures — both as model and metaphor — for years. **Optimization** is at the heart of many natural processes including Darwinian evolution, social group behavior and foraging strategies. Over the last few decades, there has been remarkable growth in the field of nature-inspired search and optimization algorithms. Currently these techniques are applied to a variety of problems, ranging from scientific research to industry and commerce. The two main families of algorithms that primarily constitute this field today are the **evolutionary computing** methods and the **swarm intelligence** algorithms. Although both families of algorithms are generally dedicated towards solving search and optimization problems, they are certainly not equivalent, and each has its own distinguishing features. Reinforcing each other's performance makes powerful hybrid algorithms capable of solving many intractable search and optimization problems.

---

## Slide 24: Search and Optimisation — The Heart of AI

Someone (famous) once controversially said…

$$\text{AI} = \text{search}$$

Sacrilege!!? There is so much to AI…

*(Image: AI-themed word cloud in the shape of a human head profile — Kreiman Lab, Harvard)*

---

## Slide 25: Search and Optimisation — The Heart of AI

I will take this a step further, and claim that "searching for an optimum", or *optimisation*, is the heart of AI:

$$\boxed{\textbf{AI} = \textbf{optimisation}}$$

And that is where we must begin…

*(Image: AI-themed word cloud in the shape of a human head profile — Kreiman Lab, Harvard)*