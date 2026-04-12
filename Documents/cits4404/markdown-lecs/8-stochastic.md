# Introduction to Stochastic Optimisation
*© Siwen Luo, UWA*
*Reference: Essentials of Metaheuristics, 2nd Ed., Sean Luke, Lulu, 2016*

---

## The Real World is Messy

**Recap:**

- Ability to compute 1st and/or 2nd derivative is a **BIG** assumption
- Relatively *small* class of "well-behaved" functions
- In many cases we can't compute the derivative because *we don't even know what the function is!*
- Remember that "black box"…
[Stimulus] → Input → [Blackbox] → Output → [Response]

---

## Black Box Optimisation
Candidate Solution (executable) → Environment (World) → How good is it?

Candidate solution (hypothesis) could be:

- A mathematical function (e.g. a neural network)
- A program that converts text to speech for Siri
- A program for a walking robot
- A classifier that tells you when to buy Bitcoin
- A job shop schedule that maximises output of a BYD factory…

---

## Basic Requirements (review)

- A *description (modelling) language*:
  - mathematical
  - computer program
  - tree, graph, network
  - rules (logic, grammar, planner,…)
- A way of expressing a *candidate solution* — may be *executable*
- A way of *assessing* how well the candidate solution performed
Candidate Solution (executable) → Environment (World) → How good is it?

---

## Optimisation Algorithm — Very Basic Operations

1. Generate a candidate solution (from the hypothesis space)
2. Determine the quality of the candidate solution
3. Repeat until good enough!

- **Trial and error** approach
- Note the importance of the choice of hypothesis space (and language) even for this simplest of algorithms!
  - $\Rightarrow$ If a good solution doesn't exist in the space, you're never going to find one!

---

## Basic Operations and Heuristics

The naive algorithm may take a *long* time, maybe forever. To improve performance, we want to use some kind of **heuristics** — "rules of thumb", things that seem to make sense in many situations.

One overarching heuristic might be:

> **"its often easier to find a good solution by modifying one you've found already than by starting from scratch each time"**

- Concept of *incremental improvement…*
- Initial guess might be bad, but at least we can see if we're making progress!

---

## The "Tweak"

Luke (2016) refers to modifying a current candidate solution as *"tweaking"* it.

Looking carefully, there are some more assumptions built into Luke's "tweak". Luke states:

> *"Sometimes it finds worse ones nearby, sometimes it finds better ones."*

- *"nearby"* (and tweak) suggest "small" changes (whatever that means)
- *presumption* that better solutions are within the "*vicinity*" of good solutions found so far (whatever that means)

Luke's heuristic is probably more like:

> *its often easier to find a good solution by modifying **a good-ish** one you've found already **by a small amount** than by starting from scratch each time*

---

## Basic Operations — Modification

1. Provide one or more initial candidate solutions (*initialisation*)
2. Determine the quality of candidate solutions (*assessment*)
3. *Modify* a candidate solution:
   - make a copy
   - *"tweak"* the copy to produce a new candidate
   - …

- Note: steps in gradient methods, pattern search, Simplex, etc. can be considered examples of (deterministic) tweaks
- Here there is **no assumption of determinism** — the tweak may be deterministic, probabilistic/random, random choice,…

---

## Basic Operations — Selection

Our incremental improvement heuristic needs a couple more things:

- A way to **store** solution(s) found so far and their quality
- A way to **select** a candidate to modify (*selection*)

We now have (almost) enough for a simple gradient-ascent-like algorithm that doesn't use the gradient…

---

## Hill Climbing

**Algorithm 4** *Hill-Climbing*
1:  S ← some initial candidate solution       ▷ The Initialization Procedure
2:  repeat
3:      R ← Tweak(Copy(S))                    ▷ The Modification Procedure
4:      if Quality(R) > Quality(S) then        ▷ The Assessment and Selection Procedures
5:          S ← R
6:  until S is the ideal solution or we have run out of time
7:  return S

- We haven't specified *how* to tweak — this will depend on the hypothesis language
- e.g. add a number, change a weight, swap lines of code, prune a branch of a tree, change a grammar rule,…
- Usually it will involve some degree of **randomness**

---

## Steepest Ascent Hill Climbing

"We now have (almost) enough for a simple gradient-ascent-like algorithm that doesn't use the gradient…"

