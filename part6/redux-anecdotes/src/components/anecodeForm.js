import { createAnecode } from "../reducers/anecdoteReducer"
//import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecodeForm =(props) => {
    //const dispatch = useDispatch()

    const addAnecode = async(event) => {
        event.preventDefault()
        const content = event.target.anecode.value
        event.target.anecode.value = ''
        props.createAnecode(content)
        props.setNotification(`Anecode ${content} is added successfully`,5)
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
const mapDispatchToProps = {
    createAnecode,
    setNotification
  }

export default connect (null,mapDispatchToProps) (AnecodeForm)