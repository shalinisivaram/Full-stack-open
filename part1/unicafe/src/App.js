import React, { useState } from 'react';
import './App.css';

const Button = (props) => <button onClick = {props.handleClick}>{props.text}</button>

const Display = (props) => {
  if(props.all.length === 0){
    return(
    <p>No Feedback Given</p>
  )}
  
  return(
      <div>
          <h2>Statistics</h2>
          <StatisticLine name='Good' value={props.good}/>
          <StatisticLine name='neutral' value= {props.neutral} />
          <StatisticLine name='Bad' value={props.bad}/>
          <StatisticLine name='All' value= {props.all} />
          <StatisticLine name='Average' value={props.all/3} />
          <StatisticLine name='Positive' value={props.good/props.all*100} />
      </div>
          )
    }
    


const StatisticLine = (props) =>{
    return(
          <tr>
          <td> {props.name}  </td> 
          <td> : {props.value} </td> <br/> <br/>
          </tr>
    
  )
}

const App = () => {
  const[good,setGood] = useState(0)
  const[neutral,setNeutral] = useState(0)
  const[bad,setBad] = useState(0)
  const[all,setAll] = useState(0)
  const goodClicks = () =>{
    setGood(good+1)
    setAll(all+1) 

  } 
  const neutralClicks = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const badClicks = () => {
    setBad(bad+1)
    setAll(all+1)
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick = {goodClicks} text='Good'/> &nbsp;
      <Button handleClick = {neutralClicks} text='Neutral'/> &nbsp;
      <Button handleClick = {badClicks} text='Bad'/>
      <Display good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

export default App;
