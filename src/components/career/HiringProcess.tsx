import {Container} from '@/components/ui'
import {
  FileText,
  Search,
  MessageSquare,
  ClipboardCheck,
  Award
} from 'lucide-react'

const HiringProcess = ()=>{
    /* ================= HIRING PROCESS ================= */
const hiringSteps = [
  { step: 1, icon: FileText, title: 'Application', desc: 'Submit your resume and cover letter through our portal or email.' },
  { step: 2, icon: Search, title: 'Screening', desc: 'Our HR team reviews applications and shortlists candidates.' },
  { step: 3, icon: MessageSquare, title: 'Interview', desc: 'One or more rounds with the team and practice leads.' },
  { step: 4, icon: ClipboardCheck, title: 'Assessment', desc: 'Role-specific tasks or scenarios where applicable.' },
  { step: 5, icon: Award, title: 'Offer', desc: 'Successful candidates receive a formal offer and onboarding details.' },
]

    return(
        <>
          <section className="py-14 lg:py-20 bg-white">
                <Container>
                  <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wide mb-2">
                    How We Hire
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-navy font-serif-heading mb-12">
                    Our Hiring Process
                  </h2>
                  <div className="relative">
                    <div
                      className="hidden md:block absolute left-[12%] right-[12%] top-7 h-px bg-gray-200 z-0"
                      aria-hidden
                    />
                    <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-2 relative z-10">
                      {hiringSteps.map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.step}
                            className="flex flex-col md:flex-1 md:items-center md:text-center"
                          >
                            <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center font-bold font-serif-heading text-lg mb-4 shrink-0 mx-auto">
                              {item.step}
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 shrink-0 mx-auto">
                              <Icon className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-bold text-navy font-serif-heading mb-2 text-center">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed text-center">
                              {item.desc}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="md:hidden flex justify-center gap-2 mt-6">
                    {hiringSteps.map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary/40"
                        aria-hidden
                      />
                    ))}
                  </div>
                </Container>
              </section>
        </>
    )
}

export default HiringProcess