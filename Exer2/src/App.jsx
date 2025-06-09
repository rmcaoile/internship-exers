import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import './App.css'


function App() {
  const [result, setResult] = useState([]);
  const [city, setCity] = useState("manila")  
  const [input, setInput] = useState("manila");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    getData();
  }, [city]);

  const getData = async()=>{
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://goweather.herokuapp.com/weather/${city}`);
      const data = response.data;

      // Check if response has valid content
      if (!data || !data.temperature || !data.wind || !data.description) {
        setError("Weather data is incomplete or unavailable for this city.");
        setResult(null);
      } else {
        setResult(data);
        console.log(response.data);
      }
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
      setResult(null);

    } finally {
      setLoading(false);  
    }
  }

  const handleSearch = () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      setError("Please enter a city name.");
      setResult(null);
      return;
    }
    setCity(trimmed); 
  };

  return (
    <div className='-mt-25'>
      
      <div className="mt-4 mb-10 relative w-128">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search weather of a City"
          className={`pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 ${
                      error ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
                    }`}
        />
      </div>

      <h1 className="text-3xl font-bold">
        Weather in {city}
      </h1>
      
      {loading ? (
        <div className="mt-4 text-blue-500 font-medium">
          Loading weather data...
        </div>
      ) : error ? (
        <div className="mt-4 text-red-500 font-semibold">
          {error}
        </div>
      ) : result ? (
          <div className="flex justify-center items-center">
            <div className="mt-4 px-6 py-3 max-w-md w-full text-xl ">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="font-bold">Temperature:</span>
                  <span>{result.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Wind:</span>
                  <span>{result.wind}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Description:</span>
                  <span>{result.description}</span>
                </div>
              </div>
            </div>
          </div>

      ) : null}
    </div>
  );
}

export default App
