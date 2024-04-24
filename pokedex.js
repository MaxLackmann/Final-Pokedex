let currentPokemon;

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/charizard`; // bulbasaur durch ${i} ersetzen
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log('loaded Pokemon', currentPokemon);
}
