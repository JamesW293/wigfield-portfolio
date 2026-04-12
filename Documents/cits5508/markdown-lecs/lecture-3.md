# CITS5508 Machine Learning: Regression Models
[cite_start]**Instructor:** Marcell Szikszai [cite: 760]
[cite_start]**Year:** 2026 [cite: 761]
[cite_start]**University:** The University of Western Australia [cite: 763]

---

## 1. Overview and Reading Materials
[cite_start]This lecture introduces how Machine Learning algorithms work, focusing specifically on regression models[cite: 782]. 

### Topics Covered
* [cite_start]Linear Regression [cite: 784]
* [cite_start]Gradient Descent [cite: 785]
* [cite_start]Polynomial Regression [cite: 786]
* [cite_start]Learning Curves [cite: 787]
* [cite_start]Regularised Linear Models [cite: 788]
* [cite_start]Logistic Regression [cite: 789]

### Recommended Reading
* [cite_start]**Textbook:** *Hands-on Machine Learning with Scikit-Learn, Keras & TensorFlow* (2nd Edition) by Aurélien Géron, O'Reilly Media, 2022[cite: 769, 776, 777].
* [cite_start]**Chapter:** Chapter 4 - Training Models[cite: 775].

---

## 2. Linear Regression
[cite_start]A Linear Regression model makes a prediction by computing a weighted sum of the input features, plus a bias (or intercept) term[cite: 792].

* [cite_start]**Equation:** $\hat{y} = \theta_{0} + \theta_{1}x_{1} + \theta_{2}x_{2} + ... + \theta_{n}x_{n}$ [cite: 793]
* [cite_start]**Vectorised Equation:** $\hat{y} = h_{\theta}(x) = \theta^{\top}x$ [cite: 803]
    * [cite_start]$\hat{y}$ is the predicted value[cite: 805].
    * [cite_start]$\theta$ is the parameter vector containing the bias and feature weights[cite: 806].
    * [cite_start]$x$ is the feature vector[cite: 807].

### Training the Model
[cite_start]Training involves finding the value of $\theta$ that minimizes a cost function $C(\theta)$[cite: 815].
* [cite_start]**Mean Squared Error (MSE):** $MSE(X,h_{\theta}) = \frac{1}{m}\sum_{i=1}^{m}(\theta^{\top}x^{(i)} - y^{(i)})^{2}$ [cite: 820, 821]
* [cite_start]**Residual Sum of Squares (RSS):** $RSS(X,h_{\theta}) = \sum_{i=1}^{m}(\theta^{\top}x^{(i)} - y^{(i)})^{2}$ [cite: 822, 823]

### The Normal Equation
[cite_start]To directly find the $\theta$ that minimizes the cost function, a closed-form mathematical solution known as the Normal Equation is used[cite: 837, 838].
[cite_start]$$\hat{\theta} = (X^{\top}X)^{-1}X^{\top}y$$ [cite: 840]

* [cite_start]The running time of the Normal Equation is linear with respect to the number of training instances, but it can be cubic with respect to the number of features[cite: 920].

---

## 3. Gradient Descent
[cite_start]Gradient Descent is a generic optimization algorithm that iteratively tweaks parameters to minimize a cost function[cite: 924]. [cite_start]It measures the local gradient of the error function and steps in the direction of the descending gradient until it reaches a minimum[cite: 925].

### The Gradient Vector and Steps
* [cite_start]**Partial Derivative of MSE:** $\frac{\partial}{\partial\theta_{j}}MSE(\theta) = \frac{2}{m}\sum_{i=1}^{m}(\theta^{\top}x^{(i)} - y^{(i)})x_{j}^{(i)}$ [cite: 933]
* [cite_start]**Gradient Vector:** $grad(\theta) = \nabla_{\theta}MSE(\theta) = \frac{2}{m}X^{\top}(X\theta - y)$ [cite: 948]
* [cite_start]**Gradient Descent Step:** $\theta^{(t+1)} = \theta^{(t)} - \eta~grad(\theta^{(t)})$ where $\eta$ is the learning rate [cite: 950, 951]

### Pitfalls and Learning Rate
* [cite_start]The algorithm can get stuck in a local minimum or plateau instead of reaching the global minimum[cite: 971, 972].
* [cite_start]The learning rate ($\eta$) determines the step size; if it is too high, the algorithm may diverge[cite: 961, 1024].

### Three Variants of Gradient Descent
* [cite_start]**Batch GD:** Uses the entire training set to compute gradients at every step, making it very slow for large datasets[cite: 1100].
* [cite_start]**Stochastic GD (SGD):** Picks a random instance at every step and computes gradients based only on that instance[cite: 1101]. [cite_start]This is much faster but causes the cost to jump around[cite: 1102, 1107]. [cite_start]A learning schedule can gradually reduce the learning rate to help it converge[cite: 1111].
* [cite_start]**Mini-batch GD:** Computes gradients on small random sets of instances, allowing for hardware optimization like GPU vectorisation[cite: 1104, 1105].

---

## 4. Polynomial Regression and Learning Curves
[cite_start]If the data is more complex than a straight line, Polynomial Regression introduces new features by computing powers of existing features (e.g., $x_{1}^{2}$) and training a linear model on the extended set[cite: 1173, 1194].

### Overfitting vs. Underfitting
* [cite_start]A high-degree polynomial model (e.g., 300 degrees) will severely overfit the training data, capturing noise[cite: 1232, 1247].
* [cite_start]A strict linear model may underfit complex data[cite: 1247].

### Learning Curves
* [cite_start]Learning Curves plot a model's performance on the training set and validation set as a function of the training set size[cite: 1253].
* [cite_start]Generating these plots by training models on subsets of varying sizes helps diagnose if a model is overfitting or underfitting[cite: 1250, 1254].

---

## 5. Logistic Regression
[cite_start]Logistic Regression is a regression algorithm used for classification by estimating the probability that an instance belongs to a specific class[cite: 1301, 1302].

### The Logistic Function
[cite_start]It computes a weighted sum of inputs but outputs the logistic (sigmoid) of the result[cite: 1305, 1308].
[cite_start]$$\hat{p} = h_{\theta}(x) = \sigma(\theta^{\top}x)$$ [cite: 1308]
[cite_start]$$\sigma(t) = \frac{1}{1+exp(-t)}$$ [cite: 1310]

* [cite_start]The model predicts `1` if $\hat{p} \ge 0.5$ (meaning $\theta^{\top}x$ is positive) and `0` if $\hat{p} < 0.5$ ($\theta^{\top}x$ is negative)[cite: 1329, 1330].

### Cost Function (Log Loss)
[cite_start]The algorithm searches for a $\theta$ that yields high probabilities for positive instances and low probabilities for negative instances[cite: 1333].
* [cite_start]**Single Instance Cost:** $C(\theta) = -log(\hat{p})$ if $y=1$, and $-log(1-\hat{p})$ if $y=0$[cite: 1336, 1337].
* [cite_start]**Overall Cost Function:** $J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}[y^{(i)}log(\hat{p}^{(i)}) + (1-y^{(i)})log(1-\hat{p}^{(i)})]$[cite: 1365].
* [cite_start]While there is no closed-form equation to compute the minimum, the cost function is convex, guaranteeing that Gradient Descent will find the global minimum[cite: 1369, 1370].

### Example: Iris Dataset
[cite_start]In an example classifying whether a flower is *Iris-Virginica* or not based on petal width and length, Logistic Regression successfully creates a linear decision boundary separating the classes[cite: 1382, 1405, 1406].