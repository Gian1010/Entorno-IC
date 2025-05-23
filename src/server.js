const express = require('express');
const suma = require('./suma');

const app = express();
// Puerto dinámico para entornos como Render
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const resultado = suma(5, 5);
    res.send(`El resultado de la suma es: ${resultado} hola`);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


//utilizo nodemon para que mi server me actualice en tiempo real los cambios
//npm run dev para abrirlo su conf esta en package.json