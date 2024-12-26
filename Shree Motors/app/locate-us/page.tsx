'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
]

export default function LocateUsPage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai")

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
            Locate Us
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find Shree Motors dealerships and service centers near you.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Select a City</h2>
              <div className="space-y-2">
                {cities.map((city) => (
                  <motion.button
                    key={city}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      selectedCity === city ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCity(city)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {city}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Dealerships in {selectedCity}</h2>
              <div className="bg-gray-100 h-96 rounded-lg mb-8">
                {/* Placeholder for an interactive map */}
                <p className="text-gray-500 h-full flex items-center justify-center">Interactive Map Placeholder</p>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold mb-2">Shree Motors {selectedCity} - {index}</h3>
                    <p className="text-gray-600 mb-2">123 Example Street, {selectedCity}, 400001</p>
                    <p className="text-gray-600">Phone: +91 1234567890</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

