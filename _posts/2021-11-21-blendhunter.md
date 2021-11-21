---
title: Deep transfer learning for blended source identification in galaxy survey data
category: pub
image: blendhunter.png
year: 2021
journal: A&A
authors: S. Farrens, A. Lacan, A. Guinot, A. Z. Vitorelli
ads: https://ui.adsabs.harvard.edu/abs/2021arXiv211008180F/abstract
arxiv: https://arxiv.org/abs/2110.08180
pdf: https://arxiv.org/pdf/2110.08180
bibtex: https://ui.adsabs.harvard.edu/abs/2021arXiv211008180F/exportcitation
doi: https://doi.org/10.1051/0004-6361/202141166
layout: post-pub
---
We present BlendHunter, a proof-of-concept deep-transfer-learning-based approach for the automated and robust identification of blended sources in galaxy survey data. We take the VGG-16 network with pre-trained convolutional layers and train the fully connected layers on parametric models of COSMOS images. We test the efficacy of the transfer learning by taking the weights learned on the parametric models and using them to identify blends in more realistic Canada-France Imaging Survey (CFIS)-like images. We compare the performance of this method to SEP (a Python implementation of SExtractor) as a function of noise level and the separation between sources. We find that BlendHunter outperforms SEP by ~ 15% in terms of classification accuracy for close blends (< 10 pixel separation between sources) regardless of the noise level used for training. Additionally, the method provides consistent results to SEP for distant blends ($$\geq$$ 10 pixel separation between sources) provided the network is trained on data with noise that has a relatively close standard deviation to that of the target images. The code and data have been made publicly available to ensure the
reproducibility of the results.
