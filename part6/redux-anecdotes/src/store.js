import { createStore,combineReducers, applyMiddleware } from 'redux'
import anecodeReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk" 
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    notification:notificationReducer,
    anecodes:anecodeReducer,
    filter:filterReducer
  })
  
  const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

export default store