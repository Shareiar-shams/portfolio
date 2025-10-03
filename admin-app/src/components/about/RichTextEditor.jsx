import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function RichTextEditor({ value, onChange }) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: TOOLBAR_OPTIONS,
  });

    // Set initial value only once when editor mounts
    useEffect(() => {
        if (quill && value) {
            quill.clipboard.dangerouslyPasteHTML(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quill, value]);

    // Listen for changes and update parent state
    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                onChange(quill.root.innerHTML);
            });
        }
    }, [quill, onChange]);

    return (
        <div className="rich-text-editor bg-gray-800/50 text-white rounded-lg p-2">
            <div ref={quillRef} />
        </div>
    );
}
