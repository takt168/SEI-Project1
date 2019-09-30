const apiCall = `https://api.pokemontcg.io/v1/cards?`;
const searchButton = document.querySelector(`#search-button`);
const mainCardBanner = document.querySelector(`#main-card-banner`);
const mainCardDiv = document.querySelector(`#main-card`);
const altCardBanner = document.querySelector(`#alt-card-banner`);
const altCardDiv = document.querySelector(`#alt-card`);
const evolutionCardBanner = document.querySelector(`#evolution-card-banner`);
const evolutionCardDiv = document.querySelector(`#evolution-card`);


//function to clear html element of all child elements
const clearChildElements = (elem) => {
  while (elem.hasChildNodes()) {
    elem.removeChild(elem.childNodes[0]);
  }
}

//function to capitalize first letter of a String
const capitalize = (s) => {
  if (typeof s !== 'string') {
    return '';
  } else {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

searchButton.addEventListener(`click`, async () => {

  const characterName = capitalize(document.querySelector(`#character-name`).value);
  const characterNameFormatted = characterName.split(` `).join(`+`);

  const response = await axios.get(`${apiCall}name=${characterNameFormatted}`);
  const cardArray = response.data.cards;
  console.log(cardArray);

  let randomImg = "";
  let mainCardId = ``;
  cardArray.forEach(element => {
    console.log(element.id);
    console.log(element.name);
    console.log(element.imageUrlHiRes);
    randomImg = element.imageUrlHiRes;

    clearChildElements(mainCardBanner);
    mainCardBanner.innerHTML = `
    <h1 id="main-card-banner-title">${element.name}</h1>`;

    clearChildElements(mainCardDiv);
    mainCardDiv.innerHTML = `
      <img id="main-card-img" src="${element.imageUrlHiRes}">`;

    mainCardId = element.id;
  });

  clearChildElements(altCardDiv);
  cardArray.forEach(element => {
    console.log(element.id);
    console.log(element.name);
    console.log(element.imageUrlHiRes);
    randomImg = element.imageUrlHiRes;

    if (mainCardId !== element.id) {
      clearChildElements(altCardBanner);
      altCardBanner.innerHTML = `
      <h1 id="alt-card-banner-title">Alternate Cards for ${element.name}</h1>`;

      //clearChildElements(altCardDiv);
      altCardDiv.innerHTML += `
        <img id="alt-card-img" src="${element.imageUrlHiRes}">`;
    }

    evolutionCardBanner.innerHTML = `
    <h1 id="evolution-card-banner-title">Evolution Chart for ${characterName}</h1>`;

  });


});
