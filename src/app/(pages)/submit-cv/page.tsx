import React from 'react';
import { Container } from '@/components/ui';
import { UploadCloud, CheckCircle, Briefcase, FileText, Send } from 'lucide-react';

export default function SubmitCVPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">
              Join Our Network
            </span>
            <h1 className="text-4xl md:text-5xl font-serif-heading font-bold text-white mb-6 leading-tight">
              Submit Your CV
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              Connect with top employers and exciting career opportunities. Upload your resume and let our expert recruitment team match you with the perfect role.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="relative z-20 -mt-10">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Form Column */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-navy mb-6 font-serif-heading">Application Details</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-secondary">*</span></label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-secondary">*</span></label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-secondary">*</span></label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="+91 9876543210" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Experience</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                    <option value="">Select Experience</option>
                    <option value="0-2">0 - 2 Years</option>
                    <option value="3-5">3 - 5 Years</option>
                    <option value="6-10">6 - 10 Years</option>
                    <option value="10+">10+ Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current/Target Industry</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. IT, Finance, Manufacturing" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Resume / CV Link <span className="text-secondary">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="url" className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Paste Google Drive or Dropbox link to your CV" required />
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  Please ensure the link is publicly accessible.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter / Message (Optional)</label>
                <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Tell us briefly about your career goals..."></textarea>
              </div>

              <button type="submit" className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg shadow-secondary/20">
                Submit Application <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-navy font-serif-heading mb-4">Why Submit Your CV?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm leading-relaxed">Gain access to unlisted, premium job opportunities across top industries.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm leading-relaxed">Our experts match your profile with organizations that align with your career goals.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm leading-relaxed">Get constructive feedback and guidance on interviews and salary negotiations.</p>
                </li>
              </ul>
            </div>

            <div className="bg-navy rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
               <Briefcase className="w-10 h-10 text-secondary mb-4" />
               <h3 className="text-xl font-bold font-serif-heading mb-3">500+ Active Jobs</h3>
               <p className="text-white/80 text-sm leading-relaxed mb-6">We are currently hiring for over 500 positions globally. Submit your profile today to get shortlisted.</p>
               <a href="tel:+918800177307" className="inline-block text-sm font-bold text-white uppercase tracking-wider hover:text-secondary transition-colors border-b border-secondary pb-1">
                 Call our Recruiters
               </a>
            </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
