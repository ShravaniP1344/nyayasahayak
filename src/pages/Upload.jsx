import UploadBox from "../components/UploadBox"
import { Button } from "../components/ui/button"

export default function Upload({
  uploadedFile,
  setUploadedFile,
  userName,
  onNext,
  onBack,
  onError,
}) {
  const hasFile = Boolean(uploadedFile?.name)

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-50 px-6">
      <div className="w-full max-w-3xl">
        {userName ? (
          <p className="text-center text-sm font-medium text-indigo-700">Welcome, {userName}</p>
        ) : null}
        <h1 className="text-center text-3xl font-semibold text-slate-900">
          Upload your document
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Start with a rent agreement, contract, or policy file.
        </p>
        <div className="mt-8">
          <UploadBox onFileAccepted={setUploadedFile} onUploadError={onError} />
        </div>
        {hasFile ? (
          <p className="mt-3 text-center text-xs text-slate-500">
            Selected file: {uploadedFile.name}
          </p>
        ) : (
          <p className="mt-3 text-center text-xs text-slate-500">
            Please upload one document to proceed.
          </p>
        )}
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!hasFile}>
            Continue to Processing
          </Button>
        </div>
      </div>
    </main>
  )
}
