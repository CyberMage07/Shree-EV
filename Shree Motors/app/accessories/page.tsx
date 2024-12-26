'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const accessories = [
  { name: "Smart Helmet", price: "₹4,999", image: "/placeholder.svg?height=300&width=300" },
  { name: "Bluetooth Speaker", price: "₹2,999", image: "/placeholder.svg?height=300&width=300" },
  { name: "Phone Mount", price: "₹999", image: "/placeholder.svg?height=300&width=300" },
  { name: "Cargo Box", price: "₹5,999", image: "/placeholder.svg?height=300&width=300" },
  { name: "LED Lights Kit", price: "₹3,999", image: "/placeholder.svg?height=300&width=300" },
  { name: "Weather Cover", price: "₹1,999", image: "/placeholder.svg?height=300&width=300" },
]

export default function AccessoriesPage() {
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
            Smart Accessories
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Enhance your Shree Motors experience with our range of smart accessories.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessories.map((accessory, index) => (
              <motion.div
                key={accessory.name}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image
                  src={accessory.image}
                  alt={accessory.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{accessory.name}</h3>
                  <p className="text-gray-600 mb-4">{accessory.price}</p>
                  <motion.button
                    className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Accessories?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality", description: "All our accessories are made with premium materials for durability and performance." },
              { title: "Smart Integration", description: "Seamlessly integrate with your Shree Motors vehicle for enhanced functionality." },
              { title: "Warranty", description: "Enjoy peace of mind with our comprehensive warranty on all accessories." },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

