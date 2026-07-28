import { Container } from '@/components/ui'
import {
  TrendingUp,
  Users,
  Scale,
  BookOpen,
  Briefcase,
  Award,
} from 'lucide-react'

const WhyJoinUs = () => {
  const whyJoinUs = [
    {
      icon: TrendingUp,
      title: 'Career Growth',
      desc: 'Structured progression paths and opportunities to take on greater responsibility as you develop your consulting expertise.',
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      desc: 'Work alongside experienced HR strategists and recruiters in a supportive, team-oriented environment that values every voice.',
    },
    {
      icon: Scale,
      title: 'Work-Life Balance',
      desc: 'We respect your time and wellbeing with sensible hours and flexibility where the nature of work allows.',
    },
    {
      icon: BookOpen,
      title: 'Learning & Development',
      desc: 'Continuous learning through internal training, seminars, and exposure to diverse industries and client portfolios.',
    },
    {
      icon: Briefcase,
      title: 'Meaningful Work',
      desc: 'Handle challenges that matter—from talent management strategy to corporate structuring and legal compliance.',
    },
    {
      icon: Award,
      title: 'Recognition & Ethics',
      desc: 'An agency that values integrity, merit, and professional excellence in an ethical, supportive environment.',
    },
  ]

  return (
    <section id="why-join-us" className="py-14 lg:py-20 bg-slate-50">
      <Container>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest mb-2">
          Why Join Us
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight mb-12">
          Why Work With Us
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyJoinUs.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-xl hover:border-primary/20 transition text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default WhyJoinUs