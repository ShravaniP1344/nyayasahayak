import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import FlowSteps from "../components/FlowSteps"

export default function Landing({ onNext }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(130%_120%_at_10%_0%,#4338ca_0%,#111827_38%,#0f172a_65%,#020617_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
      >
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar onTrySample={onNext} />
        <Hero onUploadClick={onNext} />
        <FlowSteps />
      </div>
    </main>
  )
}
