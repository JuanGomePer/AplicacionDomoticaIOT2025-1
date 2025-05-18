"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

export interface LogEntry {
  id: number
  timestamp: Date
  action: string
  device: string
}

interface LogContextType {
  logs: LogEntry[]
  addLog: (device: string, action: string) => void
}

const LogContext = createContext<LogContextType | undefined>(undefined)

export const useLogContext = () => {
  const context = useContext(LogContext)
  if (context === undefined) {
    throw new Error("useLogContext must be used within a LogProvider")
  }
  return context
}

interface LogProviderProps {
  children: ReactNode
}

export const LogProvider = ({ children }: LogProviderProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      action: "Encendido",
      device: "Luz Sala",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      action: "Apagado",
      device: "Sensor de Movimiento",
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      action: "Subida",
      device: "Persiana",
    },
  ])

  const addLog = (device: string, action: string) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date(),
      action,
      device,
    }
    setLogs([newLog, ...logs])
  }

  return <LogContext.Provider value={{ logs, addLog }}>{children}</LogContext.Provider>
}
