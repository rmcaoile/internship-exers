import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import './App.css'


function App() {
  const [result, setResult] = useState([]);
  const [city, setCity] = useState("manila")  
  const [input, setInput] = useState("manila");

  useEffect(() => { 
    getData();
  }, [city]);

  const getData = async()=>{
    try {
      const response = await axios.get(`https://goweather.herokuapp.com/weather/${city}`);
      setResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  }

  const handleSearch = () => {
    setCity(input); 
    getData();
  };

  return (
    <div className='-mt-15'>
      <div className="mt-4 mb-10 relative w-128">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search weather of a City"
          className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <h1 className="text-3xl font-bold">
        Weather in {city}
      </h1>
      <div className="mt-4 text-xl">
        <p><strong>Temperature:</strong> {result.temperature}</p>
        <p><strong>Wind:</strong> {result.wind}</p>
        <p><strong>Description:</strong> {result.description}</p>
      </div>
    </div>
  );
}

export default App
