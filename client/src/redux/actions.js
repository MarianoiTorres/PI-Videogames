import axios from 'axios'
import {
    GET_ALL_GAMES,
    GET_GAME_BY_NAME,
    GET_GAME_BY_ID,
    GET_GENRES,
    GET_GENRES_FILTERED,
    GET_GAMES_ORDER_RATING,
    GET_GAMES_ORDER_ALPHABETIC,
    GET_GAMES_FROM_API_OR_DB,
    GET_PLATFORMS
} from "./actionsTypes";


export const getAllGames = () => {
    try {
        return async (dispatch) => {
            const response = await axios.get('http://localhost:3001/videogames')
            const data = response.data
            return dispatch({ type: GET_ALL_GAMES, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getGameByName = (name) => {
    try {
        return async (dispatch) => {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            const data = response.data
            return dispatch({ type: GET_GAME_BY_NAME, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getGameById = (idVideogame) => {
    try {
        return async (dispatch) => {
            const response = await axios.get(`http://localhost:3001/videogames/${idVideogame}`)
            const data = response.data
            return dispatch({ type: GET_GAME_BY_ID, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getGenres = () => {
    try {
        return async (dispatch) => {
            const response = await axios.get('http://localhost:3001/genres')
            const data = response.data
            return dispatch({ type: GET_GENRES, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getGenresFiltered = (genre) => {
    return { type: GET_GENRES_FILTERED, payload: genre }
}

export const getGamesOrderRating = (value) => {
    return { type: GET_GAMES_ORDER_RATING, payload: value }
}

export const getGamesOrderAlphabetic = (value) => {
    return { type: GET_GAMES_ORDER_ALPHABETIC, payload: value }
}

export const getGamesFromApiOrDb = (value) => {
    return { type: GET_GAMES_FROM_API_OR_DB, payload: value }
}

export const getPlatforms = () => {
    return { type: GET_PLATFORMS }
}