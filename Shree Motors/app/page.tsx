'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return <span>{displayText}</span>
}

const products = [
  { name: 'Eco Rider', image: '/placeholder.svg?height=300&width=400', price: '₹1,50,000' },
  { name: 'Cargo Master', image: '/placeholder.svg?height=300&width=400', price: '₹2,00,000' },
  { name: 'Luxury Glide', image: '/placeholder.svg?height=300&width=400', price: '₹2,50,000' },
]

const features = [
  { title: 'Eco-Friendly', description: 'Zero emissions for a cleaner environment', icon: '🌿' },
  { title: 'Cost-Effective', description: 'Lower operational costs compared to traditional vehicles', icon: '💰' },
  { title: 'Low Maintenance', description: 'Fewer moving parts mean less maintenance', icon: '🔧' },
  { title: 'Government Incentives', description: 'Take advantage of various EV incentives', icon: '🏛️' },
]

const news = [
  { title: 'Shree Motors Expands to 5 New Cities', date: 'June 15, 2023' },
  { title: 'New Long-Range Battery Technology Unveiled', date: 'May 22, 2023' },
  { title: 'Shree Motors Partners with Leading Logistics Company', date: 'April 10, 2023' },
  { title: 'Electric Vehicle Adoption Surges in Urban Areas', date: 'March 5, 2023' },
  { title: 'Shree Motors Wins Sustainability Award', date: 'February 18, 2023' },
]

const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <Slider {...settings}>
      {products.map((product, index) => (
        <div key={index} className="px-4">
          <Image src={product.image} alt={product.name} width={400} height={300} className="w-full h-48 object-cover rounded-lg" />
          <h3 className="text-xl font-bold mt-4">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-400">Starting from {product.price}</p>
        </div>
      ))}
    </Slider>
  )
}

const NewsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <Slider {...settings}>
      {news.map((item, index) => (
        <div key={index} className="px-4">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{item.date}</p>
        </div>
      ))}
    </Slider>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-auto min-w-full min-h-full max-w-none"
        >
          <source src="/placeholder-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center text-white">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TypingText text="The Future of Urban Mobility" />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Eco-friendly. Efficient. Electric.
          </motion.p>
          <motion.button
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Explore Our Vehicles
          </motion.button>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Electric?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Electric 3-Wheeler Range
          </motion.h2>
          <ProductSlider />
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center text-green-500 hover:text-green-600 transition-colors duration-200"
            >
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="vision" className="py-20 bg-green-500 dark:bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
            <p className="text-xl mb-8">
              At Shree Motors, we envision a future where urban mobility is clean, efficient, and accessible to all. 
              Our mission is to revolutionize the transportation industry with innovative electric vehicles that reduce 
              carbon emissions and improve the quality of life in cities.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center bg-white text-green-500 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="news" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest News
          </motion.h2>
          <NewsSlider />
          <div className="text-center mt-8">
            <Link
              href="/news"
              className="inline-flex items-center text-green-500 hover:text-green-600 transition-colors duration-200"
            >
              View All News <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

