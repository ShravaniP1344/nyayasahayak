import { cn } from "../../lib/utils"

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "min-h-20 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-violet-500 transition focus:ring-2",
        className,
      )}
      {...props}
    />
  )
}
