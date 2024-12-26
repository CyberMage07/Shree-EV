'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const products = [
  { id: 1, name: 'Eco Rider', description: 'Efficient and affordable electric 3-wheeler for urban commutes', price: 150000, image: '/placeholder.svg?height=300&width=300' },
  { id: 2, name: 'Luxury Glide', description: 'Premium electric 3-wheeler with advanced features and comfort', price: 250000, image: '/placeholder.svg?height=300&width=300' },
  { id: 3, name: 'Cargo Master', description: 'High-capacity electric 3-wheeler for commercial deliveries', price: 200000, image: '/placeholder.svg?height=300&width=300' },
]

export default function Products() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white pt-16">
      <section className="bg-gradient-to-br from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Electric 3-Wheelers
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our range of innovative and eco-friendly vehicles.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <Image src={product.image} alt={product.name} width={300} height={300} className="w-full" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 dark:text-green-400 font-bold">₹{product.price.toLocaleString()}</span>
                      <Link href={`/products/${product.name.toLowerCase().replace(' ', '-')}`}>
                        <Button>Learn More</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

