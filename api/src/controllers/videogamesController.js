const { Videogame, Genre } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env;

//==============================Funciones==========================================

//--------Traer todos los juegos------
const getAllVg = async () => {

    // traigo los juegos de la db (incluyendo su relacion)
    const gamesDb = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
    // mapeo lo que llego de la db
    const arrayGamesDB = gamesDb.map(game => {
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            platform: game.platform,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating,
            genres: game.genres.map(genre => genre.name)
        }
    })

    // traigo los juegos de la api
    const arrayGamesApi = [];
    for (let i = 1; i <= 2; i++) {
        let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        // mapeo y pusheo cada juego
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
    // concateno lo de la db y la api
    return [...arrayGamesDB, ...arrayGamesApi];
}

//-------Traer los juegos por su nombre---------
const getVgByName = async (name) => {
    try {
        // busco en la db por nombre
        const gamesDb = await Videogame.findAll({
            where: { name: name },
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        const arrayGamesDB = gamesDb.map(game => {
            return {
                id: game.id,
                name: game.name,
                description: game.description,
                platform: game.platform,
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres.map(genre => genre.name)
            }
        })


        let arrayGamesApi = [];
        for (let i = 1; i <= 2; i++) {
            let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page=${i}`);
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

        arrayGamesApi = arrayGamesApi.filter(g => g.name.toLowerCase() || g.name.toUpperCase())
        
        let allGamesByName = [...arrayGamesDB, ...arrayGamesApi].slice(0, 15)  // -----> API +  DB
        return allGamesByName;
    } catch (error) {
        throw Error('El juego ingresado no existe')
    }


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
        released: getByAPI?.data?.released,
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
        released: getGamesDB.released,
        rating: getGamesDB.rating,
        genres: getGamesDB.genres.map(genre => genre.name)
    })
    return gamesDB;
}


//-------------Crear un nuevo juego---------------
const createNewGame = async ({ name, description, platform, background_image, released, rating, genre }) => {
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

    // busca y trae de la tabla genre los generos = genre
    let getGenreDB = await Genre.findAll({
        where: {
            name: genre
        }
    });
    //Verificar si la tabla de generos esta vacia
    if (getGenreDB.length === 0) throw Error('Los generos no se cargaron correctamente!')
    //Guerdar nuevo juego en la DB
    let newVideogame = await Videogame.create({
        name,
        description,
        platform,
        background_image,
        released,
        rating: Number(rating),
        genre
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
    else return getVgDB(id) //DB
}

// ---------------Crear un juego en la DB-----------------
const createVg = (form) => {
    return createNewGame(form) // Crear juego
}


module.exports = {
    getVg,
    getVgById,
    createVg,
}