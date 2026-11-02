import type { Metadata } from 'next';
import { ContactHero, ContactForm, BranchOffices } from '@/components/contact';

export const metadata: Metadata = {
  title: 'Contact Us | Maxx Infra Developers & Consultant',
  description:
    'Get in touch with Maxx Infra Developers & Consultant. Book a free cab site inspection for villas, row houses, and plots in Lucknow and NCR.',
  openGraph: {
    title: 'Contact Us | Maxx Infra Developers & Consultant',
    description:
      'Book a free site inspection for villas, row houses, and plots in Lucknow S.C.R. Office: G-1 Shivani Arcade, Deva Road, Opp. Axis Bank, Lucknow. Call +91 79051 45968 / +91 63861 00070.',
    url: 'https://maxxinfradevelopersconsultant.com/contact',
    siteName: 'Maxx Infra Developers & Consultant',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <BranchOffices />
    </>
  );
}
