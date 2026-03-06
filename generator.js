// Del Boy Drink Generator
// Patterns extracted from 49 confirmed script drinks:
//
// Pattern 1: POSH SPIRIT + WRONG SOFT DRINK (the classic Del)
//   Tia Maria + Lucozade, Rémy Martin + Cream Soda, Campari + Diet Coke,
//   Chivas Regal + Coke, Dubonnet + Coke, Malibu + Cherryade
//
// Pattern 2: POSH SPIRIT + WRONG FRUIT JUICE
//   Grand Marnier + Grapefruit, Grand Marnier + Orange,
//   Tia Maria + Pineapple Juice, Benedictine + Lemonade
//
// Pattern 3: SPIRIT + MEDICINAL/BIZARRE ADDITION
//   Pina Colada + Alka-Seltzer, Brandy + Cream Soda
//
// Pattern 4: REAL COCKTAIL NAME (said confidently, often wrong)
//   Caribbean Stallion, Tequila Sunset (made with gin), Manhattan,
//   Singapore Sling, Peach Daiquiri, Banana Daiquiri, Cuba Libre
//
// Pattern 5: POSH WINE/SPIRIT (mispronounced or misunderstood)
//   Vin Ordinaire (thinks it's posh), Beaujolais Nouveau '79,
//   Armagnac (thinks it's not brandy), Spritzer ("Spitzer")

const spirits = [
  'Tia Maria', 'Grand Marnier', 'Rémy Martin', 'Campari',
  'Dubonnet', 'Malibu', 'Bacardi', 'Drambuie', 'Pernod',
  'Benedictine', 'Cointreau', 'Kahlúa', 'Galliano',
  'Amaretto', 'Sambuca', 'Chartreuse', 'Advocaat',
  'Courvoisier', 'Hennessy', 'Baileys', 'Midori',
  'Frangelico', 'Chambord', 'Crème de Menthe',
  'Crème de Cassis', 'Parfait Amour', 'Strega',
  'Limoncello', 'Disaronno', 'Archers'
];

const wrongMixers = [
  'Lucozade', 'Cherryade', 'Cream Soda', 'Diet Coke',
  'Irn-Bru', 'Tizer', 'Dandelion and Burdock', 'Vimto',
  'Ribena', 'Um Bongo', 'Lilt', 'Dr Pepper',
  'Orangina', 'R Whites Lemonade', 'Panda Pops',
  'Tango', 'Fanta', 'Limeade', 'Soda Stream Cola',
  'Barley Water', 'Horlicks', 'Ovaltine', 'Bovril',
  'Ginger Beer', 'Cream of Soda', 'Bitter Lemon',
  'American Cream Soda', 'Bubblegum Soda', 'Slush Puppie'
];

const wrongJuices = [
  'Grapefruit Juice', 'Pineapple Juice', 'Prune Juice',
  'Tomato Juice', 'Carrot Juice', 'Mango Juice',
  'Guava Nectar', 'Passion Fruit Juice', 'Cranberry Juice',
  'Pomegranate Juice', 'Lychee Juice', 'Papaya Juice'
];

const bizarreAdditions = [
  'Alka-Seltzer', 'a Berocca', 'a Rennie',
  'a splash of Gaviscon', 'two Disprin',
  'a Lemsip', 'a vitamin C tablet',
  'a spoonful of Andrews', 'a Dioralyte sachet'
];

const garnishes = [
  'a cocktail umbrella', 'a sparkler', 'a curly straw',
  'a slice of lemon', 'a maraschino cherry', 'two olives on a stick',
  'a pineapple chunk', 'a paper parasol', 'a bendy straw',
  'a slice of kiwi', 'a glacé cherry', 'a swizzle stick',
  'a wedge of lime', 'a sprig of mint', 'lots of ice'
];

const realCocktails = [
  'Caribbean', 'Tropical', 'Peckham', 'Bermuda', 'Tahitian',
  'Moroccan', 'Brazilian', 'Jamaican', 'Hawaiian', 'Balearic',
  'Monte Carlo', 'Acapulco', 'Copacabana', 'Riviera', 'Barbados'
];

