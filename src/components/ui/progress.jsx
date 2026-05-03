import { cn } from "../../lib/utils"

export function Progress({ value = 0, className }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className="h-full rounded-full bg-violet-600 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
