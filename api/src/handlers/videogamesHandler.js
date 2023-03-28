const { getVg, getVgById, createVg} = require('../controllers/videogamesController')

//traer todos los juegos o traerlos por sus nombres
const getVideogames = async (req, res) => {
    const { name } = req.query
    try {
        const games = await getVg(name);
        res.status(200).json(games);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// traer juegos por id
const getVideogameById = async (req, res) => {
    const { idVideogame } = req.params;
    const source = isNaN(idVideogame) ? 'DB' : 'API';
    try {
        const gamesById = await getVgById(idVideogame, source);
        res.status(200).json(gamesById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// crear juego
const postVideogame = async (req, res) => {
    const { name, description, platform, background_image, released, rating, genre } = req.body;
    try {
        const newGame = await createVg({ name, description, platform, background_image, released, rating, genre });
        res.status(200).json(newGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    getVideogames,
    getVideogameById,
    postVideogame,
}