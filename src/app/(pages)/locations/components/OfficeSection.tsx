"use client"

import { MapPin, Phone, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export default function OfficeSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you. We will get in touch shortly.")
  }

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.15 }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
  return (
    <section id="office" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 opacity-0 translate-y-3 transition-all duration-700" data-reveal>
          <h2 className="text-3xl md:text-4xl font-serif-heading font-semibold text-gray-900">
            Our&nbsp;Pune&nbsp;Office
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 bg-[#9b1c2c]" />
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="opacity-0 translate-y-3 transition-all duration-700" data-reveal>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#9b1c2c]/10">
                  <MapPin className="h-5 w-5 text-[#9b1c2c]" />
                </span>
                <div>
                  <div className="font-semibold text-gray-900">Address</div>
                  <div className="text-gray-600">
                    8th Floor, ICC Trade Tower, Senapati Bapat Rd,
                    Pune, Maharashtra 411016
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#9b1c2c]/10">
                  <Phone className="h-5 w-5 text-[#9b1c2c]" />
                </span>
                <div>
                  <div className="font-semibold text-gray-900">Phone</div>
                  <div className="text-gray-600">+91 20 0000 0000</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#9b1c2c]/10">
                  <Mail className="h-5 w-5 text-[#9b1c2c]" />
                </span>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">pune@equitylegalsolutions.com</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="opacity-0 translate-y-3 transition-all duration-700" data-reveal>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <div />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center bg-red-800 text-white px-6 py-2 rounded-md hover:bg-red-900 transition transform hover:scale-[1.02]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
