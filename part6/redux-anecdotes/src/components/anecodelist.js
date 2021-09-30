
import { useSelector, useDispatch } from 'react-redux'
import { Vote } from '../reducers/anecdoteReducer'

const AnecodeList = () =>{
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const sortByVote = (a,b) => b.votes - a.votes
    return (
        <div>
          <h2>Anecdotes</h2>
          {anecdotes.sort(sortByVote).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(Vote(anecdote.id))}>vote</button>
              </div>
            </div>
          )}
        </div>
      )    
}

export default AnecodeList