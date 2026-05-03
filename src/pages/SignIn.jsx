import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"

export default function SignIn({ onSignIn, onBack }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-50 px-6">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Sign in to continue</h1>
        <p className="mt-2 text-sm text-slate-500">
          Please sign in before uploading your legal document.
        </p>

        <div className="mt-5 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Name</label>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button className="flex-1" onClick={() => onSignIn(name.trim() || email.trim())}>
            Sign In
          </Button>
        </div>
      </Card>
    </main>
  )
}
