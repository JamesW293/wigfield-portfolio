# Direct Methods
*© Siwen Luo, UWA*
*Reference: Algorithms for Optimization, Mykel Kochenderfer, Tim Wheeler, MIT Press, 2019*

---

## Optimisation Algorithms - Roadmap
Optimisation
├── deterministic
│   ├── gradient methods
│   └── "direct" methods
│       ├── cyclic
│       ├── pattern
│       └── simplex
└── stochastic
└── ...

**Continuously differentiable → Not continuously differentiable**

---

## What are Direct Methods?

**Gradient methods assume:**
- Access to gradient (1st derivative) and in some cases higher derivatives
- (not necessarily ability to evaluate function itself)

**In general, derivatives are not available:**
- Search space may be smooth, but very complex
- Search space may not be differentiable
- Search space may not be continuous

**Example:** Gantt charts from the JSSP

---

## What are Direct Methods? (continued)

In general, derivatives are not available:
- Worst case, search space may effectively be a **"black box"**
- At the very least, we may be able to evaluate it
- That is, a measure of how "good" our solution is

$$\Rightarrow \textbf{objective function} \text{ (cost function, loss function, fitness, \ldots)}$$

**Direct methods** rely solely on the objective function:
- Seek an optimum by **sampling**, however…
- Each time you evaluate a candidate solution, you learn a bit more about the space
- You might not care about the candidate at all — just using it to get *more information*
- The most obvious information is a local approximation to the slope/derivative

---

## Cyclic Coordinate Search

Also known as **coordinate descent** or **taxicab search**.

Assume the objective function is:

$$f(\vec{x}) = f(x_1, x_2, \ldots, x_n)$$

Starting from initial value $\vec{x}^0$:

$$\vec{x}^1 = \arg\min_{x_1} f(x_1, x_2^0, x_3^0, \ldots, x_n^0)$$

$$\vec{x}^2 = \arg\min_{x_2} f(x_1^1, x_2, x_3^1, \ldots, x_n^1)$$

- Series of *line search* optimisations
- After full cycle, start again from $x_1\ldots$

**Properties:**
- Will either improve or stay the same with each iteration
- "Converged" after full cycle with no (significant) improvement
- Can fail to find local optimum

**Algorithm:**
function cyclic_coordinate_descent(f, x, ε)
Δ, n = Inf, length(x)
while abs(Δ) > ε
x′ = copy(x)
for i in 1 : n
d = basis(i, n)
x = line_search(f, x, d)
end
Δ = norm(x - x′)
end
return x
end

$|\Delta| \leq \epsilon$ is the stopping criterion, where $\epsilon$ is the **tolerance**.

The norm is the distance between points, e.g. the *Euclidean* or $L^2$ norm:

$$\|\vec{x}\|_2 = \sqrt{x_1^2 + \cdots + x_n^2}$$

---

## Cyclic Coordinate Search with Acceleration Step

- After one cycle, the net progress vector points in a promising direction:

$$\vec{x}^n - \vec{x}^0$$

- Take one additional line search step in this direction
- Faster to traverse diagonal "valleys/ridges"

**Algorithm:**
function cyclic_coordinate_descent_with_acceleration_step(f, x, ε)
Δ, n = Inf, length(x)
while abs(Δ) > ε
x′ = copy(x)
for i in 1 : n
d = basis(i, n)
x = line_search(f, x, d)
end
x = line_search(f, x, x - x′)  # acceleration step
Δ = norm(x - x′)
end
return x
end

---

## Powell's Method

Extends CCS by maintaining a *queue of search directions*.

In CCS, the step:

$$\vec{x}^1 = \arg\min_{x_1} f(x_1, x_2^0, x_3^0, \ldots, x_n^0)$$

searches from $\vec{x}^0$ in the direction of the basis vector:

$$\vec{e}_1 = [1, 0, \ldots, 0]$$

**Powell's Method** generalises this by adapting search directions during the search:

1. Store "unit direction" vectors in a queue, initially set to basis vectors:

$$[\vec{u}_1, \vec{u}_2, \ldots, \vec{u}_n] = [\vec{e}_1, \vec{e}_2, \ldots, \vec{e}_n]$$

2. Complete a cycle of $n$ line searches in directions $\vec{u}_1$ to $\vec{u}_n$
3. Calculate the new direction:

$$\vec{u}_{n+1} = \vec{x}^n - \vec{x}^0$$

4. Calculate a new $\vec{x}$ using $\vec{u}_{n+1}$ (cf. acceleration step)
5. Dequeue $\vec{u}_1$ from the front of the queue
6. Enqueue $\vec{u}_{n+1}$ to the back of the queue
7. Repeat from step 2 until convergence

