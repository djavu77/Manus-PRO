"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Terminal, FileText, Eye, ArrowDown, ArrowUp, Edit, Send } from "lucide-react"

interface DashboardContentProps {
  activeTask: string
  commandOutput: string[]
}

export function DashboardContent({ activeTask, commandOutput }: DashboardContentProps) {
  const [activities, setActivities] = useState([
    {
      id: 1,
      text: "Iniciando extração e análise de currículos para candidatos a engenheiro de algoritmos de RL.",
      command: "mkdir -p curriculos && unzip -o upload/curriculos_1_a_10.zip -d curriculos",
      status: "completed",
      type: "command",
    },
    {
      id: 2,
      text: "Criando lista de tarefas para acompanhar progresso da análise de currículos.",
      status: "completed",
      type: "file",
      filename: "todo.md",
    },
    {
      id: 3,
      text: "Criar lista de tarefas de revisão de candidatos",
      status: "completed",
      type: "task",
    },
    {
      id: 4,
      text: "Começando a ler e analisar cada currículo, focando em expertise em RL e experiência em projetos.",
      status: "completed",
      type: "browse",
      path: "file:///home/ubuntu/curriculos/curriculo_1.pdf",
    },
    {
      id: 5,
      text: "Ler e analisar currículos individuais",
      status: "in-progress",
      type: "task",
    },
    {
      id: 6,
      text: "Continuando a ler e analisar currículos, focando em expertise em RL e experiência em projetos.",
      status: "in-progress",
      type: "view",
    },
    {
      id: 7,
      text: "Continuando a ler e analisar currículos, solucionando problemas de visualização de PDF.",
      status: "in-progress",
      type: "scroll",
    },
    {
      id: 8,
      text: "Analisando conteúdo do currículo para candidato 1, focando em experiência relacionada a RL.",
      status: "in-progress",
      type: "scroll-top",
    },
    {
      id: 9,
      text: "Analisando conteúdo do currículo para candidato 1 (Amélia Martins), focando em experiência relacionada a RL.",
      status: "in-progress",
      type: "file",
      filename: "perfis_candidatos/amelia_martins.md",
    },
    {
      id: 10,
      text: "Continuando a analisar currículos restantes, focando em expertise em RL e experiência em projetos.",
      status: "in-progress",
      type: "edit",
      filename: "todo.md",
    },
    {
      id: 11,
      text: "Continuando a analisar currículos restantes, focando em expertise em RL e experiência em projetos.",
      status: "thinking",
      type: "thinking",
    },
  ])
  const [message, setMessage] = useState("")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "command":
        return <Terminal className="h-4 w-4" />
      case "file":
        return <FileText className="h-4 w-4" />
      case "browse":
      case "view":
        return <Eye className="h-4 w-4" />
      case "scroll":
        return <ArrowDown className="h-4 w-4" />
      case "scroll-top":
        return <ArrowUp className="h-4 w-4" />
      case "edit":
        return <Edit className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Add user message to activities
      setActivities((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: message,
          status: "completed",
          type: "user-message",
        },
      ])
      setMessage("")
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <h1 className="text-lg font-medium">{activeTask}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activities.map((activity) => (
          <div key={activity.id} className="mb-6">
            <p className="text-sm text-gray-700 mb-2">{activity.text}</p>

            {activity.type === "command" && (
              <div className="bg-gray-100 p-2 rounded text-xs font-mono flex items-center gap-2">
                <Terminal className="h-4 w-4 text-gray-500" />
                <span>{activity.command}</span>
              </div>
            )}

            {activity.type === "file" && (
              <div className="bg-gray-100 p-2 rounded text-xs font-mono flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span>Criando arquivo {activity.filename}</span>
              </div>
            )}

            {activity.type === "browse" && (
              <div className="bg-gray-100 p-2 rounded text-xs font-mono flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>Navegando {activity.path}</span>
              </div>
            )}

            {activity.type === "view" && (
              <div className="bg-gray-100 p-2 rounded text-xs font-mono flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>Visualizando a página</span>
              </div>
            )}

            {activity.type === "scroll" && (
              <div className="bg-gray-100 p-2 rounded text-xs font-mono flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-gray-500" />
                <span>Rolando para baixo</span>
              </div>
            )}

            {activity.type === "scroll-top" && (
              <div className="bg-gray-100 p-2 rounded text-xs font-mono flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-gray-500" />
                <span>Rolando para o topo</span>
              </div>
            )}

            {activity.type === "edit" && (
              <div className="bg-gray-100 p-2 rounded text-xs font-mono flex items-center gap-2">
                <Edit className="h-4 w-4 text-gray-500" />
                <span>Editando arquivo {activity.filename}</span>
              </div>
            )}

            {activity.type === "thinking" && (
              <div className="flex items-center gap-2 text-blue-500">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Pensando</span>
              </div>
            )}

            {activity.type === "user-message" && (
              <div className="bg-blue-50 p-2 rounded text-sm">
                <span>{activity.text}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            placeholder="Mensagem para Dill CSI"
            className="flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

