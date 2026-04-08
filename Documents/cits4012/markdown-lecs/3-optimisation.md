# Optimisation and the Hypothesis Space

*© Siwen Luo, UWA — University of Western Australia*

*(Cover image: 3D surface plot of a multimodal function $f(x_1, x_2)$ with axes $x_1 \in [0.0, 1.0]$, $x_2 \in [0.0, 1.0]$, $f(x_1, x_2) \in [-1.4, -0.2]$, showing multiple local optima — colour-mapped from blue (low) to red (high), with contour projection on the base plane)*

---

## Slide 2: Optimisation — The Heart of AI

Perhaps a more functional metaphor is that optimisation is the ***engine*** — "what makes it tick".

We all have a general understanding of what we mean by optimisation:

---

### **optimization** *noun*

**op·ti·mi·za·tion** | \ ˌäp-tə-mə-ˈzā-shən \

**Definition of *optimization*:**

: an act, process, or methodology of making something (such as a design, system, or decision) as fully perfect, functional, or effective as possible

***specifically***: the mathematical procedures (such as finding the maximum of a function) involved in this

---

In this section we are going to be more specific:

- dissect the key components that underpin the many faces of optimisation
- introduce the language/terms we will use in this unit

---

## Slide 3: Thinking about Optimisation (Taster)

*(Diagram illustrating the progression from real-world problem to abstract representation to solution space:)*

**Problem** → **Abstract Representation**

- Left: Google Maps routing problem (Perth area — routes of 28 min / 20.6 km and 34 min / 23.7 km shown between suburbs)
- Right: Abstract graph representation with labelled nodes (ING, S&L, CUB, BOH, MCD, TOL, CAL, BOK, AKK, NUB, BRH, GTS, AND) and weighted edges

**Solution (very simple problem)** → **(Candidate) Solutions**

- Bottom left: Simple 1D parabolic curve showing "Candidate Solutions" along the $x$-axis, with "Minimum" marked at $x = h$, $y = k$. The horizontal $x$-axis is labelled "Solution Space".
- Bottom right: 3D scatter plot showing a cloud of candidate solutions in a multidimensional "Solution Space"

---

## Slide 4: Three Key Ingredients
     Representation              Instantiation

(1)                                           (2)
Language  ────────────────────────  Model
\          Optimisation          /
\                              /
\                            /
\                          /
────────────────────────
(3)              Metric
Evaluation

| Component | Node | Role |
|---|---|---|
| **1. Representation** | Language | *defines solution space* |
| **2. Instantiation** | Model | *"candidate solution"* |
| **3. Evaluation** | Metric | *how good is the model?* |

---

## Slide 5: 1. Language (Representation)

Examples of representation languages:

- mathematical equations
- natural languages
- grammars
- logics
- finite automata / finite-state machines
- computer programs
- logic programs
- Gantt charts
- PERT charts
- simulation languages
- popsticks and glue
- …

*(Diagram: HPSG (Head-driven Phrase Structure Grammar) feature structure)*
head-subj-phrase
PHON  ⟨ [1] + [2] ⟩
SYNSEM [ CAT  [ HEAD    [3]
VALENCE | SUBJ ⟨⟩ ]
CONT  [4] ]
/          
NON-HEAD-DTR       HEAD-DTR
[ PHON   [1]  ]   [ PHON    [2]
SYNSEM [5]  ]     SYNSEM  [ CAT  [ HEAD    [3]
VALENCE | SUBJ [5] ]
CONT  [4] ] ]

*(Diagram: PERT chart — project scheduling network with nodes: Study, QUAL Scheduler, Client Meeting, Contract 2 weeks, C and Unix 1 week, Microsoft project 1 week, User manual 1 week, Algorithm 2 weeks, Implementation manual 1 week, design, Input/output 1 week, Coding 3 weeks, Test 2 weeks, Show client 1 week, Test/recode 1 week, Revised scheduler / Revised contract 2 weeks, Presentation 1 week)*

---

## Slide 6: Language

### **if you can't describe it — you can't model it!**

**Example**

- Enormous amount of work on grammars to *describe (explain/parse/generate/model)* natural languages
  - CFGs, LFGs, PSGs, GPSGs, HPSGs, TGGs,…

*(Diagrams: two parse trees — Image: Tjo3ya, Wikipedia)*

