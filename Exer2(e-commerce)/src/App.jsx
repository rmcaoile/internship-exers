import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://fakestoreapi.com/products')
      setProducts(response.data)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-15 text-center">E-Commerce</h1>

      {loading ? (
        <div className="text-blue-500 text-center">Loading products...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg bg-white">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
              <h2 className="text-lg font-semibold text-black">{product.title}</h2>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-500">Category: {product.category}</p>
              <p className="text-green-600 font-medium">Rating: {product.rating.rate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
