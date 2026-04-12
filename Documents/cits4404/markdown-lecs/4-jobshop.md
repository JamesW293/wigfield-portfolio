# Optimisation: A Case Study
## The Job Shop Problem

*© Siwen Luo, UWA — University of Western Australia*

---

## Slide 2: Case Study — The Job Shop Problem

**Also known as:**
- Job Shop Scheduling Problem (JSP / JSSP)
- Machine Scheduling

**A classic combinatorial optimisation problem**

- Real-world relevance: manufacturing, computing, logistics
- Computationally: NP-hard in general

---

## Slide 3: The Job Shop Problem — Description

**Setup:**

- There are $n$ **jobs**: $J_1, J_2, \ldots, J_n$
- There are $m$ **machines**: $M_1, M_2, \ldots, M_m$
- Each job $J_i$ consists of an ordered sequence of **operations**
- Each operation must be processed on a specific machine for a given duration
- Each machine can process **at most one operation at a time**
- Operations within a job must follow a fixed **precedence order**

**Goal:**

Assign start times to all operations so as to minimise some objective — typically the **makespan** $C_{\max}$, i.e. the time at which all jobs are completed:

$$C_{\max} = \max_{i} C_i$$

where $C_i$ is the **completion time** of job $J_i$.

---

## Slide 4: Example — A Small JSP Instance

**3 jobs, 3 machines**

Each row is a job; each cell gives *(machine, processing time)*:

| Job | Operation 1 | Operation 2 | Operation 3 |
|---|---|---|---|
| $J_1$ | $(M_1,\ 3)$ | $(M_2,\ 3)$ | $(M_3,\ 3)$ |
| $J_2$ | $(M_1,\ 2)$ | $(M_3,\ 3)$ | $(M_2,\ 4)$ |
| $J_3$ | $(M_2,\ 3)$ | $(M_1,\ 2)$ | $(M_3,\ 2)$ |

**Constraints:**
- Each machine handles only one operation at a time
- Operations within a job cannot overlap or be reordered

---

## Slide 5: Gantt Chart Representation

A **Gantt chart** is the natural language for representing a JSP schedule.

- $x$-axis: time $t$
- $y$-axis: machines $M_1, M_2, \ldots, M_m$
- Each bar represents an operation of a job on a machine during a time interval $[s_{ij},\ s_{ij} + p_{ij}]$

where:
- $s_{ij}$ = start time of job $J_i$ on machine $M_j$
- $p_{ij}$ = processing time of job $J_i$ on machine $M_j$

**Makespan** is the length of the longest bar — the time from $t=0$ to the last completion:

$$C_{\max} = \max_{i,j}\ (s_{ij} + p_{ij})$$

---

## Slide 6: The Three Key Ingredients Applied to JSP

### 1. Language (Representation)

What is the representation/language for a JSP solution?

- A **schedule**: an assignment of start times $s_{ij}$ to all operations
- Equivalently: a **permutation** (ordering) of operations on each machine

Formally, for each machine $M_k$, a permutation $\pi_k$ of the jobs assigned to it:

$$\pi_k = (\pi_k(1),\ \pi_k(2),\ \ldots,\ \pi_k(n_k))$$

The set of all valid permutation combinations forms the **hypothesis space** $H$.

Size of hypothesis space:

$$|H| \leq (n!)^m$$

For even modest $n$ and $m$, this is astronomically large.

---

### 2. Model (Instantiation/Candidate Solution)

A **candidate solution** is one specific schedule — one assignment of operations to time slots on machines, consistent with:

- **Machine constraints**: no two operations overlap on the same machine
- **Precedence constraints**: operations within each job maintain their order

A candidate solution can be represented as:
- A Gantt chart
- A matrix of start times $S = [s_{ij}]$
- An operation sequence / permutation list

---

### 3. Metric (Evaluation)

The most common objective is to **minimise makespan**:

$$\min\ C_{\max} = \min\ \max_{i}\ C_i$$

Other objectives include:

| Objective | Formula |
|---|---|
| Makespan | $C_{\max} = \max_i C_i$ |
| Total completion time | $\sum_{i=1}^{n} C_i$ |
| Total weighted completion time | $\sum_{i=1}^{n} w_i C_i$ |
| Maximum lateness | $L_{\max} = \max_i (C_i - d_i)$ |
| Number of tardy jobs | $\sum_{i=1}^{n} U_i$ where $U_i = \mathbf{1}[C_i > d_i]$ |

where $d_i$ is the **due date** of job $J_i$ and $w_i$ is its **weight/priority**.

---

## Slide 7: Complexity of JSP

**Why is JSP hard?**

- General JSP is **NP-hard** (even for $2$ machines and $3$ jobs in some formulations)
- The solution space grows super-exponentially:

For $n$ jobs and $m$ machines:

$$|H| \leq (n!)^m$$

**Example:**

| $n$ | $m$ | Upper bound on $|H|$ |
|---|---|---|
| $3$ | $3$ | $(3!)^3 = 6^3 = 216$ |
| $5$ | $5$ | $(5!)^5 = 120^5 \approx 2.49 \times 10^{10}$ |
| $10$ | $10$ | $(10!)^{10} \approx 3.63 \times 10^{65}$ |

Even for small instances, exhaustive search is infeasible.

---

## Slide 8: Exact vs Approximate Methods

