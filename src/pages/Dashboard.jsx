import { useState } from "react"
import ClauseCard from "../components/ClauseCard"
import RiskMeter from "../components/RiskMeter"
import CaseList from "../components/CaseList"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Send } from "lucide-react"

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
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-50 px-6 py-10 pb-32">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-7">
        <section>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Document Analysis</h1>
              <p className="mt-1 text-sm text-slate-500">
                Structured legal review of your agreement with clear risk indicators.
              </p>
              {uploadedFile?.name ? (
                <p className="mt-1 text-xs text-slate-500">
                  Source file: {uploadedFile.name}
                </p>
              ) : null}
            </div>
            <Button variant="outline" onClick={onAnalyzeAnother}>
              Analyze Another Document
            </Button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <RiskMeter score={68} />
            </div>
            <Card className="p-5 md:col-span-2">
              <p className="text-sm font-semibold text-slate-900">Quick Summary</p>
              <p className="mt-2 text-sm text-slate-600">
                The agreement contains tenant-unfavorable terms related to notice
                period and security deposit handling. Revising these clauses can
                materially improve your legal position.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">High risk</p>
                  <p className="text-lg font-semibold text-red-600">2 clauses</p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">Medium risk</p>
                  <p className="text-lg font-semibold text-amber-600">1 clause</p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">Safe</p>
                  <p className="text-lg font-semibold text-green-600">3 clauses</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Clause Breakdown</h2>
          <div className="mt-3 space-y-3">
            {clauses.map((clause) => (
              <ClauseCard key={clause.snippet} clause={clause} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">What Should You Do</h2>
            <Card className="mt-3 p-5">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">Visual Insights</h2>
            <Card className="mt-3 p-5">
              <div className="space-y-4">
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
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Similar Cases</h2>
          <div className="mt-3">
            <CaseList cases={cases} />
          </div>
        </section>
      </div>

      <div className="fixed right-0 bottom-5 left-0 z-40 px-6">
        <div className="mx-auto w-full max-w-4xl">
          <Card className="p-3 backdrop-blur">
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
