import anecdoteService from "../services/anecdotes"

const anecodeReducer = (state = [], action) => {  
  switch(action.type){
    case 'NEW_ANECODE':
      return [...state,action.data]
    case 'INIT_ANECODE':
      return action.data
    case 'ADD_VOTE':
      const id = action.data.id
      const updatedAnecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...updatedAnecdote,
        votes: updatedAnecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
  default: 
       return state
}
}

export const createAnecode = (content) =>{
  return async dispatch => {
    const newAnecode = await anecdoteService.createNew(content)
    dispatch({
      type:'NEW_ANECODE',
      data:newAnecode
    }) 
  }
}

export const intialAnecode = () => {
  return async dispatch => {
    const anecodes = await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECODE',
      data:anecodes
    }) 
  }
}

export const Vote = anecode => {
  return async dispatch => {
    const newVote = await anecdoteService.update({...anecode,votes : anecode.votes+1})
    dispatch({
      type:'ADD_VOTE',
      data:newVote
    })
  }
}


export default anecodeReducer