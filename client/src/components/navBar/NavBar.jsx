import style from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar() {
    return (
        <div className={style.container}>
            <nav className={style.navBar}>
                <div>
                    <SearchBar />
                </div>
                <div className={style.contButtons}>
                    <NavLink className={style.navlink} to='/form'><button className={style.buttons}>CREATE</button></NavLink>
                    <NavLink className={style.navlink} to='/home'><button className={style.buttons}>HOME</button></NavLink>
                </div>
            </nav>
        </div>
    )
}
