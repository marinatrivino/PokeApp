export async function obtenerEntrenadores() {
    const res = await fetch('/data/entrenadores');
    return await res.json();
  }
  
  export async function guardarEntrenador(entrenador) {
    await fetch('/data/entrenadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrenador)
    });
  }
  