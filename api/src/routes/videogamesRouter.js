const { Router } = require('express')
const { getVideogames, getVideogameById, postVideogame } = require('../handlers/videogamesHandler')

const routerVideogames = Router()

routerVideogames.get('/', getVideogames);                // Traer videojuegos 
routerVideogames.get('/:idVideogame', getVideogameById); // Traer videojuegos por su ID
routerVideogames.post('/', postVideogame);               // Crear un videojuego

module.exports = routerVideogames
