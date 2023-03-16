import Cards from "../../components/Cards/Cards"
import style from './Home.module.css'

const Home = () => {
    return (
        <div>
            <h2 className={style.titulo}>AQUI ESTAN LOS JUEGOS</h2>
            <Cards />
        </div>
    )
}

export default Home