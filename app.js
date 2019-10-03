const apiCallForCards = `https://api.pokemontcg.io/v1/cards`;
const apiCallForSets = `https://api.pokemontcg.io/v1/sets`;
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

const errorMessage = document.querySelector(`#error-message`);
const modal = document.querySelector(`#my-modal`);
const span = document.querySelector(`.close`);

const dropdownDiv = document.querySelector("#my-dropdown");
const dropDownListItems = document.querySelector(`#dropdown-list`);
const searchInput = document.querySelector(`#my-input`);


const buildListOfCommonNames = () => {
  const array =
    [`Pikachu`, `Raichu`, `Charmander`, `Charmeleon`, `Charizard`, `Squirtle`, `Wartortle`, `Blastoise`,
      `Espeon`, `Venusaur`, `Mewtwo`, `Kangaskhan`, `Shining Charizard`, `Magikarp`, `Machamp`, `Machop`,
      `Machoke`, `Chansey`, `Furret`, `Sentret`, `JigglyPuff`, `Snorlax`, `Persian`, `Swirlix`, `Eevee`,
      `Drowzee`, `Floatzel`, `Zorua`, `Inkay`, `Mightyena`, `Psyduck`, `Poochyena`, `Xerneas`, `Luxray`,
      `Deoxys`, `Turtwig`, `Slowbro`, `Slowpoke`, `Slowking`, `Misdreavus`, `Vulpix`, `Ivysaur`, `Barboach`,
      `Umbreon`, `Bidoof`, `Flareon`, `Talonflame`, `Fletchinder`, `Fletchling`, `Jynx`, `Jolteon`, `Joltik`,
      `Jumpluff`, `Skiploom`, `Hoppip`, `Nidoqueen`, `Nidorina`, `Nidoran`, `Quagsire`, `Quilladin`,
      `Cyndaquil`, `Qwilfish`, `Ampharos`, `Flaaffy`, `Mareep`];
  return array.sort();
}
function printName(e) {
  console.log(`printName: ${e}`);
  document.querySelector(`#my-input`).value = e;
  filterFunction();
  searchButton.click();

}
function filterFunction() {
  //show/hide "dropdown" list
  if (searchInput.value.length > 0) {
    dropDownListItems.style.display = `block`;
  } else {
    dropDownListItems.style.display = `none`;
  }

  const filter = searchInput.value.toUpperCase();
  let a = dropdownDiv.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

const getName = async () => {

  const allSetNamesOrdered = [];
  const setsResponse = await axios.get(apiCallForSets);
  const setsCardArray = setsResponse.data.sets;
  for (let i = 0; i < setsCardArray.length; i++) {
    allSetNamesOrdered.push(setsCardArray[i].code);
  }

  const mySet = new Set(buildListOfCommonNames());
  mySet.forEach(item => {
    dropDownListItems.innerHTML += ` <a href="#" onclick="printName('${item}')">${item}</a>`;
  });
}

getName();


span.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const hideAllDivs = () => {
  mainCardBanner.style.display = `none`;
  mainCardDiv.style.display = `none`;
  altCardBanner.style.display = `none`;
  altCardDiv.style.display = `none`;
  evolutionCardBanner.style.display = `none`;
  evolutionCardDiv.style.display = `none`;

}

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
  let myElement = ``;
  //look through card array and get all setCodes(aka series codes)
  cardArray.forEach(e => {
    arraySeries.push(e.setCode);
  })

  //look in array to see if you can find a series card, starting from the oldest setCode
  if (arraySeries.includes('base1')) {
    oldestSeriesCode = `base1`;
  } else if (arraySeries.includes('base2')) {
    oldestSeriesCode = `base2`;
  } else if (arraySeries.includes('basep')) {
    oldestSeriesCode = `basep`;
  } else if (arraySeries.includes('base3')) {
    oldestSeriesCode = `base3`;
  } else if (arraySeries.includes('base4')) {
    oldestSeriesCode = `base4`;
  } else if (arraySeries.includes('base5')) {
    oldestSeriesCode = `base5`;
  } else if (arraySeries.includes('gym1')) {
    oldestSeriesCode = `gym1`;
  } else if (arraySeries.includes('gym2')) {
    oldestSeriesCode = `gym2`;
  } else if (arraySeries.includes('neo1')) {
    oldestSeriesCode = `neo1`;
  } else if (arraySeries.includes('neo2')) {
    oldestSeriesCode = `neo2`;
  } else if (arraySeries.includes('si1')) {
    oldestSeriesCode = `si1`;
  } else if (arraySeries.includes('neo3')) {
    oldestSeriesCode = `neo3`;
  } else if (arraySeries.includes('neo4')) {
    oldestSeriesCode = `neo4`;
  } else if (arraySeries.includes('base6')) {
    oldestSeriesCode = `base6`;
  } else if (arraySeries.includes('ecard1')) {
    oldestSeriesCode = `ecard1`;
  } else if (arraySeries.includes('ecard2')) {
    oldestSeriesCode = `ecard2`;
  } else if (arraySeries.includes('ecard3')) {
    oldestSeriesCode = `ecard3`;
  } else if (arraySeries.includes('ex1')) {
    oldestSeriesCode = `ex1`;
  } else if (arraySeries.includes('ex3')) {
    oldestSeriesCode = `ex3`;
  } else if (arraySeries.includes('ex2')) {
    oldestSeriesCode = `ex2`;
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
      myElement = element;
      break;
    }
  }

  if (myElement === ``) {
    myElement = cardArray[0];
  }

  return myElement;
}

