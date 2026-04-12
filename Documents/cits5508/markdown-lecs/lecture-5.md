# CITS5508 Machine Learning: Support Vector Machines
**Instructor:** Marcell Szikszai
**Year:** 2026
[cite_start]**University:** The University of Western Australia [cite: 1997, 1998, 1999, 2001]

---

## 1. Overview and Reading Materials
[cite_start]This lecture introduces Support Vector Machines (SVMs), explaining their core concepts, how they work under the hood, and how to use them for both classification and regression. [cite: 2021, 2022]

### Recommended Reading
* [cite_start]**Textbook:** *Hands-on Machine Learning with Scikit-Learn, Keras & TensorFlow* (2nd Edition) by Aurélien Géron, O'Reilly Media, 2022. [cite: 2007, 2008, 2012, 2014, 2015]
* [cite_start]**Chapter:** Chapter 5 - Support Vector Machines. [cite: 2013]

---

## 2. Introduction to Support Vector Machines
[cite_start]A Support Vector Machine (SVM) is a versatile machine learning model capable of providing both linear and nonlinear decision boundaries[cite: 2029]. 
* [cite_start]**Applications:** They are used for binary classification and regression tasks[cite: 2030].
* [cite_start]**Best Use Cases:** They are particularly well-suited for the classification of complex but small to medium-sized datasets[cite: 2031].


---

## 3. Linear SVM Classification
### Large Margin Classification
[cite_start]You can conceptualize a linear SVM classifier as fitting the widest possible "street" (represented by parallel dashed lines) between two classes[cite: 2034]. [cite_start]This approach is called *large margin classification*[cite: 2035]. 
* [cite_start]Adding more training instances "off the street" does not affect the decision boundary at all[cite: 2078].
* [cite_start]The boundary is fully determined (or "supported") exclusively by the instances located on the edge of the street, which are known as *support vectors*[cite: 2078, 2079].

