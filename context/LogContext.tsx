"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { db } from "../lib/firebase";
import { push, ref, onChildAdded } from "firebase/database";

export interface LogEntry {
  id: string;
  timestamp: number;
  action: string;
  device: string;
}

interface LogContextType {
  logs: LogEntry[];
  addLog: (device: string, action: string) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const useLogContext = () => {
  const ctx = useContext(LogContext);
  if (!ctx) throw new Error("useLogContext must be used within LogProvider");
  return ctx;
};

export function LogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logsRef = ref(db, "home/logs");

  /* --- Escucha en tiempo real --- */
  useEffect(() => {
    const unsubscribe = onChildAdded(logsRef, (snap) => {
      const val = snap.val();
      setLogs((prev) => [{ id: snap.key!, ...val }, ...prev]);
    });
    return () => unsubscribe();
  }, []);

  const addLog = (device: string, action: string) => {
    push(logsRef, { timestamp: Date.now(), device, action });
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
}
