import { useState, useEffect } from 'react'
import axios from "axios"

const Find = ({searchWord, handleSearch})=>(
  <p>find countries <input value={searchWord} onChange={handleSearch}/></p>
)

const Display = ({country}) =>(
  <div>
  <h1>{country.name.common}</h1>
  <p>capital {country.capital}</p>
  <p>area {country.area}</p>
  <h2>languages:</h2>
  </div>
)

const Image = ({country}) =>(
  <img src={country.flags.png}/>
)

const Withbutton = ({country, handleClick}) =>(
  <div>
  <h4>{country.name.common} <button id={country.name.common} onClick={handleClick}>show</button></h4>
  </div>
)

const App = () => {
  const [searchWord, setSearchWord] = useState("")
  const [country, setCountry] = useState([])
  const names = country.map(record => record.name.common)

  const hook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response =>
        setCountry(response.data)
      )
  }

  useEffect(hook, [])
  console.log(country)

  const handleSearch = (event) =>{
    console.log(event.target.value)
    setSearchWord(event.target.value)
  }

  const handleClick = (event) =>{
    const id = event.target.id;
    setCountry(countryToShow.filter(country=>country.name.common===id))

    }

  const not_found = names.find(name => name.toLowerCase().includes(searchWord.toLowerCase()))=== undefined
  let countryToShow = not_found
  ?[]
  :country.filter(record=>record.name.common.toLowerCase().includes(searchWord.toLowerCase()))
  console.log(not_found)
  console.log(country.filter(record=>record.name.common.toLowerCase().includes(searchWord.toLowerCase())))

  if (searchWord === ""){
    return(
      <div>
      <Find searchWord={searchWord} handleSearch={handleSearch}/>
      </div>
    )
  } else if (countryToShow.length === 0){
    return (
      <div>
      <Find searchWord={searchWord} handleSearch={handleSearch}/>
      <p>no matches, please try again</p>
      </div>)

  } else if (countryToShow.length > 10){
    return (
    <div>
    <Find searchWord={searchWord} handleSearch={handleSearch}/>
    <h4>too many matches, specify another filter</h4>
    </div>)

  } else if (countryToShow.length > 1){
    return (
      <div>
      <Find searchWord={searchWord} handleSearch={handleSearch}/>
      {countryToShow.map(country=><Withbutton country={country} handleClick={handleClick}/>)}
      </div>)

  } else if (countryToShow.length === 1) {
    let langs = []
    for (const [key, value] of Object.entries(countryToShow[0].languages)){
      langs.push(value)
    }
    return (
        <div>
        <Find searchWord={searchWord} handleSearch={handleSearch}/>
        <Display country={countryToShow[0]}/>
        {langs.map(lang => <li>{lang}</li>)}
        <Image country={countryToShow[0]}/>
        </div>
      )
    }
}

export default App
