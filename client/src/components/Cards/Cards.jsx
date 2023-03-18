import Card from "../Card/Card";
import { getAllGames } from '../../redux/actions'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from './Cards.module.css'
import Pagination from "../Pagination/Pagination";

const Cards = () => {

    const dispatch = useDispatch()
    const allGames = useSelector(state => state.allGames)
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])

    return (
        <div className={style.container}>
            <div className={style.cardsContainer}>
                {
                    currentGames.map((game, index) => {
                        return (
                            <div className={style.cards} key={index}>
                                <Card
                                    id={game.id}
                                    name={game.name}
                                    image={game.background_image}
                                    genres={game.genres}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Pagination
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )
}

export default Cards