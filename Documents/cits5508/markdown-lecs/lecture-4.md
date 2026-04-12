# CITS5508 Machine Learning: Regularised Linear Models and k-Nearest Neighbours
[cite_start]**Instructor:** Marcell Szikszai [cite: 1451]
[cite_start]**Year:** 2026 [cite: 1452]
[cite_start]**University:** The University of Western Australia [cite: 1454]

---

## 1. Overview and Reading Materials
[cite_start]This lecture continues exploring how Machine Learning algorithms work, focusing on model tuning, regularisation, and instance-based learning[cite: 1473]. 

### Topics Covered
* [cite_start]The Bias/Variance tradeoff [cite: 1475]
* [cite_start]Cross-validation and Grid-search [cite: 1476]
* [cite_start]Early Stopping [cite: 1477]
* [cite_start]Regularised Linear Models [cite: 1478]
* [cite_start]Softmax Regression [cite: 1479]
* [cite_start]k-Nearest Neighbours (k-NN) algorithm [cite: 1480]

### Recommended Reading
* [cite_start]**Textbook:** *Hands-on Machine Learning with Scikit-Learn, Keras & TensorFlow* (2nd Edition) by Aurélien Géron[cite: 1461, 1465, 1468].
* [cite_start]**Chapter:** Chapter 4 - Training Models[cite: 1466].
* [cite_start]**Resources:** Available online through UWA OneSearch[cite: 1469]. [cite_start]Example code can be found at `handson-m13/04_training_linear models.ipynb`[cite: 1470].

---

## 2. The Bias/Variance Tradeoff
[cite_start]A model's generalisation error can be expressed as the sum of three different errors: Bias, Variance, and Irreducible error[cite: 1483, 1485, 1487]. [cite_start]Increasing a model's complexity will typically increase its variance and reduce its bias, whereas reducing complexity increases bias and reduces variance[cite: 1488, 1489].

* [cite_start]**Bias:** The amount by which the expected model predictions differ from the true value or target over the training data[cite: 1492]. [cite_start]It is due to wrong assumptions, such as assuming data is linear when it is quadratic[cite: 1483]. [cite_start]High-bias algorithms tend to be less flexible, have stronger assumptions, and tend to underfit the data[cite: 1484, 1493].
* [cite_start]**Variance:** This part of the error is due to the model's excessive sensitivity to small variations in the training data[cite: 1485]. [cite_start]High-variance algorithms are very flexible, have weaker assumptions, and may account for every single training example, which leads to overfitting[cite: 1511, 1512, 1513].
* [cite_start]**Irreducible Error:** Typically due to the natural variability of the data itself[cite: 1487].

### Underfitting (High Bias)
[cite_start]Underfitting occurs when the model is too simple to learn the underlying structure of the data[cite: 1504].
* [cite_start]**Solutions:** Select a more powerful model with more parameters [cite: 1506][cite_start]; feed better features to the learning algorithm [cite: 1507][cite_start]; reduce constraints on the model (e.g., reduce the regularisation hyperparameter)[cite: 1508]. [cite_start]ML models with higher variance may also help[cite: 1535].

### Overfitting (High Variance)
[cite_start]Overfitting occurs when the model is strongly influenced by the specifics of the training data[cite: 1525].
* [cite_start]**Solutions:** Get more training data if it comes from the same data-generating mechanism [cite: 1527][cite_start]; use k-fold cross-validation to assess performance on multiple subsets [cite: 1528][cite_start]; reduce the dimensionality using feature selection or dimensionality reduction [cite: 1529][cite_start]; increase the constraints on the model via regularisation[cite: 1530].

---

## 3. Fine-Tuning and Cross-Validation
[cite_start]A hyperparameter is a parameter of a learning algorithm, not the model itself[cite: 1548]. [cite_start]It is not affected by the learning algorithm, must be set prior to training, and remains constant during the training process[cite: 1549]. 
* [cite_start]Examples include the value $k$ in k-NN, polynomial regression degree, regularisation hyperparameters, and logistic regression thresholds[cite: 1550].

### k-Fold Cross-validation
[cite_start]Because using the test set to pick the best hyperparameter values makes the model perform poorly on new data, a validation set is required[cite: 1551].
* [cite_start]The training set is split into $k$ subsets (folds)[cite: 1555]. 
* [cite_start]Multiple models are trained with various hyperparameters on the reduced training set (the full set minus the validation fold)[cite: 1554]. 
* [cite_start]The model is trained and validated $k$ times using different combinations of these sets[cite: 1555].
* [cite_start]Scikit-Learn's `GridSearchCV` or `RandomizedSearchCV` (for large search spaces) can be used to find good hyperparameter combinations via cross-validation[cite: 1574, 1575].
* [cite_start]After validation, the best model is trained on the full training set (including validation data) to produce the final model[cite: 1576]. 
* [cite_start]The final model is evaluated on the test set to estimate generalisation error[cite: 1577].

### Early Stopping
[cite_start]For iterative learning algorithms like Gradient Descent, early stopping is used to regularise the model by stopping training as soon as the validation error reaches a minimum[cite: 1580, 1581].

---

## 4. Regularised Linear Models
[cite_start]Regularisation reduces overfitting by constraining the model; fewer parameters make it harder to overfit the data[cite: 1622]. [cite_start]Linear models are typically regularised by constraining their weights[cite: 1624].

