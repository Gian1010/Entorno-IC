const assert = require('assert');
const suma = require('../src/suma');

describe('Función suma', () => {
    it('debería retornar 10 cuando se suman 6 + 4', () => {
        const resultado = suma(6, 4);
    assert.strictEqual(resultado, 10);
    });

    it('debería retornar 10 cuando se suman 6 + 4', () => {
        const resultado = suma(6, 4);
    assert.strictEqual(resultado, 11);
    });

    it('debería retornar 10 cuando se suman 6 + 4', () => {
        const resultado = suma(6, 4);
    assert.strictEqual(resultado, 10);
    });
});

//it lo uso para definir una prueba individual
//describe me agrupa un conjunto de pruebas
//assert.strictequal verifica que mi resultado de la suma sea = 10