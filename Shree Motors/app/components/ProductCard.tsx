'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: {
    name: string
    description: string
    price: number
    image: string
  }
  onCustomize: () => void
}

export default function ProductCard({ product, onCustomize }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Image src={product.image} alt={product.name} width={300} height={300} className="w-full" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold">₹{product.price.toLocaleString()}</span>
          <Button onClick={onCustomize}>Customize</Button>
        </div>
      </div>
    </motion.div>
  )
}

