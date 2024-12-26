'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

const products = {
  'eco-rider': {
    name: "Eco Rider",
    description: "Efficient and affordable electric 3-wheeler for urban commutes",
    price: 150000,
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Range: 100 km on a single charge",
      "Top speed: 40 km/h",
      "Charging time: 4 hours",
      "Payload capacity: 300 kg",
    ],
  },
  'cargo-master': {
    name: "Cargo Master",
    description: "High-capacity electric 3-wheeler for commercial deliveries",
    price: 200000,
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Range: 120 km on a single charge",
      "Top speed: 45 km/h",
      "Charging time: 5 hours",
      "Payload capacity: 500 kg",
    ],
  },
  'luxury-glide': {
    name: "Luxury Glide",
    description: "Premium electric 3-wheeler with advanced features and comfort",
    price: 250000,
    image: "/placeholder.svg?height=600&width=800",
    features: [
      "Range: 150 km on a single charge",
      "Top speed: 50 km/h",
      "Charging time: 3 hours",
      "Advanced comfort features",
    ],
  },
}

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = products[slug]

  if (!product) {
    return <div className="text-center py-20">Product not found</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="bg-gradient-to-br from-lime-300 via-green-400 to-green-500 dark:from-green-800 dark:via-green-700 dark:to-green-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.name}
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.description}
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-muted-foreground"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <p className="text-2xl font-bold mt-8">Price: ₹{product.price.toLocaleString()}</p>
              <Button
                className="mt-6"
              >
                Book a Test Ride
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

