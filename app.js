const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const axios = require('axios');
const { Album, Artista, Cancion, Genero } = require('./db/models');

const cancionRoutes = require('./routes/cancionRoutes');
const generoRoutes = require('./routes/generoRoutes');
const apiCancionRoutes = require('./routes/api/cancionRoutes');
const apiGeneroRoutes = require('./routes/api/generoRoutes');
const { log } = require('console');

const app = express();

app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views/canciones'),
    path.join(__dirname, './views/generos')
]);

/* Middlewares */
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

/* Routes */
app.use('/canciones', cancionRoutes);
app.use('/generos', generoRoutes);
app.use('/api/canciones', apiCancionRoutes);
app.use('/api/generos', apiGeneroRoutes);

app.get('/prueba', async (req, res)=> {

    const endpoint = 'http://localhost:3000/api/canciones';

    const response = await axios.get(endpoint);

    console.log(response);

    res.send('<h1>Prueba de endpoint /get - Canciones</h1>')
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});