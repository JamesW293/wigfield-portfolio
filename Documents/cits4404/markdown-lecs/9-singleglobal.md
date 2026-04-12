# Single-State Global Optimisation
*© Siwen Luo, UWA*
*Reference: Essentials of Metaheuristics, 2nd Ed., Sean Luke, Lulu, 2016*

---

## Optimisation Algorithms — Roadmap
Optimisation
├── deterministic
│   └── ...
└── stochastic (global)
├── single-state  ← [current topic]
│   ├── hill climbing with restarts
│   ├── simulated annealing
│   ├── tabu
│   └── ILS
└── population-based
└── ...

---

## Exploration vs Exploitation

**Goal:** Combine:
- *Exploitation* — "local" search, "small" tweaks
- *Exploration* — "global" search, any possible change

**Recall: Examples of Increasing Exploration:**
- Adjust modification procedure
- Adjust selection procedure
- "Hyperjumps" / restarts

Search spaces can be rocky! What is the *best* thing to do?

---

## Taking Stock

- There are many algorithms (with many great names!)
- But in essence they're all balancing local and global search
- Trying to get the most "bang for the buck"
- From the *No Free Lunch Theorem* we know there's no uniformly "best" algorithm
- But different algorithms try and exploit information they can glean in different ("intelligent") ways
  - These are sometimes called **meta-heuristics**
  - May work better on some problem classes than others

Let's start with one of the simplest combinations…

---

## Hill-Climbing with Restarts

**Algorithm 10** *Hill-Climbing with Random Restarts*
1:  T ← distribution of possible time intervals
2:  S ← some initial random candidate solution
3:  Best ← S
4:  repeat
5:      time ← random time in the near future, chosen from T
6:      repeat
7:          R ← Tweak(Copy(S))
8:          if Quality(R) > Quality(S) then
9:              S ← R
10:     until S is the ideal solution, or time is up, or we have run out of total time
11:     if Quality(S) > Quality(Best) then
12:         Best ← S
13:     S ← some random candidate solution
14: until Best is the ideal solution or we have run out of total time
15: return Best

- Time intervals are "short" → weighted towards *exploration*
- Time intervals are "long" → weighted towards *exploitation*
- Note scope for e.g. starting short and increasing over time

---

## Non-Uniform Tweaks

Recall *bounded uniform convolution* (Alg 8) used a linear probability distribution with bounds — no chance of bigger jumps:

