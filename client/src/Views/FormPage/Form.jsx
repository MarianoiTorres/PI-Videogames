import FormCreate from "../../components/FormCreate/FormCreate"
import style from './Form.module.css'

const Form = () => {
    return (
        <div>
            <h2 className={style.title}>Create a game</h2>
            <FormCreate />
        </div>
    )
}

export default Form