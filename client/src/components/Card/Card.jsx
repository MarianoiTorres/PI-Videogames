import style from './Card.module.css'
import { NavLink } from 'react-router-dom'
import star from '../../img/star.png'

const Card = ({ id, name, image, genres, rating }) => {
    return (
        <div className={style.containerCard}>
            <div className={style.containerStar}>
                <h2 className={style.rating}>{rating}</h2>
                <img className={style.star} src={star} />
            </div>
            <NavLink to={`/detail/${id}`}>
                <h2 className={style.name}>{name}</h2>
                <img className={style.image} src={image} alt={name} />
                <div className={style.genresContainer}>
                    {
                        genres?.map((genre, index) => {
                            return <h4 key={index} className={style.genres}>{genre}</h4>
                        })
                    }
                </div>
            </NavLink>
        </div>
    )
}

export default Card