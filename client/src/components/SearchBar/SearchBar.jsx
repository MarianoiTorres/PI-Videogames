import { getGameByName } from '../../redux/actions'
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function SearchBar() {

    const [game, setGame] = useState('')

    const onChangeHandler = (event) => {
        setGame(event.target.value)
    }

    const dispatch = useDispatch()

    return (
        <div>
            <input onChange={onChangeHandler} type="search" placeholder="Name" name="name" value={game} />
            <button onClick={() => dispatch(getGameByName(game))}>Buscar</button>
        </div>
    )
}