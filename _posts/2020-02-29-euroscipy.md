---
title: EuroSciPy Astronomical Image Processing
category: tutor
image: euroscipy.jpg
github: https://github.com/sfarrens/euroscipy
binder: https://mybinder.org/v2/gh/sfarrens/euroscipy/master
layout: post-tutor
---

This tutorial was prepared for the [EuroScipy 2019](https://www.euroscipy.org/2019/) conference. The objective being to provide a brief introduction to some of the methods used to analyse astronomical images, in particular the use of sparsity to denoise images.
<br>
<br>

Please see the [CosmoStat website](http://www.cosmostat.org/tutorials) for more signal and image processing tutorials.

## Contents
---

* Table of Contents
{:toc}

## Requirements
---

 This tutorial can be run via the interactive online [Binder](https://mybinder.org/v2/gh/sfarrens/euroscipy/master) interface. However, it is recommended to run it locally during the session to avoid wifi issues. Note that the following requirements need to be installed beforehand.

1. [python](https://www.python.org/) >=3.5
1. [astropy](https://www.astropy.org/) >=3.2.1
1. [jupyter](https://jupyter.org/) >=1.0.0
1. [matplotlib](https://matplotlib.org/) >=3.1.1
1. [modopt](https://cea-cosmic.github.io/ModOpt/) >=1.4.0
1. [numpy](https://www.numpy.org/) >=1.16.4
1. [pysap](https://github.com/CEA-COSMIC/pysap) (optional)
1. [sf_tools](https://github.com/sfarrens/sf_tools) >=2.0.4

All of the requirements can be built with the provided conda enviroment

```bash
conda env create -f enviroment.yml
```

or using `pip`. The PySAP package can be installed with `pip` as follows:

```bash
pip install git+https://github.com/CEA-COSMIC/pysap
```

> Note that PySAP requires cmake and a C++ compiler that supports OpenMP. See [here](https://github.com/CEA-COSMIC/pysap/blob/master/doc/macos_install.rst) for macOS help. All of the tutorial exercises can be run without PySAP if necessary.

## Notebooks
---

1. [Introduction to Sparsity](https://github.com/sfarrens/euroscipy/sparsity.ipynb)
1. [Astronomical Image Denoising](https://github.com/sfarrens/euroscipy/denoising.ipynb)
