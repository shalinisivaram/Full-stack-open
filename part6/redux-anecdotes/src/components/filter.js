
import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
    //const dispatch = useDispatch()
    const handleChange = (event) => {
        props.filterChange(event.target.value)
    }
    return ( 
       <div>
        Filter <input type="text" onChange={handleChange}/>
       </div> 
    )
}

const mapDispatchToProps = {
    filterChange
}

export default connect(null,mapDispatchToProps) (Filter)