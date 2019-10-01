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

const getMainCard = (cardArray = []) => {

  let mainSetCode = ``;
  let arraySeries = [];
  cardArray.forEach(e => {
    arraySeries.push(e.setCode);
  })
  if (arraySeries.includes('base1')) {
    mainSetCode = `base1`;
  } else if (arraySeries.includes('base4')) {
    mainSetCode = `base4`;
  } else if (arraySeries.includes('base5')) {
    mainSetCode = `base5`;
  } else if (arraySeries.includes('base6')) {
    mainSetCode = `base6`;
  } else if (arraySeries.includes('ecard1')) {
    mainSetCode = `ecard1`;
  } else if (arraySeries.includes('ex6')) {
    mainSetCode = `ex6`;
  } else if (arraySeries.includes('pop3')) {
    mainSetCode = `pop3`;
  } else if (arraySeries.includes('ex14')) {
    mainSetCode = `ex14`;
  } else if (arraySeries.includes('dp3')) {
    mainSetCode = `dp3`;
  } else if (arraySeries.includes('pl1')) {
    mainSetCode = `pl1`;
  } else if (arraySeries.includes('hgss2')) {
    mainSetCode = `hgss2`;
  } else if (arraySeries.includes('bw7')) {
    mainSetCode = `bw7`;
  } else if (arraySeries.includes('bw8')) {
    mainSetCode = `bw8`;
  } else if (arraySeries.includes('bw10')) {
    mainSetCode = `bw10`;
  } else if (arraySeries.includes('xyp')) {
    mainSetCode = `xyp`;
  } else if (arraySeries.includes('xy1')) {
    mainSetCode = `xy1`;
  } else if (arraySeries.includes('g1')) {
    mainSetCode = `g1`;
  } else if (arraySeries.includes('xy12')) {
    mainSetCode = `xy12`;
  } else if (arraySeries.includes('sm9')) {
    mainSetCode = `sm9`;
  } else if (arraySeries.includes('sm10')) {
    mainSetCode = `sm10`;
  }

  for (let i = 0; i < cardArray.length; i++) {
    element = cardArray[i];
    if (mainSetCode === element.setCode) {
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


  element = getMainCard(cardArray);


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
    const basicElement = getMainCard(cardArray);
    basicElement.imageUrlHiRes;
    evolutionCard1.innerHTML = `
        <h2 class="evolution-card-header">Basic Card</h2>
        <img class="evolution-cards" src="${basicElement.imageUrlHiRes}">`;

    evolutionCard1.style.display = `block`;
    evolutionArrow1.style.display = `block`;
    evolutionCard2.style.display = `block`;

  } else if (element.subtype == `Stage 2`) {
    evolutionCard1.innerHTML = `
        <h2 class="evolution-card-header">Basic Card</h2>
        <img class="evolution-cards" src="Pokemon_Trading_Card_Game_cardback.jpg">`;
    evolutionCard2.innerHTML = `
        <h2 class="evolution-card-header">Stage 1 Card</h2>
        <img class="evolution-cards" src="Pokemon_Trading_Card_Game_cardback.jpg">`;
    evolutionCard3.innerHTML = `
        <h2 class="evolution-card-header">Stage 2 Card</h2>
        <img class="evolution-cards" src="${image}">`;
    evolutionCardBanner.style.display = `flex`;
    evolutionCardDiv.style.display = `flex`;

    //get stage1 card
    const basicCharacterName = capitalizeEachWord(element.evolvesFrom).split(` `).join(`+`);

    const response = await axios.get(`${apiCall}name=${basicCharacterName}`);
    const cardArray = response.data.cards;
    const stage1Element = getMainCard(cardArray);
    stage1Element.imageUrlHiRes;
    evolutionCard2.innerHTML = `
        <h2 class="evolution-card-header">Stage 1 Card</h2>
        <img class="evolution-cards" src="${stage1Element.imageUrlHiRes}">`;

    //get basic card
    const basicCardName = capitalizeEachWord(stage1Element.evolvesFrom).split(` `).join(`+`);

    const response2 = await axios.get(`${apiCall}name=${basicCardName}`);
    const cardArray2 = response2.data.cards;
    const basicElement = getMainCard(cardArray2);
    basicElement.imageUrlHiRes;
    evolutionCard1.innerHTML = `
        <h2 class="evolution-card-header">Basic Card</h2>
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
