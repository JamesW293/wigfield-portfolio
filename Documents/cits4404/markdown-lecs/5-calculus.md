# Crash Course/Refresher in Vector Calculus
*© Siwen Luo, UWA — University of Western Australia*

---

## Part 1: Univariate Differentiation
### Gradients And Function Extrema

**References**
- *Introduction to Differential Calculus*, Australian Mathematics Sciences Institute (AMSI)
- *Thomas' Calculus in SI Units*, 13th Ed., Pearson 2016
- Many other books on Calculus

---

## Recall Gradient of a Line

$$\text{gradient (slope)} = \frac{\text{rise}}{\text{run}} = \frac{\Delta y}{\Delta x}$$

---

## Approximate Gradient of a Curve

The slope is approximated by the secant connecting points on the graph $y = f(x)$ at $x$ and $x + \Delta x$:

$$\frac{\Delta y}{\Delta x} = \frac{f(x + \Delta x) - f(x)}{(x + \Delta x) - x} = \frac{f(x + \Delta x) - f(x)}{\Delta x}$$

---

## Gradient

As $\Delta x \to 0$:
- $q \to p$
- The secant approaches the tangent
- $\dfrac{\Delta y}{\Delta x} \to$ gradient (slope of tangent)

The gradient of the tangent at point $p$ is:

$$\lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x}$$

---

## Gradient — Example

**Example:** $f(x) = x^2$

**Secants of the parabola $f(x) = x^2$**

| Secant between points | $\Delta x$ | $\Delta y = f(x + \Delta x) - f(x)$ | Gradient of secant $\frac{\Delta y}{\Delta x}$ |
|---|---|---|---|
| $x=1,\ x=3$ | 2 | 8 | 4 |
| $x=1,\ x=2$ | 1 | 3 | 3 |
| $x=1,\ x=1.5$ | 0.5 | 1.25 | 2.5 |
| $x=1,\ x=1.1$ | 0.1 | 0.21 | 2.1 |
| $x=1,\ x=1.001$ | 0.001 | 0.002001 | 2.001 |

$$\to 2$$

---

## Derivatives

We would like a *function* that gives us the gradient for **any** $x$ — this is the **derivative**:

$$\frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x} = \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}$$

If $y = f(x)$, can also write as:

$$f'(x) = \frac{dy}{dx}$$

**Other notations:**

$$\frac{d}{dx}(f(x)), \quad \frac{d}{dx}f(x), \quad \frac{d}{dx}y$$

---

## Calculating Derivatives

**Example (direct from formula):** $f(x) = x^2$

$$\lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}
= \lim_{\Delta x \to 0} \frac{(x + \Delta x)^2 - x^2}{\Delta x}$$

$$= \lim_{\Delta x \to 0} \frac{x^2 + 2x(\Delta x) + (\Delta x)^2 - x^2}{\Delta x}$$

$$= \lim_{\Delta x \to 0} (2x + \Delta x) = 2x$$

