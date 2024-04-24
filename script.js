let currentPokemon;
let pokemonlimit = 21;
let allPokemon = [];
let allLoadedPokemon = [];
let isLoading = false;

async function loadAllPokemon() {
  for (let i = 1; i < 898; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    allLoadedPokemon.push(currentPokemon);
  }
}

async function loadPokemon() {
  if (isLoading) return; // Wenn bereits geladen wird, abbrechen
  isLoading = true;
  const startIndex = allPokemon.length + 1; // Startindex für das Laden neuer Pokémon
  const endIndex = startIndex + 20; // Endindex für das Laden neuer Pokémon
  for (let i = startIndex; i < endIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    allPokemon.push(currentPokemon);

    renderPokemon(i);
  }
  isLoading = false; // Laden abgeschlossen
}

// Die Funktion überprüft, ob der Benutzer am unteren Ende der Seite angelangt ist
window.addEventListener('scroll', function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    increasePokemonLimit();
  }
});

function increasePokemonLimit() {
  pokemonlimit += 20;
  loadPokemon();
}

function renderPokemon(i) {
  content = document.getElementById('showcards');

  (content.innerHTML += showCards(i)), showCardInfo(i);
}

function showCards(i) {
  let type = currentPokemon['types']['0']['type']['name'];
  return /*html*/ `
    <div id="cards${i}" class="cards ${type}">
      <div class="cardname">
        <h2 id="pokemonName${i}"></h2>
        <h2 id="pokemonNumber${i}"></h2>
      </div>
      <div class="card-image">
        <img id="pokemonImage${i}" onclick="openBigImage()">
      </div>
      <div id="pokemonTypes${i}" class="card-types">
      </div>
    </div>
  `;
}

function showCardInfo(i) {
  showName(i);
  showNumber(i);
  showImage(i);
  showType(i);
}

function showName(i) {
  document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon['name'];
}

function showNumber(i) {
  document.getElementById(`pokemonNumber${i}`).innerHTML = currentPokemon['id'];
}

function showImage(i) {
  document.getElementById(`pokemonImage${i}`).src =
    currentPokemon['sprites']['other']['home']['front_default'];
}

function showType(i) {
  let type;
  for (let j = 0; j < currentPokemon['types'].length; j++) {
    const type = currentPokemon['types'][j]['type']['name'];
    document.getElementById(`pokemonTypes${i}`).innerHTML += /*html*/ `
      <p>${type}</p>
    `;
  }
}
