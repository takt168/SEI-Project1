const apiCall = `https://api.pokemontcg.io/v1/cards?`;
const searchButton = document.querySelector(`#search-button`);
const mainCardBanner = document.querySelector(`#main-card-banner`);
const mainCardDiv = document.querySelector(`#main-card`);
const altCardBanner = document.querySelector(`#alt-card-banner`);
const altCardDiv = document.querySelector(`#alt-card`);
const evolutionCardBanner = document.querySelector(`#evolution-card-banner`);
const evolutionCardDiv = document.querySelector(`#evolution-card`);

const evolutionCard1 = document.querySelector(`#evolution-card-1`);
const evolutionArrow1 = document.querySelector(`#evolution-arrow-1`);
const evolutionCard2 = document.querySelector(`#evolution-card-2`);
const evolutionArrow2 = document.querySelector(`#evolution-arrow-2`);
const evolutionCard3 = document.querySelector(`#evolution-card-3`);

window.onbeforeunload = function (e) {
  document.scrollTop(0);
};

//function to capitalize first letter of a String
const capitalizeEachWord = (s) => {
  if (typeof s !== 'string') {
    return '';
  } else {
    let splitStr = s.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
}

const getOldestCard = (cardArray = []) => {

  let oldestSeriesCode = ``;
  let arraySeries = [];
  //look through card array and get all setCodes(aka series codes)
  cardArray.forEach(e => {
    arraySeries.push(e.setCode);
  })

  //look in array to see if you can find a series card, starting from the oldest setCode
  if (arraySeries.includes('base1')) {
    oldestSeriesCode = `base1`;
  } else if (arraySeries.includes('base4')) {
    oldestSeriesCode = `base4`;
  } else if (arraySeries.includes('base5')) {
    oldestSeriesCode = `base5`;
  } else if (arraySeries.includes('base6')) {
    oldestSeriesCode = `base6`;
  } else if (arraySeries.includes('ecard1')) {
    oldestSeriesCode = `ecard1`;
  } else if (arraySeries.includes('ex6')) {
    oldestSeriesCode = `ex6`;
  } else if (arraySeries.includes('pop3')) {
    oldestSeriesCode = `pop3`;
  } else if (arraySeries.includes('ex14')) {
    oldestSeriesCode = `ex14`;
  } else if (arraySeries.includes('dp3')) {
    oldestSeriesCode = `dp3`;
  } else if (arraySeries.includes('pl1')) {
    oldestSeriesCode = `pl1`;
  } else if (arraySeries.includes('hgss2')) {
    oldestSeriesCode = `hgss2`;
  } else if (arraySeries.includes('bw7')) {
    oldestSeriesCode = `bw7`;
  } else if (arraySeries.includes('bw8')) {
    oldestSeriesCode = `bw8`;
  } else if (arraySeries.includes('bw10')) {
    oldestSeriesCode = `bw10`;
  } else if (arraySeries.includes('xyp')) {
    oldestSeriesCode = `xyp`;
  } else if (arraySeries.includes('xy1')) {
    oldestSeriesCode = `xy1`;
  } else if (arraySeries.includes('g1')) {
    oldestSeriesCode = `g1`;
  } else if (arraySeries.includes('xy12')) {
    oldestSeriesCode = `xy12`;
  } else if (arraySeries.includes('sm9')) {
    oldestSeriesCode = `sm9`;
  } else if (arraySeries.includes('sm10')) {
    oldestSeriesCode = `sm10`;
  }

  //get card associated with oldest series code found
  for (let i = 0; i < cardArray.length; i++) {
    element = cardArray[i];
    if (oldestSeriesCode === element.setCode) {
      return element;
    }
  }

}

searchButton.addEventListener(`click`, async () => {

  const characterName = capitalizeEachWord(document.querySelector(`#character-name`).value);
  const characterNameFormatted = characterName.split(` `).join(`+`);

  const response = await axios.get(`${apiCall}name=${characterNameFormatted}`);
  const cardArray = response.data.cards;
  console.log(cardArray);


  element = getOldestCard(cardArray);


  let image = "";
  let mainCardId = ``;

  console.log(element.id);
  console.log(element.name);
  console.log(element.subtype);
  console.log(element.evolvesFrom);
  console.log(element.series);
  console.log(element.set);
  image = element.imageUrlHiRes;
  //image = element.imageUrl;

  mainCardBanner.innerHTML = `
      <h1 id="main-card-banner-title">${characterName}</h1>`;

  mainCardDiv.innerHTML = `
      <img id="main-card-img" src="${image}">`;

  //keep track of main card id, so you don't show it again in the alt card section
  mainCardId = element.id;
  //update right card in evolution section.
  if (element.subtype == `Stage 1`) {
    evolutionCard2.innerHTML = ``;
    evolutionCard2.innerHTML = `
        <h2 class="evolution-card-header">Stage 1 Card</h2>
        <img class="evolution-cards" src="${image}">`;
    evolutionCardBanner.style.display = `flex`;
    evolutionCardDiv.style.display = `flex`;

    //get basic card
    const basicCharacterName = capitalizeEachWord(element.evolvesFrom).split(` `).join(`+`);

    const response = await axios.get(`${apiCall}name=${basicCharacterName}`);
    const cardArray = response.data.cards;
    const basicElement = getOldestCard(cardArray);
    basicElement.imageUrlHiRes;
    evolutionCard1.innerHTML = `
    <div class="evolution-card-header-wrapper">
      <h2 class="evolution-card-header">Basic Card</h2>
    </div>
    <img class="evolution-cards" src="${basicElement.imageUrlHiRes}">`;

    evolutionCard1.style.display = `block`;
    evolutionArrow1.style.display = `block`;
    evolutionCard2.style.display = `block`;
    evolutionArrow2.style.display = `none`;
    evolutionCard3.style.display = `none`;

  } else if (element.subtype == `Stage 2`) {
    evolutionCard1.innerHTML = `
        <div class="evolution-card-header-wrapper">
          <h2 class="evolution-card-header">Basic Card</h2>
        </div>
        <img class="evolution-cards" src="Pokemon_Trading_Card_Game_cardback.jpg">`;
    evolutionCard2.innerHTML = `
      <div class="evolution-card-header-wrapper">
        <h2 class="evolution-card-header">Stage 1 Card</h2>
      </div>
      <img class="evolution-cards" src="Pokemon_Trading_Card_Game_cardback.jpg">`;
    evolutionCard3.innerHTML = `
        <div class="evolution-card-header-wrapper">
          <h2 class="evolution-card-header">Stage 2 Card</h2>
        </div>
        <img class="evolution-cards" src="${image}">`;
    evolutionCardBanner.style.display = `flex`;
    evolutionCardDiv.style.display = `flex`;

    //get stage1 card
    const basicCharacterName = capitalizeEachWord(element.evolvesFrom).split(` `).join(`+`);

    const response = await axios.get(`${apiCall}name=${basicCharacterName}`);
    const cardArray = response.data.cards;
    const stage1Element = getOldestCard(cardArray);
    stage1Element.imageUrlHiRes;
    evolutionCard2.innerHTML = `
    <div class="evolution-card-header-wrapper">
      <h2 class="evolution-card-header">Stage 1 Card</h2>
    </div>
    <img class="evolution-cards" src="${stage1Element.imageUrlHiRes}">`;

    //get basic card
    const basicCardName = capitalizeEachWord(stage1Element.evolvesFrom).split(` `).join(`+`);

    const response2 = await axios.get(`${apiCall}name=${basicCardName}`);
    const cardArray2 = response2.data.cards;
    const basicElement = getOldestCard(cardArray2);
    basicElement.imageUrlHiRes;
    evolutionCard1.innerHTML = `
    <div class="evolution-card-header-wrapper">
    <h2 class="evolution-card-header">Basic Card</h2>
    </div>
        <img class="evolution-cards" src="${basicElement.imageUrlHiRes}">`;


    evolutionCard1.style.display = `block`;
    evolutionArrow1.style.display = `block`;
    evolutionCard2.style.display = `block`;
    evolutionArrow2.style.display = `block`;
    evolutionCard3.style.display = `block`;

  };

  //clear out altCardDiv
  altCardDiv.innerHTML = ``;

  cardArray.forEach(element => {

    if (mainCardId !== element.id) {
      altCardBanner.innerHTML = `
      <h1 id="alt-card-banner-title">Alternate Cards for ${characterName}</h1>`;

      altCardDiv.innerHTML += `
        <img id="alt-card-img" src="${element.imageUrlHiRes}">`;
    }

    evolutionCardBanner.innerHTML = `
    <h1 id="evolution-card-banner-title">Evolution Chart for ${characterName}</h1>`;

  });


  mainCardBanner.style.display = `flex`;
  altCardBanner.style.display = `flex`;
});
