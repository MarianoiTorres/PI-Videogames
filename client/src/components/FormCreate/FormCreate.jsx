import axios from 'axios'
import style from './FormCreate.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getPlatforms } from '../../redux/actions'

const FormCreate = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        name: '',
        description: '',
        platform: [],
        background_image: '',
        released: '',
        rating: '',
        genre: []
    })

    useEffect(() => {
        dispatch(getPlatforms())
    }, [])

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    const genresHandler = (event) => {
        if (!form[event.target.name].includes(event.target.value)) {
            setForm({
                ...form,
                [event.target.name]: [...form[event.target.name], event.target.value]
            })
        }
    }

    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(form)
        axios.post('http://localhost:3001/videogames', form)
            .then(res => alert(res))
            .catch(err => alert(err))
    }

    return (
        <form className={style.form} onSubmit={submitHandler}>
            <div>
                <label>Nombre</label>
                <input type="text" name='name' onChange={onChangeHandler} value={form.name} />
            </div>

            <div>
                <label>Imagen</label>
                <input type='url' name='background_image' onChange={onChangeHandler} value={form.background_image} />
            </div>

            <div>
                <label>Descripcion</label>
                <textarea name="description" onChange={onChangeHandler} value={form.description}></textarea>
            </div>

            <div>
                <label>Plataformas</label>
                <select name='platform' onChange={genresHandler}>
                    {
                        platforms.map(platform => {
                            return <option name={platform} value={platform} >{platform}</option>
                        })
                    }
                </select>
            </div>

            <div>
                <label>Fecha de lanzamiento</label>
                <input type='date' name='released' onChange={onChangeHandler} value={form.released} />
            </div>

            <div>
                <label>Rating</label>
                <input type="number" name='rating' onChange={onChangeHandler} value={form.rating} />
            </div>

            <div>
                <select name='genre' onChange={genresHandler}>
                    {
                        genres.map(genre => {
                            return <option name={genre} value={genre} >{genre}</option>
                        })
                    }
                </select>
            </div>

            <div>
                <button type='submit'>CREAR</button>
            </div>

        </form>
    )
}

export default FormCreate