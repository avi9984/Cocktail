import React, { useEffect } from "react";
import { useState,useCallback } from "react";
import axios from 'axios'
const App = () => {
  const [loading, setLoading]=useState(false)
  const [data, setData]=useState([])
  
  const url='https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'

  const fetchCocktailHandler=useCallback(()=>{
        setLoading(true)
        axios.get(url).then(res=>{
          console.log(res.data)
          setData(res.data.drinks)
        }).catch(err=>console.log(err))
        .finally(()=>setLoading(false))
  },[])


  useEffect(()=>{
    fetchCocktailHandler()
  },[fetchCocktailHandler])
   
  if(loading){
    return <h2>loading....</h2>
  }
  return (
    
    <div className="App">
      {data.map((cocktail)=>{
        <div key={cocktail.idDrink}>
          <h2>{cocktail.strDrink}</h2>
          <img src={cocktail.strDrinkThumb} alt="#"/>
          <button onClick={fetchCocktailHandler}>Get another cocktail</button>
        </div>
      })}
    </div>
  )
}

export default App
