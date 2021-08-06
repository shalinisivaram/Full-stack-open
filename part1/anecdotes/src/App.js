import './App.css';
import React,{useState} from 'react'

const Button = (props) => 
(<button onClick={props.handleclick}>{props.text}</button>)

const Anecdotes = (props)=>
(<div>
  <h1>{props.heading}</h1>
  <p>{props.text}</p>
  <p> has {props.votes} votes</p>
</div>)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected,setSelected]=useState(0)
  const [votes,setVotes] = useState(Array(7).fill(0))

  const handleVoteClick = ()=>{
    const newvotes = [...votes]
    newvotes[selected] += 1
    setVotes(newvotes)
  }

  const Randomanecdotes = () =>{
    const dotes = Math.floor(Math.random()*anecdotes.length);
    setSelected(dotes)
  }
  const maxAnecodotes = votes.indexOf(Math.max(...votes))

  return(
    <div>
      <Anecdotes heading='Anecdote of the Day' text={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleclick={Randomanecdotes} text='Next Anecdotes'/>
      <Button handleclick={handleVoteClick} text = 'Vote'/>
      <Anecdotes heading='Anecdote with more votes' text={anecdotes[maxAnecodotes]} votes={votes[maxAnecodotes]}/>

    </div>
  )
}

export default App;