- Why "almost"?
- In gradient ascent we don't just pick *any* uphill direction — we use $\nabla$ to pick *steepest*
- Hill Climbing algorithm is *opportunistic* — perhaps a little like a randomised version of opportunistic generalised pattern search
- We could get a better guesstimate of the steepest direction by more **sampling**
  - More like a randomised version of Hooke-Jeeves
- How much sampling?
  - We've seen similar trade-offs before, e.g. sample size in pattern searches

**Algorithm 5** *Steepest Ascent Hill-Climbing*
1:  n ← number of tweaks desired to sample the gradient
2:  S ← some initial candidate solution
3:  repeat
4:      R ← Tweak(Copy(S))
5:      for n − 1 times do
6:          W ← Tweak(Copy(S))
7:          if Quality(W) > Quality(R) then
8:              R ← W
9:      if Quality(R) > Quality(S) then
10:         S ← R
11: until S is the ideal solution or we have run out of time
12: return S

Another variation:
- Instead of comparing $R$ and $S$ (lines 9–10), just replace
- But store the best solution achieved so far…

---

## Steepest Ascent Hill Climbing with Replacement

**Algorithm 6** *Steepest Ascent Hill-Climbing With Replacement*
1:  n ← number of tweaks desired to sample the gradient
2:  S ← some initial candidate solution
3:  Best ← S
4:  repeat
5:      R ← Tweak(Copy(S))
6:      for n − 1 times do
7:          W ← Tweak(Copy(S))
8:          if Quality(W) > Quality(R) then
9:              R ← W
10:     S ← R
11:     if Quality(S) > Quality(Best) then
12:         Best ← S
13: until Best is the ideal solution or we have run out of time
14: return Best

- Note $S$ can get lost, hence use of $Best$
- Introduces the idea of an "**elite group**" (called $Best$ here) which we'll see again
- Not restricted to uphill?

---

## Some Nomenclature

Notice in hill climbing (Alg 4) we pick (select) a winner in each iteration from 1 existing candidate ($S$) and 1 modified candidate ($R$):
- We could call this a **(1+1)** algorithm

Steepest ascent hill climb (Alg 5):
- Select from 1 existing and $n$ modified
- Call this **(1+n)**

Steepest ascent HC with replacement (Alg 6):
- Select from $n$ modified copies
- Could call this **(1, n)**

We'll come back to this later.

---

## Tweaking (Again)

Could involve many things:
- Switch branches of a tree
- Add a new node to a neural net
- Change the order of machines in a job-shop schedule
- etc…

In *many* situations however we are able to choose a representation where the tweaking can be done by **changing real numbers**.

---

## (Real-value) Parameterised Models

Candidate solution is *defined* by a vector of parameters:

$$\vec{v} = [v_1, v_2, \ldots, v_l]$$
Input (environment) → [Model (executable)] → Output (result)
↑
Parameters
v = [v1, v2, ..., vl]

- Numerical parameters are nice to work with
  - Modifications are mathematical operations
  - Tweaks can typically use probability distributions

---

## Hyper-Parameters

> **Merriam-Webster**
> *hyper-* prefix
> **Definition of hyper- (Entry 2 of 2)**
> 1 : above : beyond : SUPER-
> // *hyper*market

- A **parameter** works "inside" the model
- A **hyper-parameter** works "above" or "outside" the model
  - e.g. determines the operation of the algorithm

We have seen hyper-parameters before — e.g. step size $\alpha$, tolerance $\epsilon$

- Algorithms 5 and 6 have a new one $n$ — determines number of comparisons/evaluations

Hyper-parameters often make very important trade-offs in how, how fast, and even *whether* an optimisation algorithm works. Can often be imagined as "tuning dials" for the algorithm.

In this case the hyper-parameter $n$ determines a **computational trade-off** (cf. CCS vs Hooke-Jeeves).

**Discussion:**
- What trade-off is $n$ making? *(Hint: Think about a fixed computational resource.)*
- Can you think of examples of domains (landscapes) where different choices of $n$ (small or large) might be more successful? *(Assume a 2-d solution space.)*

---

## Initialisation

Luke assumes bounds — $min$ and $max$ — and a *uniform* distribution:

**Algorithm 7** *Generate a Random Real-Valued Vector*
1:  min ← minimum desired vector element value
2:  max ← maximum desired vector element value
3:  v⃗ ← a new vector ⟨v1, v2, ...vl⟩
4:  for i from 1 to l do
5:      vi ← random number chosen uniformly between min and max inclusive
6:  return v⃗

- More generally, $min$ and $max$ could be infinite.
- Q: What would be an example of an unbounded probability distribution?

