import Card from "../Card/Card";
import { getAllGames } from '../../redux/actions'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import style from './Cards.module.css'

const Cards = () => {
    
    
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getAllGames()) 
    }, [])

    const allGames = useSelector(state => state.allGames)

    return (
        <div className={style.container}>
            {
                allGames.map((game, index) => {
                    return (
                        <div className={style.cards} key={index}>
                            <Card
                            id={game.id}
                            name={game.name}
                            image={game.background_image}
                            genres={game.genres}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Cards