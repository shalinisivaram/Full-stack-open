import { createAnecode } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const AnecodeForm =() => {
    const dispatch = useDispatch()

    const addAnecode = (event) => {
        event.preventDefault()
        const newAnecode = event.target.anecode.value
        event.target.anecode.value = ''
        dispatch(createAnecode(newAnecode))
      }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecode}>
            <div><input name="anecode"/></div>
            <button>create</button>
            </form>
        </div>
        
    )
}

export default AnecodeForm