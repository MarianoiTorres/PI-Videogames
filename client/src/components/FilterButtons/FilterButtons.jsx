import { getGamesFromApiOrDb, getGamesOrderAlphabetic, getGamesOrderRating, getGenres, getGenresFiltered } from "../../redux/actions"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import style from './FilterButtons.module.css'

const FilterButtons = () => {

    const dispatch = useDispatch()

    const genres = useSelector(state => state.genres)

    const filterByGenre = (event) => {
        dispatch(getGenresFiltered(event.target.value))
    }

    const gameOrderRating = (event) => {
        dispatch(getGamesOrderRating(event.target.value))
    }

    const gamesOrderAlphabetic = (event) => {
        dispatch(getGamesOrderAlphabetic(event.target.value))
    }

    const gamesFromApiOrDb = (event) => {
        dispatch(getGamesFromApiOrDb(event.target.value))
    }

    return (
        <div className={style.container}>

            <div>
                <select className={style.selects} onChange={filterByGenre}>
                    <option select disabled selected>Genres</option>
                    {
                        genres.map(genre => {
                            return <option value={genre}>{genre}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <select className={style.selects} onChange={gamesFromApiOrDb}>
                    <option select disabled selected>Origin</option>
                    <option value="API">API</option>
                    <option value="DB">DB</option>
                </select>
            </div>
            <div>
                <select className={style.selects} onChange={gameOrderRating}>
                    <option select disabled selected>Rating</option>
                    <option value="Ascendente">Ascendant</option>
                    <option value="Descendente">Descendant</option>
                </select>
            </div>
            <div>
                <select className={style.selects} onChange={gamesOrderAlphabetic}>
                    <option select disabled selected>A/Z</option>
                    <option value="Ascendente">Ascendant</option>
                    <option value="Descendente">Descendant</option>
                </select>
            </div>
        </div>
    )
}

export default FilterButtons