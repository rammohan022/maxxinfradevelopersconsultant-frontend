import {Container } from '@/components/ui'
import Image from 'next/image'
const LifeAtCompany = () => {
    return (
        <>
            <section className="py-14 lg:py-20 bg-white">
                <Container>
                    <span className="inline-block text-primary font-semibold text-sm tracking-wide mb-2">
                        Culture
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-10">
                        Life at People Consulting
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed mb-12">
                        We believe in teamwork, diversity, and a professional environment built on ethics and respect. Our people are our strength—whether you are starting your legal career or bringing years of experience, you will find a place where your contribution is valued and your growth is supported.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            '/img/career-hero.png',
                            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
                            'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
                            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
                        ].map((src, i) => (
                            <div
                                key={i}
                                className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 relative"
                            >
                                <Image
                                    src={src}
                                    alt="Life at People Consulting"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-gray-600 max-w-3xl">
                        From court appearances to client meetings and research, our culture encourages collaboration, continuous learning, and a commitment to the highest standards of legal practice.
                    </p>
                </Container>
            </section>
        </>
    )
}

export default LifeAtCompany