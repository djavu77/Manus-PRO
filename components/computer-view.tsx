"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Play, Pause, SkipBack, SkipForward } from "lucide-react"

interface ComputerViewProps {
  currentFile: string
  fileContent: string
  setFileContent: (content: string) => void
}

export function ComputerView({ currentFile, fileContent, setFileContent }: ComputerViewProps) {
  const [isLive, setIsLive] = useState(true)
  const [progress, setProgress] = useState(80)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Computador do Dill CSI</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span className="bg-gray-100 px-2 py-0.5 rounded">Editor</span>
            <span>{currentFile}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden">
        <Tabs defaultValue="todo" className="h-full flex flex-col">
          <div className="flex justify-between mb-2">
            <TabsList>
              <TabsTrigger value="todo">{currentFile}</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <span className="text-xs">D</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <span className="text-xs">O</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <span className="text-xs">M</span>
              </Button>
            </div>
          </div>

          <TabsContent value="todo" className="mt-0 flex-1 overflow-hidden">
            <div className="border rounded-md p-4 font-mono text-sm h-full overflow-y-auto">
              <textarea
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                className="w-full h-full outline-none resize-none"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {isLive ? (
              <Button variant="ghost" size="icon" onClick={() => setIsLive(false)}>
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsLive(true)}>
                <Play className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className={`flex items-center gap-1 ${isLive ? "text-green-500" : "text-gray-500"}`}>
            <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500" : "bg-gray-500"}`}></div>
            <span className="text-xs">ao vivo</span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

