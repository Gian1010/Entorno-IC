// test/sumaValidada.test.js
const assert = require('assert');
const sumaValidada = require('../src/sumaValidada');

describe('Función sumaValidada', () => {
  it('debería retornar la suma cuando ambos números son positivos', () => {
    const resultado = sumaValidada(4, 6);
    assert.strictEqual(resultado, 10);
  });

  it('debería retornar 0 si alguno es negativo', () => {
    const resultado = sumaValidada(-3, 5);
    assert.strictEqual(resultado, 0);
  });

  it('debería lanzar error si alguno no es un número', () => {
    assert.throws(() => {
      sumaValidada("a", 2);
    }, /Ambos parámetros deben ser números/);
  });
});
