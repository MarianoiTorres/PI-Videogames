import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getGameById } from "../../redux/actions"
import style from './DetailGame.module.css'

const DetailGame = () => {

    const { idVideogame } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGameById(idVideogame))
    }, [idVideogame])

    const gameDetail = useSelector(state => state.gameDetail)
    return (
        <div className={style.container}>
            {
                gameDetail.map(game => {
                    return (
                        <div className={style.detail}>
                            <h3 className={style.info}>ID: {game.id}</h3>
                            <h3 className={style.info}>Name: {game.name}</h3>
                            <img className={style.image} src={game.background_image} alt={game.name} />
                            <h3 className={style.info}>plataformas: {game.platform}</h3>
                            <p className={style.info}>description: {game.description}</p>
                            <h3 className={style.info}>fecha de lanzamiento: {game.released}</h3>
                            <h3 className={style.info}>rating: {game.rating}</h3>
                            <h3 className={style.info}>generos: {game.genres}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DetailGame