const { Videogame, Genre } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env;

//==============================Funciones==========================================

//--------Traer todos los juegos------
const getAllVg = async () => {
    const arrayGamesApi = [];

    const arrayGamesDb = await Videogame.findAll();

    for (let i = 1; i <= 2; i++) {
        let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        response.data.results.map(game => {
            arrayGamesApi.push({
                id: game.id,
                name: game.name,
                platform: game.platforms.map(e => e.platform.name),
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres.map(g => g.name)
            });
        });
    };
    return [...arrayGamesDb, ...arrayGamesApi];
}

//-------Traer los juegos por su nombre----------

const getVgByName = async (name) => {
    let arrayGamesApi = [];

    const arrayGamesDb = await Videogame.findAll({
        where: { name: name }
    })

    for (let i = 1; i <= 2; i++) {
        let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page=${i}`);
        response.data.results.map(game => {
            arrayGamesApi.push({
                id: game.id,
                name: game.name,
                platform: game.platforms.map(e => e.platform.name), // LO MISMO DE ARRIBA
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres.map(g => g.name)
            });
        });
    };
    arrayGamesApi = arrayGamesApi.filter(g => g.name.toLowerCase() === name.toLowerCase() || g.name.toUpperCase() === name.toUpperCase())

    if ([...arrayGamesDb, ...arrayGamesApi].length === 0) throw new Error('El juego ingresado no existe')
    return [...arrayGamesDb, ...arrayGamesApi];
}


//---------Traer los juegos por su id-------------

// De la API
const getVgAPI = async (id) => {
    const gamesAPI = [];

    const getByAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    gamesAPI.push({
        id: getByAPI?.data?.id,
        name: getByAPI?.data?.name,
        description: getByAPI?.data?.description,  // Solo tiene description si se busca por ID
        platform: getByAPI?.data?.platforms?.map(e => e.platform.name),
        background_image: getByAPI?.data?.background_image,
        released: getByAPI?.data?.released,             // ===> LA FECHA SE MANDA ASII 2024-03-14  ? POSIBLE ERROR
        rating: getByAPI?.data?.rating,
        genres: getByAPI?.data?.genres?.map((g) => g.name),
    })

    return gamesAPI;
}

// De la DB
const getVgDB = async (id) => {
    let gamesDB = []

    const getGamesDB = await Videogame.findByPk(
        id,
        {
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });

    gamesDB.push({
        id: getGamesDB.id,
        name: getGamesDB.name,
        description: getGamesDB.description,
        platform: getGamesDB.platform,
        background_image: getGamesDB.background_image,
        released: getGamesDB.released,                  // ===> LA FECHA SE MANDA ASII 2024/03/14   ? POSIBLE ERROR
        rating: getGamesDB.rating,
        genres: getGamesDB.genres.map(genre => genre.name)
    })
    return gamesDB;
}


//-------------Crear un nuevo juego---------------
const createNewGame = async ({name, description, platform, background_image, released, rating, genre}) => {
    //  Verificar que todos los campos estan llenos
    if (!name || !description || !platform || !background_image || !released || !rating || !genre) {
        throw Error('Todos los campos son obligatorios')
    }
    //  Verificar si el juego ya existe
    const searchName = await Videogame.findAll({
        where: { name: name }
    })
    // Lanzar error en caso de que ya exista
    if (searchName.length !== 0) throw Error('Este juego ya existe!');
    // Guardar el juego en la DB
    let newVideogame = await Videogame.create({
        name,
        description,
        platform,
        background_image,
        released,
        rating
    });

    // busca y trae de la tabla genre los generos = genre
    let getGenreDB = await Genre.findAll({
        where: {
            name: genre    //verificar si la tabla de generos esta cargada 
        }
    });
    await newVideogame.addGenres(getGenreDB);

    return newVideogame;
}
//==================================================================================

// -----------Traer todos los juegos/traer juegos por su nombre--------------
const getVg = (name) => {
    if (!name) return getAllVg()   //Todos los juegos 
    else return getVgByName(name)  //Juegos por nombre       
}

// -----------Traer juegos por su id---------------------------
const getVgById = async (id, source) => {
    if (source === 'API') return getVgAPI(id) //API       
    else return getVgDB(id)
}

// ---------------Crear un juego en la DB-----------------
const createVg = (datos) => {
    return createNewGame(datos)
}

module.exports = {
    getVg,
    getVgById,
    createVg
}