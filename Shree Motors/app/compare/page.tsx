'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const products = [
  {
    name: "Eco Rider",
    image: "/placeholder.svg?height=300&width=300",
    specs: {
      range: "100 km",
      topSpeed: "40 km/h",
      chargingTime: "4 hours",
      payloadCapacity: "300 kg",
    },
  },
  {
    name: "Cargo Master",
    image: "/placeholder.svg?height=300&width=300",
    specs: {
      range: "120 km",
      topSpeed: "45 km/h",
      chargingTime: "5 hours",
      payloadCapacity: "500 kg",
    },
  },
  {
    name: "Luxury Glide",
    image: "/placeholder.svg?height=300&width=300",
    specs: {
      range: "150 km",
      topSpeed: "50 km/h",
      chargingTime: "3 hours",
      payloadCapacity: "250 kg",
    },
  },
]

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState(products.slice(0, 2))

  const handleProductChange = (index: number, productName: string) => {
    const newSelectedProducts = [...selectedProducts]
    newSelectedProducts[index] = products.find(p => p.name === productName) || newSelectedProducts[index]
    setSelectedProducts(newSelectedProducts)
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-lime-300 via-green-400 to-green-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Compare Models
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Compare our electric 3-wheeler models side by side.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8">
            {selectedProducts.map((product, index) => (
              <div key={index} className="space-y-4">
                <select
                  className="w-full p-2 border rounded"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                >
                  {products.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="mt-12">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Specification</th>
                  {selectedProducts.map((product, index) => (
                    <th key={index} className="p-2 text-left">{product.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedProducts[0].specs).map((spec) => (
                  <tr key={spec} className="border-b">
                    <td className="p-2 font-semibold">{spec.charAt(0).toUpperCase() + spec.slice(1)}</td>
                    {selectedProducts.map((product, index) => (
                      <td key={index} className="p-2">{product.specs[spec]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

