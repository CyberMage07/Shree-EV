'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const colors = ['White', 'Black', 'Green', 'Blue', 'Red']
const sizes = ['S', 'M', 'L', 'XL']

export default function ProductCustomizer() {
  const [color, setColor] = useState('White')
  const [size, setSize] = useState('M')

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <motion.div
        animate={{ backgroundColor: color.toLowerCase() }}
        className="w-64 h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center"
      >
        <span className="text-4xl" style={{ color: color === 'White' ? 'black' : 'white' }}>
          Eco Tee
        </span>
      </motion.div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <Select onValueChange={(value) => setColor(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
          <Select onValueChange={(value) => setSize(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button>Add Customized Tee to Cart</Button>
      </div>
    </div>
  )
}

