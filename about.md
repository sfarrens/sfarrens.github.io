---
title: About Me
image: me.jpg
myname: Samuel Farrens
tagline: Cosmologist and Python enthusiast
layout: default
---

* Table of Contents
{:toc}

<div class="about-image-container">
  <img src="{{ site.image_path }}/{{ page.image }}" class="about-image">
  <span class="about-name">{{ page.myname }}</span><br>
  <span class="about-tag">{{ page.tagline }}</span><br>
</div>

## Where I work

[![]({{ site.image_path }}/cosmostat_logo.jpg){:.about-cs-logo}](http://www.cosmostat.org/)

I have been very fortunate to end up working in a very diverse and exciting team called **[CosmoStat](http://www.cosmostat.org/)**. CosmoStat is a *lab* based in the [astrophysics department](http://irfu.cea.fr/dap/en/index.php) at [CEA Paris-Saclay](http://www.cea.fr), just south-east of Paris. The team is made up of researchers with either a background in astrophysics or signal-processing that work together on trying to solve the challenges in cosmology. The idea is to use the latest developments in statistics and data science and apply them to technical problems like measuring galaxy shapes or modelling the point spread function of an instrument in space.

I also spend one day a week at [NeuroSpin](http://joliot.cea.fr/drf/joliot/Pages/Entites_de_recherche/NeuroSpin.aspx), a world leading biomedical imaging institute. I work with a team there aiming to improve the way in which we acquire and reconstruct brain images using Magnetic Resonance Imaging (MRI).

## What I do

Since joining CosmoStat I have been involved in various different projects.

### Deconvolution

I have worked on [galaxy image deconvolution](/pub/2017/03/17/deconvolution.html) using regularisation techniques such as sparsity and low-rank approximation. The idea being to remove the effects of a point spread function (PSF) that varies as function of position on the sky. This is beneficial for projects like [Euclid](https://www.euclid-ec.org/) that aim to measure galaxy shapes to good accuracy.

> If you are not familiar with these topics why not check out the tutorials I have prepared on [sparisty](/tutor/2020/02/29/ada-sparsity.html) and [low-rank approximation](/tutor/2020/02/29/low-rank.html).

### Weak Gravitational Lensing

I am currently managing the development of an end-to-end galaxy shape measurement pipeline that deals with source extraction, masking, PSF modelling and interpolation, shape measurement and calibration. We aim to use this pipeline to extract weak lensing information from [UNIONS-CFIS](http://www.cfht.hawaii.edu/Science/CFIS/) data in the near future.

### Image Reconstruction Software

I co-leading, in collaboration with the team at NeuroSpin, the development of a software package called [PySAP](/soft/2020/02/29/pysap.html). This package is a image reconstruction and analysis toolbox that can be applied to imaging problems in various domains such as MRI, astrophysics, microscopy and electron tomography. My main contribution has been a package called [ModOpt](/soft/2020/02/29/modopt.html) that provides a modular framework for implementing optimisation algorithms needed for solving inverse problems.

> What to know more? Check out this video from a keynote I gave at [EuroScipy](https://www.euroscipy.org/) in 2019.

<div class="about-iframe-container">
  <iframe src="https://www.youtube.com/embed/AktERyTXww0" frameborder="0" allowfullscreen
    class="about-iframe"></iframe>
</div>

### Machine Learning

I have also been working using deep learning, in particular deep transfer learning, for the problem of identifying blended galaxy images in survey data.

### Software Consulting

Finally, I spend a good fraction of my time trying help others plan, manage and develop scientific software projects following open-source principles.

## What I used to do

Prior to joining the CosmoStat team my work was primarily focused on the optical detection and analysis of clusters of galaxies using photometric redshifts. During my PhD I developed a prototype [friends-of-friends optical cluster detection algorithm](/soft/2020/02/29/sfof.html) that was further developed and optimised during postdoc positions in Barcelona and Trieste. I also developed serval [metrics](/soft/2020/02/29/pycymatch.html) and [analysis codes](/soft/2020/02/29/cluster_profile.html) designed to compare the relative performance of various different cluster detection codes on Euclid mock galaxy simulations.

## What I like

If you are curious to find out about some of my non-academic pursuits have a look a my [blog](/blog.html) where I talk about other things that interest me.
