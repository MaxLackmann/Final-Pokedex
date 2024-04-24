function showCards(i) {
  let type = currentPokemon['types']['0']['type']['name'];
  return /*html*/ `
    <div id="cards${i}" class="cards ${type}" onclick="showBigCard(${i})">
      <div class="cardname">
         <h2 id="pokemonName${i}"></h2>
        <h2 id="pokemonNumber${i}"></h2>
      </div>
      <div class="pokemoninfo">
        <div class="card-image">
          <img id="pokemonImage${i}">
        </div>
        <div id="pokemonTypes${i}" class="card-types">
        </div>
      </div>
    </div>
  `;
}

function renderBigCard(i) {
  currentPokemon = allPokemon[i - 1];
  let type = currentPokemon['types']['0']['type']['name'];
  return /*html*/ `
    <div id="bigCard${i}" class="bigCard ${type}">
      <div class="big-header">
        <img class="arrow" onclick="previousImage(${i})" src="./icons/left.svg" alt="vorheriges Bild">
        <img class="close" onclick="closeImage()" src="./icons/x.svg" alt="schließen">
        <img class="arrow" onclick="nextImage(${i})" src="./icons/right.svg" alt="nächstes Bild">
      </div>
      <div class="bigcardname">
        <div class="bigcardname-left">
          <h2 id="pokemonBigName${i}"></h2>
          <div id="pokemonBigTypes${i}" class="bigcard-types"></div>
        </div>
        <h2 id="pokemonBigNumber${i}" class="pokemonnumber"></h2>
      </div>
      <div class="bigpokemoninfo">
        <div class="bigcard-image">
          <img id="pokemonBigImage${i}">
        </div>
      
        <div class="info-container"><div>
          <div class="info-header">
            <a onclick="renderAbout(${i})" class="nav-link" id="about">About</a>
            <a onclick="renderStats(${i})" class="nav-link" id="stats" >Stats</a>
            <a onclick="renderMoves(${i})" class="nav-link" id="moves" >Moves</a>
          </div>
          <div id="bigcontent${i}" class="bigcontent"></div>
      </div>
    </div>
  `;
}

function showAboutHTML(i) {
  let ability = currentPokemon['abilities']['0']['ability']['name'];
  let type = currentPokemon['types']['0']['type']['name'];

  return /*html*/ `
    <div class="about">
      <div class="infos ${type}">
        <h4>Height:</h4>
        <div id="pokemonheight${i}" class="info"></div>
      </div>
      <div class="infos ${type}">
        <h4>Weight:</h4>
        <div id="pokemonweight${i}" class="info"></div>
      </div>
      <div class="infos ${type}">
        <h4>Abbilities:</h4>
          <div id="ability${i}" class="info-abilities"></div>
      </div>
    </div>
  `;
}

function renderMovesHTML(i) {
  return /*html*/ `
    <div class="moves" id="moves${i}">
    </div>
  `;
}
