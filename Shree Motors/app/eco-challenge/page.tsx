'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CitySimulation from '../components/CitySimulation'

export default function EcoChallenge() {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [discountCode, setDiscountCode] = useState('')

  useEffect(() => {
    if (gameOver) {
      const code = generateDiscountCode(score)
      setDiscountCode(code)
    }
  }, [gameOver, score])

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore)
    setGameOver(true)
  }

  const generateDiscountCode = (score: number) => {
    const baseDiscount = Math.min(Math.floor(score / 100), 20) // Max 20% discount
    return `ECO${baseDiscount}OFF${Math.random().toString(36).substr(2, 5).toUpperCase()}`
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Eco-Friendly Challenge
        </motion.h1>
        <motion.p 
          className="text-center text-xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Replace polluting vehicles with electric 3-wheelers and see your environmental impact!
        </motion.p>
        <CitySimulation onGameOver={handleGameOver} />
        {gameOver && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-4">Your final score: {score}</p>
            <p className="text-lg mb-4">CO₂ Emissions Reduced: {score * 10} kg</p>
            <p className="text-lg mb-4">Trees Saved: {Math.floor(score / 10)}</p>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Congratulations!</strong>
              <span className="block sm:inline"> Use this discount code on your next purchase: </span>
              <p className="text-2xl font-bold mt-2">{discountCode}</p>
            </div>
            <motion.button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

