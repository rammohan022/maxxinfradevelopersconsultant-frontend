'use client'

import { useState } from 'react'
import { Container } from '@/components/ui'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
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
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
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
        fullName: form.fullName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        subject: form.subject,
        message: form.message,
      }).unwrap()
      toast.success("Your enquiry has been submitted! We'll get back to you soon.")
      setForm({ fullName: '', email: '', phoneNumber: '', subject: '', message: '' })
    } catch (err) {
      console.error('Submission error:', err)
      toast.error('Failed to submit. Please try again later.')
    }
  }

  return (
    <section className="relative bg-gray-50 py-8 md:py-12 lg:py-16 overflow-hidden" id="contact">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/5 -skew-x-12 transform origin-top-right hidden lg:block" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-multiply"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=80)',
        }}
      />

      <Container className="relative">
        <div className="grid items-stretch lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-navy p-6 sm:p-8 lg:p-10 text-white relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-0" />

            <div className="relative z-10">
              <motion.span variants={itemVariants} className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-secondary border-l-4 border-secondary pl-3">
                Contact Us
              </motion.span>

              <motion.h2 variants={itemVariants} className="mb-4 font-serif-heading text-2xl font-bold lg:text-3xl xl:text-4xl leading-tight">
                Let us know your concern, we are happy to help you.
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-white/80 text-base leading-relaxed">
                We provide clear, practical recruitment and HR guidance. Our team is always
                ready to assist you with your talent acquisition needs.
              </motion.p>

              {/* Contact Details */}
              <div className="mb-8 space-y-4">
                {/* Phone */}
                <motion.div variants={itemVariants} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+918800177307"
                      className="text-lg font-bold transition-colors hover:text-white text-white/90"
                    >
                      +91 8800177307
                    </a>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-1">
                      E-mail
                    </p>
                    <a
                      href="mailto:hello@peopleconsultings.com"
                      className="text-base font-medium transition-colors hover:text-white text-white/90"
                    >
                      hello@peopleconsultings.com
                    </a>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div variants={itemVariants} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-1">
                      Address
                    </p>
                    <p className="text-white/90 text-base leading-relaxed max-w-[250px]">
                      243, 2nd Floor, Vipul Trade Centre,
                      Sector 48, Sohna Road,
                      Gurgaon, Haryana
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social */}
              <motion.div variants={itemVariants} className="pt-8 border-t border-white/10">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:bg-primary hover:border-primary hover:-translate-y-1">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:bg-primary hover:border-primary hover:-translate-y-1">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="https://www.linkedin.com/company/people-consulting-services/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:bg-primary hover:border-primary hover:-translate-y-1">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 sm:p-8 lg:p-10 relative"
          >
            <span className="inline-block text-sm font-bold uppercase tracking-widest text-primary mb-3">
              Contact Form
            </span>

            <h2 className="mb-6 font-serif-heading text-2xl font-bold text-navy lg:text-3xl">
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-lg bg-secondary py-3 font-bold text-white transition-colors hover:bg-secondary-dark shadow-lg shadow-secondary/20 uppercase tracking-widest mt-2 disabled:bg-gray-400"
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
