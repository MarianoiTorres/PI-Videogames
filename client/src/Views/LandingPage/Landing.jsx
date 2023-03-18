import style from '../LandingPage/Landing.module.css'
import { NavLink } from 'react-router-dom'

const Landing = () => {
    return (
        <div className={style.container}>
            <div className={style.boxButton}>
                <NavLink to='/home'><button>Entrar</button></NavLink>
            </div>
        </div>
    )
}

export default Landing