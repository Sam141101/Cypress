// components/SafeContent.js
import sanitizeHtml from 'sanitize-html';

export default function Injection({ content }) {
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: [], // Không cho phép bất kỳ tag nào
    allowedAttributes: {}, // Không cho phép thuộc tính
  });
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}