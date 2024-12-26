'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const appliances = [
  { name: 'LED Bulb', energyUsage: 10, cost: 20 },
  { name: 'Solar Panel', energyUsage: -50, cost: 200 },
  { name: 'Energy-efficient AC', energyUsage: 100, cost: 500 },
  { name: 'Smart Thermostat', energyUsage: -20, cost: 150 },
  { name: 'Electric Vehicle Charger', energyUsage: 50, cost: 300 },
]

export default function EnergyEfficiencyGame({ onClose }) {
  const [budget, setBudget] = useState(1000)
  const [energyUsage, setEnergyUsage] = useState(500)
  const [installedAppliances, setInstalledAppliances] = useState([])
  const [day, setDay] = useState(1)

  const installAppliance = (appliance) => {
    if (budget >= appliance.cost) {
      setInstalledAppliances([...installedAppliances, appliance])
      setBudget(budget - appliance.cost)
      setEnergyUsage(energyUsage + appliance.energyUsage)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setDay(prevDay => prevDay + 1)
      setBudget(prevBudget => prevBudget + 100)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-auto">
        <h2 className="text-3xl font-bold mb-4">Energy Efficiency Challenge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Home Stats</h3>
            <p>Day: {day}</p>
            <p>Budget: ${budget}</p>
            <p>Energy Usage: {energyUsage} kWh/day</p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Install Appliances:</h4>
              {appliances.map((appliance, index) => (
                <button
                  key={index}
                  onClick={() => installAppliance(appliance)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2 transition-colors duration-200"
                  disabled={budget < appliance.cost}
                >
                  {appliance.name} (${appliance.cost})
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Installed Appliances</h3>
            <ul>
              {installedAppliances.map((appliance, index) => (
                <li key={index} className="mb-2">
                  {appliance.name} - Energy Impact: {appliance.energyUsage} kWh/day
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Close Game
          </button>
        </div>
      </div>
    </motion.div>
  )
}

