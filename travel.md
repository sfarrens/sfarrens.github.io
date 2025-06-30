---
layout: default
title: Travel
---

<!-- Leaflet CSS and JS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<!-- Travel Counters (like countries-visited.com) -->
<style>
:root {
  --counter-bg-light: #f8f9fa;
  --counter-bg-dark: #23272f;
  --counter-border-light: #e0e0e0;
  --counter-border-dark: #333a44;
  --counter-main-light: #388e3c;
  --counter-main-dark: #7fff7f;
  --counter-label-light: #555;
  --counter-label-dark: #bbb;
  --counter-percent-light: #888;
  --counter-percent-dark: #aaa;
  --counter-territory-light: #f57c00;
  --counter-territory-dark: #ffb74d;
}
@media (prefers-color-scheme: dark) {
  :root {
    --counter-bg: var(--counter-bg-dark);
    --counter-border: var(--counter-border-dark);
    --counter-main: var(--counter-main-dark);
    --counter-label: var(--counter-label-dark);
    --counter-percent: var(--counter-percent-dark);
    --counter-territory: var(--counter-territory-dark);
  }
}
@media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
  :root {
    --counter-bg: var(--counter-bg-light);
    --counter-border: var(--counter-border-light);
    --counter-main: var(--counter-main-light);
    --counter-label: var(--counter-label-light);
    --counter-percent: var(--counter-percent-light);
    --counter-territory: var(--counter-territory-light);
  }
}
#travel-counters-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--counter-bg);
  border-radius: 2em;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  border: 1.5px solid var(--counter-border);
  padding: 2em 2.5em 1.5em 2.5em;
  margin: 0 auto 2em auto;
  max-width: 350px;
}
#main-country-count {
  font-size: 3em;
  font-weight: 700;
  color: var(--counter-main);
  margin-bottom: 0.1em;
}
#main-country-label {
  font-size: 1.2em;
  color: var(--counter-label);
  margin-bottom: 0.2em;
}
#main-country-percent {
  font-size: 1.1em;
  color: var(--counter-percent);
  margin-bottom: 0.5em;
}
#territory-count {
  font-size: 1.1em;
  color: var(--counter-territory);
  margin-top: 0.7em;
}
</style>
<div id="travel-counters" style="display:flex;justify-content:center;">
  <div id="travel-counters-box">
    <div id="main-country-count"></div>
    <div id="main-country-label"></div>
    <div id="main-country-percent"></div>
    <div id="territory-count"></div>
  </div>
</div>

<!-- Map container -->
<div id="map" style="height: 500px; margin-bottom: 2em;"></div>

<script>
  // List of visited countries (match the "ADMIN" property in your GeoJSON)
  var visitedCountries = [
    "Albania", "Andorra", "Austria", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Gibraltar", "Greece", "Hungary", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "San Marino", "Republic of Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "United Kingdom", "Vatican", "Bahamas", "Brazil", "United States of America", "China", "Japan", "Egypt", "Australia", "Qatar", "Costa Rica"
  ];

  // UN-recognized countries (ISO 3166, 193 members + 2 observer states: Vatican, Palestine)
  // For this list, we use the names as they appear in your GeoJSON (ADMIN property)
  var unCountries = new Set([
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of Korea", "Republic of Moldova", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Yemen"
  ]);

  // Calculate main stats
  var visitedUN = [];
  var visitedTerritories = [];
  visitedCountries.forEach(function(country) {
    if (unCountries.has(country)) {
      visitedUN.push(country);
    } else {
      visitedTerritories.push(country);
    }
  });

  // Main country count and percent
  var mainCount = visitedUN.length;
  var percent = ((mainCount / 193) * 100).toFixed(1);

  // Render main counter
  document.getElementById('main-country-count').textContent = mainCount;
  document.getElementById('main-country-label').textContent = 'UN Countries Visited';
  document.getElementById('main-country-percent').textContent = percent + '% of the world';

  // Render territory/unrecognized count if any
  if (visitedTerritories.length > 0) {
    document.getElementById('territory-count').innerHTML =
      visitedTerritories.length + ' territories/unrecognised regions';
  }

  // Mapping of countries to continents (for your visited countries)
  var countryToContinent = {
    // Europe
    "Albania": "Europe", "Andorra": "Europe", "Austria": "Europe", "Belgium": "Europe", "Bosnia and Herzegovina": "Europe", "Bulgaria": "Europe", "Croatia": "Europe", "Czechia": "Europe", "Denmark": "Europe", "Estonia": "Europe", "Finland": "Europe", "France": "Europe", "Germany": "Europe", "Gibraltar": "Europe", "Greece": "Europe", "Hungary": "Europe", "Ireland": "Europe", "Italy": "Europe", "Kosovo": "Europe", "Latvia": "Europe", "Liechtenstein": "Europe", "Lithuania": "Europe", "Luxembourg": "Europe", "Monaco": "Europe", "Montenegro": "Europe", "Netherlands": "Europe", "North Macedonia": "Europe", "Norway": "Europe", "Poland": "Europe", "Portugal": "Europe", "Romania": "Europe", "San Marino": "Europe", "Republic of Serbia": "Europe", "Slovakia": "Europe", "Slovenia": "Europe", "Spain": "Europe", "Sweden": "Europe", "Switzerland": "Europe", "Turkey": "Europe", "United Kingdom": "Europe", "Vatican": "Europe", "Republic Srpska": "Europe",
    // Americas
    "Bahamas": "Americas", "Brazil": "Americas", "United States of America": "Americas", "Costa Rica": "Americas",
    // Asia
    "China": "Asia", "Japan": "Asia", "Qatar": "Asia",
    // Africa
    "Egypt": "Africa",
    // Oceania
    "Australia": "Oceania"
  };

  // Count by continent for UN countries
  var continentCounts = {};
  visitedUN.forEach(function(country) {
    var continent = countryToContinent[country] || "Other";
    if (!continentCounts[continent]) continentCounts[continent] = 0;
    continentCounts[continent]++;
  });

  // Count by continent for territories/unrecognised
  var territoryContinentCounts = {};
  visitedTerritories.forEach(function(country) {
    var continent = countryToContinent[country] || "Other";
    if (!territoryContinentCounts[continent]) territoryContinentCounts[continent] = 0;
    territoryContinentCounts[continent]++;
  });

  // Initialize the map
  var map = L.map('map').setView([20, 0], 2);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Load GeoJSON and highlight visited countries
  fetch('/assets/countries.geojson')
    .then(res => res.json())
    .then(data => {
      L.geoJson(data, {
        style: function(feature) {
          var countryName = feature.properties.ADMIN || feature.properties.name;
          return {
            fillColor: visitedCountries.includes(countryName) ? '#2ecc40' : '#ccc',
            weight: 1,
            color: 'white',
            fillOpacity: visitedCountries.includes(countryName) ? 0.8 : 0.3
          };
        },
        onEachFeature: function(feature, layer) {
          var countryName = feature.properties.ADMIN || feature.properties.name;
          if (visitedCountries.includes(countryName)) {
            layer.bindPopup('<b>' + countryName + '</b><br>Visited!');
          } else {
            layer.bindPopup('<b>' + countryName + '</b>');
          }
        }
      }).addTo(map);
    });
</script>

