import { getAllGames, getGamesFromApiOrDb, getGamesOrderAlphabetic, getGamesOrderRating, getGenres, getGenresFiltered } from "../../redux/actions"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import style from './FilterButtons.module.css'

const FilterButtons = () => {

    const dispatch = useDispatch()

    const genres = useSelector(state => state.genres)

    // action para filtrar por generos
    const filterByGenre = (event) => {
        dispatch(getGenresFiltered(event.target.value))
    }
    // action para ordenar por rating
    const gameOrderRating = (event) => {
        dispatch(getGamesOrderRating(event.target.value))
    }
    // action para ordenar alfabeticamente
    const gamesOrderAlphabetic = (event) => {
        dispatch(getGamesOrderAlphabetic(event.target.value))
    }
    // functiones de api o db
    const functionOptions = (event) => {

        if(event.target.value === 'ALL')
        {
            // si se selecciona la opcion ALL trae todos los juegos 
            dispatch(getAllGames())
        }
        else
        {
            // si se selecciona cualquier otra opcion se traen los juegos de la db o la api
            dispatch(getGamesFromApiOrDb(event.target.value))
        }
    }

    return (
        <div className={style.container}>

            <div>
                <select className={style.selects} onChange={filterByGenre}>
                    <option select disabled selected={true}>Genres</option>
                    {
                        genres.map(genre => {
                            return <option key={genre} value={genre}>{genre}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <select className={style.selects} onChange={functionOptions}>
                    <option select disabled selected={true}>Origin</option>
                    <option value="ALL">All games</option>
                    <option value="API">From API</option>
                    <option value="DB">Created by user</option>
                </select>
            </div>
            <div>
                <select className={style.selects} onChange={gameOrderRating}>
                    <option select disabled selected={true}>Rating</option>
                    <option value="Ascendente">Ascendant</option>
                    <option value="Descendente">Descendant</option>
                </select>
            </div>
            <div>
                <select className={style.selects} onChange={gamesOrderAlphabetic}>
                    <option select disabled selected={true}>A/Z</option>
                    <option value="Ascendente">Ascendant</option>
                    <option value="Descendente">Descendant</option>
                </select>
            </div>
        </div>
    )
}

export default FilterButtons