**Constituency relation (PSG):**
       S
      / \
    NP₁   VP₁
   / | \      \
  D  N₁ V₁    VP₂
              /    \
            V₂      NP₂
                   / | \
                  D   A  N₂
*"This tree is illustrating the constituency relation."*

**Dependency relation:**
    V
   / \
  N    V
 /|     \
D  ...    N
   |      |
   D      A
*"This tree is illustrating the dependency relation."*

---

## Slide 7: Generation vs Parsing

**Example: *Phrase Structure Grammar* (PSG)**

### A Simple Set of Phrase Structure Rules

$$S \longrightarrow \text{NP} + \text{VP}$$

$$\text{NP} \longrightarrow \text{art} + (\text{adj}^*) + \text{N}$$

$$\text{VP} \longrightarrow \text{V} + \text{NP} + (\text{PP}^*)$$

$$\text{PP} \longrightarrow \text{Prep} + \text{NP}$$

$$\text{N} \longrightarrow \text{sailor, cat, horse, bridge, \ldots}$$

$$\text{V} \longrightarrow \text{saluted, kissed, fried}$$

$$\text{adj} \longrightarrow \text{drunken, puzzled, gregarious}$$

$$\text{art} \longrightarrow \text{a, the}$$

$$\text{prep} \longrightarrow \text{on, under}$$

**Parse tree for: "the drunken sailor saluted the cat"** ✔
          S
       /      \
     NP         VP
   / | \       /   \
 art adj  N   V      NP
                    / \
                   art  N
the  drunken sailor  saluted  the  cat

---

## Slide 8: Parsing

Which of the following sentences are in the space (set) of sentences generated by our grammar? (i.e. Are valid/accepted sentences)

1. the drunken gregarious sailor kissed the puzzled cat
2. the bridge saluted the horse under the cat
3. the bridge saluted the bridge under the drunken bridge
4. a sailor fried a cat under a bridge under a bridge
5. fried horse on the bridge
6. the fried horse on the bridge

---

## Slide 9: Test vs Generate

Note that we don't have to *generate* the whole space to answer these questions!

- **Test**
  - we have a test (in this case called parsing) for whether a construct is valid (in the set of sentences)
  - finite time

- **Generate**
  - we can also generate members of the set, but…
  - infinite time

