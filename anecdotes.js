
-------------#index.js-------------

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')).render(<App />)




-------------#app.js-------------
import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0})

  const get_random = () => {
    const number = Math.floor(Math.random() * 7)
    setSelected(number)
  }

  const copy = {...vote}
  const get_vote = () => {
    copy[selected] += 1
    setVote(copy)
    }

  let maxKey, maxValue = 0;
  for (const [key, value] of Object.entries(vote)){
    if (value > maxValue){
      maxValue = value;
      maxKey = key
    }
    }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button handleClick={get_vote} text="vote"/><Button handleClick={get_random} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxKey]}</p>
      <p>has {maxValue} votes</p>
    </div>
  )
}

export default App
