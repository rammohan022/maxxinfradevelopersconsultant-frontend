"use client";

import { useState, useMemo } from "react";
import {
  PeopleHeroSection,
  IntroSection,
  FilterSearchSection,
  RoleTabsSection,
  CTASection
} from '@/components/team';
import { StatsAchievements } from '@/components/about';
import MemberCard from "@/components/team/MemberCard";
import { useGetMembersQuery } from "@/services/member";
import { useGetServicesQuery } from "@/services/services";
import { Container } from "@/components/ui";

const OurTeamPage = () => {
  const { data: members = [], isLoading: loadingMembers } = useGetMembersQuery();
  const { data: practiceAreas = [] } = useGetServicesQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Professionals");

  const practiceAreaNames = useMemo(() =>
    practiceAreas.map(pa => pa.title),
    [practiceAreas]
  );

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = member.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPracticeArea = !selectedPracticeArea || member.practiceArea === selectedPracticeArea;
      const matchesCategory = activeCategory === "All Professionals" || member.category === activeCategory;
      const isActive = member.status === "Active";

      return matchesSearch && matchesPracticeArea && matchesCategory && isActive;
    });
  }, [members, searchQuery, selectedPracticeArea, activeCategory]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedPracticeArea("");
    setActiveCategory("All Professionals");
  };

  return (
    <>
      <PeopleHeroSection />
      <IntroSection />
      <FilterSearchSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPracticeArea={selectedPracticeArea}
        onPracticeAreaChange={setSelectedPracticeArea}
        practiceAreas={practiceAreaNames}
        onReset={handleReset}
      />
      <RoleTabsSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <section className="bg-gray-50 py-16 min-h-[400px]">
        <Container>
          {loadingMembers ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
            </div>
          ) : filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-serif text-gray-400">No professionals found matching your criteria.</h3>
              <button
                onClick={handleReset}
                className="mt-4 text-red-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </Container>
      </section>

      <StatsAchievements />
      <CTASection />
    </>
  );
};

export default OurTeamPage;