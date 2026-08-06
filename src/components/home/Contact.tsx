'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
} from 'lucide-react'
import { useCreateLeadMutation } from '@/services/lead'
import toast from 'react-hot-toast'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Contact() {
  const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createLead({
        ...form,
        source: typeof window !== "undefined" ? window.location.pathname : "",
      }).unwrap()
      toast.success("Enquiry submitted successfully! We'll get back to you soon.")
      setForm({ fullName: '', email: '', phoneNumber: '', subject: '', message: '' })
    } catch (err) {
      console.error('Submission error:', err)
      toast.error('Failed to submit enquiry. Please try again later.')
    }
  }

  return (
    <section className="relative bg-gray-50 py-8 md:py-12 lg:py-16 overflow-hidden" id="contact">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top-right hidden lg:block" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-multiply"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=80)',
        }}
      />

      <Container className="relative">
        <div className="grid items-stretch lg:grid-cols-2 rounded-2xl overflow-hidden shadow">
          {/* Left Info */}
          {/* Left Column: Team Image */}
          <div className="relative min-h-[350px] lg:min-h-full w-full overflow-hidden bg-slate-900">
            <Image
              src="/img/about-us.jpg"
              alt="People Consulting Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary/15 mix-blend-multiply pointer-events-none" />
          </div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 sm:p-8 lg:p-10 relative"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest mb-3">
              Contact Form
            </span>

            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-6">
              Get A Flexible Schedule
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {[
                { name: 'fullName', type: 'text', placeholder: 'Your Name', required: true },
                { name: 'email', type: 'email', placeholder: 'Email Address', required: true },
                { name: 'phoneNumber', type: 'tel', placeholder: 'Phone Number' },
                { name: 'subject', type: 'text', placeholder: 'Subject / Service Required' },
              ].map(({ name, type, placeholder, required }) => (
                <div key={name} className="relative group">
                  <input
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    value={form[name as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [name]: e.target.value })
                    }
                    className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-gray-400 font-medium text-sm"
                  />
                </div>
              ))}

              <div className="relative group">
                <textarea
                  placeholder="Tell us about your requirements..."
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 outline-none transition-all duration-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-gray-400 font-medium text-sm"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1 pb-1">
                <input
                  id="hc-consent"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 text-secondary rounded border-gray-300 focus:ring-secondary accent-secondary cursor-pointer flex-shrink-0"
                />
                <label htmlFor="hc-consent" className="text-xs text-gray-600 leading-snug cursor-pointer select-none">
                  I agree to the Terms of Service and Privacy Policy.
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-lg bg-secondary py-3 font-bold text-white transition-colors hover:bg-secondary-dark shadow-lg shadow-secondary/20 tracking-widest mt-2 disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Get An Appointment"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
