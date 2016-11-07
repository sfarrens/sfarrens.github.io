# Software

## Clutser Profile Code (CPC)

> <a href="https://github.com/sfarrens/cluster_profile" target="_blank">CPC GitHub Page</a>

Python code that fits a projected density profile (at present NFW or Beta Model) to the members of a cluster of galaxies.

## CreePy

> <a href="https://github.com/sfarrens/creepy" target="_blank">CreePy GitHub Page</a>  
> <a href="https://sfarrens.github.com/creepy" target="_blank">CreePy Documentation</a>

A series of Python packages with applications to astrophysics, cosmology, signal processing and statistics.

## Pycymatch

> <a href="https://github.com/sfarrens/pycymatch" target="_blank">Pycymatch GitHub Page</a>

Pycymatch is a cylindrical matching code for identifying matches between a catalogue of simulated dark matter haloes populated with galaxies and the results of a cluster detection algorithm run on said catalogue. The code defines the "cylinder" as the R200 distance from the halo centre and 2 x dz(1 + z) (where dz is the expected photometric redshift error). The code additionally requires that any potential matches be within the boundaries defined by the members of the mock halo (i.e. the farthest extent in RA and Dec of the members).

## Super Friends-of-Friends (SFoF)

> <a href="https://github.com/sfarrens/fof_cluster_finder" target="_blank">SFoF GitHub Page</a>

SFoF is a friends-of-friends galaxy cluster detection algorithm that operates in either spectroscopic or photometric redshift space. The linking parameters, both transverse and along the line-of-sight, change as a function of redshift to account for selection effects.

The code is written in C++ and implements OMP to loop through the photometric redshift bins.
