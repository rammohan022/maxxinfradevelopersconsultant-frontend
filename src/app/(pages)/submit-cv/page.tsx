"use client";

import React, { useState } from 'react';
import { Container } from '@/components/ui';
import { CheckCircle, Briefcase, FileText, Send, Loader2 } from 'lucide-react';
import { useCreateJobApplicationMutation } from '@/services/jobApplication';
import toast from 'react-hot-toast';

export default function SubmitCVPage() {
  const [createJobApplication, { isLoading }] = useCreateJobApplicationMutation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    experience: '',
    industry: '',
    message: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phoneNumber || !resumeFile) {
      toast.error('Please fill in all required fields and upload your resume.');
      return;
    }

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('phoneNumber', formData.phoneNumber);
      if (formData.experience) data.append('experience', formData.experience);
      if (formData.industry) data.append('industry', formData.industry);
      if (formData.message) data.append('message', formData.message);
      data.append('resume', resumeFile);

      await createJobApplication(data).unwrap();

      toast.success('Your CV application has been submitted successfully!');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        experience: '',
        industry: '',
        message: '',
      });
      setResumeFile(null);
      // Reset the file input element visually
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      console.error('Failed to submit CV:', error);
      toast.error(error?.data?.message || 'Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-100 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-bold tracking-widest text-sm mb-4 block">
              Join Our Network
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-6">
              Submit Your CV
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl mx-auto leading-relaxed">
              Connect with top employers and exciting career opportunities. Upload your resume and let our expert recruitment team match you with the perfect role.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="relative z-20 -mt-10">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Form Column */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-6">Application Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-secondary">*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-950 placeholder-slate-400"
                    placeholder="John Doe"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-secondary">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-950 placeholder-slate-400"
                    placeholder="john@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number <span className="text-secondary">*</span></label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-950 placeholder-slate-400"
                    placeholder="+91 9876543210"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Total Experience</label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none text-slate-950"
                      disabled={isLoading}
                    >
                      <option value="">Select Experience</option>
                      <option value="0-2">0 - 2 Years</option>
                      <option value="3-5">3 - 5 Years</option>
                      <option value="6-10">6 - 10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Current/Target Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-950 placeholder-slate-400"
                  placeholder="e.g. IT, Finance, Manufacturing"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Resume / CV File <span className="text-secondary">*</span></label>
                <div className="relative">
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-950 placeholder-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    required
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Supports PDF, DOC, DOCX formats. Max file size: 5MB.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Letter / Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-slate-950 placeholder-slate-400"
                  placeholder="Tell us briefly about your career goals..."
                  disabled={isLoading}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-secondary/20 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    Submitting... <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Application <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Why Submit Your CV?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm leading-relaxed">Gain access to unlisted, premium job opportunities across top industries.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm leading-relaxed">Our experts match your profile with organizations that align with your career goals.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm leading-relaxed">Get constructive feedback and guidance on interviews and salary negotiations.</p>
                </li>
              </ul>
            </div>

            <div className="bg-primary rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-dark/20 rounded-full blur-2xl" />
               <Briefcase className="w-10 h-10 text-secondary mb-4" />
               <h3 className="text-xl font-bold mb-3">500+ Active Jobs</h3>
               <p className="text-white/90 text-sm leading-relaxed mb-6">We are currently hiring for over 500 positions globally. Submit your profile today to get shortlisted.</p>
               <a href="tel:+918800177307" className="inline-block text-sm font-bold text-white tracking-wider hover:text-secondary transition-colors border-b border-secondary pb-1">
                 Call our Recruiters
               </a>
            </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
