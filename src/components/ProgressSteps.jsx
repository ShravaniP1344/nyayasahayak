import { CheckCircle2 } from "lucide-react"
import { Progress } from "./ui/progress"

export default function ProgressSteps({ steps, activeStep }) {
  const progress = ((activeStep + 1) / steps.length) * 100

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Progress value={progress} />
      <div className="mt-6 space-y-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep
          const isComplete = index < activeStep

          return (
            <div
              key={step.title}
              className={`rounded-xl border p-4 transition ${
                isActive
                  ? "border-violet-300 bg-violet-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 inline-flex size-6 items-center justify-center rounded-full ${
                    isComplete
                      ? "bg-green-500 text-white"
                      : isActive
                        ? "bg-violet-600 text-white"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {isComplete ? <CheckCircle2 className="size-4" /> : index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500">{step.message}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
