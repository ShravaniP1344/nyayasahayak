import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"

export default function SignOut({ onBackHome }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-50 px-6">
      <Card className="w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">You are signed out</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your session ended successfully. Sign in again whenever you want to analyze documents.
        </p>
        <Button className="mt-5 w-full" onClick={onBackHome}>
          Back to Home
        </Button>
      </Card>
    </main>
  )
}
