export async function getPokemonById(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
  }
  
  export async function getMoveEffect(url) {
    const res = await fetch(url);
    const data = await res.json();
    const effect = data.effect_entries.find(e => e.language.name === 'en');
    return {
      nombre: data.name,
      efecto: effect ? effect.effect : 'No effect found'
    };
  }
  