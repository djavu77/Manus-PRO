"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, ArrowUp } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [isAttaching, setIsAttaching] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [attachments, setAttachments] = useState<File[]>([])
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      router.push("/dashboard")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachments(Array.from(e.target.files))
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Image src="/placeholder.svg?height=32&width=32" alt="Dill CSI Logo" width={24} height={24} />
        </div>
        <span className="text-gray-700 font-medium">Dill CSI</span>
      </div>

      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-medium text-gray-700 mb-2">Olá, eu sou Dill CSI.</h1>
        <p className="text-2xl text-gray-400">O que posso fazer por você?</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="relative">
          <Input
            className="pr-24 py-6 text-base bg-white shadow-sm"
            placeholder="Dê uma tarefa para Dill CSI trabalhar..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 rounded-md bg-gray-100 hover:bg-gray-200"
              onClick={triggerFileInput}
            >
              <Paperclip className="h-4 w-4 mr-1" />
              Anexar
            </Button>

            <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <div className="w-4 h-4 rounded border border-gray-300"></div>
                Padrão
              </span>
              <Button type="submit" size="icon" variant="ghost" className="rounded-full bg-gray-100 hover:bg-gray-200">
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="bg-gray-100 rounded px-2 py-1 text-xs flex items-center">
                <span className="truncate max-w-[150px]">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </form>
    </main>
  )
}

