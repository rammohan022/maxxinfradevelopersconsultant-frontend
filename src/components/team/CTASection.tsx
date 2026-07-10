'use client'

import { useState } from "react"
import { Container } from "@/components/ui"
import { useCreateLeadMutation } from "@/services/lead"
import toast from "react-hot-toast"

const CTASection = () => {
  const [createLead, { isLoading: isSubmitting }] = useCreateLeadMutation()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  })


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createLead(formData).unwrap()
      toast.success("Your consultation request has been submitted! We'll get back to you shortly.")
      setFormData({ fullName: "", email: "", phoneNumber: "", subject: "", message: "" })
    } catch (err) {
      console.error("Submission error:", err)
      toast.error("Failed to submit. Please try again later.")
    }
  }

  return (
    <section id="cta-section" className="bg-white py-20">
      <Container className="max-w-4xl text-center">
        <h2 className="mb-6 font-serif text-4xl font-bold text-navy-900">
          Schedule a Consultation
        </h2>

        <p className="mb-10 text-lg leading-relaxed text-gray-600">
          Connect with our legal experts to discuss your matter. Our team is
          available to provide strategic advice tailored to your specific needs.
        </p>

        <div className="mx-auto max-w-2xl border border-gray-200 bg-gray-50 p-10 rounded">



          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full border border-gray-300 px-4 py-3 transition focus:border-red-600 focus:outline-none"
                />
              </div>

              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full border border-gray-300 px-4 py-3 transition focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  required
                  className="w-full border border-gray-300 px-4 py-3 transition focus:border-red-600 focus:outline-none"
                />
              </div>

              {/* Subject */}
              <div className="text-left">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief subject of consultation"
                  required
                  className="w-full border border-gray-300 px-4 py-3 transition focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>



            {/* Message */}
            <div className="mb-6 text-left">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Message *
              </label>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your legal matter..."
                required
                className="w-full resize-none border border-gray-300 px-4 py-3 transition focus:border-red-600 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 py-4 text-lg font-medium text-white transition hover:bg-red-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Request Consultation"}
            </button>

            <p className="mt-4 text-xs text-gray-500">
              By submitting this form, you agree to our privacy policy. All
              consultations are confidential.
            </p>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default CTASection