searchInput.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});
searchButton.addEventListener(`click`, async () => {

  dropDownListItems.style.display = `none`;

  const characterName = capitalizeEachWord(document.querySelector(`#my-input`).value);
  const characterNameFormatted = characterName.split(` `).join(`+`);

  const response = await axios.get(`${apiCallForCards}?name=${characterNameFormatted}`);
  const cardArray = response.data.cards;

  console.log(`character name=${characterName}=`);
  if (characterName === ``) {
    hideAllDivs();
    modal.style.display = "block";
    console.log("input text is null");
    errorMessage.innerHTML =
      `<p>Please enter a name and search again.</p>`;
  }
  else if (cardArray.length === 0) {   //API call returned no rows.  either API error or no rows found
    hideAllDivs();
    modal.style.display = "block";
    console.log("array is empty");
    errorMessage.innerHTML =
      `<p>${characterName} not found.  Please search again.</p>`;
  } else {

    element = getOldestCard(cardArray);

    let mainCardId = ``;
    //keep track of main card id, so you don't show it again in the alt card section
    mainCardId = element.id;
    let image = element.imageUrlHiRes;

    mainCardBanner.innerHTML = `<h1 id="main-card-banner-title">${characterName}</h1>`;

    mainCardDiv.innerHTML = `<img id="main-card-img" src="${image}">`;
    mainCardDiv.style.display = `block`;
    altCardBanner.style.display = `none`;
    altCardDiv.style.display = `none`;
    evolutionCardBanner.style.display = `none`;
    evolutionCardDiv.style.display = `none`;


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

      const response = await axios.get(`${apiCallForCards}?name=${basicCharacterName}`);
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

      const response = await axios.get(`${apiCallForCards}?name=${basicCharacterName}`);
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

      const response2 = await axios.get(`${apiCallForCards}?name=${basicCardName}`);
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
        altCardBanner.innerHTML = `<h1 id="alt-card-banner-title">Alternate Cards for ${characterName}</h1>`;
        altCardDiv.innerHTML += `<img id="alt-card-img" src="${element.imageUrlHiRes}">`;
        altCardDiv.style.display = `block`;

      }

      evolutionCardBanner.innerHTML = `
    <h1 id="evolution-card-banner-title">Evolution Chart for ${characterName}</h1>`;

    });

    mainCardBanner.style.display = `flex`;
    if (cardArray.length > 1) {
      altCardBanner.style.display = `flex`;
    }
  }
});
