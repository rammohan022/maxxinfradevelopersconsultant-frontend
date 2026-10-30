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
  const phone = siteSettings?.contactPhone || adminProfile?.phoneNumber || "+91 83031 45434";
  const facebook = siteSettings?.socialLinks?.facebook || "https://facebook.com";
  const instagram = siteSettings?.socialLinks?.instagram || "https://instagram.com";
  const youtube = "https://youtube.com";

  return (
    <div className="bg-primary-dark text-slate-200 py-2 text-xs hidden lg:block border-b border-white/10">
      <Container className="flex justify-between items-center">
        {/* Left: Location & Contact */}
        <div className="flex items-center gap-6 font-medium">
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin size={13} className="text-secondary" />
            Deva Road, Outer Ring Road, Lucknow &amp; NCR
          </span>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 hover:text-secondary transition text-slate-300"
          >
            <Mail size={13} className="text-secondary" />
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 font-bold text-white hover:text-secondary transition"
          >
            <Phone size={13} className="text-secondary" />
            {phone}
          </a>
        </div>

        {/* Right: Badge & Socials */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider bg-secondary/15 px-2.5 py-0.5 rounded-full border border-secondary/20">
            Zero Brokerage • 100% Verified Titles
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
