export const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "";

    // If it's already an absolute URL or a local blob/data URL, return it as is
    if (
        imagePath.startsWith("http://") ||
        imagePath.startsWith("https://") ||
        imagePath.startsWith("blob:") ||
        imagePath.startsWith("data:")
    ) {
        return imagePath;
    }

    // Get base URL from environment variables, fallback to specified localhost if not found
    // We check both NEXT_PUBLIC_API_BASE_URL (client-side) and baseUrl (as potentially defined in .env)
    const baseUrlValue = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || 
                    (process.env as any).baseUrl?.trim() || 
                    "http://localhost:3003/";

    // Clean base URL to remove trailing slash for consistency
    const cleanBaseUrl = baseUrlValue.endsWith("/") ? baseUrlValue.slice(0, -1) : baseUrlValue;

    // Clean image path to ensure it starts with a single slash for comparison
    const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    // If it's an API-sourced image (starts with /uploads/), prepend the base URL
    if (normalizedPath.startsWith("/uploads/")) {
        return `${cleanBaseUrl}${normalizedPath}`;
    }

    // Otherwise, treat it as a static frontend image and return it with a leading slash
    return normalizedPath;
};
