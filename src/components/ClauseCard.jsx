import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

const toneMap = {
  safe: "safe",
  medium: "medium",
  high: "high",
}

export default function ClauseCard({ clause }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">{clause.snippet}</p>
        <Badge tone={toneMap[clause.risk]}>{clause.risk.toUpperCase()} RISK</Badge>
      </div>
      <p className="mt-3 text-sm text-slate-600">{clause.explanation}</p>

      {expanded ? (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">BETTER VERSION</p>
          <p className="mt-1 text-sm text-slate-700">{clause.suggestion}</p>
        </div>
      ) : null}

      <Button
        variant="ghost"
        className="mt-3 h-8 px-2 text-indigo-700"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "Show less" : "Show better version"}
        {expanded ? (
          <ChevronUp className="ml-1 size-4" />
        ) : (
          <ChevronDown className="ml-1 size-4" />
        )}
      </Button>
    </Card>
  )
}
