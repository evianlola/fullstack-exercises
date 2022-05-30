----------------------#index.js-------------------
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')).render(<App />)


------------------#app.js---------------------------
import { useState } from 'react'

const StatisticLine = (props) => (
  <tr>
  <td>{props.text}</td>
  <td>{props.value}</td>
  </tr>
  )


const Statistics = (props) =>{
  return (
    <table>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value ={props.all} />
    <StatisticLine text="average" value ={props.all/(props.bad + props.good + props.neutral)} />
    <StatisticLine text="positive" value ={props.good/(props.bad + props.good + props.neutral) * 100 + "%"}/>
    </table>
  )
}

const History = (props) =>{
  if (props.good + props.bad + props.neutral === 0){
    return (
      <div>
       <p></p>
        <h3>No feedback given</h3>
      </div>
    )
  }
  return (
    <div>
    <h1>statistics</h1>
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad} all={props.all}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const handleGood = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setAll(all)
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setAll(all - 1)
    setBad(bad + 1)
  }



  return (
    <div>
    <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <History good={good} bad={bad} all={all} neutral={neutral}/>

    </div>

  )
}

export default App
