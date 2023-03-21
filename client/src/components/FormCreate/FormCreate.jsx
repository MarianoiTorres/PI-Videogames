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
            [event.target.name]: validation({ [event.target.name]: event.target.value })
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
                [event.target.name]: validation({ [event.target.name]: [...form[event.target.name], event.target.value] })
            })
        }
    }

    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)

    const submitHandler = (event) => {
        event.preventDefault()
        let err = []
        Object.values(errors).map((elemento) => {
            if (elemento !== '') {
                err.push(elemento)
            }

        })

        if (err.length === 0) {
            axios.post('http://localhost:3001/videogames', form)
                .then(res => {
                    alert(res)
                    setForm({
                        name: '',
                        description: '',
                        platform: [],
                        background_image: '',
                        released: '',
                        rating: '',
                        genre: []
                    })
                }
                )
                .catch(err => alert(err))
        }
        else {
            alert('necesita completar todos los campos')
        }

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
            [event.target.name]: validation({ [event.target.name]: form[event.target.name] })
        })
    }


    return (
        <div className={style.container}>
            <div className={style.containerForm}>

                <form className={style.form} onSubmit={submitHandler}>
                    <div>

                    </div>
                    <div className={style.divs}>
                        <div>
                            <input autoComplete="off" className={style.inputs} type="text" name='name' onChange={onChangeHandler} value={form.name} />
                            <p className={style.errores}>{errors.name}</p>
                        </div>
                        <label>Name:</label>
                    </div>

                    <div className={style.divs}>
                        <div>
                            <input placeholder='URL' className={style.inputs} type='url' name='background_image' onChange={onChangeHandler} value={form.background_image} />
                            <p className={style.errores}>{errors.background_image}</p>
                        </div>
                        <label>Image:</label>
                    </div>

                    <div className={style.divs}>
                        <div>
                            <textarea className={style.description} name="description" onChange={onChangeHandler} value={form.description}></textarea>
                            <p className={style.errores}>{errors.description}</p>
                        </div>
                        <label>Description:</label>
                    </div>

                    <div className={style.divs}>
                        <div>
                            <select className={style.selects} name='platform' onChange={genresAndPlatformsHandler}>
                                <option select disabled selected>Platforms</option>
                                {
                                    platforms.map(platform => {
                                        return <option name={platform} value={platform} >{platform}</option>
                                    })
                                }
                            </select>
                            <div className={style.contPlataformas}>
                                {
                                    form.platform.map(plat => {
                                        return <button className={style.plataformas} type='button' name='platform' value={plat} onClick={deleteHandler}>{plat}</button>
                                    })
                                }
                            </div>
                            <p className={style.errores}>{errors.platform}</p>
                        </div>
                        <label>Platforms:</label>
                    </div>

                    <div className={style.divs}>
                        <div>
                            <input className={style.released} type='date' name='released' onChange={onChangeHandler} value={form.released} />
                            <p className={style.errores}>{errors.released}</p>
                        </div>
                        <label>Released:</label>
                    </div>

                    <div className={style.divs}>
                        <div className={style.divRating}>
                            <input className={style.range} defaultValue='0' step='1' type="range" min='0' max='5' name='rating' onChange={onChangeHandler} value={form.rating} />
                            <p className={style.rating}>{form.rating}</p>
                            <p className={style.errores}>{errors.rating}</p>
                        </div>
                        <label>Rating:</label>
                    </div>

                    <div className={style.divs}>
                        <div>
                            <select className={style.selects} name='genre' onChange={genresAndPlatformsHandler}>
                                <option select disabled selected>Genres</option>
                                {
                                    genres.map(genre => {
                                        return <option name={genre} value={genre} >{genre}</option>
                                    })
                                }
                            </select>
                            <div className={style.contPlataformas} J>
                                {
                                    form.genre.map(gen => {
                                        return <button name='genre' value={gen} type='button' className={style.plataformas} onClick={deleteHandler}>{gen}</button>
                                    })
                                }
                            </div>
                            <p className={style.errores}>{errors.genre}</p>
                        </div>
                        <label>Genres: </label>
                    </div>

                    <div>
                        <button className={style.create} type='submit' name='submit'>CREATE</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default FormCreate