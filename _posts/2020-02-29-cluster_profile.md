---
title: Cluster Profile Code (CPC)
category: soft
image: profile.png
language: Python
github: https://github.com/sfarrens/cluster_profile
layout: post-soft
---

Pycymatch (versions 4 & 5) is a cylindrical matching code for identifying matches between a catalogue of simulated dark matter haloes populated with galaxies and the results of a cluster detection algorithm run on said catalogue. The code defines the "cylinder" as the R200 distance from the halo centre and 2 x dz(1 + z) (where dz is the expected photometric redshift error). The code additionally requires that any potential matches be within the boundaries defined by the members of the mock halo (i.e. the farthest extent in RA and Dec of the members).
