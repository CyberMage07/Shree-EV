'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Battery, Factory } from 'lucide-react'

const CELL_SIZE = 30
const WALL_COLOR = '#0000FF'

const GRID = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

interface Position {
  x: number
  y: number
}

const SustainabilityGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [player, setPlayer] = useState<Position>({ x: 1, y: 1 })
  const [co2Emissions, setCo2Emissions] = useState<Position[]>([
    { x: 13, y: 1 },
    { x: 13, y: 7 },
  ])
  const [collectibles, setCollectibles] = useState<Position[]>([
    { x: 3, y: 1 }, { x: 7, y: 1 }, { x: 11, y: 1 },
    { x: 3, y: 3 }, { x: 7, y: 3 }, { x: 11, y: 3 },
    { x: 3, y: 5 }, { x: 7, y: 5 }, { x: 11, y: 5 },
    { x: 3, y: 7 }, { x: 7, y: 7 }, { x: 11, y: 7 },
  ])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const resetGame = () => {
    setPlayer({ x: 1, y: 1 })
    setCo2Emissions([
      { x: 13, y: 1 },
      { x: 13, y: 7 },
    ])
    setCollectibles([
      { x: 3, y: 1 }, { x: 7, y: 1 }, { x: 11, y: 1 },
      { x: 3, y: 3 }, { x: 7, y: 3 }, { x: 11, y: 3 },
      { x: 3, y: 5 }, { x: 7, y: 5 }, { x: 11, y: 5 },
      { x: 3, y: 7 }, { x: 7, y: 7 }, { x: 11, y: 7 },
    ])
    setScore(0)
    setGameOver(false)
    setGameWon(false)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw walls
      ctx.fillStyle = WALL_COLOR
      GRID.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell === 1) {
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          }
        })
      })

      // Draw player (EV)
      ctx.save()
      ctx.translate(player.x * CELL_SIZE + CELL_SIZE / 2, player.y * CELL_SIZE + CELL_SIZE / 2)
      ctx.scale(0.05, 0.05)
      ctx.fillStyle = '#00FF00'
      new Path2D(Car.toString()).forEach((path) => ctx.fill(path))
      ctx.restore()

      // Draw CO2 emissions
      co2Emissions.forEach((emission) => {
        ctx.save()
        ctx.translate(emission.x * CELL_SIZE + CELL_SIZE / 2, emission.y * CELL_SIZE + CELL_SIZE / 2)
        ctx.scale(0.05, 0.05)
        ctx.fillStyle = '#FF0000'
        new Path2D(Factory.toString()).forEach((path) => ctx.fill(path))
        ctx.restore()
      })

      // Draw collectibles (batteries)
      collectibles.forEach((collectible) => {
        ctx.save()
        ctx.translate(collectible.x * CELL_SIZE + CELL_SIZE / 2, collectible.y * CELL_SIZE + CELL_SIZE / 2)
        ctx.scale(0.05, 0.05)
        ctx.fillStyle = '#FFFF00'
        new Path2D(Battery.toString()).forEach((path) => ctx.fill(path))
        ctx.restore()
      })
    }

    drawGame()
  }, [player, co2Emissions, collectibles])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || gameWon) return

      const newPlayer = { ...player }

      switch (e.key) {
        case 'ArrowUp':
          newPlayer.y -= 1
          break
        case 'ArrowDown':
          newPlayer.y += 1
          break
        case 'ArrowLeft':
          newPlayer.x -= 1
          break
        case 'ArrowRight':
          newPlayer.x += 1
          break
      }

      if (GRID[newPlayer.y][newPlayer.x] === 0) {
        setPlayer(newPlayer)

        // Check for collectibles
        const collectibleIndex = collectibles.findIndex(
          (c) => c.x === newPlayer.x && c.y === newPlayer.y
        )
        if (collectibleIndex !== -1) {
          setCollectibles(collectibles.filter((_, i) => i !== collectibleIndex))
          setScore(score + 10)

          // Check if all collectibles are collected
          if (collectibles.length === 1) {
            setGameWon(true)
          }
        }

        // Check for CO2 emissions
        if (co2Emissions.some((e) => e.x === newPlayer.x && e.y === newPlayer.y)) {
          setGameOver(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [player, collectibles, co2Emissions, score, gameOver, gameWon])

  useEffect(() => {
    if (gameOver || gameWon) return

    const moveEmissions = () => {
      setCo2Emissions(co2Emissions.map((emission) => {
        const directions = [
          { x: 0, y: -1 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 1, y: 0 },
        ]

        const validMoves = directions.filter(
          (dir) => GRID[emission.y + dir.y][emission.x + dir.x] === 0
        )

        if (validMoves.length > 0) {
          const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
          return {
            x: emission.x + randomMove.x,
            y: emission.y + randomMove.y,
          }
        }

        return emission
      }))
    }

    const gameLoop = setInterval(() => {
      moveEmissions()
    }, 500)

    return () => clearInterval(gameLoop)
  }, [co2Emissions, gameOver, gameWon])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-4">EV vs CO2 Challenge</h2>
        <div className="mb-4">
          <p>Score: {score}</p>
          <p>Batteries left: {collectibles.length}</p>
        </div>
        <canvas
          ref={canvasRef}
          width={GRID[0].length * CELL_SIZE}
          height={GRID.length * CELL_SIZE}
          className="border border-gray-300 mb-4"
        />
        {gameOver && (
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-red-600">Game Over!</h3>
            <p>Your EV got caught by CO2 emissions.</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mt-2"
            >
              Try Again
            </button>
          </div>
        )}
        {gameWon && (
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-green-600">Congratulations!</h3>
            <p>You've collected all the batteries and won the game!</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mt-2"
            >
              Play Again
            </button>
          </div>
        )}
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Close Game
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default SustainabilityGame

