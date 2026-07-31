import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is my personal data and journal private?',
    answer:
      'Absolutely. Your inner journal and conversations are strictly confidential. We do not sell your data or use it to train public AI models. Your sanctuary is yours alone.',
  },
  {
    question: 'How is this different from just talking to ChatGPT?',
    answer:
      'SoulType uses a highly specialized psychological framework. Instead of a generic assistant, you get a dedicated coach mapped to your specific cognitive functions, featuring long-term memory and a dynamic calibration system.',
  },
  {
    question: 'Do I need to know my MBTI type before starting?',
    answer:
      'Not at all. The journey begins with a deep cognitive assessment that will accurately determine your archetype before generating your AI Soul Coach.',
  },
  {
    question: 'Can I cancel my Awakened subscription anytime?',
    answer:
      'Yes, you can cancel your subscription at any moment with a single click in your settings. You will retain your premium benefits until the end of your billing cycle.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative z-10 mt-32 flex w-full max-w-3xl flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12 text-center"
      >
        <h2 className="font-serif text-3xl font-normal text-[#c9ebd0] sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <div className="w-full divide-y divide-white/5 border-y border-white/5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className="py-6"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-[#c9ebd0]">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#e9c349]"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-[#c8c5d0]/70">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
