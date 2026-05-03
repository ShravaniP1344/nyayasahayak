import { useEffect, useMemo, useState } from "react"
import Landing from "./Landing"
import SignIn from "./SignIn"
import SignOut from "./SignOut"
import Upload from "./Upload"
import Processing from "./Processing"
import Dashboard from "./Dashboard"
import ChatWidget from "../components/ChatWidget"
import AppHeader from "../components/AppHeader"

const pageOrder = ["landing", "signin", "upload", "processing", "dashboard", "signout"]

export default function PagesApp() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [notice, setNotice] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")

  const showNotice = (message, tone = "error") => {
    setNotice({ message, tone })
  }

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 3200)
    return () => clearTimeout(timer)
  }, [notice])

  const goHome = () => {
    setUploadedFile(null)
    setCurrentPage("landing")
  }

  const goBack = () => {
    if (currentPage === "signin") {
      setCurrentPage("landing")
      return
    }
    if (currentPage === "upload") {
      setCurrentPage("landing")
      return
    }
    if (currentPage === "processing") {
      setCurrentPage("upload")
      return
    }
    if (currentPage === "dashboard") {
      setCurrentPage("upload")
    }
    if (currentPage === "signout") {
      setCurrentPage("landing")
    }
  }

  const startProcessing = () => {
    if (!uploadedFile?.name) {
      showNotice("Please upload a document before continuing.", "error")
      return
    }
    setCurrentPage("processing")
  }

  const handleStart = () => {
    if (isAuthenticated) {
      setCurrentPage("upload")
      return
    }
    setCurrentPage("signin")
  }

  const handleSignIn = (displayName) => {
    const normalizedName = displayName?.trim() || "User"
    setIsAuthenticated(true)
    setUserName(normalizedName)
    setCurrentPage("upload")
    showNotice(`Welcome, ${normalizedName}. You are signed in.`, "success")
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setUserName("")
    setUploadedFile(null)
    setCurrentPage("signout")
  }

  const page = useMemo(() => {
    switch (currentPage) {
      case "landing":
        return <Landing onNext={handleStart} />
      case "signin":
        if (isAuthenticated) {
          return <Upload
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            userName={userName}
            onBack={() => setCurrentPage("landing")}
            onError={(message) => showNotice(message, "error")}
            onNext={startProcessing}
          />
        }
        return <SignIn onSignIn={handleSignIn} onBack={() => setCurrentPage("landing")} />
      case "upload":
        if (!isAuthenticated) {
          return <SignIn onSignIn={handleSignIn} onBack={() => setCurrentPage("landing")} />
        }
        return (
          <Upload
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            userName={userName}
            onBack={() => setCurrentPage("signin")}
            onError={(message) => showNotice(message, "error")}
            onNext={startProcessing}
          />
        )
      case "processing":
        if (!isAuthenticated) {
          return <SignIn onSignIn={handleSignIn} onBack={() => setCurrentPage("landing")} />
        }
        if (!uploadedFile?.name) {
          return (
            <Upload
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              userName={userName}
              onBack={() => setCurrentPage("signin")}
              onError={(message) => showNotice(message, "error")}
              onNext={startProcessing}
            />
          )
        }
        return (
          <Processing
            uploadedFile={uploadedFile}
            onComplete={() => setCurrentPage("dashboard")}
          />
        )
      case "dashboard":
        if (!isAuthenticated) {
          return <SignIn onSignIn={handleSignIn} onBack={() => setCurrentPage("landing")} />
        }
        if (!uploadedFile?.name) {
          return <Landing onNext={handleStart} />
        }
        return (
          <Dashboard
            uploadedFile={uploadedFile}
            onNotify={showNotice}
            onAnalyzeAnother={() => {
              setUploadedFile(null)
              setCurrentPage("upload")
              showNotice("Ready for a new document upload.", "success")
            }}
          />
        )
      case "signout":
        return <SignOut onBackHome={() => setCurrentPage("landing")} />
      default:
        return <Landing onNext={handleStart} />
    }
  }, [currentPage, isAuthenticated, uploadedFile])

  return (
    <div>
      <div className="fixed top-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs text-slate-500 shadow-sm backdrop-blur">
        Step {pageOrder.indexOf(currentPage) + 1} / {pageOrder.length}
      </div>
      {notice ? (
        <div
          className={`fixed top-16 left-1/2 z-50 -translate-x-1/2 rounded-xl border px-4 py-2 text-sm shadow-md ${
            notice.tone === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.message}
        </div>
      ) : null}
      {currentPage !== "landing" ? (
        <AppHeader
          currentPage={currentPage}
          onHome={goHome}
          onBack={goBack}
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut}
        />
      ) : null}
      {page}
      <ChatWidget />
    </div>
  )
}
