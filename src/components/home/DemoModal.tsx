"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateLeadMutation } from "@/services/lead";
import toast from "react-hot-toast";

export default function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [createLead, { isLoading }] = useCreateLeadMutation();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState(""); // Maps to dropdown Service
  const [message, setMessage] = useState(""); // Maps to comments

  useEffect(() => {
    // Check if the modal was already closed in this session or submitted in the past
    const isSubmitted = localStorage.getItem("pc_demo_modal_submitted") === "true";
    const isClosedInSession = sessionStorage.getItem("pc_demo_modal_closed") === "true";

    if (!isSubmitted && !isClosedInSession) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000); // 10 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as closed for this session so it does not annoy the user again during browsing
    sessionStorage.setItem("pc_demo_modal_closed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !subject) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await createLead({
        fullName,
        email,
        phoneNumber,
        company: company || undefined,
        subject, // Selected service
        message: message || "Requesting demo/quote.",
        source: "Homepage 15 Years Popup Modal",
      }).unwrap();

      toast.success("Request submitted successfully!");
      // Mark as submitted permanently in localStorage so they don't see it again
      localStorage.setItem("pc_demo_modal_submitted", "true");
      setIsOpen(false);
    } catch (err: any) {
      console.error("Lead submission error:", err);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 min-h-[460px] border border-slate-100"
          >
            {/* Left Column: 15 Years Celebrating Panel */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#0c1b2c] via-primary to-[#0e2136] p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Glitter Background Effect */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent pointer-events-none scale-150" />
              
              {/* Gold stars decorative SVG */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20%" cy="20%" r="2" fill="#f58235" />
                  <circle cx="80%" cy="15%" r="1" fill="#f58235" />
                  <circle cx="70%" cy="80%" r="2.5" fill="#f58235" />
                  <circle cx="30%" cy="75%" r="1.5" fill="#f58235" />
                  <circle cx="90%" cy="50%" r="2" fill="#f58235" />
                  <circle cx="10%" cy="60%" r="1" fill="#f58235" />
                </svg>
              </div>

              <div className="space-y-4 relative z-10">
                <p className="text-secondary font-serif italic text-xl md:text-2xl tracking-wide opacity-90">
                  Celebrating
                </p>
                <div className="relative py-2">
                  <h3 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(245,130,53,0.3)]">
                    15 Years
                  </h3>
                  <div className="absolute -top-1 -right-3">
                    <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                  </div>
                </div>
                <p className="text-white text-sm md:text-base font-semibold tracking-widest uppercase">
                  of excellence
                </p>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="md:col-span-7 bg-primary p-8 flex flex-col justify-center relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full">
                <h4 className="text-xl md:text-2xl font-bold text-white text-center leading-tight mb-6">
                  Request a demo or quote now!
                </h4>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Name"
                      className="w-full border-0 rounded-lg px-4 py-2.5 text-sm bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full border-0 rounded-lg px-4 py-2.5 text-sm bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone"
                      className="w-full border-0 rounded-lg px-4 py-2.5 text-sm bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      className="w-full border-0 rounded-lg px-4 py-2.5 text-sm bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <select
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full border-0 rounded-lg px-4 py-2.5 text-sm bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
                    >
                      <option value="" disabled>Select Service</option>
                      <option value="Payroll Services">Payroll Services</option>
                      <option value="HR Retainership">HR Retainership</option>
                      <option value="Executive Search">Executive Search</option>
                      <option value="Corporate Training">Corporate Training</option>
                      <option value="HR Compliance & Audit">HR Compliance & Audit</option>
                      <option value="Other Consulting Services">Other Consulting Services</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Comments"
                      rows={2}
                      className="w-full border-0 rounded-lg px-4 py-2.5 text-sm bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-secondary/50 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-2.5 rounded-lg bg-secondary hover:bg-orange-600 text-white text-sm font-bold uppercase tracking-wider transition-colors shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition disabled:opacity-50"
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
