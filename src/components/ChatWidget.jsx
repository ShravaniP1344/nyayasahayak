import { useState } from "react"
import { MessageCircle, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"

const prompts = [
  "Explain like I'm 5",
  "Is this safe?",
  "Show risky clauses only",
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {open ? (
        <Card className="mb-3 w-[330px] p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold text-slate-900">AI Legal Assistant</p>
            <button
              className="text-xs text-slate-500 hover:text-slate-700"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="space-y-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                className="block w-full rounded-xl bg-slate-100 px-3 py-2 text-left text-xs text-slate-700 transition hover:bg-slate-200"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input placeholder="Ask anything about your document" />
            <Button size="icon" aria-label="Send">
              <Send className="size-4" />
            </Button>
          </div>
        </Card>
      ) : null}
      <Button
        size="icon"
        className="size-12 rounded-full shadow-lg"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open AI chat"
      >
        <MessageCircle className="size-5" />
      </Button>
    </div>
  )
}
