import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import Notification from './components/Notification'

ReactDOM.render(
  <Provider store={store}>
    <Notification />
    <App />
  
  </Provider>,
  document.getElementById('root')
)