'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  { id: 1, text: "I love GreenThread's commitment to sustainability. Their clothes are not only eco-friendly but also stylish!", author: "Sarah M." },
  { id: 2, text: "The quality of GreenThread's products is outstanding. I've never felt better about my fashion choices.", author: "Mike R." },
  { id: 3, text: "GreenThread has completely changed my perspective on sustainable fashion. I'm a customer for life!", author: "Emily L." },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-50 p-6 rounded-lg shadow-lg text-center"
        >
          <p className="text-lg mb-4">"{testimonials[currentIndex].text}"</p>
          <p className="font-bold">- {testimonials[currentIndex].author}</p>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prevTestimonial}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-green-500 text-white p-2 rounded-full"
        aria-label="Previous testimonial"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-green-500 text-white p-2 rounded-full"
        aria-label="Next testimonial"
      >
        <ChevronRight />
      </button>
    </div>
  )
}

