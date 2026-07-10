import {Container} from '@/components/ui'
import {
  TrendingUp,
  Users,
  Scale,
  BookOpen,
  Briefcase,
  Award,
  X,
} from 'lucide-react'
const WhyJoinUs = ()=>{
    /* ================= WHY JOIN US ================= */
    const whyJoinUs = [
      {
        icon: TrendingUp,
        title: 'Career Growth',
        desc: 'Structured progression paths and opportunities to take on greater responsibility as you develop your expertise.',
      },
      {
        icon: Users,
        title: 'Collaborative Culture',
        desc: 'Work alongside experienced advocates in a supportive, team-oriented environment that values every voice.',
      },
      {
        icon: Scale,
        title: 'Work-Life Balance',
        desc: 'We respect your time and wellbeing with sensible hours and flexibility where the nature of work allows.',
      },
      {
        icon: BookOpen,
        title: 'Learning & Development',
        desc: 'Continuous learning through internal training, seminars, and exposure to diverse practice areas.',
      },
      {
        icon: Briefcase,
        title: 'Meaningful Work',
        desc: 'Handle matters that matter—from individual rights to complex commercial and regulatory challenges.',
      },
      {
        icon: Award,
        title: 'Recognition & Ethics',
        desc: 'A firm that values integrity, merit, and professional excellence in an ethical, dignified setting.',
      },
    ]
    return(
        <>
             {/* ================= 2. WHY JOIN US ================= */}
              <section id="why-join-us" className="py-14 lg:py-20 bg-gray-50">
                <Container>
                  <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wide mb-2">
                    Why Join Us
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-navy font-serif-heading mb-12">
                    Why Work With Us
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whyJoinUs.map((item) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={item.title}
                          className="p-6 lg:p-8 rounded-lg border border-gray-100 bg-white hover:shadow-md hover:border-primary/20 transition text-left"
                        >
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5">
                            <Icon className="w-6 h-6" strokeWidth={1.5} />
                          </div>
                          <h3 className="text-xl font-bold text-navy font-serif-heading mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      )
                    })}
                  </div>
                </Container>
              </section>
        </>
    )
}

export default WhyJoinUs