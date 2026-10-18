'use client'

import { Phone } from "lucide-react"
import { useGetAdminProfileQuery } from "@/services/auth"
import { useGetSiteSettingsQuery } from "@/services/siteSettings"

export default function FloatingButtons() {
  const { data: adminProfile } = useGetAdminProfileQuery()
  const { data: siteSettings } = useGetSiteSettingsQuery()

  const phone = siteSettings?.contactPhone || adminProfile?.phoneNumber || "+91 8800177307"
  const phoneClean = phone.replace(/\s+/g, '')

  // WhatsApp link: prioritize settings whatsapp link if provided, otherwise build wa.me link with digits
  const whatsappCustom = siteSettings?.socialLinks?.whatsapp?.trim()
  const rawDigits = phone.replace(/\D/g, '')
  const whatsappDigits = rawDigits.length === 10 ? `91${rawDigits}` : (rawDigits || '918800177307')

  const whatsappUrl = whatsappCustom
    ? (whatsappCustom.startsWith('http') ? whatsappCustom : `https://wa.me/${whatsappCustom.replace(/\D/g, '')}`)
    : `https://wa.me/${whatsappDigits}`

  const callUrl = `tel:${phoneClean || '+918800177307'}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.371a9.936 9.936 0 004.777 1.224h.005c5.505 0 9.986-4.477 9.988-9.98C22 6.476 17.518 2 12.012 2zm6.073 14.258c-.265.743-1.534 1.348-2.106 1.433-.515.076-1.185.138-3.413-.78-2.855-1.178-4.663-4.085-4.805-4.275-.143-.19-1.143-1.524-1.143-2.909 0-1.385.722-2.062.98-2.336.257-.273.562-.34.75-.34h.536c.17 0 .393-.064.616.483.224.546.76 1.854.823 1.983.064.13.106.278.02.447-.085.17-.128.277-.255.426-.128.15-.265.337-.38.455-.127.13-.26.27-.112.52.148.25.656 1.08 1.41 1.75.972.863 1.792 1.13 2.046 1.258.255.128.404.106.553-.064.148-.17.638-.742.808-1 .17-.257.34-.214.574-.128.233.085 1.488.701 1.743.828.255.128.425.19.49.3.064.106.064.616-.2 1.359z" />
        </svg>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a
        href={callUrl}
        aria-label="Call Us"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary hover:bg-secondary-dark text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          Call Now
        </span>
      </a>
    </div>
  )
}
