import React from 'react'
import AnecodeForm from './components/anecodeForm'
import AnecodeList from './components/anecodelist'
import Filter from './components/filter'

const App = () => {
  return(
    <div>
        <AnecodeForm/>
        <Filter/>
        <AnecodeList/>

    </div>
    
  )
  }

export default App