const express = require('express');
const path = require('path');
const axios = require('axios');
const { Album, Artista, Cancion, Genero } = require('./db/models');

const cancionRoutes = require('./routes/cancionRoutes');
const generoRoutes = require('./routes/generoRoutes');

const app = express();

/* Middlewares */
app.use(express.urlencoded({extended : true}));
app.use(express.json());

/* Routes */
app.use('/canciones', cancionRoutes);
app.use('/generos', generoRoutes);

app.get('/', async (req, res)=> {
    res.send('<h1>Pagina principal</h1>')
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});