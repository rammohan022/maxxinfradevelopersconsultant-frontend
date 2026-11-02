"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Container } from "@/components/ui";
import { useGetAdminProfileQuery } from "@/services/auth";
import { useGetSiteSettingsQuery } from "@/services/siteSettings";

export default function TopBar() {
  const { data: adminProfile } = useGetAdminProfileQuery();
  const { data: siteSettings } = useGetSiteSettingsQuery();

  const email = siteSettings?.contactEmail || adminProfile?.email || "contact@maxxinfradevelopersconsultant.com";
  const phone1 = "+91 79051 45968";
  const phone2 = "+91 63861 00070";
  const facebook = siteSettings?.socialLinks?.facebook || "https://facebook.com";
  const instagram = siteSettings?.socialLinks?.instagram || "https://instagram.com";
  const youtube = "https://youtube.com";

  return (
    <div className="bg-primary-dark text-slate-200 py-2 text-xs hidden lg:block border-b border-white/10">
      <Container className="flex justify-between items-center whitespace-nowrap">
        {/* Left: Location & Contact */}
        <div className="flex items-center gap-5 font-medium">
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin size={13} className="text-secondary" />
            G-1 Shivani Arcade, Deva Road, Opp. Axis Bank, Lucknow
          </span>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 hover:text-secondary transition text-slate-300"
          >
            <Mail size={13} className="text-secondary" />
            {email}
          </a>
          <div className="flex items-center gap-2 text-white">
            <Phone size={13} className="text-secondary" />
            <a
              href="tel:+917905145968"
              className="font-bold hover:text-secondary transition"
            >
              {phone1}
            </a>
            <span className="text-slate-500 font-normal">/</span>
            <a
              href="tel:+916386100070"
              className="font-bold hover:text-secondary transition"
            >
              {phone2}
            </a>
          </div>
        </div>

        {/* Right: Badge & Socials */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider bg-secondary/15 px-2.5 py-0.5 rounded-full border border-secondary/20">
            Buy, Sell &amp; Resell • Lucknow S.C.R
          </span>
          <div className="flex items-center gap-3 ml-2">
            <Link href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition" aria-label="Facebook">
              <Facebook size={14} />
            </Link>
            <Link href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition" aria-label="Instagram">
              <Instagram size={14} />
            </Link>
            <Link href={youtube} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition" aria-label="YouTube">
              <Youtube size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
