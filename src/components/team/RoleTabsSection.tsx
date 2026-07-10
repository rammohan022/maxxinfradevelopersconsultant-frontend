import { Container } from "@/components/ui"

interface RoleTabsSectionProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All Professionals",
  "Leadership",
  "Managing Partners",
  "Senior Partners",
  "Partners",
  "Senior Practitioners",
  "Principal Associates",
  "Senior Associates",
  "Associates",
  "Heads of Department"
];

const RoleTabsSection = ({ activeCategory, onCategoryChange }: RoleTabsSectionProps) => {
  return (
    <section
      id="role-tabs-section"
      className="border-b border-gray-200 bg-white"
    >
      <Container>
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap px-6 py-4 text-sm font-medium transition ${activeCategory === category
                  ? "border-b-4 border-red-700 bg-red-600 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-red-600"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RoleTabsSection;
