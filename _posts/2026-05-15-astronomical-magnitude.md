---
title: "How Bright is That Star? The Astronomical Magnitude System"
layout: scrollytelling
category: blog
tag: Science
date: 2026-05-15
visibility: public
excerpt: "A walk through one of astronomy's oldest measuring sticks: the magnitude scale, from Hipparchus to Hubble."
graphic_script: /assets/js/graphics/magnitude-scale.js
---

> [!WARNING] This post is a work in progress. I am still building the scrollytelling features to bring the content to life.

## Measuring Bringtness

The astronomical magnitude system is probably not the most intuitive convention one could imagine. In this post let's try to break it down and get a better grasp on how bright objects in the night's sky are.

> [!NOTE] There are many more indepth resources on this topic, for example the [Wikipedia page](https://en.wikipedia.org/wiki/Magnitude_(astronomy)) is quite good. This post aims to break down the main concepts into some bite size pieces.

---

<!-- cell: layout=overlay, graphic=image(https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Magnitude_illustration.svg/960px-Magnitude_illustration.svg.png), size=50% -->

---

## Terminology

Let's start with some basic defintions.

- [Brightness](https://en.wikipedia.org/wiki/Brightness): The amount of light we perceive to be emitted from (or relfected off of) a given object. This is a nuanced concept, but one for which we have some intuition.
- [Magnitude](https://en.wikipedia.org/wiki/Magnitude_(astronomy)): A logarithmic measure of the brightness of an object.
- [Luminosity](https://en.wikipedia.org/wiki/Luminosity): The true radiant power emitted from an object.

We will dig into this last two in more detail.

---

## Magnitude

Magnitudes are the standard measures of brightness in astronomy. The scale is inverse logarithmic, meaning that **lower magnitudes** correspond to **brighter objects**, and defined such that an object with magnitude 1 is 100 times brighter than an object with magnitude 6.

Magnitudes come in two flavours:
- [Apparent Magnitude](https://en.wikipedia.org/wiki/Apparent_magnitude) ($$m$$): This is the standard measure of brightness and depends on the intrinsic luminosity and distance of the objects, as well as [extinction](https://en.wikipedia.org/wiki/Extinction_(astronomy)) (i.e. asorbtion of light) along the line of sight.
- [Absolute Magnitude](https://en.wikipedia.org/wiki/Absolute_magnitude) ($$M$$): Measures the intrinsic luminosity asumming a fixed distance of 10pc (i.e. $$3\times10^{17}m$$).

---

<!-- cell: layout=overlay -->

Every whole step in magnitude corresponds to a <mark>\(\sqrt[5]{100}\approx 2.512\)</mark> increase in brightness.

---

## Test



<details markdown="block">
<summary>Show code</summary>

```python
import numpy as np
```

</details>

---

<!-- cell: layout=split-left, graphic=state(0) -->

## Hipparchus and the first catalogue

Around 150 BCE, the Greek astronomer Hipparchus compiled the first known star catalogue — a list of roughly 850 stars with their positions and, crucially, their brightnesses. He sorted stars into six groups. Stars in group one were the brightest handful visible to the naked eye. Stars in group six were the faintest objects you could just barely detect on a moonless night. Everything in between was assigned to groups two through five.

This is already backwards from what you might expect. A *first-magnitude* star is **brighter** than a sixth-magnitude star, just as a first-place finish is better than a sixth-place one. The convention has survived into the modern era, for better or worse.

> "The magnitude scale runs in the wrong direction — but it has done so for two millennia, and astronomers have decided they can live with that."

Hipparchus assigned these magnitudes by eye, guided purely by perception. What he did not know — because the mathematics did not yet exist — is that human perception of brightness is itself logarithmic.

---

<!-- cell: layout=split-left, graphic=state(1) -->

## Pogson's formalism

Nearly two millennia passed. In 1856, the English astronomer Norman Pogson measured the actual brightness of a large number of stars with a photometer and noticed something striking: first-magnitude stars were, on average, about **100 times** brighter than sixth-magnitude stars. That is a factor of exactly 100 over a span of exactly 5 magnitude steps.

Pogson proposed that this should be made into a definition, not just an observation. One step of five magnitudes should correspond to a brightness ratio of precisely 100. This means each single magnitude step corresponds to a brightness ratio of:

$$100^{1/5} = 10^{2/5} \approx 2.512$$

That number — approximately 2.512, sometimes called Pogson's ratio — is the heartbeat of the entire magnitude system.

---

## The formula

Pogson's definition translates directly into a formula. If two objects have fluxes (energy per unit time per unit area) \\(F_1\\) and \\(F_2\\), their magnitude difference is:

$$m_1 - m_2 = -2.5 \log_{10}\!\left(\frac{F_1}{F_2}\right)$$

The minus sign is what makes the scale run backwards: a larger flux gives a more negative magnitude difference, meaning a brighter object has a smaller (or more negative) magnitude number. The factor of 2.5 is Pogson's ratio expressed as a logarithmic coefficient, since \\(10^{2/5} = 10^{1/2.5}\\).

To assign an absolute magnitude to any individual object, you need a reference point — a zero point. Historically, the bright star Vega was defined to have magnitude zero at all wavelengths. In modern practice most photometric systems use a more carefully defined synthetic zero point (the AB system), but the principle is the same: you pick a reference, and everything else is measured relative to it.

---

<!-- cell: layout=split-right, graphic=state(2) -->

## The scale in practice

Once you have a zero point and a formula, you can extend the scale in both directions without limit — into negative numbers for objects brighter than the reference, and beyond six for objects too faint for the naked eye.

| Object | Apparent magnitude |
|---|---|
| Faintest naked-eye star | +6.5 |
| Polaris (North Star) | +2.0 |
| Sirius (brightest star) | −1.5 |
| Venus at brightest | −4.9 |
| Full Moon | −12.7 |
| Sun | −26.7 |

At the faint end, binoculars push the limit to around magnitude +10. A modest amateur telescope reaches +13 or +14. The Hubble Space Telescope has detected objects at magnitude +31. The full range from the Sun to the faintest objects Hubble can see spans about 58 magnitudes, corresponding to a brightness ratio of roughly \\(10^{23}\\).

> "Fifty-eight magnitudes separate the Sun from the faintest objects Hubble can detect — a brightness ratio of one hundred million million million million."

---

<!-- cell: layout=split-right, graphic=state(3) -->

## Apparent and absolute magnitude

So far we have been talking about how bright objects *look* from Earth. That is called the **apparent magnitude**, denoted \\(m\\). But apparent magnitude conflates two things that a physicist wants to keep separate: the intrinsic luminosity of the source, and its distance from us.

To separate these, astronomers define **absolute magnitude**, denoted \\(M\\): the apparent magnitude an object *would have* if it were placed at a standard distance of exactly 10 parsecs (about 32.6 light-years) from the observer.

The relationship between the two is called the **distance modulus**:

$$m - M = 5\log_{10}\!\left(\frac{d}{10\,\text{pc}}\right)$$

Consider the Sun. Its apparent magnitude is \\(m = -26.7\\) — overwhelmingly bright. Its absolute magnitude is \\(M = +4.8\\). If the Sun were moved to 10 parsecs away, it would be a perfectly ordinary, barely-naked-eye star, indistinguishable in the sky from thousands of others.

---

## Colour and filters

Real astronomical measurements are never made across all wavelengths at once. Detectors and filters select specific bands of the electromagnetic spectrum, and magnitudes measured through different filters carry information beyond just brightness.

The classical system, established by Harold Johnson and William Morgan in the 1950s, defined a set of broad-band filters: **U** (ultraviolet), **B** (blue), **V** (visual/green), **R** (red), and **I** (near-infrared). A star's magnitude through each filter is written \\(U\\), \\(B\\), \\(V\\), and so on.

The difference between magnitudes in two filters is called a **colour index**. The most widely used is \\(B - V\\). A hot blue star appears brighter in B than in V, giving a small or negative \\(B - V\\). A cool red giant emits more in V and R than in B, giving a large positive \\(B - V\\). Colour indices thus serve as a simple thermometer for stars, relating a purely photometric measurement back to physical temperature.

Modern surveys — including Euclid — extend this logic to many more filters across a much wider wavelength range, using the colour information from simultaneous multi-band photometry to estimate not just stellar temperatures but the redshifts of entire galaxies across cosmic time.

---

## A two-thousand-year ruler

What is remarkable about the magnitude system is not its elegance — it is not particularly elegant — but its longevity and range. A scale invented by a Greek astronomer cataloguing naked-eye stars by perception alone turns out, after Pogson's formalisation, to stretch seamlessly from objects measurable with the unaided eye to the faintest smudges of light at the edge of the observable universe.

The backwards convention, the logarithms, the awkward factor of 2.5: all of these are quirks inherited from the scale's human origins, preserved because the cost of redefining them would be higher than the cost of teaching every new student to think in the right direction. In that sense the magnitude system is a small monument to how science actually works — building rigorously on foundations that are, at their core, the product of human perception on a dark night two millennia ago.
