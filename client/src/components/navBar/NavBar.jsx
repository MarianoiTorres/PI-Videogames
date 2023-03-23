import style from './NavBar.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar() {

    const location = useLocation()

    return (
        <div className={style.container}>
            <nav className={style.navBar}>
                <div>
                    {// la searchbar solo se va a mostrar en home 
                    location.pathname !== '/form' && !location.pathname.includes('/detail') && <SearchBar />}
                </div>
                <div className={style.contButtons}>
                    {// el boton create no se muestra en /form
                    location.pathname !== '/form' && <NavLink className={style.navlink} to='/form'><button className={style.buttons}>CREATE</button></NavLink>}
                    <NavLink className={style.navlink} to='/home'><button className={style.buttons}>HOME</button></NavLink>
                </div>
            </nav>
        </div>
    )
}
