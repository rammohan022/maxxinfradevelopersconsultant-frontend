"use client";

import Image from "next/image";
import { Briefcase, MapPin } from "lucide-react";
import { TeamMember } from "@/services/member";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils/imageUtils";

interface MemberCardProps {
    member: TeamMember;
}

const MemberCard = ({ member }: MemberCardProps) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
            }}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 block"
        >
            <div className="relative h-72 sm:h-80 bg-gray-100 overflow-hidden">
                <Image
                    src={getImageUrl(member.profileImage) || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"}
                    alt={member.fullName}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 relative bg-white flex flex-col h-full">
                <h3 className="mb-1 font-serif-heading text-xl md:text-2xl font-bold text-primary transition-colors line-clamp-1">
                    {member.fullName}
                </h3>
                <p className="mb-4 text-xs font-semibold text-primary tracking-wider">
                    {member.designation}
                </p>

                {member.shortBio && (
                    <p className="mb-5 text-sm leading-relaxed text-gray-600 line-clamp-3">
                        {member.shortBio}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500 font-medium mt-auto">
                    {member.practiceArea && (
                        <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                            <Briefcase size={14} className="text-primary/70" />
                            {member.practiceArea}
                        </span>
                    )}
                    {member.location && (
                        <span className="flex items-center gap-2 group-hover:text-navy transition-colors">
                            <MapPin size={14} className="text-primary/70" />
                            {member.location}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MemberCard;
