import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [result, setResult] = useState([]);
  const [city, setCity] = useState("manila")

  useEffect(() => { 
    getData();
  }, []);

  const getData = async()=>{
    try {
      const response = await axios.get(`https://goweather.herokuapp.com/weather/${city}`);
      setResult(response.data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">
        Weather in {city}
      </h1>
      <div></div>
      <div className="mt-4 text-xl">
        <p><strong>Temperature:</strong> {result.temperature}</p>
        <p><strong>Wind:</strong> {result.wind}</p>
        <p><strong>Description:</strong> {result.description}</p>
      </div>
    </>
  );
}

export default App
