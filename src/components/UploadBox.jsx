import { useRef, useState } from "react"
import { FileText, UploadCloud } from "lucide-react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"

const allowedExtensions = ["pdf", "doc", "docx", "txt"]
const maxFileSizeInBytes = 8 * 1024 * 1024

export default function UploadBox({ onFileAccepted, onUploadError }) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState("")
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return

    const extension = file.name.split(".").pop()?.toLowerCase()
    if (!extension || !allowedExtensions.includes(extension)) {
      onUploadError?.("Unsupported file type. Please upload PDF, DOC, DOCX, or TXT.")
      return
    }

    if (file.size > maxFileSizeInBytes) {
      onUploadError?.("File size exceeds 8 MB. Please upload a smaller document.")
      return
    }

    setFileName(file.name)
    onFileAccepted({
      name: file.name,
      size: file.size,
      type: extension,
      uploadedAt: Date.now(),
    })
  }

  return (
    <Card
      className={`mx-auto w-full max-w-2xl p-8 transition ${
        isDragging ? "scale-[1.01] border-indigo-400 shadow-lg" : "hover:shadow-md"
      }`}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setIsDragging(false)
        handleFile(event.dataTransfer.files?.[0])
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <UploadCloud className="size-7" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Upload your legal document</h2>
        <p className="mt-2 text-sm text-slate-500">
          Drag and drop your file here, or choose it manually.
        </p>

        <Button
          className="mt-6"
          onClick={() => inputRef.current?.click()}
        >
          Choose File
        </Button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        {fileName ? (
          <div className="mt-6 flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
            <FileText className="size-5 text-violet-600" />
            <div>
              <p className="text-sm font-medium text-slate-800">File ready</p>
              <p className="text-xs text-slate-500">{fileName}</p>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  )
}
