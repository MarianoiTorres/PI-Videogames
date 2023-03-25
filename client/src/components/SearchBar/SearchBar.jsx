import { getGameByName } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import style from './SearchBar.module.css'

export default function SearchBar() {

    const [game, setGame] = useState('')

    const onChangeHandler = (event) => {
        setGame(event.target.value) 
    }

    const functions = () => {
        dispatch(getGameByName(game))
        setGame('')
    }


    const dispatch = useDispatch()

    return (
        <div className={style.container}>
            <input autoComplete='off' className={style.input} onChange={onChangeHandler} type="search" placeholder="Name" name="name" value={game} />
            <button className={style.buttons} onClick={() => functions()}>Search</button>
        </div>
    )
}