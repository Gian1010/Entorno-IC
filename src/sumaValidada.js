// src/sumaValidada.js
function sumaValidada(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Ambos parámetros deben ser números');
  }

  if (a < 0 || b < 0) {
    return 0; // no se permiten números negativos
  }

  return a + b;
}

module.exports = sumaValidada;
