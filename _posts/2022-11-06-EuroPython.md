---
title: EuroPython 2022
category: blog
image: europython_2022_logo.png
tag: News
visibility: public
layout: post
---

**<a href="https://ep2022.europython.eu/" target="_blank">EuroPython 2022</a>**

This year I was fortunate enough to be selected to give a talk about [ShapePipe](/soft/2022/07/06/shapepipe_soft.html) at the EuroPython 2022 conference in Dublin. It was fun going back to the city where I was born and seeing how much it has changed. The conference itself was quite interesting, particularly to learn about some new Python tools and ways in which people are using Python in different domains (you can find a summary of some of things I learned about in the [Twitter thread](https://twitter.com/Sam_Farrens/status/1549065554430152704?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1549065554430152704%7Ctwgr%5E45305b10fbf0f24bde9834dfb1f6c41535b15077%7Ctwcon%5Es1_&ref_url=http%3A%2F%2F127.0.0.1%3A4000%2Fblog%2F2022%2F11%2F06%2FEuroPython.htmlpresentation) below). It was also a good challenge for me personally in preparing a presentation on scientific software for a primarily non-academic audience (check out the [video below](#presentation) to see how it went).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Last week I travelled to <a href="https://twitter.com/hashtag/Dublin?src=hash&amp;ref_src=twsrc%5Etfw">#Dublin</a> for <a href="https://twitter.com/hashtag/EuroPython2022?src=hash&amp;ref_src=twsrc%5Etfw">#EuroPython2022</a> and had a great time. Here is a thread about some things I learned and my experience overall. 🧵👇<a href="https://twitter.com/europython?ref_src=twsrc%5Etfw">@europython</a> <a href="https://twitter.com/hashtag/Python?src=hash&amp;ref_src=twsrc%5Etfw">#Python</a></p>&mdash; Samuel Farrens (@Sam_Farrens) <a href="https://twitter.com/Sam_Farrens/status/1549065554430152704?ref_src=twsrc%5Etfw">July 18, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Contents
{:.no_toc}

* Table of Contents
{:toc}

## Abstract

I will the present the first public release of ShapePipe, an open-source and modular weak-lensing measurement, analysis and validation pipeline written in Python. I will begin by giving an (easy-to-follow) introduction on how and why we measure the shapes of galaxies to map the distribution of dark matter in the Universe. I will then describe the design of the software, mentioning the numerous Python packages we used, and justify the choices we made. I will conclude by discussing some of the lessons we learned along the way and how these can be applied to other scientific software development projects.

## Description

### Why would you want to listen to this talk?

Cosmology is the study of the origin, evolution, structure and ultimate fate of the Universe. From the largest galaxies down to the smallest Python programmers our story begins with the Big Bang. The particles that make up all of things we can touch and see only account for 5% of the energy density of the Universe. Leaving us quite literally in the dark! Weak gravitational lensing, a barely perceptible change to the shape of galaxies that we observe, is an indispensable tool for understanding the nature of dark matter and dark energy. However, measuring the shape of galaxies to the precision required is actually quite a tricky problem.

What could be more interesting? 😁

### What does this have to do with Python?

Well, Python has steadily become the standard programming language for cosmologists over the last decade or so... and we are no exception! In this talk I will describe the tools we have developed in Python to help us solve some of the problems with measuring the shapes of galaxies and how various existing Python packages have made this possible.

We hope that some of the things we have learned could be useful to other teams, in particular those developing scientific software.

### Resources

* [ShapePipe Repository](https://github.com/CosmoStat/shapepipe)
* [ShapePipe Documentation](https://cosmostat.github.io/shapepipe/)
* [Slides](https://drive.google.com/file/d/1vQYCV1278oUvFzqGID6yhbQwwDyboCIv/view?usp=sharing)

## Presentation

<div class="about-iframe-container">
  <iframe src="https://www.youtube.com/embed/jz4-qekuDUs" frameborder="0" allowfullscreen
    class="about-iframe"></iframe>
</div>
