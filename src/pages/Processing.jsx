import { useEffect, useMemo, useState } from "react"
import ProgressSteps from "../components/ProgressSteps"

const processingSteps = [
  { title: "Upload complete", message: "Your document is safely stored for analysis." },
  { title: "Extracting text", message: "Reading and structuring content from each page." },
  { title: "Analyzing clauses", message: "Detecting risky terms and legal obligations." },
  { title: "Generating explanation", message: "Converting legal language into plain words." },
  { title: "Done", message: "Your report is ready to review." },
]

export default function Processing({ onComplete, uploadedFile }) {
  const [activeStep, setActiveStep] = useState(0)

  const isDone = useMemo(
    () => activeStep === processingSteps.length - 1,
    [activeStep],
  )

  useEffect(() => {
    if (isDone) {
      const finish = setTimeout(onComplete, 1200)
      return () => clearTimeout(finish)
    }

    const timer = setTimeout(() => {
      setActiveStep((prev) => Math.min(prev + 1, processingSteps.length - 1))
    }, 1200)
    return () => clearTimeout(timer)
  }, [activeStep, isDone, onComplete])

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-50 px-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-center text-3xl font-semibold text-slate-900">
          Processing your document
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          {uploadedFile?.name
            ? `Analyzing ${uploadedFile.name}. This usually takes less than a minute.`
            : "Preparing your analysis. This usually takes less than a minute."}
        </p>
        <div className="mt-8">
          <ProgressSteps steps={processingSteps} activeStep={activeStep} />
        </div>
      </div>
    </main>
  )
}
