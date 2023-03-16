import axios from 'axios'
import { GET_ALL_GAMES, GET_GAME_BY_NAME, GET_GAME_BY_ID } from "./actionsTypes";


export const getAllGames = () => {
    try {
        return async(dispatch) => {
            const response = await axios.get('http://localhost:3001/videogames')
            const data = response.data
            return dispatch({type: GET_ALL_GAMES, payload: data})
        }
    } catch (error) {
        console.log('error al traer los juegos de la api')
    }
}

export const getGameByName = (name) => {
    try {
        return async(dispatch) => {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            const data = response.data
            return dispatch({type: GET_GAME_BY_NAME, payload: data})
        }
    } catch (error) {
        console.log('error al filtrar el juego')
    }
}

export const getGameById = (idVideogame) => {
    try {
        return async(dispatch) => {
            const response = await axios.get(`http://localhost:3001/videogames/${idVideogame}`)
            const data = response.data
            console.log(data)
            return dispatch({type: GET_GAME_BY_ID, payload: data})
        }
    } catch (error) {
        console.log('error al filtrar por id')
    }
}

