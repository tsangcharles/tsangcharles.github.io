---
layout: page
title: Playing with H2O
description: Testing out H2O on a Kaggle Get Started Tutorial (Slightly Outdated)
img: assets/img/h2o/h2ologo.png
importance: 2
category: data-science
---

In recent years, there has been a tremendous effort from different technology companies trying to create data science platforms to streamline machine learning and data science operationalization. For instance: [KNIME](https://www.knime.com/knime-software), [H2O](https://www.h2o.ai/download/), [Databricks](https://databricks.com/try-databricks?utm_source=databricks&utm_medium=homev2tiletest) etc. I have decided to test out H2O, one of the leading machine learning platform.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/h2o/h2ologo.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Installation and Getting Started
Installation is easy following [the download instructions](http://h2o-release.s3.amazonaws.com/h2o/rel-yates/3/index.html). H2O flow can be opened within localhost, providing a notebook-style (kind of like Jupyter Notebook) for performing data science.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/h2o/h2oflow.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The UI is simple to follow and does not require any prior programming experience to use. Most of the data preparation procedures are point and click, and are very intuitive. 

## Model Training
AutoML is also very straight forward in this case. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/h2o/h2oautoml.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I was able to input the raw data from [this compeition](https://www.kaggle.com/c/house-prices-advanced-regression-techniques) without any preprocessing such as performing one-hot-encoding etc. The data contains both numerical values and string values. AutoML takes care of all this and was able to perform predictions. I have chosen not to exclude any models from being excluded from training and set the training time to be 1 hour.

## Results
I uploaded the prediction results onto Kaggle and received a decent score. This prediction outperforms my previous attempt using AutoML Tables on GCP and places me in the upper 46%. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/h2o/h2okaggleresults.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Summary
Overall H2O is very simple to pick up and can be used by anyone without programming experience but a strong interest in data science. The entire processing from data ingestion to prediction only took 1.5 hours (including installation), with 1 hour spent on training. The prediction also outperforms AutoML Tables services provided on GCP. I highly recommend trying out H2O. 