"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Container } from "@/components/ui";
import { useGetAdminProfileQuery } from "@/services/auth";
import { useGetSiteSettingsQuery } from "@/services/siteSettings";

export default function TopBar() {
  const { data: adminProfile } = useGetAdminProfileQuery();
  const { data: siteSettings } = useGetSiteSettingsQuery();

  const email = siteSettings?.contactEmail || adminProfile?.email || "hello@peopleconsultings.com";
  const phone = siteSettings?.contactPhone || adminProfile?.phoneNumber || "+91 8800177307";
  const facebook = siteSettings?.socialLinks?.facebook || adminProfile?.facebookUrl || "#";
  const linkedin = siteSettings?.socialLinks?.linkedin || adminProfile?.linkedinUrl || "https://www.linkedin.com/company/people-consulting-services/";
  const instagram = siteSettings?.socialLinks?.instagram || adminProfile?.instagramUrl || "https://www.instagram.com/peopleconsultco?igsh=bGNkZzVoeDNoGl2";
  const twitter = siteSettings?.socialLinks?.twitter || adminProfile?.twitterUrl || "";

  return (
    <div className="bg-secondary text-white py-2.5 text-sm hidden lg:block">
      <Container className="flex justify-between items-center">

        {/* Left: Email & Phone */}
        <div className="flex gap-6 font-medium">
          <a
            href={`mailto:${email}`}
            className="hover:text-white/80 transition"
          >
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="hover:text-white/80 transition"
          >
            {phone}
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4">
          {linkedin && (
            <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition" aria-label="LinkedIn">
              <Linkedin size={16} strokeWidth={1.8} />
            </Link>
          )}
          {instagram && (
            <Link href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition" aria-label="Instagram">
              <Instagram size={16} strokeWidth={1.8} />
            </Link>
          )}
          {facebook && (
            <Link href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition" aria-label="Facebook">
              <Facebook size={16} strokeWidth={1.8} />
            </Link>
          )}
          {twitter && (
            <Link href={twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition" aria-label="Twitter">
              <Twitter size={16} strokeWidth={1.8} />
            </Link>
          )}
        </div>

      </Container>
    </div>
  );
}
