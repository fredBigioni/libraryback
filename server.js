const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Configura CORS
app.use(cors());
app.use(cookieParser());

// Ruta para realizar la solicitud a la API de Google Books
app.get('/api/search-books', (req, res) => {
    const searchText = req.query.q;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchText}&key=AIzaSyAJmLz1OFWIYY4cNoWfoU9gxQlvzagPysE&maxResults=40`;

    axios.get(apiUrl)
        .then(response => {
            res.cookie('accessToken', 'ABC123', {
                sameSite: 'none',
                secure: true,
            });
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error en la solicitud a la API de Google Books' });
        });
});

// Puerto en el que se ejecutará el servidor
const port = 8888;

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
