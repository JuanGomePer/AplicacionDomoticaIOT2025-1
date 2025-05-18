"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { ref, push, onChildAdded } from "firebase/database"
import { db } from "../lib/firebase"

export interface LogEntry {
  id: string
  timestamp: number
  device: string
  action: string
}

interface LogContextType {
  logs: LogEntry[]
  addLog: (device: string, action: string) => void
}

/* ➊ El generics permite undefined solo internamente */
const LogContext = createContext<LogContextType | undefined>(undefined)

/* ➋ Anotamos el tipo de retorno explícitamente */
export const useLogContext = (): LogContextType => {
  const context = useContext(LogContext)
  if (!context) throw new Error("useLogContext must be used within a LogProvider")
  return context          // ← ¡IMPORTANTE!
}

export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const logsRef = ref(db, "home/logs")

  /* Escucha en tiempo real */
  useEffect(() => {
    const unsub = onChildAdded(logsRef, snap => {
      const val = snap.val()
      setLogs(prev => [{ id: snap.key!, ...val }, ...prev])
    })
    return () => unsub()
  }, [])

  const addLog = (device: string, action: string) => {
    push(logsRef, { timestamp: Date.now(), device, action })
  }

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  )
}
