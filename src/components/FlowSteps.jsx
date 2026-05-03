import { FileUp, SearchCheck, Sparkles, ShieldCheck } from "lucide-react"

const steps = [
  { label: "Upload", icon: FileUp, detail: "Securely add your legal document" },
  { label: "Analyze", icon: SearchCheck, detail: "AI highlights key obligations and risks" },
  { label: "Simplify", icon: Sparkles, detail: "Get plain-language summaries in seconds" },
  { label: "Decide", icon: ShieldCheck, detail: "Take informed action with confidence" },
]

export default function FlowSteps() {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 px-6 pb-14 md:grid-cols-4">
      {steps.map(({ label, icon: Icon, detail }, idx) => (
        <div
          key={label}
          className="group rounded-2xl border border-white/20 bg-white/8 p-4 text-slate-100 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/14"
        >
          <div className="mb-2 inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-white/30 to-white/10 ring-1 ring-white/30">
            <Icon className="size-4 transition group-hover:scale-105" />
          </div>
          <p className="text-sm font-medium">{label}</p>
          {idx < steps.length - 1 ? (
            <p className="text-xs text-slate-300">{detail}</p>
          ) : (
            <p className="text-xs text-slate-300">{detail}</p>
          )}
        </div>
      ))}
    </div>
  )
}
