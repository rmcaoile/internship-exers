import { useState, useEffect } from "react"
import axios from "axios"

import { Card, CardContent, CardTitle } from "@/components/components/ui/card"
import { Skeleton } from "@/components/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/components/ui/dialog"

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get("https://fakestoreapi.com/products")
      setProducts(response.data)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products.")
    } finally {
      setLoading(false)
    }
  }

  const openModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 px-20">
      <h1 className="text-3xl font-bold mb-10 text-center">E-Commerce</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="w-full h-48 mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-1" />
              <Skeleton className="h-4 w-1/4" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              onClick={() => openModal(product)}
              className="hover:shadow-md transition-shadow bg-white cursor-pointer pt-5 pb-2"
            >
              <CardContent className="p-4 space-y-2 text-black">
                <img src={product.image} alt={product.title} className="w-full h-48 object-contain" />
                <CardTitle className="text-base mt-5">{product.title}</CardTitle>
                <p className="text-sm text-muted-foreground">Price: ${product.price}</p>
                <p className="text-sm text-muted-foreground">Category: {product.category}</p>
                <p className="text-sm text-green-600 font-medium">Rating: {product.rating.rate}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white text-black">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.title}</DialogTitle>
              </DialogHeader>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-48 object-contain mt-5 mb-4"
              />
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Rating:</strong> {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Available Stock:</strong> {selectedProduct.rating.count}</p>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default App
