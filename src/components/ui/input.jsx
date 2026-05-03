import { cn } from "../../lib/utils"

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none ring-violet-500 transition focus:ring-2",
        className,
      )}
      {...props}
    />
  )
}
