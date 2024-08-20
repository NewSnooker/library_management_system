export function generateSlug(title) {
  const slug = title
      .toLowerCase() // Convert the title to lowercase
      .trim() // Remove whitespace from both ends
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^\u0E00-\u0E7Fa-zA-Z0-9\-]+/g, "") // Remove non-word characters except dashes
      .replace(/-+/g, "-") // Replace multiple consecutive dashes with a single dash
      .replace(/^-+|-+$/g, ""); // Remove dashes from the beginning and end

  return slug;
}
