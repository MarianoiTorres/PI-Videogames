import { GET_ALL_GAMES, GET_GAME_BY_ID, GET_GAME_BY_NAME } from "./actionsTypes"

const initialState = {
    allGames: [],
    gameDetail: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload
            }

        case GET_GAME_BY_NAME:
            return {
                ...state,
                allGames: action.payload
            }

        case GET_GAME_BY_ID: 
            return {
                ...state,
                gameDetail: action.payload
            }

        default: return { ...state }
    }
}

export default reducer