- Can't do bigger jumps
- How do you choose $min$ and $max$?
- Uniform distribution abandons our "locality" heuristic (whether that's good or bad)

---

## Gaussian Tweaks

Common to do many small tweaks and fewer large tweaks — e.g. many hill climbs, occasional jumps to look for bigger hills.

A common distribution for this is the **Gaussian (Normal) distribution**:

$$N(\mu, \sigma^2)$$

- $\mu$ — mean
- $\sigma$ — standard deviation

Properties:
- Jumps can be of any (infinite) size
- Larger jumps occur with decreasing probability
- Naturally encodes the "locality" heuristic

**Algorithm 11** *Gaussian Convolution*
1:  v⃗ ← vector ⟨v1, v2, ...vl⟩ to be convolved
2:  p ← probability of adding noise to an element      ▷ Often p = 1
3:  σ² ← variance of Normal distribution to convolve with   ▷ Normal = Gaussian
4:  min ← minimum desired vector element value
5:  max ← maximum desired vector element value         ▷ may be (-∞, ∞)
6:  for i from 1 to l do
7:      if p ≥ random number chosen uniformly from 0.0 to 1.0 then
8:          repeat
9:              n ← random number chosen from the Normal distribution N(0, σ²)
10:         until min ≤ vi + n ≤ max
11:         vi ← vi + n
12: return v⃗

$\sigma$ (or $\sigma^2$) is a very direct tuning parameter (hyper-parameter) — it controls the **rate of exploration**.

---

## Interdependence of Hyper-Parameters

- We have seen several hyper-parameters that do different things
- We **cannot** assume they are independent!
- Interaction may be complex
- Juggling them can be quite an art

---

## It's Subtle!

In Steepest Ascent Hill-Climbing with Replacement (Alg 6) combined with Gaussian tweaks:

- $\sigma$ large $\rightarrow$ more extreme choices (more **exploration**)
- $n$ large $\rightarrow$ more culling of extreme choices (*selective pressure*, less exploration)

This is **not** a direct relationship though:
- Depends whether candidates from large $\sigma$ jump to a better peak but not better quality (culled) or happen on a better quality solution (dominates)
- Likelihood depends on problem space — breadth and height of peaks etc.
- Interaction may be subtle

| | Noise in Tweak: Low | Noise in Tweak: High |
|---|---|---|
| **Samples: Few** | | Explorative ↗ |
| **Samples: Many** | Exploitative | |

---

## Simulated Annealing

Developed for optimisation in the 1980s, though the concept dates back to the 1950s.

Based on the concept of **annealing in metallurgy**:
- Atoms start more mobile (high temperature)
- Mobility decreases as the metal cools
- Rate of cooling affects the outcome (properties of the metal)

**Optimisation concept:**
- Initially a lot of "energy" (heat) in the system — candidates can jump around more
- Energy reduces over time (cooling)
- Smooth transition from **exploration** to **exploitation**

---

## Simulated Annealing — The Mechanism

Similar to hill climbing, but can replace the current candidate $S$ with a **worse** one $R = \text{Tweak}(\text{Copy}(S))$ according to probability:

$$P(t, R, S) = e^{\dfrac{\text{Quality}(R) - \text{Quality}(S)}{t}}, \quad t \geq 0 \quad (t \text{ is temp, not time!})$$

Equivalently:

$$P(t, R, S) = \frac{1}{e^{\dfrac{\text{Quality}(S) - \text{Quality}(R)}{t}}}$$

Assuming $\text{Quality}(R) < \text{Quality}(S)$:
- The exponent is negative
- The worse $R$ is, the **smaller** the probability of being accepted
- The smaller $t$ is, the **smaller** the probability of $R$ being accepted

Properties of $t$ (temperature):
- $t = \infty$: **random walk**
- $t = 0$: **hill climb**
- $t$ is decreased over time according to some *schedule*

$\Rightarrow$ **$t$ is a very direct "tuning knob" between exploration and exploitation!**

---

## Simulated Annealing — Algorithm

**Algorithm 13** *Simulated Annealing*
1:  t ← temperature, initially a high number
2:  S ← some initial candidate solution
3:  Best ← S
4:  repeat
5:      R ← Tweak(Copy(S))
6:      if Quality(R) > Quality(S) or if a random number chosen from 0 to 1
< e^((Quality(R) - Quality(S)) / t)  then
7:          S ← R
8:      Decrease t
9:      if Quality(S) > Quality(Best) then
10:         Best ← S
11: until Best is the ideal solution, we have run out of time, or t ≤ 0
12: return Best

- $t$ is decreased according to some schedule — normally tuneable, e.g.:

$$t = \beta e^{-\alpha T}, \quad \text{where } T \text{ is time}$$

- Hyper-parameter $\alpha$ determines the **rate of temperature decrease**
- Can also be used on **combinatorial problems** (e.g. Travelling Salesman Problem)

---

## Tabu Search

*(Glover, 1986)*

A different approach to exploration:
- Heuristic: **"don't go back where you've already been"**
- Name comes from considering previously visited places to be *tabu* (taboo)
- Will *eventually* escape any local maximum/minimum
- In pure form, only works for **discrete spaces** (but there are workarounds)

**The tabu list** — a history of *recently visited* candidate solutions:
- In practice, maximum length $l$ → constant time search
- Implemented as a **queue**: oldest visited solutions "fall off" the end
- Trade-off between 'revisiting' and checking the tabu list!

**Algorithm 14** *Tabu Search*
1:  l ← desired maximum tabu list length
2:  n ← number of tweaks desired to sample the gradient
3:  S ← some initial candidate solution
4:  Best ← S
5:  L ← {} a tabu list of maximum length l    ▷ First-in, first-out queue
6:  Enqueue S into L
7:  repeat
8:      if Length(L) > l then
9:          Remove oldest element from L
10:     R ← Tweak(Copy(S))
11:     for n − 1 times do
12:         W ← Tweak(Copy(S))
13:         if W ∉ L and (Quality(W) > Quality(R) or R ∈ L) then
14:             R ← W
15:     if R ∉ L then
16:         S ← R
17:         Enqueue R into L
18:     if Quality(S) > Quality(Best) then
19:         Best ← S
20: until Best is the ideal solution or we have run out of time
21: return Best

---

## Tabu Search Variations

**Real-valued spaces:**
- Define "sufficiently close/similar"
- Reject if sufficiently close
- May be expensive
- May be infeasible for high-dimensional spaces

**Non-numerical feature spaces:**
- Create a tabu list of *changes recently made to features*
- `Tweak` consults the tabu list when making changes
- Can get complicated — e.g. only the specific change that was made to a feature, or any changes to the feature
- See Luke Alg. 15

---

## Iterated Local Search (ILS)

Hill climbing with "cleverer"(?) random restarts, using a **heuristic about where to restart**:

- Restarts are *attempts to find new local optima* (otherwise we'd just end up back at the top of the same hill — waste of compute)
- ILS heuristic assumes **"better local optima can be found near the one you're in"**
- Tries to "walk" from local optimum to local optimum
- Kind of a "meta-search"
- *If* the heuristic is appropriate for the space, it should out-perform random restarts (but remember NFL)

**Key concepts:**
- **"home base"** — the local optimum whose vicinity we want to explore
  - Select new restart locations that are "somewhat" in the vicinity of the home base
  - A good meaning of "somewhat" depends on the space
- When discovering a new optimum, decide whether to retain or replace the home base:
  - Only adopt new optimum if better → "hill climb of hill climbs"
  - Adopt every new optimum → "random walk of hill climbs"

**Algorithm 16** *Iterated Local Search (ILS) with Random Restarts*
1:  T ← distribution of possible time intervals
2:  S ← some initial random candidate solution
3:  H ← S                              ▷ The current "home base" local optimum
4:  Best ← S
5:  repeat
6:      time ← random time in the near future, chosen from T
7:      repeat
8:          R ← Tweak(Copy(S))
9:          if Quality(R) > Quality(S) then
10:             S ← R
11:     until S is the ideal solution, or time is up, or we have run out of total time
12:     if Quality(S) > Quality(Best) then
13:         Best ← S
14:     H ← NewHomeBase(H, S)
15:     S ← Perturb(H)
16: until Best is the ideal solution or we have run out of total time
17: return Best

`NewHomeBase()` and `Perturb()` make the decisions that determine how the heuristic works.

---

## ILS — Designing NewHomeBase() and Perturb()

Designing these functions is, as Luke states, a **"black art"** (in fact, a lot of choosing meta-heuristics and hyper-parameters is!).

**`NewHomeBase(H, S)`:**

One extreme — always adopt new home base ("random walk"):

$$\text{NewHomeBase}(H, S) = S$$

Another extreme — only adopt if at least as good ("hill climb"):

$$\text{NewHomeBase}(H, S) = \begin{cases} S & \text{if Quality}(S) \geq \text{Quality}(H) \\ H & \text{otherwise} \end{cases}$$

In practice, might go for a "happy medium", or perhaps use a **simulated annealing** approach!

**`Perturb(H)`:**
- Needs to be "big enough" but "not too big"
- Depends strongly on the problem
- Q: Might a simulated annealing approach work here too?

---

## Mixing and Matching

This example shows how algorithms can be mixed and matched to solve a problem. You can no doubt think of other combinations — the only limit is your imagination!

---

## Some Key Things to Think About

**Evaluating and comparing algorithms:**
- How do you know if your algorithm is any good?
- How do you compare algorithms, hyper-parameters? What metrics?
  - Computing resource?
  - Number of evaluations?
  - Quality of solution?
  - Over what *class* of problems? (*cf.* NFL)
- Is optimisation a theoretical or an **empirical (experimental)** science?

**Limitations of single-state methods:**
- Are we throwing away information (and wasting compute) in single-state methods?
- How much "remembering" or "knowledge" of the search space is encoded in our chosen method?
  - *Implicit* or *explicit*?
- Could we make better use of it to learn about the problem space?

**Next — population-based methods!**

---

## Optimisation Algorithms — Complete Roadmap
Optimisation
├── deterministic
│   └── direct methods
│       ├── cyclic (CCS, CCS-A)
│       ├── pattern (Powell, H-J, GPS)
│       └── simplex (Nelder-Mead)
└── stochastic (global)
├── single-state              ← [this lecture; cut-off for midsem test]
│   ├── hill climbing with restarts
│   ├── simulated annealing
│   ├── tabu search
│   └── ILS
└── population-based          ← [next topic]
└── ...