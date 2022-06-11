import { useState, useEffect } from 'react'
import axios from "axios"
import all_func from "./services/functions"
import './index.css'


const Filter = ({showAll, handleSearch}) =>(
  <p>filter shown with <input value={showAll} onChange={handleSearch}/></p>
)

const PersonForm = ({addPerson, newName, handleName, newNumber, handleNumber}) => (
  <form onSubmit={addPerson}>
    <div>
      <p>name: <input value={newName} onChange={handleName}/></p>
      <p>number: <input value={newNumber} onChange={handleNumber}/></p>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Confirmation = ({message}) => {
  if (message === null){
    return null
  }
  return (
    <div className="confirm">
    {message}
    </div>
  )
}

const Errormessage = ({message}) => {
  if (message === null){
    return null
  }
  return (
    <div className="error">
    {message}
    </div>
  )
}



const Persons = ({person, func}) => (
    <p key={person.id}>{person.name} {person.number} <button onClick={()=>func(person.id)}>delete</button></p>
  )

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      number: "040-1234567"}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState("")
  const [confirmMessage, setConfirmMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const copy = persons.map(record => record.name)

  useEffect(()=>{
    all_func
    .getAll()
    .then(initialPerson => {
      setPersons(initialPerson)
    })
  }, [])


  const delete_ = (id) =>{
    if (window.confirm(`Delete ${(persons.filter(person => person.id===id))[0].name}?`)){
      all_func
      .erase(id)
      .then(returnedPerson => setPersons(persons.filter(person => person.id != id)))
    }
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
      }

    if (copy.includes(newObject.name)){
      const target_id = (persons.filter(person => person.name === newObject.name))[0].id
      if (window.confirm(`${newObject.name} is already added to phonebook,replace the old number with the new one?`)){
          all_func
          .update(target_id, newObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== target_id? person:returnedPerson))
          })
          .catch(error =>{
            setErrorMessage(`information of ${newObject.name} has already been removed from server`)
            setConfirmMessage(null)
            setTimeout(()=>{setErrorMessage(null)}, 5000)
          })
        }
    }
    else{
      all_func
      .create(newObject)
      .then(returnedPerson => {setPersons(persons.concat(returnedPerson))})
    }
    setConfirmMessage(`Added ${newObject.name}`)
    setTimeout(()=>{
      setConfirmMessage(null)
    }, 5000)
    setNewName("")
    setNewNumber("")

  }

  const handleName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) =>{
    console.log(event.target.value)
    setShowAll(event.target.value)
  }


// verify if the name exists in copy
  const searchWord = copy.find(element=> element.toLowerCase().includes(showAll.toLowerCase())) === -1

  let personToShow = searchWord
  ?persons
  :persons.filter(element=>element.name.toLowerCase().includes(showAll.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Confirmation message={confirmMessage}/>
      <Errormessage message={errorMessage}/>

      <Filter showAll={showAll} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      {personToShow.map(person => <Persons key={person.number} person={person} func={delete_}/>)}
    </div>
  )
}

export default App