const cocktailNouns = [
  'Stallion', 'Sunset', 'Sunrise', 'Thunder', 'Lightning',
  'Breeze', 'Dream', 'Explosion', 'Meltdown', 'Inferno',
  'Paradise', 'Tornado', 'Tsunami', 'Volcano', 'Hurricane',
  'Blizzard', 'Avalanche', 'Monsoon', 'Eclipse', 'Odyssey'
];

const delPronunciations = [
  { word: 'Crème Brûlée', del: 'Crem Broolay' },
  { word: 'Châteauneuf-du-Pape', del: 'Chateau Neuf de Pap' },
  { word: 'Pouilly-Fuissé', del: 'Pooley Foosey' },
  { word: 'Gewürztraminer', del: 'Gerwurtz Traminer' },
  { word: 'Armagnac', del: 'Armag-nack' },
  { word: 'Beaujolais', del: 'Bojolay' },
  { word: 'Moët & Chandon', del: 'Mo-ette and Chandon' },
  { word: 'Veuve Clicquot', del: 'Voove Clicko' },
  { word: 'Cointreau', del: 'Coin-trow' },
  { word: 'Daiquiri', del: 'Dackery' },
  { word: 'Caipirinha', del: 'Kai-peer-in-ya' },
  { word: 'Sauvignon Blanc', del: 'Sauvig-non Blank' },
  { word: 'Pinot Grigio', del: 'Pee-no Gridge-ee-oh' },
  { word: 'Prosecco', del: 'Pro-secko' }
];

const delQuotes = [
  "Lovely jubbly!",
  "This time next year, we'll be millionaires!",
  "Mange tout, Rodney, mange tout!",
  "He who dares, wins!",
  "Cushty!",
  "Bonnet de douche!",
  "Play it cool, son, play it cool.",
  "You know it makes sense!",
  "No income tax, no VAT...",
  "Bonjour!",
  "It's all gone a bit Pete Tong.",
  "You plonker, Rodney!"
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDrink() {
  const pattern = Math.random();

  let name, description, quote;

  if (pattern < 0.35) {
    // Pattern 1: Spirit + Wrong Soft Drink
    const spirit = pick(spirits);
    const mixer = pick(wrongMixers);
    name = `${spirit} and ${mixer}`;
    description = `A ${spirit.toLowerCase()}, topped up with ${mixer.toLowerCase()}. Del swears by it.`;
  } else if (pattern < 0.55) {
    // Pattern 2: Spirit + Wrong Juice
    const spirit = pick(spirits);
    const juice = pick(wrongJuices);
    name = `${spirit} and ${juice}`;
    description = `${spirit} with a generous splash of ${juice.toLowerCase()}. Continental, innit?`;
  } else if (pattern < 0.7) {
    // Pattern 3: Spirit + Soft Drink + Bizarre Addition
    const spirit = pick(spirits);
    const mixer = pick([...wrongMixers, ...wrongJuices]);
    const bizarre = pick(bizarreAdditions);
    name = `${spirit} and ${mixer} with ${bizarre}`;
    description = `A ${spirit.toLowerCase()} and ${mixer.toLowerCase()}, finished with ${bizarre.toLowerCase()} for that extra fizz.`;
  } else if (pattern < 0.85) {
    // Pattern 4: Made-up Cocktail Name
    const place = pick(realCocktails);
    const noun = pick(cocktailNouns);
    const garnish = pick(garnishes);
    name = `${place} ${noun}`;
    description = `It's an exotic cocktail, ain't it? Served with ${garnish}. Very popular in the West End.`;
  } else {
    // Pattern 5: Mispronounced Posh Drink
    const posh = pick(delPronunciations);
    const garnish = pick(garnishes);
    name = posh.del;
    description = `That's "${posh.word}" to you and me. Served with ${garnish}. Very sophistimacated.`;
  }

  quote = pick(delQuotes);
  return { name, description, quote };
}

if (typeof module !== 'undefined') module.exports = { generateDrink };
