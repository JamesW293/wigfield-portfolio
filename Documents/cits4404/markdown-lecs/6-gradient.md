# Gradient Methods
## (aka The Beauty of Mathematics)
### Climbing to Success

*© Siwen Luo, UWA — University of Western Australia*

**References:** Sean Luke, 2016, *Essentials of Metaheuristics*

---

## Optimisation Algorithms — Our Roadmap
Optimisation
├── deterministic
│   ├── gradient methods
│   │   ├── gradient descent
│   │   └── Newton Raphson
│   └── direct methods
│       └── ...
└── stochastic
└── ...

---

## "Qualities" of Hypothesis Spaces

We will start to conceptualise search spaces and how "difficult" they are.

### *Well-behaved functions*

A relative concept encompassing:
- continuous vs discontinuous
- differentiable vs non-differentiable
- low "modality" vs high "modality"
- plateaus, "spikes", ridges, etc.
- non-pathological vs pathological

---

## Derivatives Rock

We have seen the value of 1st and 2nd derivatives:

- Are we at a stationary point?
- Is it a maximum, a minimum, or a saddle point?
- If not, which direction should we go to get to a local maximum or minimum?
- (Why am I anthropomorphising mathematics??)

The gradient vector field provides us with a kind of "road map."

---

## Gradient Ascent/Descent (1-D)

**Require:** slope (derivative) $f'(x)$ for all $x$

**Don't require:** function $f$ — however in practice we normally generate $f'$ from $f$

**Hypothesis space:** *Continuously differentiable* functions

Functions that are continuous, and their derivative is continuous. A class of *smooth* functions (more later).

***Best-behaved hypothesis spaces we will see!***

*Figure 1: Gradient Ascent with a negative slope. $x$ is decreasing.*

---

## Gradient Ascent/Descent (1-D) — Algorithm

**Algorithm:** *1-D Gradient Ascent*
1: x ← random initial value
2: repeat
3:     x ← x + α f′(x)
4: until stopping criterion reached
5: return x

Search for *optimum* — *maximum* (as above) or *minimum*

- Sign of $f'(x)$ — *direction* of "step"
- Magnitude of $f'(x)$ — *size* of step
- $\alpha$ — "tuning" parameter — scale size of steps

---

## Gradient Ascent/Descent (1-D) — Stopping Criteria

**Stopping Criteria:**

- $f'(x) = 0$ ?
- $|f'(x)| < \epsilon$, where $\epsilon$ is small ?
- Resource limit is reached?
  - Number of iterations?
  - Computation time?

---

## Gradient Ascent/Descent (1-D) — Gradient Descent Algorithm

**Algorithm:** *1-D Gradient Descent*
1: x ← random initial value
2: repeat
3:     x ← x − α f′(x)
4: until stopping criterion reached
5: return x

**Ideal:** e.g. *quadratic functions (best best hypothesis space ever!)*

- Further from minimum → bigger steps
- Naturally "slows down" as it approaches minimum (for suitable $\alpha$)
- Limits "overshoot"
- Step size gets smaller as we approach minimum — we say it ***converges*** on a minimum.

---

## Gradient Ascent/Descent (1-D) — Another View

| | |
|---|---|
| **Quadratic Equation** $y = x^2 - 4x + 3 = (x-1)(x-3)$ | Type of curve: Parabola |
| **Derivative** $\dfrac{dy}{dx} = 2x - 4$ | Type of curve: Line |

**Another view:**
- Derivative is step size (for $\alpha = 1$)
- Further from minimum → bigger steps
- Closer to minimum → smaller steps

---

## Gradient Ascent/Descent (1-D) — Pathological Case

**What about, say, a Rayleigh distribution?**

- Further from maximum → smaller steps?!
- Closer to maximum → bigger steps?!
- Likely large overshoot (a "pathological case" for gradient ascent?)

---

## Gradient Ascent/Descent (1-D) — Choosing $\alpha$

