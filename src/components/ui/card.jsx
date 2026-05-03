import { cn } from "../../lib/utils"

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-[0_6px_24px_-18px_rgba(15,23,42,0.35)]",
        className,
      )}
      {...props}
    />
  )
}
