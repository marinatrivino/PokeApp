import { getPokemonById, getMoveEffect } from './api.js';
import { guardarEntrenador } from './data/dataHandler.js';
import Entrenador from './clases/Entrenador.js';

const catalogo = document.getElementById('pokemon-catalogo');
const paginacion = document.getElementById('paginacion');
const seleccionados = new Set();
let pagina = 1;

async function cargarPagina(p) {
  catalogo.innerHTML = '';
  const offset = (p - 1) * 15;
  for (let i = 1 + offset; i <= 15 + offset && i <= 150; i++) {
    const pokemon = await getPokemonById(i);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<p>${pokemon.name}</p><img src="${pokemon.sprites.front_default}" />`;
    card.onclick = () => {
      if (seleccionados.has(i)) {
        seleccionados.delete(i);
        card.classList.remove('selected');
      } else if (seleccionados.size < 6) {
        seleccionados.add(i);
        card.classList.add('selected');
      }
    };
    catalogo.appendChild(card);
  }
}

function renderPaginacion() {
  paginacion.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => {
      pagina = i;
      cargarPagina(pagina);
    };
    paginacion.appendChild(btn);
  }
}

document.getElementById('registro-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (seleccionados.size !== 6) return alert('Debes seleccionar 6 Pokémon');
  const nombre = e.target.nombre.value.trim();
  const region = e.target.region.value.trim();
  if (!nombre || !region) return alert('Faltan datos');

  const pokemones = [];
  for (let id of seleccionados) {
    const data = await getPokemonById(id);
    const tipo = data.types[0].type.name;
    const movimientos = [];
    for (let i = 0; i < 4 && i < data.moves.length; i++) {
      const moveData = await getMoveEffect(data.moves[i].move.url);
      movimientos.push(moveData);
    }
    pokemones.push({ nombre: data.name, tipo, movimientos });
  }

  const entrenador = new Entrenador(nombre, region, pokemones);
  await guardarEntrenador(entrenador);
  window.location.href = 'index.html';
});

renderPaginacion();
cargarPagina(pagina);