Usually *testing is much cheaper* (e.g. "polynomial time") *than generating* (we'll return to this)!

---

## Slide 10: Expressiveness of a Language

### **if you can't describe it — you can't model it!**

We will say that language $A$ is ***more expressive*** (or "*richer*") than language $B$ if:

- everything that can be described in language $B$ can also be described in language $A$ (i.e. $A$ *subsumes* $B$)
- something can be described in language $A$ that cannot be described in language $B$ ($B$ *does not subsume* $A$)

*(Diagram: nested ellipses with $A$ as the outer ellipse containing $B$)*

$$A \supset B$$

**Examples:**

- the class of polynomial functions is more expressive than the class of linear functions:

$$y = c_n x^n + c_{n-1} x^{n-1} + \cdots + c_1 x + c_0 \qquad \text{(polynomial)}$$

$$y = ax + b \qquad \text{(linear)}$$

---

## Slide 11: Language — The Chomsky Hierarchy

*(cf. CITS2211 Discrete Structures)*

### The **Chomsky Hierarchy**

| **Grammar** | **Language** | **Automaton** | **Rules** |
|---|---|---|---|
| Type-0 | Recursively enumerable | Turing Machine | $\alpha \rightarrow \beta$ |
| Type-1 | Context sensitive | Linear bounded Non-deterministic Turing Machine | $\alpha A \beta \rightarrow \alpha \gamma \beta$ |
| Type-2 | Context Free | Non-deterministic Pushdown Automaton | $A \rightarrow \gamma$ |
| Type-3 | Regular | Finite State Automaton | $A \rightarrow a$ and $A \rightarrow aB$ |

$$\text{Type-3} \subset \text{Type-2} \subset \text{Type-1} \subset \text{Type-0}$$

*(Arrow indicating increasing Complexity from Type-3 up to Type-0)*

---

## Slide 12: Expressiveness of a Language

**Examples:**

- the class of context-free languages is more expressive than the class of regular languages:

$$A \rightarrow \gamma \qquad \text{(context-free)} \qquad \textbf{Contains language } a^n b^n$$

$$A \rightarrow a, \quad A \rightarrow aB \qquad \text{(regular)} \qquad \textbf{Doesn't contain } a^n b^n$$

Where:
- $a$ — terminal
- $A, B$ — non-terminals
- $\gamma$ — string of terminals and/or non-terminals

- first-order logic (predicate calculus) is richer than propositional logic:

$$\texttt{John\_Wayne\_is\_mortal} \qquad \text{(propositional)}$$

$$\forall x\ \mathrm{man}(x) \implies \mathrm{mortal}(x) \qquad \text{(first-order)}$$

---

## Slide 13: 2. Model (Instantiation)

### **What is it?**

- something that can be described in the selected language
- an ***instance*** of all the possible things that can be described in the language
- may be *executable, parameterised, generative, or canonical form*

*(Graph: "Cases at 21-08-01, 1 day lag" — Daily locally acquired cases (y-axis, 0–250) vs. time index (x-axis, 0–40). Three fitted models overlaid on real data:)*

| Model | Parameters |
|---|---|
| Exponential | $a = 28.71,\ b = 0.049,\ c = -29.14$ |
| Linear | $a = 3.61,\ b = -15.74$ |
| Quadratic | $a = 0.1,\ b = 0.337,\ c = 3.4$ |

---

## Slide 14: Model = Hypothesis

### **Relationship to "real" world**

- an *approximation* to the real world (process, function, structure,…)
- an *abstraction* of the real world
- an **hypothesis** *that attempts to describe how the real world works* (or could work)
- a ***candidate solution*** (in the context of optimisation)

### **Everything in the real world is a function!?**

> ➡ So, *a model/hypothesis* is *an attempt to describe/explain* some *function,* within the *chosen language*

*(Note: By "real" we don't necessarily mean "physical".)*

---

## Slide 15: Hypothesis Space (Solution Space)
Language          all the things                  Hypothesis Space
(generative)  ──────────────────────►   (large irregular black blob)
you can describe         │
│  ◆ hypothesis (instance)
│
│  ◇ real world thing
│
hypothesis space

**Diagram description:**
- The **Language** (generative) generates "all the things you can describe" → the **hypothesis space** (depicted as an irregular black blob)
- Inside the hypothesis space are multiple *hypothesis instances* (geometric shapes: tetrahedra, icosahedra)
- The **real world thing** lies at/near the boundary of the hypothesis space
- The *hypothesis space* is the set of all models expressible in the chosen language

---

## Slide 16: 3. Metric (Evaluation)

How "*good*" is your hypothesis?

**Extended hypothesis space diagram** with metric overlay:

- A selected *hypothesis (instance)* sits inside the hypothesis space
- The *real world thing* lies near the boundary
- The **error ("distance")** is shown as a red arrow between the hypothesis and the real world thing

Questions:
- How much is it "like" the real thing?
- How "close" is it to the target?

---

## Slide 17: Metric

- Need some way to ***evaluate*** how "good" an hypothesis is
- There are many ways to describe/measure "closeness"
  - Usually we are happy if we can determine ***relative* closeness**
    - doesn't need to be meaningful in an absolute sense, only relative to another
    - which of these hypotheses is *better*?
- Sometimes we don't know so much about the "real" thing
  - can just assume its infinitely 'good'
  - seek the ***best*** hypothesis

*(Diagram: hypothesis space blob showing two hypotheses compared by relative closeness to the target)*

---

## Slide 18: Metrics & Evaluation

Come under many names…

- *error function/metric*
- *cost function*
- *fitness function*
- *objective function*
- *penalty function*
- *utility function*

(Usually) function from hypothesis space onto $\mathbb{R}$:

$$f : H \rightarrow \mathbb{R}$$

- (sometimes we have multiple objectives)

---

## Slide 19: Features

- Just as the choice of language determines what hypotheses are available to choose from, it also impacts what ***features*** are available to compare

**Example:**
- In 2016 the *Australian Bureau of Statistics* (ABS) declared the "Typical Australian" (let's call her the model of an Australian?) was **Claire**
- Claire, we were told, has the following features…

*(Image: ABS illustration of "Claire" — cartoon female figure with associated lifestyle icons: children, wedding cake, house, car)*

---

## Slide 20: Features — The 'Typical' Australian

| Feature | Value |
|---|---|
| Median Age | 38 |
| Sex (Mode) | Female |
| Country of Birth of Person (Mode) | Australia |
| Country of Birth of Parents (Mode) | Both parents born in Australia |
| Language Spoken at Home (Mode) | English |
| Ancestry 1st Response (Mode) | English |
| Social Marital Status (Mode) | Married in a registered marriage |
| Family Composition (Mode) | Couple family with children |
| Count of All Children in Family (Mode) | Two children in family |
| Highest Year of School Completed (Mode) | Year 12 or equivalent |
| Unpaid Domestic Work: Number of Hours (Mode) | 5 to 14 hours |
| Number of Motor Vehicles (Mode) | Two vehicles |
| Number of Bedrooms in Private Dwelling (Mode) | Three bedrooms |
| Tenure Type (Dwelling Count) (Mode) | Owned with a mortgage |

> *Q: How might you determine the distance between a given individual and Claire?*
>
> *Is the Census a good model (abstraction) of a person?*

---

## Slide 21: Numerical Features and Error

Tends to be easier in numerical domains…

- here features are numbers
- contribution to error is distance (difference) between model and sample at each $x$ value
- e.g. error is **Euclidean distance**
- expressed as a function…

$$\text{MSE} \equiv \frac{1}{N} \sum_{i=1}^{N} \left( f(x_i) - y_i \right)^2$$

*(Two time-series charts, both showing "Daily locally acquired cases" on the $y$-axis and date on the $x$-axis (1995–2020 range used as index). Real data shown as solid black line; model fit shown as dashed line; residual errors shaded.)*

**Model 1:**
- Slope: $-0.17$
- Intercept: $343.4$
- $\text{MSE} = 1.3759474009900505$

**Model 2:**
- Slope: $-0.17$
- Intercept: $342.9$
- $\text{MSE} = 1.1405513613861378$

---

## Slide 22: Numerical Features and Error — But Beware!

*Q: Which patch is "closer" to the middle (Reference) patch?*

*(Image comparison table — two sets of three patches each: Patch 0 | Reference | Patch 1)*

| Judge | Left set preference | Right set preference |
|---|---|---|
| Humans | Patch 1 | Patch 0 |
| L2/PSNR, SSIM, FSIM | Patch 0 | Patch 1 |
| Random Networks | Patch 0 | Patch 1 |
| Unsupervised Networks | Patch 1 | Patch 0 |
| Self-Supervised Networks | Patch 1 | Patch 0 |
| Supervised Networks | Patch 1 | Patch 0 |

> "The Unreasonable Effectiveness of Deep Features as a Perceptual Metric", Zhang et al, *CVPR 2018*.

---

## Slide 23: Optimisation — Ideal Definition

We can now suggest a definition for optimisation.

**Ideal**

- Find a model
- within the hypothesis space (determined by the language)
- that is *indistinguishable* from the target (zero error with respect to the selected features)

*(Three-node triangle diagram: Language — Model — Metric, with Optimisation at centre)*

- **Note 1:** if the evaluated features are a "subset" of the description there could be many solutions — equivalent with respect to the metric
- **Note 2:** in practice in complex problems it is more likely there is no matching solution within the hypothesis space

---

## Slide 24: Optimisation — Ideal 2

**Ideal 2**

- Find a model
- within the hypothesis space (determined by the language)
- that is *closest* (minimal error) to the target

$$\hat{h} = \underset{h \in H}{\arg\min}\ f(h)$$

*(Three-node triangle diagram: Language — Model — Metric, with Optimisation at centre)*

- **Note 1:** in complex problems it may be too expensive, or impossible (infinite domains) to find the best (closest) solution
- **Note 2:** sometimes the target may not be well defined (e.g. "infinite fitness")

---

## Slide 25: Optimisation — Practical Definition

**Practical definition**

- Find a model
- within the hypothesis space (determined by the language)
- that is as ***close as possible*** (good enough) to the target
- within a ***specified amount of compute*** (time and space)

$$\hat{h} = \underset{h \in H}{\arg\min}\ f(h) \quad \text{subject to: compute} \leq C_{\max}$$

*(Three-node triangle diagram with red arrows labelled "trade-off" between Language and Metric, and "changes trade-off" annotation)*

- Distinguish between:
  - ***online*** — compute in real time
  - ***offline*** — better result outweighs time cost

- Next — let's see how these terms manifest in a concrete case study