import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"

export default function Hero({ onUploadClick }) {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-16 text-center text-slate-100">
      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium tracking-wide text-sky-100 backdrop-blur-md">
        India-first legal guidance
      </span>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
        Understand Legal Documents
        <span className="mt-2 block bg-gradient-to-r from-amber-200 via-rose-200 to-sky-200 bg-clip-text text-transparent">
          with clarity and confidence
        </span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200/90 md:text-lg">
        Upload agreements, detect risky clauses, and get plain-language guidance
        tailored for Indian users before you sign.
      </p>
      <Button
        size="lg"
        className="mt-8 bg-gradient-to-r from-slate-100 to-white text-indigo-900 shadow-xl shadow-indigo-950/30 hover:scale-[1.02] hover:from-white hover:to-slate-100"
        onClick={onUploadClick}
      >
        Upload Document
        <ArrowRight className="ml-2 size-4" />
      </Button>
      <p className="mt-4 text-sm text-slate-300">
        Powered by AI, legal data, and local language context
      </p>
    </section>
  )
}
