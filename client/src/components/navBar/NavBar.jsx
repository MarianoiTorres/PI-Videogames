import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar(){
    return (
        <div className={style.container}>
            <nav>
                <SearchBar />
                <NavLink to='/form'><button>Crear</button></NavLink>
                <NavLink to='/home'><button>Home</button></NavLink>
            </nav>
        </div>
    )
}
