import loading from '../../img/loading.gif'
import style from './Loading.module.css'

const Loading = () => {
    return (
        <div className={style.container}>
            <div className={style.containerImage}>
                <img className={style.image} src={loading} alt="" />
            </div>
        </div>
    )
}

export default Loading