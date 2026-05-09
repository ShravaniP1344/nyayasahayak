import { useMemo, useState } from "react"
import ClauseCard from "../components/ClauseCard"
import RiskMeter from "../components/RiskMeter"
import CaseList from "../components/CaseList"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Send, Sparkles } from "lucide-react"

const clauses = [
  {
    snippet: "Tenant shall vacate the premises within 24 hours of owner notice.",
    risk: "high",
    explanation:
      "This gives very little notice and can lead to sudden eviction pressure.",
    suggestion:
      "Tenant may vacate with at least 30 days written notice from the owner except for legal emergency conditions.",
  },
  {
    snippet: "Security deposit is non-refundable under all circumstances.",
    risk: "high",
    explanation:
      "A complete non-refundable condition is often unfair and can be challenged.",
    suggestion:
      "Security deposit shall be refundable after deductions for documented damages.",
  },
  {
    snippet: "Annual rent increase capped at 5% with prior written notice.",
    risk: "safe",
    explanation:
      "This is generally reasonable and gives predictable rent progression.",
    suggestion: "No major change required.",
  },
]

const cases = [
  {
    title: "Sharma vs Mehta (2019)",
    summary: "Court held that instant vacate clauses without fair notice are unenforceable.",
    link: "https://indiankanoon.org/",
    relevance: 92,
  },
  {
    title: "Kumar vs Skyline Rentals (2021)",
    summary: "Security deposit deductions required documented damages and receipts.",
    link: "https://indiankanoon.org/",
    relevance: 84,
  },
]

const actions = [
  "Negotiate a minimum 30-day notice period before eviction.",
  "Request explicit refund terms for security deposit deductions.",
  "Ask for a signed annexure with revised risky clauses.",
]

function useCardTilt() {
  const [style, setStyle] = useState({})

  const handlers = useMemo(() => {
    const onMouseMove = (event) => {
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const rx = (0.5 - py) * 8
      const ry = (px - 0.5) * 10

      setStyle({
        transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`,
      })
    }

    const onMouseLeave = () => {
      setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)" })
    }

    return { onMouseMove, onMouseLeave }
  }, [])

  return { style, ...handlers }
}

function ReactiveCard({ className = "", children }) {
  const tilt = useCardTilt()
  return (
    <Card
      {...tilt}
      style={tilt.style}
      className={[
        "relative overflow-hidden border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur transition-transform duration-150 will-change-transform",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition before:duration-200 before:content-['']",
        "before:bg-[radial-gradient(650px_circle_at_var(--mx,50%)_var(--my,50%),rgba(99,102,241,0.13),transparent_55%)]",
        "hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.55)] hover:before:opacity-100",
        className,
      ].join(" ")}
      onMouseMove={(event) => {
        event.currentTarget.style.setProperty("--mx", `${event.nativeEvent.offsetX}px`)
        event.currentTarget.style.setProperty("--my", `${event.nativeEvent.offsetY}px`)
        tilt.onMouseMove(event)
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.removeProperty("--mx")
        event.currentTarget.style.removeProperty("--my")
        tilt.onMouseLeave(event)
      }}
    >
      {children}
    </Card>
  )
}

export default function Dashboard({ onAnalyzeAnother, uploadedFile, onNotify }) {
  const [followUpQuery, setFollowUpQuery] = useState("")

  const handleFollowUp = () => {
    if (!followUpQuery.trim()) {
      onNotify?.("Please enter a follow-up question before sending.", "error")
      return
    }
    onNotify?.("Your follow-up question has been queued for AI review.", "success")
    setFollowUpQuery("")
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(140%_120%_at_15%_0%,rgba(99,102,241,0.20)_0%,rgba(15,23,42,0)_55%),radial-gradient(120%_120%_at_95%_10%,rgba(245,158,11,0.18)_0%,rgba(15,23,42,0)_60%)] bg-gradient-to-b from-indigo-50/60 via-slate-50 to-slate-50 px-6 py-10 pb-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
      >
        <div className="absolute -left-28 top-28 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-200/15 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <section className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/70 px-3 py-1 text-xs font-medium text-indigo-700 backdrop-blur">
                <Sparkles className="size-3.5" />
                Analysis ready
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Document Analysis
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                A structured legal review with clear risk signals and clause-by-clause guidance.
              </p>
              {uploadedFile?.name ? (
                <p className="mt-2 text-xs text-slate-500">
                  Source file: <span className="font-medium text-slate-700">{uploadedFile.name}</span>
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={onAnalyzeAnother}>
                Analyze Another Document
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ReactiveCard className="p-0">
              <div className="p-5">
                <RiskMeter score={68} />
              </div>
              <div className="border-t border-slate-200/70 bg-white/60 px-5 py-4">
                <p className="text-xs font-semibold tracking-wide text-slate-500">KEY COUNTS</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-slate-100/70 p-3">
                    <p className="text-[11px] text-slate-500">High risk</p>
                    <p className="mt-1 text-lg font-semibold text-red-600">2</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100/70 p-3">
                    <p className="text-[11px] text-slate-500">Medium</p>
                    <p className="mt-1 text-lg font-semibold text-amber-600">1</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100/70 p-3">
                    <p className="text-[11px] text-slate-500">Safe</p>
                    <p className="mt-1 text-lg font-semibold text-green-600">3</p>
                  </div>
                </div>
              </div>
            </ReactiveCard>

            <ReactiveCard>
              <p className="text-sm font-semibold text-slate-900">Quick Summary</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                The agreement contains tenant-unfavorable terms related to notice period and
                security deposit handling. Revising these clauses can materially improve your
                legal position.
              </p>
            </ReactiveCard>

            <ReactiveCard>
              <p className="text-sm font-semibold text-slate-900">What Should You Do</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {actions.map((action) => (
                  <li key={action} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-indigo-500" />
                    <span className="leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>
            </ReactiveCard>
          </aside>

          <div className="space-y-6">
            <section>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Clause Breakdown</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Expand a clause to see a safer alternative wording.
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {clauses.map((clause) => (
                  <ClauseCard key={clause.snippet} clause={clause} />
                ))}
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <ReactiveCard>
                <p className="text-sm font-semibold text-slate-900">Visual Insights</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-slate-600">Safe clauses</span>
                      <span className="font-medium text-green-700">35%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div className="h-full w-[35%] rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-slate-600">Medium risk clauses</span>
                      <span className="font-medium text-amber-700">25%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div className="h-full w-[25%] rounded-full bg-amber-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-slate-600">High risk clauses</span>
                      <span className="font-medium text-red-700">40%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div className="h-full w-[40%] rounded-full bg-red-500" />
                    </div>
                  </div>
                </div>
              </ReactiveCard>

              <ReactiveCard>
                <p className="text-sm font-semibold text-slate-900">Similar Cases</p>
                <p className="mt-2 text-sm text-slate-500">
                  A quick reference list (static demo data in this prototype).
                </p>
                <div className="mt-4">
                  <CaseList cases={cases} />
                </div>
              </ReactiveCard>
            </section>
          </div>
        </section>
      </div>

      <div className="fixed right-0 bottom-5 left-0 z-40 px-6">
        <div className="mx-auto w-full max-w-6xl">
          <Card className="border-slate-200/70 bg-white/85 p-3 shadow-lg backdrop-blur">
            <div className="flex items-center gap-2">
              <Input
                value={followUpQuery}
                onChange={(event) => setFollowUpQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleFollowUp()
                }}
                placeholder="Ask a follow-up question about this document"
              />
              <Button size="icon" aria-label="Send follow-up question" onClick={handleFollowUp}>
                <Send className="size-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
