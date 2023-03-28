import Card from "../Card/Card";
import { getAllGames } from '../../redux/actions'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from './Cards.module.css'
import Pagination from "../Pagination/Pagination";

const Cards = () => {

    const allGames = useSelector(state => state.allGames)
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // solo para saber la cantidad de paginas en este componente
    const pageNumbers = []
    for (let i = 0; i < Math.ceil(allGames.length / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    // handler para las flechas de prev y next
    const clickHandler = (event) => {
        if (event.target.name === 'prev') {
            if (currentPage - 1 === 0) return
            setCurrentPage(currentPage - 1)
        }
        else {
            if (currentPage + 1 === pageNumbers.length + 1) return
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
            setCurrentPage(1)
    }, [allGames])

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
                                    rating={game.rating}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className={style.containerButtons}>
                {currentGames.length !== 0 && <button className={style.buttons} name="prev" onClick={clickHandler}>←</button>}
                <Pagination
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginado={paginado}
                    currentPage={currentPage}
                />
                {currentGames.length !== 0 && <button className={style.buttons} name="next" onClick={clickHandler}>→</button>}
                {currentGames.length === 0 && <div className={style.ningunJuego}>Sorry, no games were found that match your search</div>}
            </div>
        </div>
    )
}

export default Cards