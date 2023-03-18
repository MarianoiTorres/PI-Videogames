import axios from 'axios'
import style from './FormCreate.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getPlatforms } from '../../redux/actions'
import validation from './validation'

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

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getPlatforms())
    }, [])

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        setErrors({
            ...errors,
            [event.target.name]: validation({[event.target.name]: event.target.value})
        })
    }

    const genresAndPlatformsHandler = (event) => {
        if (!form[event.target.name].includes(event.target.value)) {
            setForm({
                ...form,
                [event.target.name]: [...form[event.target.name], event.target.value]
            })
            setErrors({
                ...errors,
                [event.target.name]: validation({[event.target.name]: [...form[event.target.name], event.target.value]})
            })
        }
    }

    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)

    const submitHandler = (event) => {
        event.preventDefault()

        axios.post('http://localhost:3001/videogames', form)
            .then(res => alert(res))
            .catch(err => alert(err))

    }
    
    const deleteHandler = (event) => {
        let index = form[event.target.name].indexOf(event.target.value)
        form[event.target.name].splice(index, 1)
        setForm({
            ...form,
            [event.target.name]: form[event.target.name]
        })
        setErrors({
            ...errors,
            [event.target.name]: validation({[event.target.name]: form[event.target.name]})
        })
    }


    return (
        <form className={style.form} onSubmit={submitHandler}>
            <div>
                <label>Nombre</label>
                <input type="text" name='name' onChange={onChangeHandler} value={form.name} />
                <p className={style.plataformas}>{errors.name}</p>
            </div>

            <div>
                <label>Imagen</label>
                <input type='url' name='background_image' onChange={onChangeHandler} value={form.background_image} />
                <p className={style.plataformas}>{errors.background_image}</p>
            </div>

            <div>
                <label>Descripcion</label>
                <textarea name="description" onChange={onChangeHandler} value={form.description}></textarea>
                <p className={style.plataformas}>{errors.description}</p>
            </div>

            <div>
                <label>Plataformas</label>
                <select name='platform' onChange={genresAndPlatformsHandler}>
                    {
                        platforms.map(platform => {
                            return <option name={platform} value={platform} >{platform}</option>
                        })
                    }
                </select>
                <div>
                    {
                        form.platform.map(plat => {
                            return <button type='button' name='platform' value={plat} className={style.plataformas} onClick={deleteHandler}>{plat}</button>
                        })
                    }
                </div>
                <p className={style.plataformas}>{errors.platform}</p>
            </div>

            <div>
                <label>Fecha de lanzamiento</label>
                <input type='date' name='released' onChange={onChangeHandler} value={form.released} />
                <p className={style.plataformas}>{errors.released}</p>
            </div>

            <div>
                <label>Rating</label>
                <input step='1' type="range" min='0' max='5' name='rating' onChange={onChangeHandler} value={form.rating} />
                <div className={style.plataformas}>{form.rating}</div>
                <p className={style.plataformas}>{errors.rating}</p>
            </div>

            <div>
                <select name='genre' onChange={genresAndPlatformsHandler}>
                    {
                        genres.map(genre => {
                            return <option name={genre} value={genre} >{genre}</option>
                        })
                    }
                </select>
                <div>
                    {
                        form.genre.map(gen => {
                            return <button name='genre' value={gen}  type='button' className={style.plataformas} onClick={deleteHandler}>{gen}</button>
                        })
                    }
                </div>
                <p className={style.plataformas}>{errors.genre}</p>
            </div>

            <div>
                <button type='submit' name='submit'>CREAR</button>
            </div>

        </form>
    )
}

export default FormCreate