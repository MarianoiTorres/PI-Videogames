import style from './Card.module.css'
import { NavLink } from 'react-router-dom'

const Card = ({ id, name, image, genres }) => {
    return (
        <div>
            <NavLink to={`/detail/${id}`}>
                <h2 className={style.name}>{name}</h2>
                <img className={style.image} src={image} alt={name} />
                {
                    genres.map((genre, index) => {
                        return <h4 key={index} className={style.genres}>{genre}</h4>
                    })
                }
            </NavLink>
        </div>
    )
}

export default Card