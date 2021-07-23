//import logo from './logo.svg';
//import './App.css';

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) =>(
  <div>
    <h4>
    <p>{props.part1}  {props.exercise1}</p>
    <p>{props.part2}  {props.exercise2}</p>
    <p>{props.part3}  {props.exercise3}</p>
    </h4>
  </div>
)

const Total = (props) =>(
  <h1>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</h1>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14
  return(
    <div>
      <Header course = {course}/>
      <Content part1 = {part1} exercise1 = {exercise1}/>
      <Content part2 = {part2} exercise2 = {exercise2}/>
      <Content part3 = {part3} exercise3 = {exercise3}/>
      <Total exercise1 = {exercise1} exercise2 = {exercise2} exercise3={exercise3}/>
    </div>
    
  )
}

export default App;
