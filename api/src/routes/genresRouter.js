const { Router } = require('express')
const { getGenres } = require('../handlers/genresHandler')

const routerGenres = Router()

routerGenres.get('/', getGenres)

module.exports = routerGenres