### Ridge Regression
[cite_start]Ridge Regression is a regularised version of Linear Regression using a squared $l_{2}$ penalty[cite: 1631]. [cite_start]The regularisation term should only be added to the cost function during training[cite: 1634].
$$J(\theta) = MSE(\theta) + \alpha\sum_{i=1}^{n}\theta_{i}^{2}$$
* [cite_start]$\alpha$ is the regularisation coefficient[cite: 1638]. [cite_start]It forces the algorithm to fit the data while keeping weights as small as possible[cite: 1633].

### Lasso Regression
[cite_start]Lasso Regression uses an $l_{1}$ penalty instead of the squared term[cite: 1672].
$$J(\theta) = MSE(\theta) + \alpha\sum_{i=1}^{n}|\theta_{i}|$$

### Elastic Net
[cite_start]Elastic Net acts as a middle ground between Ridge and Lasso by combining both regularisation terms[cite: 1794]. [cite_start]It uses hyperparameters $\alpha$ and $r$[cite: 1797].
$$J(\theta) = MSE(\theta) + r\alpha\sum_{i=1}^{n}|\theta_{i}| + \frac{1-r}{2}\alpha\sum_{i=1}^{n}\theta_{i}^{2}$$

---

## 5. Softmax Regression
[cite_start]Softmax Regression (or Multinomial Logistic Regression) generalizes Logistic Regression to directly support multiple classes[cite: 1801]. 

* [cite_start]**Prediction:** Given an instance $x$, it computes a score $s_{k}(x) = (\theta^{(k)})^{T}x$ for each class $k$[cite: 1802, 1804].
* [cite_start]**Probability Estimation:** It applies the normalized exponential (softmax function) to estimate the probability $\hat{p}_{k}$[cite: 1802].
$$\hat{p}_{k} = \sigma(s(x))_{k} = \frac{exp(s_{k}(x))}{\sum_{j=1}^{K}exp(s_{j}(x))}$$
* [cite_start]**Class Assignment:** It predicts the class with the highest estimated probability (highest score)[cite: 1807].
$$\hat{y} = arg~max_{k}\sigma(s(x))_{k} = arg~max~s_{k}(x) = arg~max((\theta^{(k)})^{T}x)$$
* [cite_start]**Cost Function:** The objective is to estimate a high probability for the target class and low probabilities for others[cite: 1811]. [cite_start]$y_{k}^{(i)}$ is the target probability (1 if it belongs to the class, 0 otherwise)[cite: 1813, 1814].
$$J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}\sum_{k=1}^{K}y_{k}^{(i)}log(\hat{p}_{k}^{(i)})$$

---

## 6. k-Nearest Neighbours (k-NN)
[cite_start]The k-NN algorithm is an instance-based learning method, meaning a model is not explicitly learned[cite: 1875, 1876]. [cite_start]It assumes similar instances will be closer to each other in the feature space, utilizing a distance metric[cite: 1877, 1878].

* [cite_start]**Distance Metrics:** The Minkowski distance is used to calculate the distance between instances $x_{i}$ and $x_{j}$[cite: 1885]. 
$$D(x_{i},x_{j}) = \left(\sum_{l=1}^{n}abs(x_{i}[l] - x_{j}[l])^{p}\right)^{1/p}$$
[cite_start]If $p=1$ it is Manhattan distance, and if $p=2$ it is Euclidean distance[cite: 1887].
* **Majority Vote ($k>1$):**
$$\hat{y_{q}} = arg~max_{c\in C}\sum_{i=1}^{k}\delta(c_{i},c)$$
[cite_start]where $\delta(a,b)=1$ if $a==b$ and $\delta(a,b)=0$ if $a\ne b$[cite: 1899, 1900, 1901].
* [cite_start]**Distance-Weighted k-NN:** Weights the contribution of each neighbour by its distance[cite: 1914, 1915].
$$\hat{y_{q}} = arg~max_{c\in C}\sum_{i=1}^{k}w_{i}\delta(c_{i},c)$$
[cite_start]where $w_{i} = \frac{1}{d(x_{q},x_{i})^{2}}$[cite: 1916, 1917].

### k-NN Characteristics & Tradeoffs
* [cite_start]**Pros & Cons:** It is simple and intuitive but memory-intensive and expensive during testing or prediction[cite: 1921, 1922]. [cite_start]It requires a meaningful distance metric and is negatively affected by noise and outliers[cite: 1924, 1925].
* [cite_start]**Choosing $k$:** Small values of $k$ risk overfitting, while higher values risk underfitting[cite: 1926, 1927, 1928, 1929]. [cite_start]High values of $k$ tend to favour the majority class, making it unsuitable for imbalanced datasets[cite: 1911].
* [cite_start]**Feature Normalisation:** Essential because larger scale features will have a disproportionately large influence[cite: 1940].

---

## 7. Advanced Classification Types
* [cite_start]**Multiclass Classification:** Discriminating between multiple classes ($N>2$)[cite: 1949]. [cite_start]Softmax, Random Forests, and Naive Bayes handle this directly[cite: 1950]. [cite_start]Binary classifiers (like SVMs) can be adapted using One-versus-All (OvA) or One-versus-One (OvO) strategies[cite: 1952, 1953, 1954].
* [cite_start]**Multilabel Classification:** Outputs multiple class labels for each instance, where each label takes binary values (e.g., classifying multiple specific faces in a photo)[cite: 1957, 1958].
* [cite_start]**Multioutput-Multiclass Classification:** A generalisation of multilabel classification where each label can take on more than two possible values[cite: 1976]. [cite_start]Example: removing noise from an image where each pixel is a label capable of taking 256 different intensity values[cite: 1978, 1979].