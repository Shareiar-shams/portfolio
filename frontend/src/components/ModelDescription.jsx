import DOMPurify from "dompurify";

function fixQuillLists(html) {
  let fixed = html;

  // Convert <ol><li data-list="bullet"> into <ul><li>
  fixed = fixed.replace(/<ol[^>]*>\s*<li[^>]*data-list="bullet"[^>]*>/g, "<ul><li>");
  
  // Convert subsequent <li data-list="bullet"> into normal <li>
  fixed = fixed.replace(/<li[^>]*data-list="bullet"[^>]*>/g, "<li>");

  // Close </ul> instead of </ol> where bullets were used
  fixed = fixed.replace(/<\/ol>/g, "</ul>");

  return fixed;
}

export default function ModelDescription({ description }) {
  const cleanHtml = DOMPurify.sanitize(fixQuillLists(description));
  return (
    <div
      className="prose prose-sm text-gray-400 mt-2 max-w-full [&_strong]:text-gray-400 [&_b]:text-gray-400"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
