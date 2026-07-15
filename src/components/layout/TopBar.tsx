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

export default function TopBar() {
  const { data: adminProfile } = useGetAdminProfileQuery();

  const email = adminProfile?.email || "hello@peopleconsultings.com";
  const phone = adminProfile?.phoneNumber || "+91 8800177307";
  const facebook = adminProfile?.facebookUrl || "#";
  const linkedin = adminProfile?.linkedinUrl || "https://www.linkedin.com/company/people-consulting-services/";
  const instagram = adminProfile?.instagramUrl || "https://www.instagram.com/peopleconsultco?igsh=bGNkZzVoeDNoGl2";
  const twitter = adminProfile?.twitterUrl || "";

  return (
    <div className="bg-slate-50 border-b border-slate-100 text-slate-600 py-2.5 text-sm hidden lg:block">
      <Container className="flex justify-between items-center">

        {/* Left: Email & Phone */}
        <div className="flex gap-6">
          <a
            href={`mailto:${email}`}
            className="hover:text-secondary transition"
          >
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="hover:text-secondary transition"
          >
            {phone}
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4">
          {facebook && (
            <Link href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">
              <Facebook size={16} strokeWidth={1.8} />
            </Link>
          )}
          {twitter && (
            <Link href={twitter} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">
              <Twitter size={16} strokeWidth={1.8} />
            </Link>
          )}
          {linkedin && (
            <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">
              <Linkedin size={16} strokeWidth={1.8} />
            </Link>
          )}
          {instagram && (
            <Link href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">
              <Instagram size={16} strokeWidth={1.8} />
            </Link>
          )}
        </div>

      </Container>
    </div>
  );
}
