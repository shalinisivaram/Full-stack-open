import React,{useState} from "react"

const Togglable = (props,ref) =>{
    const [Visible,setVisible] = useState(false)
    const hideWhenVisible = {display: Visible?'none':''}
    const showWhenVisible = {display: Visible?'':'none'}

    const toggleVisibility = () =>{
        setVisible(!Visible)
    }

    return(
        <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        
        <div style={showWhenVisible}>
          {props.children}   
        <button onClick={toggleVisibility}>Cancel</button>
        </div>
        </div>
      )
}

export default Togglable;