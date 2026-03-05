const drinks = [
  {"cocktail":"Caribbean Stallion","season":1,"episode":6,"episode_title":"Go West Young Man","notes":"Tequila, coconut rum, creme de menthe, Campari, bitters, grapefruit juice, umbrella"},
  {"cocktail":"Blackcurrant and Pernod","season":1,"episode":4,"episode_title":"The Second Time Around","notes":"Ordered in the Nag's Head"},
  {"cocktail":"Dubonnet","season":2,"episode":6,"episode_title":"It Never Rains","notes":"Del orders while trying to impress a French girl"},
  {"cocktail":"Tequila Sunset","season":3,"episode":4,"episode_title":"Yesterday Never Comes","notes":"Turns out to contain gin because Del ran out of tequila"},
  {"cocktail":"Campari and Diet Coke","season":3,"episode":7,"episode_title":"Who's a Pretty Boy?","notes":"Del calls it his usual"},
  {"cocktail":"Singapore Sling","season":4,"episode":1,"episode_title":"Happy Returns","notes":"Ordered at the Nag's Head"},
  {"cocktail":"Tia Maria and Lucozade","season":4,"episode":8,"episode_title":"To Hull and Back","notes":"Rodney orders for Del"},
  {"cocktail":"Bacardi and Russian","season":4,"episode":8,"episode_title":"To Hull and Back","notes":"Mentioned as one of Del's previous drinks"},
  {"cocktail":"Grand Marnier and Orange","season":4,"episode":8,"episode_title":"To Hull and Back","notes":"Mentioned by the barmaid"},
  {"cocktail":"Dubonnet and Coke","season":4,"episode":8,"episode_title":"To Hull and Back","notes":"Another of Del's experiments"},
  {"cocktail":"Malibu and Cherryade","season":"special","episode":"Dates","episode_title":"Dates","notes":"Ordered during the Nag's Head scene"},
  {"cocktail":"Singapore Sling","season":"special","episode":"Dates","episode_title":"Dates","notes":"Another order in the same episode"},
  {"cocktail":"Pina Colada with Ice and Alka-Seltzer","season":6,"episode":4,"episode_title":"The Unlucky Winner Is…","notes":"Del adds Alka-Seltzer for fizz"},
  {"cocktail":"Peach Daiquiri","season":7,"episode":1,"episode_title":"The Sky's The Limit","notes":"Ordered with a chipolata sandwich"},
  {"cocktail":"Manhattan","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Classic cocktail Del orders while acting sophisticated"},
  {"cocktail":"Harvey Wallbanger","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Another attempt at sounding classy"},
  {"cocktail":"Irish Coffee","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Often referenced in bar scenes"},
  {"cocktail":"Brandy and Pineapple","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Typical Del Boy combination"},
  {"cocktail":"Brandy and Cream Soda","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Another soft-drink mixer"},
  {"cocktail":"Grand Marnier and Grapefruit Juice","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Strong citrus mix"},
  {"cocktail":"Drambuie with Lime and Soda","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Del's elaborate order with garnish"},
  {"cocktail":"Armagnac","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Used when brandy unavailable"},
  {"cocktail":"Pernod and Blackcurrant","season":"unknown","episode":"unknown","episode_title":"unknown","notes":"Another variation of his Pernod drinks"}
];

let currentFilter = 'all';

function renderDrinks(filter = 'all') {
  const grid = document.getElementById('drinks-grid');
  const filtered = drinks.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'known') return d.season !== 'unknown';
    if (filter === 'unknown') return d.season === 'unknown';
    return true;
  });

  grid.innerHTML = filtered.map((drink, i) => {
    const isUnknown = drink.season === 'unknown';
    const seasonText = isUnknown ? 'unknown' : 
      drink.season === 'special' ? 'special' : `s${drink.season}e${drink.episode}`;
    
    return `
      <div class="drink-card" style="animation-delay: ${i * 0.05}s">
        <div class="drink-name">${drink.cocktail}</div>
        <div class="drink-meta">
          <span class="badge ${isUnknown ? 'unknown' : 'season'}">${seasonText}</span>
          ${!isUnknown && drink.episode_title !== 'unknown' ? 
            `<span class="badge">${drink.episode_title}</span>` : ''}
        </div>
        <div class="drink-notes">${drink.notes}</div>
      </div>
    `;
  }).join('');

  document.getElementById('drink-count').textContent = `${filtered.length} drinks`;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderDrinks(currentFilter);
  });
});

renderDrinks();