### Exact Methods

Guarantee finding the **global optimum** but may be computationally infeasible for large instances:

- **Branch and Bound**
- **Dynamic Programming**
- **Integer Linear Programming (ILP)**

### Approximate / Heuristic Methods

Trade optimality for tractability — find *good enough* solutions quickly:

- **Constructive heuristics** (e.g. dispatching rules)
- **Local search** (e.g. hill climbing, simulated annealing)
- **Population-based methods** (e.g. genetic algorithms, particle swarm)
- **Hybrids**

This is where **adaptive/nature-inspired methods** shine!

---

## Slide 9: Dispatching Rules (Simple Heuristics)

**Dispatching rules** assign priorities to jobs waiting for a machine.

Common rules:

| Rule | Description | Priority function |
|---|---|---|
| **SPT** | Shortest Processing Time first | $p_i \uparrow$ (ascending) |
| **LPT** | Longest Processing Time first | $p_i \downarrow$ (descending) |
| **EDD** | Earliest Due Date first | $d_i \uparrow$ |
| **FIFO** | First In, First Out | arrival order |
| **LIFO** | Last In, First Out | reverse arrival order |
| **CR** | Critical Ratio | $\frac{d_i - t}{p_i}$ ascending |
| **MWKR** | Most Work Remaining | $\sum_{k \text{ remaining}} p_{ik}\ \downarrow$ |

These are **deterministic** rules — fast but may produce poor solutions.

---

## Slide 10: JSP as a Graph Problem

A JSP instance can be modelled as a **disjunctive graph** $G = (V, C \cup D)$:

- $V$ = set of all operations $+$ two dummy nodes $s$ (source) and $t$ (sink)
- $C$ = **conjunctive arcs** — fixed precedence arcs within each job
- $D$ = **disjunctive arcs** — pairs of arcs between operations competing for the same machine (one direction must be chosen per pair)

**Makespan** equals the length of the **longest path** (critical path) from $s$ to $t$:

$$C_{\max} = \text{longest path}(s \rightarrow t)$$

A feasible schedule = a selection of one arc direction for each disjunctive pair such that $G$ is **acyclic** (no deadlock).

---

## Slide 11: Local Search for JSP

**Neighbourhood definition** is crucial for local search.

A standard neighbourhood for JSP (**$N_1$ neighbourhood**, van Laarhoven et al.):

- Identify the **critical path** — the longest path determining $C_{\max}$
- A move = swap two **adjacent operations** on the critical path that belong to **different jobs** on the same machine

This gives:

$$N(s) = \{ s' : s' \text{ obtained by one adjacent swap on critical path} \}$$

**Why this works:** any improvement must shorten the critical path; swapping adjacent critical-path operations on the same machine is the minimal perturbation likely to do so.

---

## Slide 12: Benchmark Instances

JSP has well-known benchmark instances used to compare algorithms:

| Instance | $n \times m$ | Best Known $C_{\max}$ | Status |
|---|---|---|---|
| **FT06** (Fisher & Thompson) | $6 \times 6$ | $55$ | Optimal known |
| **FT10** | $10 \times 10$ | $930$ | Optimal known |
| **FT20** | $20 \times 5$ | $1165$ | Optimal known |
| **LA01–LA40** (Lawrence) | various | various | Most solved |
| **ORB01–ORB10** | $10 \times 10$ | various | Most solved |
| **TA01–TA80** (Taillard) | up to $100 \times 20$ | various | Many open |

**Performance metric** — percentage deviation from best known solution (BKS):

$$\text{RPD} = \frac{C_{\max}^{\text{obtained}} - C_{\max}^{\text{BKS}}}{C_{\max}^{\text{BKS}}} \times 100\%$$

---

## Slide 13: Summary — JSP as an Optimisation Problem

| Component | JSP Instantiation |
|---|---|
| **Language (Representation)** | Permutation of operations per machine; Gantt chart; start-time matrix $S = [s_{ij}]$ |
| **Model (Candidate Solution)** | One specific feasible schedule satisfying machine + precedence constraints |
| **Metric (Evaluation)** | Makespan $C_{\max} = \max_i C_i$; or other scheduling objectives |
| **Hypothesis Space** | All feasible schedules; size $\leq (n!)^m$ |
| **Optimisation Goal** | $\min\ C_{\max}$ (or other objective) |
| **Challenge** | NP-hard; exact methods infeasible for large $n, m$ |
| **Adaptive Methods** | Genetic algorithms, simulated annealing, ant colony optimisation, etc. |

---

## Slide 14: Connecting JSP to the Broader Framework

$$\boxed{\textbf{AI} = \textbf{optimisation}}$$

The JSP illustrates all three key ingredients:

1. **Language** — defines *what solutions look like* (the hypothesis space)
2. **Model** — a specific *candidate solution* (a schedule)
3. **Metric** — *how good* the solution is (makespan, tardiness, etc.)

**Key insight:** changing *any* of the three ingredients changes the problem:

- Change the language → different hypothesis space (e.g. allow preemption → preemptive scheduling)
- Change the metric → different objective (e.g. minimise $\sum w_i C_i$ instead of $C_{\max}$)
- Change the optimisation method → different trade-off between solution quality and compute time

$$\text{Better language} + \text{Better metric} + \text{Better search} = \text{Better AI}$$