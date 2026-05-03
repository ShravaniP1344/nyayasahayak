import { ArrowLeft, Scale } from "lucide-react"
import { Button } from "./ui/button"

export default function AppHeader({ currentPage, onHome, onBack, isAuthenticated, onSignOut }) {
  const pageTitleMap = {
    signin: "Sign In",
    upload: "Upload Document",
    processing: "Document Processing",
    dashboard: "Analysis Results",
    signout: "Sign Out",
  }

  const pageSubtitleMap = {
    signin: "Sign in to upload and analyze your documents.",
    upload: "Add your legal file to begin the guided review.",
    processing: "We are extracting and analyzing key legal clauses.",
    dashboard: "Review risks, insights, and recommended next actions.",
    signout: "You have securely ended your current session.",
  }

  return (
    <header className="sticky top-0 z-40 border-b border-indigo-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-xl px-2 py-1 text-slate-900 transition hover:bg-slate-100"
            onClick={onHome}
            aria-label="Go to home page"
          >
            <Scale className="size-5 text-indigo-700" />
            <span className="text-base font-semibold">NyayaSahayak</span>
          </button>
          <span className="hidden text-xs text-slate-400 md:inline">|</span>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-800">{pageTitleMap[currentPage]}</p>
            <p className="text-xs text-slate-500">{pageSubtitleMap[currentPage]}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated && currentPage !== "signin" && currentPage !== "signout" ? (
            <Button variant="outline" size="default" onClick={onSignOut}>
              Sign Out
            </Button>
          ) : null}
          <Button variant="outline" size="default" onClick={onBack}>
            <ArrowLeft className="mr-1 size-4" />
            Back
          </Button>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-200 via-amber-200 to-indigo-200" />
    </header>
  )
}
