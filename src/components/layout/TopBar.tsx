import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Container } from "@/components/ui";

export default function TopBar() {
  return (
    <div className="bg-navy text-white py-2 text-sm hidden lg:block">
      <Container className="flex justify-between items-center">

        {/* Left: Email & Phone */}
        <div className="flex gap-6">
          <a
            href="mailto:hello@peopleconsultings.com"
            className="hover:text-secondary transition"
          >
            hello@peopleconsultings.com
          </a>
          <a
            href="tel:+918800177307"
            className="hover:text-secondary transition"
          >
            +91 8800177307
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-secondary transition">
            <Facebook size={16} strokeWidth={1.8} />
          </Link>
          <Link href="#" className="hover:text-secondary transition">
            <Twitter size={16} strokeWidth={1.8} />
          </Link>
          <Link href="https://www.linkedin.com/company/people-consulting-services/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">
            <Linkedin size={16} strokeWidth={1.8} />
          </Link>
          <Link href="https://www.instagram.com/peopleconsultco?igsh=bGNkZzVoeDNoMGl2" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">
            <Instagram size={16} strokeWidth={1.8} />
          </Link>
        </div>

      </Container>
    </div>
  );
}
