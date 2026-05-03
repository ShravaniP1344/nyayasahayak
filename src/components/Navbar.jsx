import { Languages, Scale } from "lucide-react"
import { Button } from "./ui/button"

export default function Navbar({ onTrySample }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-slate-100">
      <div className="flex items-center gap-3 text-lg font-semibold">
        <div className="relative flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-300/90 via-rose-300/90 to-indigo-300/90 shadow-lg shadow-indigo-950/40 ring-1 ring-white/40">
          <Scale className="size-4 text-slate-900" strokeWidth={2.25} />
          <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-emerald-300 ring-2 ring-slate-900/30" />
        </div>
        <span className="tracking-tight">NyayaSahayak</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200/30 bg-slate-100/10 px-3 py-2 text-sm backdrop-blur-md transition hover:bg-slate-100/20">
          <Languages className="size-4" />
          EN / Hindi / Marathi
        </button>
        <Button
          variant="secondary"
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-900/30 hover:from-amber-400 hover:to-orange-400"
          onClick={onTrySample}
        >
          Try Sample
        </Button>
      </div>
    </header>
  )
}
