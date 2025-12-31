import { useEffect, useRef } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"

const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null)
    const quill = useRef(null)

    useEffect(() => {
        if (quill.current) return

        quill.current = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
                toolbar: [
                    ["bold", "italic"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                ],
            },
        })

        quill.current.on("text-change", () => {
            onChange(quill.current.root.innerHTML)
        })
    }, [])

    return (
        <div className="bg-white rounded-2xl shadow">
            <div ref={editorRef} className="min-h-[320px]" />
        </div>
    )
}

export default RichTextEditor;
