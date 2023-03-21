import style from './Pagination.module.css';

const Pagination = ({ gamesPerPage, allGames, paginado }) => {

    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav className={style.container}>
            <ul className={style.containerButtons}>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <button className={style.buttons} onClick={() => paginado(number)}>{number}</button>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination