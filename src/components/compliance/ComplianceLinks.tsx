'use client'

import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { useGetWebsiteLinksQuery } from '@/services/websiteLink'
import { getImageUrl } from '@/lib/utils/imageUtils'
import { ExternalLink, Globe } from 'lucide-react'

export default function ComplianceLinks() {
  const { data: links, isLoading } = useGetWebsiteLinksQuery()

  if (isLoading || !links || links.length === 0) return null

  // Sort links by order if available
  const sortedLinks = [...links].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <section className="py-16 md:py-14 bg-slate-50 border-t border-slate-200/60">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold mb-4">
            Compliance Library
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Important Compliance <span className="text-secondary">Libraries & Portals</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            Access essential resources, official portals, and compliance libraries for streamlined regulatory management.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300 relative overflow-hidden flex-shrink-0 p-2">
                  {link.logo ? (
                    <Image
                      src={getImageUrl(link.logo)}
                      alt={link.title}
                      fill
                      className="object-contain p-1.5"
                    />
                  ) : (
                    <Globe size={24} strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="font-semibold text-primary text-sm sm:text-base group-hover:text-secondary transition-colors duration-300">
                  {link.title}
                </h3>
              </div>
              <ExternalLink size={18} className="text-slate-400 group-hover:text-secondary transition-colors duration-300" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
