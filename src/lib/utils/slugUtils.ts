export const slugifyCategory = (name: string): string => {
  if (!name) return "general-services";
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const unslugifyCategory = (slug: string): string => {
  if (!slug) return "General Services";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
