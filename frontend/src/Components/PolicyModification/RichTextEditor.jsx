import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const quill = useRef(null);

    // 1️⃣ Initialize Quill once
    useEffect(() => {
        if (quill.current) return;

        quill.current = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
                toolbar: [
                    ["bold", "italic"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                ],
            },
        });

        quill.current.on("text-change", () => {
            onChange(quill.current.root.innerHTML);
        });
    }, [onChange]);

    // 2️⃣ Update Quill content when value changes
    useEffect(() => {
        if (!quill.current) return;   // wait for Quill
        if (value == null) return;     // ignore null/undefined

        const currentHTML = quill.current.root.innerHTML;
        if (value !== currentHTML) {
            // Use dangerouslyPasteHTML to render full HTML correctly
            quill.current.clipboard.dangerouslyPasteHTML(value);
        }
    }, [value]);

    return (
        <div className="bg-white rounded-2xl shadow">
            <div ref={editorRef} className="min-h-[320px] p-4" />
        </div>
    );
};

export default RichTextEditor;
