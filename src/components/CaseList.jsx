import { ExternalLink, Scale } from "lucide-react"
import { Card } from "./ui/card"

export default function CaseList({ cases }) {
  return (
    <div className="space-y-3">
      {cases.map((item) => (
        <Card key={item.title} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Scale className="size-4 text-violet-600" />
                {item.title}
              </p>
              <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-violet-700 hover:underline"
            >
              Open
              <ExternalLink className="size-3" />
            </a>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200">
            <div
              style={{ width: `${item.relevance}%` }}
              className="h-full rounded-full bg-violet-500"
            />
          </div>
        </Card>
      ))}
    </div>
  )
}
