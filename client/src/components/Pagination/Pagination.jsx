import { useState } from 'react';
import style from './Pagination.module.css';

const Pagination = ({ gamesPerPage, allGames, paginado, currentPage }) => {

    const pageNumbers = []
    // for para saber la cantidad de botones que se van a renderizar
    for (let i = 0; i < Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav className={style.container}>
            <ul className={style.containerButtons}>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <button key={number} className={currentPage === number ? style.current : style.buttons} onClick={() => paginado(number)}>{number}</button>
                    ))
                    // si la numero de pagina es igual al numero del boton se cambia de color
                }
            </ul>
        </nav>
    )
}

export default Pagination