**Choosing $\alpha$:**

- Too small → takes a long time to converge
- Too large → *overshoot*
  - Results in oscillation
    - Slow to converge
    - Or maybe never!

---

## Gradient Ascent/Descent (1-D) — Stopping (again)

**Stopping (again):**

- (Ideally) stop when gradient $= 0$
  - Maximum (gradient ascent)
  - But it could also be a minimum
  - Or a saddle point
- How do we know?
  - What tools do we have for distinguishing max, min, saddle?

$$\Rightarrow \text{second derivative!}$$

---

## Gradient Ascent/Descent (1-D) — 2nd Derivative and Curvature

**2nd derivative and curvature**

Assumes *twice differentiable function.*

- $f''(x) < 0 \;\Rightarrow$ maximum
- $f''(x) > 0 \;\Rightarrow$ minimum
- $f''(x) = 0 \;\Rightarrow$ inconclusive, check $f'(x)$ either side...

**Can we use second derivatives directly..??**

---

## Newton-Raphson Method

Start with a fast gradient-based method for finding **roots (zeros)** of a function.

Use:

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

Based on the idea that the *tangent at any point is an approximation to the function.*

Think of a triangle:

$$\text{slope} = \frac{\text{rise}}{\text{run}} \quad \Rightarrow \quad \text{run} = \frac{\text{rise}}{\text{slope}}$$