> **Note:** The method can degenerate when vectors become linearly dependent, losing access to the full search space. The original basis vectors have the advantage of spanning all of $\mathbb{R}^n$.

**Algorithm:**
function powell(f, x, ε)
n = length(x)
U = [basis(i,n) for i in 1 : n]
Δ = Inf
while Δ > ε
x′ = x
for i in 1 : n
d = U[i]
x′ = line_search(f, x′, d)
end
for i in 1 : n-1
U[i] = U[i+1]
end
U[n] = d = x′ - x
x′ = line_search(f, x′, d)
Δ = norm(x′ - x)
x = x′
end
return x
end

---

## Hooke-Jeeves Method

Rather than using history to infer direction, Hooke-Jeeves samples more points to find the best direction at each step.

- Evaluates $f(\vec{x})$ and $f(\vec{x} \pm \alpha\vec{e}_i)$ for each dimension $i$ with step size $\alpha$ around anchor point $\vec{x}$
- Directly sampling slope (*cf.* derivative)
- If at least one sample improves, take the best direction and repeat
- If no improvements, reduce step size: $\alpha \leftarrow \gamma\alpha$ ("shrink")
- Requires $2n$ evaluations per step for an $n$-dimensional problem

**Algorithm:**
function hooke_jeeves(f, x, α, ε, γ=0.5)
y, n = f(x), length(x)
while α > ε
improved = false
x_best, y_best = x, y
for i in 1 : n
for sgn in (-1,1)
x′ = x + sgnαbasis(i, n)
y′ = f(x′)
if y′ < y_best
x_best, y_best, improved = x′, y′, true
end
end
end
x, y = x_best, y_best
if !improved
α *= γ
end
end
return x
end

Where:
- $\alpha$ — step size
- $\epsilon$ — tolerance
- $\gamma$ — step decay factor

---

## Generalised Pattern Search

H-J is an example of a **pattern search** — can also be thought of as "sliding" and shrinking an $n$-cube through the space.

A **pattern** is defined by:

$$P = \{\vec{x} + \alpha\vec{d} \mid d \in D\}$$

To ensure convergence to a local minimum, $D$ must be a **positive spanning set**:
- Can construct any point in $\mathbb{R}^n$ as a nonnegative linear combination of directions in $D$
- Ensures at least one direction in $D$ is a *descent* direction from any point with non-zero gradient
- While H-J uses $2n$ directions, GPS can use as few as $n + 1$

**Algorithm:**
function generalized_pattern_search(f, x, α, D, ε, γ=0.5)
y, n = f(x), length(x)
while α > ε
improved = false
for (i,d) in enumerate(D)
x′ = x + α*d
y′ = f(x′)
if y′ < y
x, y, improved = x′, y′, true
D = pushfirst!(deleteat!(D, i), d)
break
end
end
if !improved
α *= γ
end
end
return x
end

**Options:**
- *Opportunistic* — first improved value is accepted
- *Dynamic ordering* — direction that leads to improvement is pushed to front of queue

> **Note:** Because directions don't change, GPS can be thought of as sliding and shrinking an $n$-dimensional pattern on an $n$-dimensional lattice.

---

## Nelder-Mead Simplex Method

A **simplex** is a generalisation of the tetrahedron in $n$-dimensional space:

| Dimensions | Shape |
|---|---|
| 1 | Line segment |
| 2 | Triangle |
| 3 | Tetrahedron |
| $n$ | $n$-simplex |

Called a *simplex* as it is the simplest polytope (flat-faced object) in any given space.

The simplex method (Nelder & Mead, 1965) — *not to be confused with the simplex method used in linear programming.*

**Key properties:**
- Rules determine how the pattern moves through the space ("rolls down the hill")
- Based on evaluations at vertices
- Unlike H-J (which only shrinks), it **changes shape** as it moves
- Like H-J, it **shrinks** as it converges on an optimum

**Notation:**
- Let $\vec{x}_1, \ldots, \vec{x}_{n+1}$ be the vertices of a simplex
- Let $\vec{x}_h,\ \vec{x}_s,\ \vec{x}_l$ be the vertices with the *highest*, *second highest*, and *lowest* objective function value
- Let $\bar{\vec{x}}$ be the mean of all points except $\vec{x}_h$ — the **centroid**

---

## Simplex Operations

### Reflection

$$\vec{x}_r = \bar{\vec{x}} + \alpha(\bar{\vec{x}} - \vec{x}_h), \quad \alpha > 0 \quad (\alpha = 1 \text{ typically})$$

### Expansion

$$\vec{x}_e = \bar{\vec{x}} + \beta(\vec{x}_r - \bar{\vec{x}}), \quad \beta > \max(1, \alpha) \quad (\beta = 2 \text{ typically})$$

### Contraction (inside)

