import { obtenerEntrenadores } from './data/dataHandler.js';

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function crearCard(entrenador) {
  const card = document.createElement('div');
  card.className = 'entrenador-card';
  card.innerHTML = `
    <h2>${capitalizar(entrenador.nombre)}</h2>
    <p><strong>Región:</strong> ${capitalizar(entrenador.region)}</p>
    <h3>Equipo Pokémon:</h3>
    <ul>
      ${entrenador.pokemones.map(pokemon => `
        <li>
          <strong>${capitalizar(pokemon.nombre)}</strong> - Tipo: ${capitalizar(pokemon.tipo)}
          <ul>
            ${pokemon.movimientos.map(mov => `
              <li>${capitalizar(mov.nombre)}: ${mov.efecto}</li>
            `).join("")}
          </ul>
        </li>
      `).join("")}
    </ul>
  `;
  return card;
}

async function mostrarEntrenadores() {
  const contenedor = document.getElementById('lista-entrenadores');
  if (!contenedor) {
    console.error('No se encontró el contenedor #lista-entrenadores');
    return;
  }

  try {
    const entrenadores = await obtenerEntrenadores();
    contenedor.innerHTML = "";
    entrenadores.forEach(entrenador => {
      const card = crearCard(entrenador);
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar entrenadores:', error);
  }
}

document.addEventListener('DOMContentLoaded', mostrarEntrenadores);
