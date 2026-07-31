"use client";

import { Container } from '@/components/ui'
import { useState, useMemo, useEffect } from 'react'
import { X, MapPin, Clock, Upload, Loader2, CheckCircle2 } from 'lucide-react'
import { useGetCareersQuery, Career } from '@/services/career'
import { useCreateJobApplicationMutation } from '@/services/jobApplication'
import toast from 'react-hot-toast'

const OpenPosition = () => {
  const { data: careers = [], isLoading, isError } = useGetCareersQuery()
  const [department, setDepartment] = useState('All Departments')
  const [location, setLocation] = useState('All Locations')
  const [jobType, setJobType] = useState('All Types')
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Career | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [createJobApplication, { isLoading: isSubmitting }] = useCreateJobApplicationMutation()

  const departments = useMemo(() => {
    const depts = new Set(careers.map(j => j.department))
    return ['All Departments', ...Array.from(depts)]
  }, [careers])

  const locations = useMemo(() => {
    const locs = new Set(careers.map(j => j.location))
    return ['All Locations', ...Array.from(locs)]
  }, [careers])

  const jobTypes = useMemo(() => {
    const types = new Set(careers.map(j => j.jobType))
    return ['All Types', ...Array.from(types)]
  }, [careers])

  useEffect(() => {
    if (!applyModalOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setApplyModalOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [applyModalOpen])

  const openApplyModal = (job: Career) => {
    setSelectedJob(job)
    setApplyModalOpen(true)
  }

  const closeApplyModal = () => {
    setApplyModalOpen(false)
    setSelectedJob(null)
    setIsSubmitted(false)
  }

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedJob) return

    const form = e.currentTarget
    const formData = new FormData()
    
    formData.append('fullName', (form.elements.namedItem('apply-name') as HTMLInputElement).value)
    formData.append('email', (form.elements.namedItem('apply-email') as HTMLInputElement).value)
    formData.append('phoneNumber', (form.elements.namedItem('apply-phone') as HTMLInputElement).value)
    formData.append('message', (form.elements.namedItem('apply-message') as HTMLTextAreaElement).value)
    formData.append('jobId', selectedJob.id)
    
    const resumeFile = (form.elements.namedItem('apply-resume') as HTMLInputElement).files?.[0]
    if (resumeFile) {
      formData.append('resume', resumeFile)
    }

    try {
      await createJobApplication(formData).unwrap()
      setIsSubmitted(true)
      toast.success("Application submitted successfully!")
      // Keep modal open for a moment to show success state, then close
      setTimeout(() => {
        closeApplyModal()
      }, 3000)
    } catch (err) {
      console.error("Failed to submit application:", err)
      toast.error("Failed to submit application. Please try again.")
    }
  }

  const filteredPositions = useMemo(() => {
    return careers.filter((p) => {
      if (department !== 'All Departments' && p.department !== department) return false
      if (location !== 'All Locations' && p.location !== location) return false
      if (jobType !== 'All Types' && p.jobType !== jobType) return false
      // Only show Open positions on public site
      if (!p.isActive) return false
      return true
    })
  }, [careers, department, location, jobType])

  if (isLoading) return <div className="py-20 text-center text-slate-500">Loading open positions...</div>
  if (isError) return null

  return (
    <>
      <section id="open-positions" className="py-14 lg:py-20 bg-gray-50">
        <Container>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wide mb-2">
            Join Our Team
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-10">
            Open Positions
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="career-dept" className="mb-2 block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  id="career-dept"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 rounded transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="career-loc" className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  id="career-loc"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 rounded transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="career-type" className="mb-2 block text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <select
                  id="career-type"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 rounded transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {jobTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setDepartment('All Departments')
                    setLocation('All Locations')
                    setJobType('All Types')
                  }}
                  className="w-full sm:w-auto border border-gray-300 px-5 py-3 rounded font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPositions.length === 0 ? (
              <div className="text-center py-12 rounded-lg border border-gray-200 bg-white">
                <p className="text-gray-600">No positions match your filters. Try adjusting the criteria.</p>
              </div>
            ) : (
              filteredPositions.map((job) => (
                <article
                  key={job.id}
                  className="p-6 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary shrink-0" />
                          {job.jobType}
                        </span>
                        <span>Experience: {job.experience}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 sm:pt-0.5">
                      <button
                        type="button"
                        onClick={() => openApplyModal(job)}
                        className="inline-block bg-secondary hover:bg-secondary-dark text-white px-5 py-2.5 rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </Container>
      </section>

      {applyModalOpen && selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm"
          onClick={closeApplyModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <h2 id="apply-modal-title" className="text-xl font-bold text-primary">
                Apply for Position
              </h2>
              <button
                type="button"
                onClick={closeApplyModal}
                className="p-2 text-gray-500 hover:text-navy rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Application Received!</h3>
                  <p className="text-gray-600">
                    Thank you for applying for the <strong>{selectedJob.title}</strong> position. 
                    Our team will review your application and get back to you soon.
                  </p>
                  <button
                    onClick={closeApplyModal}
                    className="mt-8 bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg font-medium transition"
                  >
                    Got it, thanks!
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
                    <p className="font-semibold text-navy">{selectedJob.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {selectedJob.location} · {selectedJob.jobType} · {selectedJob.experience}
                    </p>
                  </div>
                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="apply-name" className="mb-1.5 block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <input
                          id="apply-name"
                          name="apply-name"
                          type="text"
                          required
                          placeholder="Your full name"
                          className="w-full border border-gray-300 px-4 py-2 text-sm rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label htmlFor="apply-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <input
                          id="apply-email"
                          name="apply-email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="w-full border border-gray-300 px-4 py-2 text-sm rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone and Resume */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="apply-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                          Phone *
                        </label>
                        <input
                          id="apply-phone"
                          name="apply-phone"
                          type="tel"
                          required
                          placeholder="+91 00000 00000"
                          className="w-full border border-gray-300 px-4 py-2 text-sm rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label htmlFor="apply-resume" className="mb-1.5 block text-sm font-medium text-gray-700">
                          Resume / CV *
                        </label>
                        <input
                          id="apply-resume"
                          name="apply-resume"
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          className="w-full border border-gray-300 px-4 py-1 text-sm rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-secondary/10 file:text-secondary file:font-medium file:cursor-pointer"
                        />
                        <p className="mt-1 text-[10px] text-gray-500">PDF or DOC, max 5MB</p>
                      </div>
                    </div>

                    {/* Row 3: Cover Letter */}
                    <div>
                      <label htmlFor="apply-message" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Cover letter / Message
                      </label>
                      <textarea
                        id="apply-message"
                        name="apply-message"
                        rows={4}
                        placeholder="Briefly tell us about your experience and why you are interested in this role (optional)."
                        className="w-full border border-gray-300 px-4 py-3 rounded transition focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary resize-none"
                      />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={closeApplyModal}
                        disabled={isSubmitting}
                        className="flex-1 border border-gray-300 px-5 py-3 rounded font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-secondary hover:bg-secondary-dark text-white px-5 py-3 rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OpenPosition