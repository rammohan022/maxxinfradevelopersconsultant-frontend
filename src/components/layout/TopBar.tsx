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
            href="mailto:elsattorney@gmail.com"
            className="hover:text-primary transition"
          >
            elsattorney@gmail.com
          </a>
          <a
            href="tel:+911142502484"
            className="hover:text-primary transition"
          >
            +91-1142502484
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-primary transition">
            <Facebook size={16} strokeWidth={1.8} />
          </Link>
          <Link href="#" className="hover:text-primary transition">
            <Twitter size={16} strokeWidth={1.8} />
          </Link>
          <Link href="#" className="hover:text-primary transition">
            <Linkedin size={16} strokeWidth={1.8} />
          </Link>
          <Link href="#" className="hover:text-primary transition">
            <Instagram size={16} strokeWidth={1.8} />
          </Link>
        </div>

      </Container>
    </div>
  );
}
