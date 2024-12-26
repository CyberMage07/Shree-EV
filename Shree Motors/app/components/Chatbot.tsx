'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const chatbotResponses = {
  default: "I'm sorry, I didn't understand that. Can you please rephrase or choose from the available options?",
  greeting: "Hello! Welcome to Shree Motors. How can I assist you today?",
  product_info: "Our main products are electric 3-wheelers. We have models for personal use, like the Eco Rider, and commercial use, like the Cargo Master. Would you like more information on a specific model?",
  test_drive: "We'd be happy to arrange a test drive for you. Please visit our showroom or call us at +91 123-456-7890 to schedule an appointment.",
  pricing: "Our prices vary depending on the model and customization. The Eco Rider starts at ₹150,000, while the Luxury Glide starts at ₹250,000. For a detailed quote, please speak with our sales team.",
  sustainability: "At Shree Motors, sustainability is at the core of everything we do. Our vehicles produce zero emissions and are made with eco-friendly materials wherever possible.",
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: chatbotResponses.greeting, sender: 'bot' },
  ])
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    setMessages([...messages, { text: input, sender: 'user' }])
    setInput('')

    // Simple response logic
    let botResponse = chatbotResponses.default
    if (input.toLowerCase().includes('product')) {
      botResponse = chatbotResponses.product_info
    } else if (input.toLowerCase().includes('test drive')) {
      botResponse = chatbotResponses.test_drive
    } else if (input.toLowerCase().includes('price')) {
      botResponse = chatbotResponses.pricing
    } else if (input.toLowerCase().includes('sustainability')) {
      botResponse = chatbotResponses.sustainability
    }

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }])
    }, 500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col"
          >
            <div className="bg-green-500 text-white p-4 rounded-t-lg">
              <h3 className="font-bold">Shree Motors Chatbot</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 border rounded-lg"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
    </div>
  )
}

