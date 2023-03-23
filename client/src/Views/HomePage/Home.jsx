import Cards from "../../components/Cards/Cards"
import FilterButtons from "../../components/FilterButtons/FilterButtons"
import style from './Home.module.css'

const Home = (props) => {

    return (
        <div className={style.container}>
            <div className={style.descrip}>
                <h2 className={style.h2}>Filter by:</h2>
                <h2 className={style.h2}>Order by:</h2>
            </div>
            <FilterButtons allGenres={props.allGenres} />
            <Cards allGames={props.allGames} />
        </div>
    )
}

export default Home