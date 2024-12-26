'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProductHighlightProps {
  name: string
  description: string
  image: string
}

export default function ProductHighlight({ name, description, image }: ProductHighlightProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Image src={image} alt={name} width={300} height={300} className="w-full" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

