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
  const course = {
    name:'Half Stack application development',
    parts : [
      {
    name: 'Fundamentals of React',
    exercise: 10
},
  {
    name: 'Using props to pass data',
    exercise: 7
  },
  {
    name: 'State of a component',
    exercise: 14
  }]
}
  return(
    <div>
      <Header course = {course.name}/>
      <Content part1 = {course.parts[0].name} exercise1 = {course.parts[0].exercise}/>
      <Content part2 = {course.parts[1].name} exercise2 = {course.parts[1].exercise}/>
      <Content part3 = {course.parts[2].name} exercise3 = {course.parts[2].exercise}/>
      <Total exercise1 = {course.parts[0].exercise} exercise2 = {course.parts[1].exercise} exercise3={course.parts[2].exercise}/>
    </div>
    
  )
}

export default App;
