'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const milestones = [
  { year: 2015, title: 'Company Founded', description: 'Shree Motors was established with a vision for sustainable urban mobility.' },
  { year: 2017, title: 'First Prototype', description: 'Our team successfully developed the first electric 3-wheeler prototype.' },
  { year: 2019, title: 'Commercial Launch', description: 'Shree Motors launched its first commercial electric 3-wheeler, the Eco Rider.' },
  { year: 2021, title: 'Expansion', description: 'We expanded our product line and started exporting to neighboring countries.' },
  { year: 2023, title: 'Sustainability Award', description: 'Shree Motors received the National Sustainability Award for its contributions to green transportation.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white pt-16">
      <section className="bg-gradient-to-br from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Shree Motors
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Driving the future of sustainable urban mobility.
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
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-6">
                Shree Motors was founded in 2015 with a simple yet powerful vision: to revolutionize urban mobility through sustainable electric vehicles. Our journey began with a small team of passionate engineers and designers who believed in the potential of electric 3-wheelers to transform city transportation.
              </p>
              <p className="text-lg mb-6">
                Over the years, we've grown from a startup with a prototype to a leading manufacturer of electric 3-wheelers, known for our innovation, quality, and commitment to sustainability. Today, Shree Motors is at the forefront of the electric vehicle revolution, continuously pushing the boundaries of what's possible in urban mobility.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Shree Motors factory"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="mb-8 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-24 text-right mr-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-green-600 dark:bg-green-400 rounded-full mr-4"></div>
                <div className="flex-grow bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="absolute top-0 bottom-0 left-28 w-1 bg-green-600 dark:bg-green-400"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

