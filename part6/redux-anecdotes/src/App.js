import React,{ useEffect} from 'react'
import AnecodeForm from './components/anecodeForm'
import AnecodeList from './components/anecodelist'
import Filter from './components/filter'
import { intialAnecode } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(intialAnecode())
  },[dispatch])

  return(
    <div>
        <AnecodeForm/>
        <Filter/>
        <AnecodeList/>

    </div>
    
  )
  }

export default App