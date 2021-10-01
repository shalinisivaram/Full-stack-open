import { createAnecode } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const AnecodeForm =() => {
    const dispatch = useDispatch()

    const addAnecode = (event) => {
        event.preventDefault()
        const newAnecode = event.target.anecode.value
        event.target.anecode.value = ''
        dispatch(createAnecode(newAnecode))
        dispatch(setNotification(`Anecode ${newAnecode} is added successfully`))
        setTimeout(() => {
            dispatch(setNotification(null))
        },2000)
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