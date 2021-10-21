import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Vote } from '../reducers/anecdoteReducer'


const Anecode = ({anecdote}) => {
    const dispatch = useDispatch()
    const voteHandler = () => {
        dispatch(Vote(anecdote))
        dispatch(setNotification(`you voted for ${anecdote.content}`,5))
    }
    
    return (
        <div>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
        <button onClick={voteHandler}>vote</button>
        </div>
        </div>
        
    )
}

const AnecodeList = () =>{
    const anecodes = useSelector(({filter,anecodes}) => {
        if(filter === null){
            return anecodes
        }
        const search = new RegExp(filter,'i')
        return anecodes.filter(anecdote => anecdote.content.match(search))
    })

    const sortByVote = (a,b) => b.votes - a.votes
    return (
        <div>
          <h2>Anecdotes</h2>
          {anecodes.sort(sortByVote).map(anecdote =>
            <Anecode key={anecdote.id} anecdote={anecdote}/>
          )}
        </div>
      )    
}

export default AnecodeList