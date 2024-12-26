'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface ComparisonToolProps {
  products: Product[]
  onClose: () => void
}

export default function ComparisonTool({ products, onClose }: ComparisonToolProps) {
  const [unlockedFeatures, setUnlockedFeatures] = useState<{ [key: string]: boolean }>({})

  const features = [
    { name: 'Range', values: ['100 km', '150 km', '120 km'] },
    { name: 'Top Speed', values: ['40 km/h', '50 km/h', '45 km/h'] },
    { name: 'Charging Time', values: ['4 hours', '3 hours', '3.5 hours'] },
    { name: 'Payload Capacity', values: ['300 kg', '250 kg', '400 kg'] },
  ]

  const unlockFeature = (feature: string) => {
    setUnlockedFeatures((prev) => ({ ...prev, [feature]: true }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-auto">
        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Compare Models</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border p-2 text-left text-black dark:text-white">Feature</th>
              {products.map((product) => (
                <th key={product.id} className="border p-2 text-left text-black dark:text-white">{product.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={feature.name}>
                <td className="border p-2 text-black dark:text-white">
                  {unlockedFeatures[feature.name] ? (
                    feature.name
                  ) : (
                    <Button
                      onClick={() => unlockFeature(feature.name)}
                      size="sm"
                    >
                      Unlock {feature.name}
                    </Button>
                  )}
                </td>
                {products.map((product, productIndex) => (
                  <td key={`${product.id}-${feature.name}`} className="border p-2 text-black dark:text-white">
                    {unlockedFeatures[feature.name] ? feature.values[productIndex] : '???'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 text-center">
          <Button onClick={onClose} variant="secondary">
            Close Comparison
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