---

## Modification / Tweak

Following Luke, (small) random noise is added element-wise:

- $p$ — probability of adding noise to an element ("coin toss")
- $r$ — half-range of (bounded) uniform noise

**Algorithm 8** *Bounded Uniform Convolution*
1:  v⃗ ← vector ⟨v1, v2, ...vl⟩ to be convolved
2:  p ← probability of adding noise to an element in the vector    ▷ Often p = 1
3:  r ← half-range of uniform noise
4:  min ← minimum desired vector element value
5:  max ← maximum desired vector element value
6:  for i from 1 to l do
7:      if p ≥ random number chosen uniformly from 0.0 to 1.0 then
8:          repeat
9:              n ← random number chosen uniformly from −r to r inclusive
10:         until min ≤ vi + n ≤ max
11:         vi ← vi + n
12: return v⃗

Notice that Algorithm 8 contains two new hyper-parameters: $p$ and $r$. We'll assume $min$ and $max$ are natural bounds determined by the problem.

---

## Exploration vs Exploitation

$p$ and (especially) $r$ determine "step size":

- **Small step size** → (*exploitation*)
  - "tiptoe" to the top of the hill
  - converges nicely
  - less likely to make "jump" from a local maximum

- **Large step size** → (*exploration*)
  - "leaps and bounds"
  - faster ascent, but more likely to "overshoot"
  - more likely to make jumps to other maxima (hopefully global maximum)
  - harder to converge ($< \epsilon$) on a maximum

> **Exploration vs exploitation is a *fundamental dilemma* in optimisation!**

---

## Global Optimisation

- Hill-climbing algorithms are referred to as **local optimisation** algorithms.

**Global optimisation** — if we run long enough, we will *eventually* find a solution:

- Requires *at the limit* every location in search space is visited
- Cannot guarantee this with a bounded "tweak"

---

## Example — Random Search

Simplest *global optimisation* algorithm…

**Algorithm 9** *Random Search*
1:  Best ← some initial random candidate solution
2:  repeat
3:      S ← a random candidate solution
4:      if Quality(S) > Quality(Best) then
5:          Best ← S
6:  until Best is the ideal solution or we have run out of time
7:  return Best

- Extreme case of *exploration* — find a good solution in a "good" part of the space, don't capitalise on it or *exploit* it
- Contrast with hill climb — extreme case of *exploitation*

---

## Examples of Global Search Algorithms

Strategies for global search:

- **Adjust modification procedure**
  - Tweak occasionally makes large random changes
  - Controlled by hyper-parameter that sets balance between exploration and exploitation

- **Adjust selection procedure**
  - Allow it to go down hills sometimes

- **"Hyperjumps" / restarts**
  - Try a new location occasionally (similar to random tweaks)

- **Use a larger sample**
  - Pick best to exploit, then second best, or sample again?
  - How should you sample? Random? Grid?
  - How far can you go before sampling becomes more expensive than searching?

**Next…**
- How can we best combine both exploitation and exploration…?

---

## But Before We Go… Is There a Best Choice?

Four example quality function landscapes:

| Landscape Type | Description |
|---|---|
| **Unimodal** | Single smooth peak — easy for hill climbing |
| **Needle in a Haystack** | One extremely narrow peak — very hard to find |
| **Noisy / Hilly / Rocky** | Many local maxima of similar height |
| **Deceptive** | Gradient points *away* from the global optimum |
| **"Foxhole"** | Many separated deep optima (e.g. Shekel function) |

---

## There Ain't No Such Thing as a Free Lunch!

From *"No Free Lunch Theorems for Optimization"*, Wolpert and Macready, IEEE Trans Evolutionary Computation, 1997:

> *"One might expect that there are pairs of search algorithms A and B such that A performs better than B on average, even if sometimes B outperforms A. As an example, one might expect that hill climbing usually outperforms hill descending if one's goal is to find a maximum of the cost function. One might also expect it would outperform a random search in such a context."*
>
> *"One of the main results of this paper is that such expectations are incorrect. We prove two 'no free lunch' (NFL) theorems in Section III that demonstrate this and more generally illuminate the connection between algorithms and problems."*
>
> ***"Roughly speaking, we show that for both static and time-dependent optimization problems, the average performance of any pair of algorithms across all possible problems is identical."***

The NFL theorem means that no single algorithm is universally best. Performance gains on one class of problem come at the cost of worse performance on another. Algorithm choice must be informed by knowledge of the problem domain.