import Cards from "../../components/Cards/Cards"
import FilterButtons from "../../components/FilterButtons/FilterButtons"
import style from './Home.module.css'

const Home = () => {
    return (
        <div>
            <h2 className={style.titulo}>AQUI ESTAN LOS JUEGOS</h2>
            <hr />
            <h4 className={style.titulo}>botones para filtrar</h4>
            <FilterButtons />
            <hr />
            <Cards />
        </div>
    )
}

export default Home