'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface TeamMemberProps {
  name: string
  role: string
  image: string
}

export default function TeamMember({ name, role, image }: TeamMemberProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden text-center"
    >
      <Image src={image} alt={name} width={300} height={300} className="w-full" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    </motion.div>
  )
}