$$x_{n+1} - x_n = \frac{f(x_n)}{f'(x_n)} \qquad \text{Best step size?!}$$

---

## Newton-Raphson Method — For Optimisation

How can we adapt N-R for finding optima?

The optima are zeros of the 1st derivative. Therefore we can use N-R on the first derivative.

Substituting $f'$ for $f$:

$$x_{n+1} = x_n - \frac{f'(x_n)}{f''(x_n)}$$

---

## Newton-Raphson Method — Algorithm

**Algorithm:** *Newton-Raphson (1-D Optimisation)*
1: x ← random initial value
2: repeat
3:     x ← x − f′(x) / f′′(x)
4: until stopping criterion reached
5: return x

**Questions:**

- What does the N-R algorithm reduce to for a quadratic function?
- How many steps does it take to solve a quadratic of the form $f(x) = ax^2 + b$ using N-R?
- Can you prove it? *(i.e. prove it's the "best" step size)*

---

## N-R Intuition

$$x \leftarrow x - \frac{f'(x)}{f''(x)}$$

---

## Newton-Raphson Method — Geometrical Interpretation

**(Yet another) geometrical interpretation**

- $f$ is the integral of $f'$
- Using the tangent *line* to approximate $f'$
- Integral of a line is a *quadratic*

$\Rightarrow$ Can be thought of as approximating with quadratics rather than lines

$\Rightarrow$ Match curvature at point as well!

$\Rightarrow$ ***More information!***

---

## Smoothness

N-R is a *very efficient* optimisation algorithm.

*But* remember, it only works for the class of *twice-differentiable functions* (smoothness class $C^2$).

| Class | Description |
|---|---|
| $C^0$ | Continuous functions |
| $C^1$ | Continuously differentiable functions |
| $C^2$ | Differentiable functions whose derivative is in $C^1$ |
| $\vdots$ | $\vdots$ |
| $C^\infty$ | Infinitely differentiable |

---

## Multi-dimensional Gradient Ascent/Descent

What would you anticipate? (Consider a multi-modal, multi-dimensional surface with multiple peaks and troughs.)

---

## Gradient Ascent/Descent — General Case

**Algorithm:** *Gradient Ascent*
1: x⃗ ← random initial vector
2: repeat
3:     x⃗ ← x⃗ + α ∇f(x⃗)
4: until stopping criterion reached
5: return x⃗

Where the gradient is:

$$\nabla f = \begin{bmatrix} \dfrac{\partial f}{\partial x_1} \\[8pt] \dfrac{\partial f}{\partial x_2} \\[8pt] \vdots \\[4pt] \dfrac{\partial f}{\partial x_n} \end{bmatrix}$$

---

## grad Operator

$$\operatorname{grad} f \equiv \nabla f = \frac{\partial f}{\partial x_1}\vec{e}_1 + \frac{\partial f}{\partial x_2}\vec{e}_2 + \cdots + \frac{\partial f}{\partial x_n}\vec{e}_n$$

where:
- $\dfrac{\partial f}{\partial x_i}$ are the **partial derivatives** in each coordinate direction
- $\vec{e}_1, \ldots, \vec{e}_n$ are unit vectors in each coordinate direction

$\Rightarrow$ *direction of greatest slope in the n-dimensional (vector) space*

$\Rightarrow$ *gradient ascent reduced to matrix operations — efficient!*

---

## Elephant in the Room

Some of our examples used quadratic (parabolic) or "bowl" functions. These are the nicest functions we'll see, because gradient methods always converge (or oscillate) around the *single optimum.*

But most functions aren't so kind.

Gradient methods get stuck in **local optima**.

We want the ***global optimum!***

---

## Local vs Global Optimisation

### The Bad News

There is *no general purpose optimisation algorithm* that can:

- Guarantee finding the global optimum in *non-enumerable* domains
- Guarantee finding the global optimum in a *finite time limit* in *non-finite domains*

### The Good News

There are many things we can try to find "good" solutions — even in much more poorly behaved domains.

In fact, much of this course is about how we address this problem!

---

## A Hint of Things to Come

We've not said much yet about the 1st line of the algorithm:

$$\vec{x} \leftarrow \text{random initial value/vector}$$

Randomness can be our friend (or enemy!)

If we know very little about the search space, it can also be our only resort.

---

## Gradient Ascent with Restarts

**Algorithm 3:** *Gradient Ascent with Restarts*
1:  x⃗ ← random initial value
2:  x⃗* ← x⃗                        ▷ x⃗* will hold our best discovery so far
3:  repeat
4:      repeat
5:          x⃗ ← x⃗ + α∇f(x⃗)        ▷ In one dimension: x ← x + αf′(x)
6:      until ||∇f(x⃗)|| = 0        ▷ In one dimension: until f′(x) = 0
7:      if f(x⃗) > f(x⃗*) then       ▷ Found a new best result!
8:          x⃗* ← x⃗
9:      x⃗ ← random value
10: until we have run out of time
11: return x⃗*

Note an additional requirement: *we must be able to calculate $f(\vec{x})$.*

Comparing/retaining best solutions (to date) will also be a recurring theme.

The inner loop stopping condition uses $< \epsilon$ in practice:

$$\|\nabla f(\vec{x})\| < \epsilon$$

---

## Guarantees?

### Are we guaranteed to find the global optimum?

In general no, but... yes, if we keep going long enough, *under certain conditions*, e.g.:
- Search space is bounded
- Number of local optima is finite

### Other issues

- Flat regions:
  - No slope to follow — $f'(x) = 0$
  - $f''(x)$ is zero too — $\frac{0}{0}$
- Even flat in one dimension of many
- $n$-dimensional "valleys"

*(Example: 2-D Rosenbrock Function)*

---

## Before We Go — Bowl Functions, Do They Even Exist?

We have said that "bowl" functions, or multi-dimensional quadratics, are probably the friendliest functions we will come across.

But do they exist in real life?

In fact, yes! Quite a lot.

Perhaps the most common is **Mean Squared Error (MSE)**!

- Widely used in regression, machine learning, ...

---

## Racking up the Difficulties

- Infeasibly large search spaces
- Sparsity of feasible solutions
- Local minima and maxima
- Smoothness of search space (continuity, differentiability, twice differentiability)
- Plateaus (derivative $= 0$)
- ...

But before we continue with that, let's look at the power of gradient descent in action!