import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-indigo-700 text-white shadow-sm hover:bg-indigo-800",
        secondary: "bg-amber-600 text-white shadow-sm hover:bg-amber-700",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
        outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-11 px-6 py-2.5",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
