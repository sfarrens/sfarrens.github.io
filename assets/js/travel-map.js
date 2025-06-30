// Interactive World Map for Travel Page
(function() {
  // List of visited countries (matching the countries from My Countries.txt)
  const visitedCountries = [
    'albania', 'andorra', 'australia', 'austria', 'bahamas', 'belgium', 
    'bosnia-herzegovina', 'brazil', 'bulgaria', 'china', 'costa-rica', 
    'croatia', 'czech-republic', 'denmark', 'egypt', 'england', 'estonia', 
    'finland', 'france', 'germany', 'gibraltar', 'greece', 'hungary', 
    'ireland', 'italy', 'japan', 'kosovo', 'latvia', 'liechtenstein', 
    'lithuania', 'luxembourg', 'monaco', 'montenegro', 'netherlands', 
    'north-macedonia', 'norway', 'poland', 'portugal', 'qatar', 
    'republic-srpska', 'romania', 'san-marino', 'scotland', 'serbia', 
    'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland', 'turkey', 
    'united-kingdom', 'united-states', 'vatican-city', 'wales'
  ];

  // Country descriptions for tooltips
  const countryDescriptions = {
    'albania': 'Beautiful mountains and coastline',
    'andorra': 'Tiny mountain principality',
    'australia': 'Outback, Great Barrier Reef, and unique wildlife',
    'austria': 'Alpine beauty and cultural heritage',
    'bahamas': 'Caribbean paradise with crystal clear waters',
    'belgium': 'Medieval cities and delicious chocolate',
    'bosnia-herzegovina': 'Rich history and stunning landscapes',
    'brazil': 'Amazon rainforest and vibrant cities',
    'bulgaria': 'Ancient ruins and Black Sea coast',
    'china': 'Ancient civilization and modern cities',
    'costa-rica': 'Pura vida lifestyle and biodiversity',
    'croatia': 'Stunning Adriatic coastline and islands',
    'czech-republic': 'Prague\'s magical architecture',
    'denmark': 'Hygge culture and modern design',
    'egypt': 'Ancient pyramids and Nile River',
    'england': 'Historic cities and countryside',
    'estonia': 'Baltic charm and digital innovation',
    'finland': 'Lakes, forests, and Northern Lights',
    'france': 'Art, culture, and cuisine',
    'germany': 'Diverse landscapes and history',
    'gibraltar': 'British territory with Mediterranean views',
    'greece': 'Ancient ruins and island beauty',
    'hungary': 'Budapest\'s thermal baths and architecture',
    'ireland': 'Emerald Isle\'s rolling hills and friendly people',
    'italy': 'Art, history, and incredible food',
    'japan': 'Perfect blend of tradition and innovation',
    'kosovo': 'Young nation with rich cultural heritage',
    'latvia': 'Baltic beauty and Art Nouveau architecture',
    'liechtenstein': 'Alpine microstate',
    'lithuania': 'Baltic charm and medieval towns',
    'luxembourg': 'Small but mighty European capital',
    'monaco': 'Glamorous Mediterranean principality',
    'montenegro': 'Adriatic coastline and mountain peaks',
    'netherlands': 'Windmills, tulips, and cycling culture',
    'north-macedonia': 'Balkan beauty and ancient history',
    'norway': 'Fjords and Northern Lights',
    'poland': 'Rich history and resilient culture',
    'portugal': 'Atlantic coast and historic cities',
    'qatar': 'Modern desert nation and cultural crossroads',
    'republic-srpska': 'Entity within Bosnia and Herzegovina',
    'romania': 'Transylvanian castles and Carpathian mountains',
    'san-marino': 'Ancient mountain republic',
    'scotland': 'Highland beauty and whisky',
    'serbia': 'Balkan crossroads and cultural heritage',
    'slovakia': 'Tatra mountains and medieval towns',
    'slovenia': 'Alpine lakes and charming Ljubljana',
    'spain': 'Diverse regions and vibrant culture',
    'sweden': 'Scandinavian design and natural beauty',
    'switzerland': 'Alpine peaks and precision',
    'turkey': 'Where East meets West',
    'united-kingdom': 'Historic cities and countryside',
    'united-states': 'Diverse landscapes and cultures',
    'vatican-city': 'World\'s smallest sovereign state',
    'wales': 'Celtic culture and dramatic landscapes'
  };

  function createWorldMap() {
    const mapContainer = document.getElementById('world-map');
    if (!mapContainer) return;

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1000 500');
    svg.style.background = 'var(--bg-color)';

    // Create a simple world map using basic shapes
    // This is a simplified representation - in a real implementation,
    // you'd want to use actual country SVG paths
    
    // Create continent outlines
    const continents = [
      // Europe
      { path: 'M 200 150 L 300 150 L 350 200 L 300 250 L 200 250 Z', name: 'Europe' },
      // North America
      { path: 'M 50 100 L 150 100 L 180 200 L 150 300 L 50 300 Z', name: 'North America' },
      // South America
      { path: 'M 150 250 L 200 250 L 220 350 L 200 450 L 150 450 Z', name: 'South America' },
      // Africa
      { path: 'M 250 200 L 350 200 L 380 350 L 350 450 L 250 450 Z', name: 'Africa' },
      // Asia
      { path: 'M 350 100 L 600 100 L 650 200 L 600 300 L 350 300 Z', name: 'Asia' },
      // Australia
      { path: 'M 500 350 L 600 350 L 620 400 L 600 450 L 500 450 Z', name: 'Australia' }
    ];

    continents.forEach(continent => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', continent.path);
      path.setAttribute('fill', 'var(--border-color)');
      path.setAttribute('stroke', 'var(--text-color)');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('opacity', '0.3');
      svg.appendChild(path);
    });

    // Create country markers (simplified as circles)
    const countryPositions = {
      'albania': { x: 280, y: 200, region: 'Europe' },
      'andorra': { x: 240, y: 190, region: 'Europe' },
      'australia': { x: 550, y: 400, region: 'Oceania' },
      'austria': { x: 270, y: 200, region: 'Europe' },
      'bahamas': { x: 120, y: 180, region: 'Americas' },
      'belgium': { x: 250, y: 180, region: 'Europe' },
      'bosnia-herzegovina': { x: 285, y: 200, region: 'Europe' },
      'brazil': { x: 175, y: 350, region: 'Americas' },
      'bulgaria': { x: 295, y: 210, region: 'Europe' },
      'china': { x: 500, y: 200, region: 'Asia' },
      'costa-rica': { x: 130, y: 280, region: 'Americas' },
      'croatia': { x: 280, y: 200, region: 'Europe' },
      'czech-republic': { x: 275, y: 190, region: 'Europe' },
      'denmark': { x: 260, y: 170, region: 'Europe' },
      'egypt': { x: 300, y: 250, region: 'Africa' },
      'england': { x: 240, y: 170, region: 'Europe' },
      'estonia': { x: 290, y: 160, region: 'Europe' },
      'finland': { x: 295, y: 150, region: 'Europe' },
      'france': { x: 245, y: 190, region: 'Europe' },
      'germany': { x: 265, y: 190, region: 'Europe' },
      'gibraltar': { x: 235, y: 220, region: 'Europe' },
      'greece': { x: 295, y: 220, region: 'Europe' },
      'hungary': { x: 285, y: 200, region: 'Europe' },
      'ireland': { x: 230, y: 180, region: 'Europe' },
      'italy': { x: 270, y: 210, region: 'Europe' },
      'japan': { x: 580, y: 200, region: 'Asia' },
      'kosovo': { x: 290, y: 205, region: 'Europe' },
      'latvia': { x: 290, y: 165, region: 'Europe' },
      'liechtenstein': { x: 270, y: 195, region: 'Europe' },
      'lithuania': { x: 290, y: 170, region: 'Europe' },
      'luxembourg': { x: 255, y: 185, region: 'Europe' },
      'monaco': { x: 260, y: 210, region: 'Europe' },
      'montenegro': { x: 290, y: 210, region: 'Europe' },
      'netherlands': { x: 255, y: 175, region: 'Europe' },
      'north-macedonia': { x: 295, y: 210, region: 'Europe' },
      'norway': { x: 265, y: 140, region: 'Europe' },
      'poland': { x: 285, y: 180, region: 'Europe' },
      'portugal': { x: 230, y: 210, region: 'Europe' },
      'qatar': { x: 320, y: 250, region: 'Middle East' },
      'romania': { x: 300, y: 200, region: 'Europe' },
      'san-marino': { x: 275, y: 210, region: 'Europe' },
      'scotland': { x: 245, y: 160, region: 'Europe' },
      'serbia': { x: 290, y: 205, region: 'Europe' },
      'slovakia': { x: 285, y: 195, region: 'Europe' },
      'slovenia': { x: 280, y: 200, region: 'Europe' },
      'spain': { x: 235, y: 210, region: 'Europe' },
      'sweden': { x: 270, y: 150, region: 'Europe' },
      'switzerland': { x: 265, y: 195, region: 'Europe' },
      'turkey': { x: 310, y: 220, region: 'Europe' },
      'united-kingdom': { x: 240, y: 170, region: 'Europe' },
      'united-states': { x: 100, y: 200, region: 'Americas' },
      'vatican-city': { x: 275, y: 210, region: 'Europe' },
      'wales': { x: 240, y: 175, region: 'Europe' }
    };

    // Create country markers
    Object.keys(countryPositions).forEach(countryId => {
      const pos = countryPositions[countryId];
      const isVisited = visitedCountries.includes(countryId);
      
      // Create country circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.x);
      circle.setAttribute('cy', pos.y);
      circle.setAttribute('r', isVisited ? '4' : '2');
      circle.setAttribute('fill', isVisited ? '#4CAF50' : 'var(--text-muted)');
      circle.setAttribute('stroke', 'var(--text-color)');
      circle.setAttribute('stroke-width', '1');
      circle.setAttribute('opacity', isVisited ? '0.8' : '0.4');
      
      // Add hover effects
      circle.style.cursor = 'pointer';
      circle.style.transition = 'all 0.2s ease';
      
      circle.addEventListener('mouseenter', function() {
        this.setAttribute('r', isVisited ? '6' : '3');
        this.setAttribute('opacity', '1');
        showTooltip(countryId, pos.x, pos.y);
      });
      
      circle.addEventListener('mouseleave', function() {
        this.setAttribute('r', isVisited ? '4' : '2');
        this.setAttribute('opacity', isVisited ? '0.8' : '0.4');
        hideTooltip();
      });
      
      svg.appendChild(circle);
    });

    // Add title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', '500');
    title.setAttribute('y', '30');
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('fill', 'var(--text-color)');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-weight', 'bold');
    title.textContent = 'Countries I\'ve Visited';
    svg.appendChild(title);

    mapContainer.appendChild(svg);
  }

  function showTooltip(countryId, x, y) {
    const countryName = countryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const description = countryDescriptions[countryId] || 'A beautiful country I\'ve visited';
    
    let tooltip = document.getElementById('map-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'map-tooltip';
      tooltip.style.cssText = `
        position: absolute;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 12px;
        color: var(--text-color);
        pointer-events: none;
        z-index: 1000;
        max-width: 200px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      `;
      document.getElementById('world-map').appendChild(tooltip);
    }
    
    tooltip.innerHTML = `<strong>${countryName}</strong><br>${description}`;
    tooltip.style.left = (x + 10) + 'px';
    tooltip.style.top = (y - 10) + 'px';
    tooltip.style.display = 'block';
  }

  function hideTooltip() {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }

  // Initialize map when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWorldMap);
  } else {
    createWorldMap();
  }
})(); 