'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SustainabilityGame from '../components/SustainabilityGame'
import { Car, Battery, Factory } from 'lucide-react'

export default function Sustainability() {
  const [showGame, setShowGame] = useState(false)

  const stats = [
    { label: 'CO2 Reduction', value: '500,000 kg', description: 'Annual CO2 emissions reduced by our fleet' },
    { label: 'Trees Saved', value: '25,000', description: 'Equivalent number of trees saved annually' },
    { label: 'Energy Saved', value: '2 Million kWh', description: 'Annual energy savings compared to traditional vehicles' },
    { label: 'Noise Reduction', value: '70%', description: 'Reduction in noise pollution in urban areas' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Sustainability at Shree Motors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
            <p className="text-gray-600 mb-4">
              At Shree Motors, sustainability is not just a buzzword - it's the core of our business. We are committed to revolutionizing urban transportation by providing eco-friendly electric 3-wheelers that significantly reduce carbon emissions and noise pollution.
            </p>
            <p className="text-gray-600 mb-4">
              Our vehicles are designed with the environment in mind, from the materials we use in production to the energy-efficient batteries that power them. By choosing Shree Motors, you're not just choosing a vehicle - you're choosing a cleaner, greener future for our cities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold text-green-600">{stat.label}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Experience the Impact</h2>
          <p className="text-gray-600 mb-8">
            Want to see how our electric 3-wheelers can impact the environment? Try our interactive EV vs CO2 Challenge and navigate through a city while avoiding harmful emissions!
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="flex items-center">
              <Car className="w-6 h-6 mr-2 text-green-500" />
              <span>EV</span>
            </div>
            <div className="flex items-center">
              <Factory className="w-6 h-6 mr-2 text-red-500" />
              <span>CO2</span>
            </div>
            <div className="flex items-center">
              <Battery className="w-6 h-6 mr-2 text-yellow-500" />
              <span>Battery</span>
            </div>
          </div>
          <button
            onClick={() => setShowGame(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Play EV vs CO2 Challenge
          </button>
        </div>
        {showGame && <SustainabilityGame onClose={() => setShowGame(false)} />}
      </div>
    </div>
  )
}

