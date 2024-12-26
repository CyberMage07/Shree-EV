'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Vehicle {
  id: number
  x: number
  y: number
  type: 'polluting' | 'electric'
}

interface CitySimulationProps {
  onGameOver: (score: number) => void
}

const GAME_DURATION = 60 // seconds
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

export default function CitySimulation({ onGameOver }: CitySimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gameLoop = setInterval(() => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      drawCity(ctx)
      updateVehicles()
      drawVehicles(ctx)
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(gameLoop)
  }, [vehicles])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          onGameOver(score)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [score, onGameOver])

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      spawnVehicle()
    }, 2000)

    return () => clearInterval(spawnInterval)
  }, [])

  const drawCity = (ctx: CanvasRenderingContext2D) => {
    // Draw buildings
    ctx.fillStyle = '#cccccc'
    for (let i = 0; i < 10; i++) {
      ctx.fillRect(i * 80, CANVAS_HEIGHT - Math.random() * 200 - 100, 70, CANVAS_HEIGHT)
    }

    // Draw roads
    ctx.fillStyle = '#999999'
    ctx.fillRect(0, CANVAS_HEIGHT - 80, CANVAS_WIDTH, 80)
    ctx.fillRect(0, CANVAS_HEIGHT - 240, CANVAS_WIDTH, 80)
  }

  const spawnVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now(),
      x: Math.random() < 0.5 ? 0 : CANVAS_WIDTH,
      y: Math.random() < 0.5 ? CANVAS_HEIGHT - 60 : CANVAS_HEIGHT - 220,
      type: Math.random() < 0.7 ? 'polluting' : 'electric',
    }
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle])
  }

  const updateVehicles = () => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) => ({
        ...vehicle,
        x: vehicle.x + (vehicle.x < CANVAS_WIDTH / 2 ? 2 : -2),
      })).filter((vehicle) => vehicle.x > 0 && vehicle.x < CANVAS_WIDTH)
    )
  }

  const drawVehicles = (ctx: CanvasRenderingContext2D) => {
    vehicles.forEach((vehicle) => {
      ctx.fillStyle = vehicle.type === 'polluting' ? '#ff0000' : '#00ff00'
      ctx.fillRect(vehicle.x, vehicle.y, 40, 20)
    })
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) => {
        if (
          x >= vehicle.x &&
          x <= vehicle.x + 40 &&
          y >= vehicle.y &&
          y <= vehicle.y + 20 &&
          vehicle.type === 'polluting'
        ) {
          setScore((prevScore) => prevScore + 1)
          return { ...vehicle, type: 'electric' }
        }
        return vehicle
      })
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl">
        <span className="font-bold">Score:</span> {score} | <span className="font-bold">Time Left:</span> {timeLeft}s
      </div>
      <motion.canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-gray-300 cursor-pointer"
        onClick={handleCanvasClick}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <p className="mt-4 text-center text-gray-600">
        Click on polluting vehicles (red) to convert them to electric 3-wheelers (green)!
      </p>
    </div>
  )
}

