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
            <div className={style.containerDetail}>
                {
                    gameDetail.map(game => {
                        return (
                            <div className={style.detail}>
                                <div className={style.imagen}>
                                    <img className={style.image} src={game.background_image} alt={game.name} />
                                </div>
                                <div className={style.informacion}>
                                    <h3 className={style.name}>{game.name}</h3>
                                    {
                                        game.description ? (
                                            <p
                                                className={style.info}
                                                dangerouslySetInnerHTML={{ __html: game.description }}
                                            ></p>
                                        ) : (
                                            <p>"Game detail not found in database"</p>
                                     )}
                                    <p className={style.info}><b>Platforms:</b>
                                    {
                                      game.platform.map(plataforma => {
                                        return <span>{plataforma}/ </span>
                                      }) 
                                    }</p>
                                    <p className={style.info}><b>genres:</b>
                                    {
                                        game.genres.map(genre => {
                                            return <span>{genre}/</span>
                                        })
                                    }
                                    </p>
                                    <p className={style.info}><b>Released:</b> {game.released}</p>
                                    <p className={style.info}><b>Rating:</b> {game.rating}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DetailGame