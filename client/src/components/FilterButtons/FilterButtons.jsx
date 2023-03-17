import { getGamesOrderAlphabetic, getGamesOrderRating, getGenres, getGenresFiltered } from "../../redux/actions"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"

const FilterButtons = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
    }, [])

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

    return(
        <div>
            <div>
                <select onChange={filterByGenre}>
                    <option select disabled>Generos</option>
                    {
                        genres.map(genre => {
                           return <option value={genre}>{genre}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <select onChange={gameOrderRating}>
                    <option select disabled>Rating</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>
            </div>
            <div>
                <select onChange={gamesOrderAlphabetic}>
                    <option select disabled>Alphabetic</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>
            </div>
        </div>
    )
}

export default FilterButtons