### Sensitivity to Scale
[cite_start]SVMs are highly sensitive to feature scales[cite: 2105]. [cite_start]Applying feature scaling (e.g., using Scikit-Learn's `StandardScaler`) significantly improves the decision boundary[cite: 2106]. 
* [cite_start]**Important Rule:** You should only fit the scalers using the training set and then use those estimated parameters to transform your validation and test sets[cite: 2104].

### Hard Margin vs. Soft Margin Classification
* [cite_start]**Hard Margin Classification:** This strictly imposes that all instances must be off the street and on the correct side of the decision boundary[cite: 2136]. [cite_start]It only works if the data is linearly separable and is extremely sensitive to outliers[cite: 2149].
* [cite_start]**Soft Margin Classification:** This provides a more flexible model by finding a good balance between keeping the street as large as possible and limiting margin violations (instances ending up on the street or on the wrong side)[cite: 2175].
  * [cite_start]The hyperparameter $C$ defines this trade-off[cite: 2176].
  * [cite_start]A **small** $C$ leads to a wider street but more margin violations[cite: 2177].
  * [cite_start]A **large** $C$ leads to a narrower street but fewer margin violations[cite: 2178].

---

## 4. Nonlinear SVM Classification
[cite_start]Many datasets are not linearly separable[cite: 2215]. [cite_start]To handle nonlinear datasets, you can add more features, such as polynomial features, which can sometimes result in a linearly separable dataset[cite: 2216, 2217].

### The Kernel Trick
[cite_start]Adding many polynomial features can make model training very slow[cite: 2266]. [cite_start]SVMs leverage a mathematical technique called the *kernel trick*, making it possible to obtain a similar result as if you had added many polynomial or similarity features without actually having to compute them[cite: 2267, 2268, 2545].


### Adding Similarity Features
[cite_start]Another approach to nonlinear problems is adding features computed via a similarity function[cite: 2316]. [cite_start]This measures how much an instance resembles a specific landmark[cite: 2316]. 
* [cite_start]**Gaussian Radial Basis Function (RBF):** $\phi_{\gamma}(x,l) = \text{exp}(-\gamma||x - l||^{2})$[cite: 2318, 2319]. 
* [cite_start]Using the Gaussian RBF kernel via the kernel trick achieves similar results without the massive computational cost[cite: 2351, 2352].

---

## 5. Computational Complexity

| Class | Time complexity | Out-of-core support | Scaling required | Kernel trick |
| :--- | :--- | :--- | :--- | :--- |
| **LinearSVC** | $O(m \times n)$ | No | Yes | No |
| **SVC** | $O(m^{2} \times n)$ to $O(m^{3} \times n)$ | No | Yes | Yes |
| **SGDClassifier** | $O(m \times n)$ | Yes | Yes | No |
[cite_start]*Information from Scikit-Learn SVM Classes* [cite: 2388]

* [cite_start]`LinearSVC` implements an optimized algorithm for linear SVMs that scales almost linearly with the number of training instances ($m$) and features ($n$)[cite: 2386].
* [cite_start]`SVC` supports the kernel trick but gets dreadfully slow as the number of training instances gets large due to its cubic time complexity[cite: 2387].

---

## 6. SVM Regression
[cite_start]Instead of fitting the largest possible street between two classes while limiting margin violations, SVM Regression reverses the objective: it tries to fit as many instances as possible *on* the street while limiting margin violations (instances *off* the street)[cite: 2391].
* [cite_start]For nonlinear regression, a kernelised SVM model can be used (e.g., using a 2nd-degree polynomial kernel)[cite: 2419].

---

## 7. Under the Hood: Math and Optimization
[cite_start]*(Note: The bias term is denoted as $b$ and the feature weights vector as $w$)* [cite: 2443]

### Decision Function
A linear SVM classifier predicts the class of a new instance $x$ by computing the decision function:
[cite_start]$$\hat{y} = w^{T}x + b = w_{1}x_{1} + \dots + w_{n}x_{n} + b$$ [cite: 2450]

The class label prediction is:
[cite_start]$$\hat{y} = \begin{cases} 0, & \text{if}~w^{T}x + b < 0, \\ 1, & \text{if}~w^{T}x + b \ge 0. \end{cases}$$ [cite: 2452]

### Training Objective (Primal Problem)
[cite_start]To make the street wider, we need to make the weight vector $w$ smaller[cite: 2469].
* [cite_start]**Hard Margin Objective:** Minimize $\frac{1}{2}w^{T}w$ [cite: 2457] [cite_start]subject to $t^{(i)}(w^{T}x^{(i)} + b) \ge 1$[cite: 2458]. [cite_start]Here, $t^{(i)} = +1$ for positive instances and $-1$ for negative instances[cite: 2461].
* [cite_start]**Soft Margin Objective:** Introduces a slack variable $\zeta^{(i)} \ge 0$ that measures how much an instance is allowed to violate the margin[cite: 2496]. [cite_start]The objective is to minimize $\frac{1}{2}w^{T}w + C\sum_{i=1}^{m}\zeta^{(i)}$ subject to $t^{(i)}(w^{T}x^{(i)} + b) \ge 1 - \zeta^{(i)}$[cite: 2498, 2499]. 
* [cite_start]These are Convex Quadratic Programming (QP) problems[cite: 2506, 2507].

### The Dual Problem
[cite_start]The linear SVM objective can be formulated as a related *dual problem*[cite: 2525]. 
* [cite_start]The dual problem is faster to solve than the primal problem when the number of training instances is smaller than the number of features[cite: 2529].
* [cite_start]Most importantly, the dual formulation makes the kernel trick possible[cite: 2530].

### [cite_start]Common SVM Kernels [cite: 2544, 2546, 2547, 2548, 2549, 2550, 2551]
* **Linear:** $K(a,b) = a^{T}b$
* **Polynomial:** $K(a,b) = (\gamma a^{T}b + r)^{d}$
* **Gaussian RBF:** $K(a,b) = \text{exp}(-\gamma||a-b||^{2})$
* **Sigmoid:** $K(a,b) = \text{tanh}(\gamma a^{T}b + r)$

### SVM via Gradient Descent
[cite_start]For linear SVM classifiers, you can alternatively use Gradient Descent (e.g., `SGDClassifier`) to minimize the cost function derived from the primal problem[cite: 2561]:
[cite_start]$$J(w,b) = \frac{1}{2}w^{T}w + C\sum_{i=1}^{m}\text{max}(0, 1 - t^{(i)}(w^{T}x^{(i)} + b))$$ [cite: 2563]
[cite_start]However, this converges much more slowly than methods based on QP solvers[cite: 2562].