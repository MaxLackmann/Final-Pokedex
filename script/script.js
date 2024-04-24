let currentPokemon; // Variable for current Pokemon
let allPokemon = []; // Array for all downloaded Pokemon
let allLoadedPokemon = []; // Array for all loaded Pokemon (fully loaded)
let isLoading = false; // Status flag: Is something being loaded?
let isSearching = false; // Status flag: Is a search ongoing?
let previousHTML; // Global variable to save the previous state of the webpage

// Asynchronous function to load all Pokemon
async function loadAllPokemon() {
  for (let i = 1; i < 899; i++) {
    // For all Pokemon IDs from 1 to 898
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    allLoadedPokemon.push(currentPokemon);
  }
}

// Asynchronous function to load a certain number of Pokemon
async function loadPokemon(limit) {
  if (isLoading || isSearching) return;

  isLoading = true;
  const startIndex = allPokemon.length + 1;
  const endIndex = startIndex + limit;

  for (let i = startIndex; i < endIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    allPokemon.push(currentPokemon);

    renderPokemon(i);
  }
  isLoading = false;
}

// Add an event listener to the window for the scroll event
window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    increasePokemonLimit();
  }
});

// Add an event listener that is called when the entire HTML document (including all dependent resources, such as stylesheets, images, etc.) has been fully loaded and rendered.
document.addEventListener('DOMContentLoaded', async function () {
  while (document.body.offsetHeight < window.innerHeight) {
    await increasePokemonLimit();
  }
});

// Asynchronous function to increase the number of displayed Pokémon
async function increasePokemonLimit() {
  if (isSearching) return;
  let pokemonlimit = 20;
  await loadPokemon(pokemonlimit);
}

// The main function that generates and displays all Pokemon information.
async function renderPokemon(i) {
  content = document.getElementById('showcards');
  (content.innerHTML += showCards(i)), showCardInfo(i);
}

// Function to display the Pokemon card information
function showCardInfo(i) {
  showName(i);
  showNumber(i);
  showImage(i);
  showType(i);
}

// Function to display the name of the Pokemon
function showName(i) {
  document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon['name'];
}

// Function to display the number of the Pokemon
function showNumber(i) {
  document.getElementById(`pokemonNumber${i}`).innerHTML = currentPokemon['id'];
}

// Function to display the image of the Pokemon
function showImage(i) {
  document.getElementById(`pokemonImage${i}`).src =
    currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

// Function to display the type(s) of the Pokemon
function showType(i) {
  for (let j = 0; j < currentPokemon['types'].length; j++) {
    const type = currentPokemon['types'][j]['type']['name'];

    document.getElementById(`pokemonTypes${i}`).innerHTML += /*html*/ `
      <p>${type}</p>
    `;
  }
}

//Render Big Card + cries when they are opened
function showBigCard(i) {
  document.getElementById('showBigCard').classList.remove('dnone');
  content = document.getElementById('showBigCard');
  content.innerHTML = '';

  (content.innerHTML += renderBigCard(i)), showBigCardInfo(i), renderAbout(i);
  if (i === allPokemon.length) {
    renderMoves(i);
  }
  let criesUrl = currentPokemon['cries']['latest'];

  let audio = new Audio(criesUrl);

  audio.volume = 0.01;

  audio.play();
}

// Function to display the information of a big card
function showBigCardInfo(i) {
  showBigName(i);
  showBigNumber(i);
  showBigType(i);
  showBigImage(i);
}

// Function to display the name of a Pokemon
function showBigName(i) {
  document.getElementById(`pokemonBigName${i}`).innerHTML =
    currentPokemon['name'];
}

// Function to show the number of a Pokemon
function showBigNumber(i) {
  document.getElementById(`pokemonBigNumber${i}`).innerHTML =
    currentPokemon['id'];
}

// Function to show the type of a Pokemon
function showBigType(i) {
  for (let j = 0; j < currentPokemon['types'].length; j++) {
    const type = currentPokemon['types'][j]['type']['name'];
    document.getElementById(`pokemonBigTypes${i}`).innerHTML += /*html*/ `
      <p>${type}</p>
    `;
  }
}

// Function to display the image of a Pokemon
function showBigImage(i) {
  document.getElementById(`pokemonBigImage${i}`).src =
    currentPokemon['sprites']['other']['showdown']['front_default'];
}

// Function to close the image
function closeImage() {
  document.getElementById('showBigCard').classList.add('dnone');
}

// Function to display the next image
function nextImage(i) {
  if (i < allPokemon.length) {
    showBigCard(i + 1);
  } else {
    showBigCard(1);
  }
}

// Function to display the previous image
function previousImage(i) {
  if (i > 1) {
    showBigCard(i - 1);
  } else {
    showBigCard(allPokemon.length);
  }
}

function searchPokemon() {
  isSearching = true;
  let search = document.getElementById('search').value.toLowerCase();
  let content = document.getElementById('showcards');
  content.innerHTML = '';
  for (let i = 0; i < allPokemon.length; i++) {
    let name = allPokemon[i]['name'].toLowerCase();
    if (name.startsWith(search)) {
      currentPokemon = allPokemon[i];
      renderPokemon(i + 1);
    }
  }
  isSearching = false;
}

function renderAbout(i) {
  let about = document.getElementById(`bigcontent${i}`);
  about.innerHTML = '';
  (about.innerHTML += showAboutHTML(i)), showAboutInfos(i);
}

function showAboutInfos(i) {
  showHeight(i), showWeight(i), showAbilities(i);
}

function showHeight(i) {
  document.getElementById(`pokemonheight${i}`).innerHTML +=
    currentPokemon['height'];
}

function showWeight(i) {
  document.getElementById(`pokemonweight${i}`).innerHTML +=
    currentPokemon['weight'];
}

function showAbilities(i) {
  for (let j = 0; j < currentPokemon['abilities'].length; j++) {
    const ability = currentPokemon['abilities'][j]['ability']['name'];
    document.getElementById(`ability${i}`).innerHTML += /*html*/ `
      <p>${ability}</p>
      `;
  }
}

// Diagram generator
function renderStats(i) {
  renderChart(i);
}

function renderMoves(i) {
  let moves = document.getElementById(`bigcontent${i}`);
  if (moves) {
    moves.innerHTML = ''; // Clean up content
    (moves.innerHTML = renderMovesHTML(i)), showMoves(i);
  }
}

function showMoves(i) {
  let moves = document.getElementById(`moves${i}`);
  // Check if the element exists before it is manipulated
  if (moves && currentPokemon['moves']) {
    moves.innerHTML = '';
    for (let j = 0; j < currentPokemon['moves'].length; j++) {
      const move = currentPokemon['moves'][j]['move']['name'];
      if (move) {
        moves.innerHTML += /*html*/ `
          <p> ${move} </p>
        `;
      }
    }
  }
}

window.addEventListener('resize', function () {
  if (!previousHTML) {
    previousHTML = document.body.innerHTML;
  }

  if (window.innerWidth > window.innerHeight && window.innerHeight < 600) {
    let adviceDiv = document.createElement('div');
    adviceDiv.classList.add('advice');
    adviceDiv.innerHTML =
      'Bitte wechseln Sie in den Porträtmodus, um die Anzeige zu sehen';
    document.body.innerHTML = '';
    document.body.appendChild(adviceDiv);
  } else if (window.innerHeight >= 600) {
    document.body.innerHTML = previousHTML;
  }
});
