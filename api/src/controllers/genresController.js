const axios = require('axios')
const { Genre } = require('../db')
const { API_KEY } = process.env;

// ------Solicita de la API, almacena la info en la DB------
const getGenresVg = async () => {

    let response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let genres = await response.data.results.map(g => g.name)

    const count = await Genre.count();

    if (count === 0) {
        genres.forEach(element => {
            Genre.create({ name: element })  // Create espera un objeto!
        })
    }
    return genres
}

module.exports = {
    getGenresVg
}