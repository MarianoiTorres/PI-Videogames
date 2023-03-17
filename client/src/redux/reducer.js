import { 
    GET_ALL_GAMES, 
    GET_GAMES_ORDER_ALPHABETIC, 
    GET_GAMES_ORDER_RATING, 
    GET_GAME_BY_ID, 
    GET_GAME_BY_NAME, 
    GET_GENRES,
    GET_GENRES_FILTERED 
} from "./actionsTypes"

const initialState = {
    allGames: [],
    allGamesToFilter: [],
    gameDetail: [],
    genres: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Traer todos los juegos
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload,
                allGamesToFilter: action.payload
            }
        //Traer el juego que se busca
        case GET_GAME_BY_NAME:
            return {
                ...state,
                allGames: action.payload
            }
        //Traer un juego especifico (detailCard)
        case GET_GAME_BY_ID: 
            return {
                ...state,
                gameDetail: action.payload
            }
        // Traer todos los generos
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        // Filtrar segun el genero 
        case GET_GENRES_FILTERED: 
            return {
                ...state,
                allGames: state.allGamesToFilter.filter(game => game.genres.includes(action.payload))
            }
        case GET_GAMES_ORDER_RATING:
            if(action.payload === 'Ascendente'){
                return {
                    ...state, 
                    allGames: [...state.allGames.sort((a, b) => a.rating - b.rating)]
                }
            }
            else{
                return {
                    ...state, 
                    allGames: [...state.allGames.sort((a, b) => b.rating - a.rating) ]
                }
            }

        case GET_GAMES_ORDER_ALPHABETIC: 
        if(action.payload === 'Ascendente'){
            return {
                ...state, 
                allGames: [...state.allGames.sort((a, b) => a.name.localeCompare(b.name))]
            }
        }
        else{
            return {
                ...state, 
                allGames: [...state.allGames.sort((a, b) => b.name.localeCompare(a.name)) ]
            }
        }

        default: return { ...state }
    }


}

export default reducer