*(at $x=1$, $f'(x)=2$ as before)*

---

## Derivatives of Polynomials

- **Derivative of a power:**

$$\frac{d}{dx} x^n = nx^{n-1}$$

- **Derivative of a constant multiple:**

$$\frac{d}{dx} c f(x) = c \frac{d}{dx} f(x)$$

- **Derivative of a sum:**

$$\frac{d}{dx}(f(x) + g(x)) = \frac{d}{dx}f(x) + \frac{d}{dx}g(x)$$

By combining these rules (actually theorems) we can differentiate any polynomial.

**Example:** $f(x) = x^3 + 5x^2$

$$f'(x) = \frac{d}{dx}(x^3 + 5x^2)$$

$$= \frac{d}{dx}(x^3) + \frac{d}{dx}(5x^2) \qquad \text{(derivative of a sum)}$$

$$= \frac{d}{dx}(x^3) + 5\frac{d}{dx}(x^2) \qquad \text{(derivative of a constant multiple)}$$

$$= 3x^2 + 10x \qquad \text{(derivative of } x^n\text{)}$$

Other functions don't fall out quite as easily as addition...

---

## Product Rule

- **Derivative of a product:**

$$\frac{d}{dx}(f(x)\,g(x)) = f(x)\frac{d}{dx}g(x) + g(x)\frac{d}{dx}f(x)$$

**Example:** $f(x) = (x^3 + 2)(x^2 + 1)$

$$f'(x) = (x^3 + 2)\frac{d}{dx}(x^2 + 1) + (x^2 + 1)\frac{d}{dx}(x^3 + 2)$$

$$= (x^3 + 2) \cdot 2x + (x^2 + 1) \cdot 3x^2$$

$$= 5x^4 + 3x^2 + 4x$$

**Exercise:** Expand $f$ and then take the derivative to check the result is the same.

---

## Chain Rule

This rule will be very important for us!

- **Derivative of a composition of two functions (chain rule):**

$$\frac{d}{dx}f(g(x)) = \frac{d}{dg(x)}f(g(x)) \cdot \frac{d}{dx}g(x)$$

To simplify, define $u = g(x)$ and $y = f(g(x)) = f(u)$. Then the chain rule becomes:

$$\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$$

**Exercise:** Differentiate $f(x) = (x^7 - x^2)^{42}$

*(where $u = x^7 - x^2$ and $y = u^{42}$)*

---

## (Quotient Rule)

There is also a quotient rule:

$$\frac{d}{dx}\!\left(\frac{f(x)}{g(x)}\right) = \frac{g(x)f'(x) - f(x)g'(x)}{(g(x))^2}$$

but this need not be memorised, since:

$$\frac{d}{dx}\!\left(\frac{f(x)}{g(x)}\right) = \frac{d}{dx}\!\left(f(x)\,(g(x))^{-1}\right)$$

and from the chain rule we know:

$$\frac{d}{dx}\!\left((g(x))^{-1}\right) = -(g(x))^{-2}\frac{d}{dx}g(x)$$

**Exercise:** Differentiate $f(x) = \dfrac{x}{\sqrt{x^2 + 1}}$

---

## Exponential Functions

This will also be important for us!

- **Derivatives of exponentials:**

$$\frac{d}{dx}(e^x) = e^x \qquad \text{(amazing!)}$$

Also note:

$$\frac{d}{dx}(a^x) = \ln(a) \cdot a^x$$

---

## Why are Derivatives so Useful for Optimisation?

The critical points of a function locate where it is increasing and where it is decreasing. The first derivative changes sign at a critical point where a local extremum occurs.

> **THEOREM 2 — The First Derivative Theorem for Local Extreme Values:** If $f$ has a local maximum or minimum value at an interior point $c$ of its domain, and if $f'$ is defined at $c$, then $f'(c) = 0$.

**First Derivative Test for Local Extrema**

Suppose $c$ is a critical point of a continuous function $f$, and that $f$ is differentiable at every point in some interval containing $c$ except possibly at $c$ itself. Moving across this interval from left to right:

1. If $f'$ changes from negative to positive at $c$, then $f$ has a **local minimum** at $c$.
2. If $f'$ changes from positive to negative at $c$, then $f$ has a **local maximum** at $c$.
3. If $f'$ does not change sign at $c$, then $f$ has **no local extremum** at $c$.

---

## Second Derivative

Simply the derivative of the 1st derivative:

$$f''(x) \equiv \frac{d^2}{dx^2}y \equiv \frac{d^2y}{dx^2}$$

where:

$$\frac{d^2y}{dx^2} = \frac{d}{dx}\!\left(\frac{dy}{dx}\right)$$

**Example:**

- Let $y = x^7 + 3x^5 + x^{\frac{3}{2}}$
- Then $\dfrac{dy}{dx} = 7x^6 + 15x^4 + \dfrac{3}{2}x^{\frac{1}{2}}$
- And $\dfrac{d^2y}{dx^2} = 42x^5 + 60x^3 + \dfrac{3}{4}x^{-\frac{1}{2}}$

> **Q.** What is $\dfrac{d^2}{dx^2}(e^x)$?

---

## Why are Second Derivatives so Useful for Optimisation?

**The Second Derivative Test for Concavity**

Let $y = f(x)$ be twice-differentiable on an interval $I$.

1. If $f'' > 0$ on $I$, the graph of $f$ over $I$ is **concave up**.
2. If $f'' < 0$ on $I$, the graph of $f$ over $I$ is **concave down**.

> **THEOREM 5 — Second Derivative Test for Local Extrema:** Suppose $f''$ is continuous on an open interval that contains $x = c$.
>
> 1. If $f'(c) = 0$ and $f''(c) < 0$, then $f$ has a **local maximum** at $x = c$.
> 2. If $f'(c) = 0$ and $f''(c) > 0$, then $f$ has a **local minimum** at $x = c$.
> 3. If $f'(c) = 0$ and $f''(c) = 0$, then the test **fails**. The function $f$ may have a local maximum, a local minimum, or neither.

$$f' = 0,\ f'' < 0 \implies \text{local max} \qquad f' = 0,\ f'' > 0 \implies \text{local min}$$

---

## Part 2: Vector Calculus
### Multivariate Differentiation

**References**
- *Thomas' Calculus in SI Units*, 13th Ed., Pearson 2016
- Many other books on Vector/Multivariate Calculus

---

## Vectors

A vector has **magnitude** and **direction**. The directed line segment $\overrightarrow{AB}$ is called a vector. Vectors with the same length and direction represent the same vector:

$$\overrightarrow{AB} = \overrightarrow{CD} = \overrightarrow{OP} = \overrightarrow{EF}$$

---

## Euclidean Distance

**magnitude** a.k.a. **Euclidean distance** a.k.a. $L^2$ **norm**

$$\|\vec{v}\| = \sqrt{v_1^2 + v_2^2 + v_3^2} = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$$

---

## Vector Addition

$$\vec{u} + \vec{v} = \langle u_1 + v_1,\ u_2 + v_2 \rangle$$

(Geometric interpretation: triangle rule or parallelogram law.)

---

## Subtraction (Difference)

$$\vec{u} - \vec{v} = \vec{u} + (-\vec{v})$$

Scalar multiples: $1.5\vec{u},\ 2\vec{u},\ -2\vec{u}$, etc.

---

## Three Kinds of Multiplication

### Dot Product

Also known as *inner product* or *scalar product* (result is a scalar):

$$\vec{v} \bullet \vec{w} = \sum_{i=1}^{n} v_i w_i = v_1w_1 + v_2w_2 + \cdots + v_nw_n$$

$$= \begin{bmatrix} v_1 & v_2 & \cdots & v_n \end{bmatrix} \begin{bmatrix} w_1 \\ w_2 \\ \vdots \\ w_n \end{bmatrix} = \vec{v}^\top \vec{w}$$

Hence:

$$\vec{a} \bullet \vec{a} = \|\vec{a}\|^2 \quad \text{or} \quad \|\vec{a}\| = \sqrt{\vec{a} \bullet \vec{a}}$$

---

### Tensor Product

Also known as *outer product*:

$$\vec{v} \otimes \vec{w} = \begin{bmatrix} v_1w_1 & v_1w_2 & \cdots & v_1w_n \\ v_2w_1 & v_2w_2 & \cdots & v_2w_n \\ \vdots & & & \vdots \\ v_mw_1 & v_mw_2 & \cdots & v_mw_n \end{bmatrix} = \vec{v}\,\vec{w}^\top$$

---

### Hadamard Product

Also known as *element-wise product* or *Schur product*:

$$\vec{v} \odot \vec{w} = \begin{bmatrix} v_1w_1 \\ v_2w_2 \\ \vdots \\ v_nw_n \end{bmatrix}$$

---

## Unit Vectors

- **Standard unit vectors:**

$$\vec{i} = [1,0,0], \quad \vec{j} = [0,1,0], \quad \vec{k} = [0,0,1]$$

- Any vector can be written as a *linear combination of the standard unit vectors*:

$$\vec{v} = [v_1, v_2, v_3] = v_1\vec{i} + v_2\vec{j} + v_3\vec{k}$$

For more than 3 dimensions, the standard unit (or *elementary*) vectors in $\mathbb{R}^n$ are denoted:

$$\vec{e}_1,\ \vec{e}_2,\ \ldots,\ \vec{e}_n$$

---

## Vector Fields

A vector field assigns a vector to each point in space. Examples include gravitational fields and wind patterns.

---

## Another Way of Thinking About Gradient

Consider $f(x) = x^2 + 1$, with derivative $f'(x) = 2x$.

- When $x = 1$, the gradient has **magnitude** 2 and is in the **direction** of the positive $x$ axis.
- Can think of this as a **vector** in $\mathbb{R}^1$.

Let $\vec{e}_1$ be a unit (or "elementary") vector in $\mathbb{R}^1$ (magnitude 1, $+$ve $x$ direction). Gradient at $x = 1$ can be represented by the vector $2\vec{e}_1$.

In fact, for any scalar value $x$, the gradient is given by $2x\vec{e}_1$. There are an infinite number of these vectors — they constitute a **vector field**.

---

## 2-Dimensions

Consider the function $f(x_1, x_2) = x_1^2$:

- "Trough" running along the $x_2$ axis
- Doesn't vary with $x_2$
- Any slice (plane) taken through the $x_2$ axis shows a quadratic
- The gradient also doesn't vary with $x_2$
- A tangential plane will be parallel to the $x_2$ axis
- Gradient is a **vector field** in 2 dimensions defined by the derivative with respect to $x_1$

---

## Partial Derivatives

- Derivative with respect to **one variable** with **all other variables fixed (held constant)**:

$$f(x_1, x_2) = x_1^2$$

$$\frac{\partial}{\partial x_1} f(x_1, x_2) = 2x_1$$

**Exercise:** What is $\dfrac{\partial}{\partial x_2} f(x_1, x_2)$? Is it what you expect?

---

Consider the function $f(x_1, x_2) = x_1^2 + x_2^2$:

- "Bowl" shape
- As we slide a tangent plane around the surface, the direction it faces will change (always away from centre)
- Vector field points away from $(0,0)$

If we slice the function at any point $p$ along the $x_2$ axis, the projection is the quadratic $x_1^2 + p^2$:
- Contribution to the slope is $2x_1$ (independent of $x_2$)
- As a vector: $2x_1\vec{e}_1$
- Found by partial differentiation with respect to $x_1$:

$$\frac{\partial}{\partial x_1}(x_1^2 + x_2^2) = 2x_1$$

If we don't slice, the gradient also has a contribution from $x_2$, found by:

$$\frac{\partial}{\partial x_2}(x_1^2 + x_2^2) = 2x_2$$

Or as a vector: $2x_2\vec{e}_2$

---

## Gradient

So we have two components to the gradient — just add the vectors together!

$$\text{gradient} = 2x_1\vec{e}_1 + 2x_2\vec{e}_2$$

We call this **grad** $f$ or $\nabla(f)$.

---

## Gradient — General Definition

In general, if $\vec{x} = (x_1, x_2, \ldots, x_n) \in \mathbb{R}^n$ and $f : \mathbb{R}^n \to \mathbb{R}$,

then the gradient $\nabla f : \mathbb{R}^n \to \mathbb{R}^n$ is given by:

$$\nabla f(\vec{x}) = \frac{\partial f(\vec{x})}{\partial x_1}\vec{e}_1 + \frac{\partial f(\vec{x})}{\partial x_2}\vec{e}_2 + \cdots + \frac{\partial f(\vec{x})}{\partial x_n}\vec{e}_n$$

or equivalently as a column vector:

$$\nabla f(\vec{x}) = \begin{bmatrix} \dfrac{\partial f(\vec{x})}{\partial x_1} \\[8pt] \dfrac{\partial f(\vec{x})}{\partial x_2} \\[8pt] \vdots \\[4pt] \dfrac{\partial f(\vec{x})}{\partial x_n} \end{bmatrix}$$

---

## In Words...

- The **gradient** of a scalar (differentiable) function $f$ is a **vector field**.
- The value at any point is a vector whose components are the **partial derivatives** of $f$ at that point.

**Example:** $F(x, y) = x^2 - y^2$

The gradient $\nabla F$ is a vector field in the $(x, y)$-plane, with arrows pointing in the direction of steepest ascent at each point.