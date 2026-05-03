import { cn } from "../../lib/utils"

const styles = {
  safe: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
}

export function Badge({ className, tone = "safe", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
