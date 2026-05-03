import { AlertTriangle } from "lucide-react"
import { Card } from "./ui/card"

export default function RiskMeter({ score }) {
  const color =
    score >= 70 ? "text-red-600" : score >= 40 ? "text-amber-600" : "text-green-600"

  return (
    <Card className="p-5">
      <p className="text-sm font-medium text-slate-600">Overall Risk Score</p>
      <div className="mt-3 flex items-end justify-between">
        <div className={`text-4xl font-semibold ${color}`}>{score}%</div>
        <AlertTriangle className={`size-5 ${color}`} />
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          style={{ width: `${score}%` }}
          className={`h-full rounded-full ${
            score >= 70 ? "bg-red-500" : score >= 40 ? "bg-amber-500" : "bg-green-500"
          }`}
        />
      </div>
    </Card>
  )
}
