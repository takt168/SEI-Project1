const apiCall = `https://api.pokemontcg.io/v1/cards?`;
const searchButton = document.querySelector(`#search-button`);
const mainCardBanner = document.querySelector(`#main-card-banner`);
const mainCardDiv = document.querySelector(`#main-card`);
const altCardBanner = document.querySelector(`#alt-card-banner`);
const altCardDiv = document.querySelector(`#alt-card`);
const evolutionCardBanner = document.querySelector(`#evolution-card-banner`);
const evolutionCardDiv = document.querySelector(`#evolution-card`);

const evolutionCard1 = document.querySelector(`#evolution-card-1`);
const evolutionCard2 = document.querySelector(`#evolution-card-2`);
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

searchButton.addEventListener(`click`, async () => {

  const characterName = capitalizeEachWord(document.querySelector(`#character-name`).value);
  const characterNameFormatted = characterName.split(` `).join(`+`);

  const response = await axios.get(`${apiCall}name=${characterNameFormatted}`);
  const cardArray = response.data.cards;
  console.log(cardArray);

  let randomImg = "";
  let mainCardId = ``;
  cardArray.forEach(element => {
    console.log(element.id);
    console.log(element.name);
    //console.log(element.imageUrlHiRes);
    console.log(element.subtype);
    console.log(element.evolvesFrom);
    randomImg = element.imageUrlHiRes;

    mainCardBanner.innerHTML = `
    <h1 id="main-card-banner-title">${element.name}</h1>`;

    mainCardDiv.innerHTML = `
      <img id="main-card-img" src="${randomImg}">`;

    //keep track of main card id, so you don't show it again in the alt card section
    mainCardId = element.id;
    //update right card in evolution section.
    if (element.subtype === `Basic`) {
      evolutionCard1.innerHTML = ``;
      evolutionCard1.innerHTML = `
      <h2 class="evolution-card-header">Basic Card</h2>
      <img class="evolution-cards" src="${randomImg}">`;
    } else if (element.subtype == `Stage 1`) {
      evolutionCard1.innerHTML = `
      <h2 class="evolution-card-header">Basic Card</h2>
      <img class="evolution-cards" src="Pokemon_Trading_Card_Game_cardback.jpg">`;
      evolutionCard2.innerHTML = ``;
      evolutionCard2.innerHTML = `
      <h2 class="evolution-card-header">Stage 1 Card</h2>
      <img class="evolution-cards" src="${randomImg}">`;
    } else if (element.subtype == `Stage 2`) {
      evolutionCard1.innerHTML = `
      <h2 class="evolution-card-header">Basic Card</h2>
      <img class="evolution-cards" src="Pokemon_Trading_Card_Game_cardback.jpg">`;
      evolutionCard2.innerHTML = `
      <h2 class="evolution-card-header">Stage 1 Card</h2>
      <img class="evolution-cards" src="Pokemon_Trading_Card_Game_cardback.jpg">`;
      evolutionCard3.innerHTML = `
      <h2 class="evolution-card-header">Stage 2 Card</h2>
      <img class="evolution-cards" src="${randomImg}">`;

    }


  });

  //clear out altCardDiv
  altCardDiv.innerHTML = ``;

  cardArray.forEach(element => {
    console.log(element.id);
    console.log(element.name);
    console.log(element.imageUrlHiRes);
    randomImg = element.imageUrlHiRes;

    if (mainCardId !== element.id) {
      altCardBanner.innerHTML = `
      <h1 id="alt-card-banner-title">Alternate Cards for ${element.name}</h1>`;

      altCardDiv.innerHTML += `
        <img id="alt-card-img" src="${element.imageUrlHiRes}">`;
    }

    evolutionCardBanner.innerHTML = `
    <h1 id="evolution-card-banner-title">Evolution Chart for ${characterName}</h1>`;

  });


});