$$\vec{x}_c = \bar{\vec{x}} + \gamma(\vec{x}_h - \bar{\vec{x}}), \quad \gamma \in (0, 1) \quad (\gamma = 0.5 \text{ typically})$$

### Contraction (outside)

$$\vec{x}_c = \bar{\vec{x}} + \gamma(\bar{\vec{x}} - \vec{x}_h), \quad \gamma \in (0, 1) \quad (\gamma = 0.5 \text{ typically})$$

### Shrinkage

$$\vec{x}_i = \vec{x}_l + \sigma(\vec{x}_i - \vec{x}_l), \quad \forall i \neq l, \quad \sigma \in (0, 1) \quad (\sigma = 0.5 \text{ typically})$$

---

## Flowchart for N-M Simplex
Initial simplex
↓
Sort simplex entries  →  Compute centroid x̄
↓
Compute reflection:  xr = x̄ + α(x̄ − xh)
↓
yr < yl? ──no──→ yr ≥ ys? ──yes──→ yr ≥ yh? ──no──→ Replace xh with xr
|                  |                   |                      ↓
yes                no                 yes                  Converged?
|                  ↓                   ↓
Compute expansion:  Compute         (same as no branch)
xe = x̄ + β(xr−x̄)  contraction:
|               xc = x̄ + γ(xh−x̄)
ye < yr?               ↓
|              yc > yh? ──yes──→ Shrink all:
yes                 |              x(i) ← (x(i) + xl)/2
|                  no
Replace xh           Replace xh
with xe             with xc
↓
Converged? ──yes──→ Return best point
|
no ──────────────────────────────↑

---

## Simplex Convergence

Stopping criteria options:

- Step size $< \epsilon$
- Improvement $< \epsilon$
- Simplex is "sufficiently small"
- Vertices are "sufficiently close" (converged)
- **Variance of vertex values** as proxy for curvature:

$$\sqrt{\frac{1}{n+1} \sum_{i=1}^{n+1} (y_i - \bar{y})^2} < \epsilon, \quad \text{where } y_i = f(\vec{x}_i) \text{ and } \bar{y} \text{ is the mean}$$

High variance → simplex is in a highly curved region → more gains to make.
Low variance → simplex is in a flat region → diminishing returns.

---

## Simplex Algorithm

*(See Kochenderfer, Sec. 7.5)*
function nelder_mead(f, S, ε; α=1.0, β=2.0, γ=0.5)
Δ, y_arr = Inf, f.(S)
while Δ > ε
p = sortperm(y_arr)               # sort lowest to highest
S, y_arr = S[p], y_arr[p]
xl, yl = S[1], y_arr[1]           # lowest
xh, yh = S[end], y_arr[end]       # highest
xs, ys = S[end-1], y_arr[end-1]   # second-highest
xm = mean(S[1:end-1])             # centroid
xr = xm + α*(xm - xh)            # reflection point
yr = f(xr)
    if yr < yl
        xe = xm + β*(xr-xm)          # expansion point
        ye = f(xe)
        S[end], y_arr[end] = ye < yr ? (xe, ye) : (xr, yr)
    elseif yr ≥ ys
        if yr < yh
            xh, yh, S[end], y_arr[end] = xr, yr, xr, yr
        end
        xc = xm + γ*(xh - xm)        # contraction point
        yc = f(xc)
        if yc > yh
            for i in 2 : length(y_arr)
                S[i] = (S[i] + xl)/2
                y_arr[i] = f(S[i])
            end
        else
            S[end], y_arr[end] = xc, yc
        end
    else
        S[end], y_arr[end] = xr, yr
    end

    Δ = std(y_arr, corrected=false)
end
return S[argmin(y_arr)]
end

---

## Collective Intelligence

With the Simplex method, we maintain a **population** of candidate solutions rather than a single best point:

- No one candidate drives the algorithm on its own
- Combined information from the whole group informs each decision
- Decisions are made based on the **relationship** between candidates

This foreshadows population-based stochastic methods.

---

## Determinism and its Limits

The direct methods covered so far are **deterministic** (given a fixed starting point):
- Running the algorithm 100 times from the same start yields the same answer
- Once a starting position is chosen, many regions of the search space may **never be explored**

To address this, we move to **stochastic** (nondeterministic) algorithms.

---

## Optimisation Algorithms — Complete Roadmap
Optimisation
├── deterministic
│   └── direct methods
│       ├── cyclic
│       │   ├── CCS (Cyclic Coordinate Search)
│       │   └── CCS-A (with Acceleration Step)
│       ├── pattern
│       │   ├── Powell's Method
│       │   ├── H-J (Hooke-Jeeves)
│       │   └── GPS (Generalised Pattern Search)
│       └── simplex
│           └── Nelder-Mead
└── stochastic
└── (next topic)