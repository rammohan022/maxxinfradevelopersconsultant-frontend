"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Award, Users } from "lucide-react";

const FirmOverview = () => {
  return (
    <section id="firm-overview" className="py-16 md:py-20 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-secondary text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-secondary"></span> Who We Are
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-6 leading-snug">
              Transforming Real Estate with Trust, Integrity &amp;{" "}
              <span className="text-secondary">Direct Developer Value.</span>
            </h2>

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-8">
              <p>
                <strong>Maxx Infra Developers &amp; Consultant</strong> is a premier property development and advisory firm headquartered in Lucknow, with prominent projects across key highway growth corridors including Deva Road, Shaheed Path, Sultanpur Road, Outer Ring Road (Kisan Path), and the flagship Goyala City integrated township.
              </p>

              <p>
                Unlike conventional brokers, we operate with an end-to-end transparent developer model: <strong>100% legally verified titles</strong>, direct mutation assistance, zero hidden brokerage, and complete civil engineering oversight on all construction.
              </p>

              <p>
                From affordable 2 BHK and 3 BHK modern row houses to customized 4 BHK duplex villas and high-appreciation freehold residential plots, we empower home seekers and investors to secure prime properties with peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-2xl font-black text-primary">500+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Happy Families Settled</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-2xl font-black text-secondary">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Verified Titles &amp; Registry</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-primary text-white px-7 py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-md text-xs uppercase tracking-wider"
              >
                Schedule Site Visit
              </Link>

              <Link
                href="/properties"
                className="text-primary font-bold hover:text-secondary transition-colors text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                Browse Properties &rarr;
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative h-[420px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <Image
                src="/img/properties/villa_luxury.jpg"
                alt="Maxx Infra Modern Construction"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-white">
                <p className="text-xs font-bold uppercase text-secondary tracking-wider">Our Commitment</p>
                <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                  &ldquo;Clear Land, Quality Construction, On-Time Possession.&rdquo;
                </h4>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FirmOverview;
