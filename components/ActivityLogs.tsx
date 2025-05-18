/* components/ActivityLogs.tsx */
"use client"

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useLogContext, type LogEntry } from "../context/LogContext"

export default function ActivityLogs() {
  const { logs, addLog } = useLogContext()

  /* ---------- Helpers ---------- */
  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
    })

  const refreshLogs = () => {
    // Ejemplo de inserción ficticia
    const actions = ["Encendido", "Apagado"]
    const devices = ["Luz Cocina", "Luz Baño", "Sensor de Movimiento"]

    const device = devices[Math.floor(Math.random() * devices.length)]
    const action = actions[Math.floor(Math.random() * actions.length)]

    addLog(device, action)
  }

  const renderLogItem = ({ item }: { item: LogEntry }) => (
    <View style={styles.logItem}>
      <View style={styles.logTime}>
        <Text style={styles.timeText}>{formatTime(item.timestamp)}</Text>
        <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
      </View>
      <View style={styles.logInfo}>
        <Text style={styles.deviceText}>{item.device}</Text>
        <Text style={styles.actionText}>{item.action}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.card}>
      {/* ---------- Encabezado ---------- */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Feather name="clock" size={20} color="white" />
          <Text style={styles.title}>Registro de Actividad</Text>
        </View>
        <TouchableOpacity onPress={refreshLogs} style={styles.refreshButton}>
          <Feather name="refresh-cw" size={16} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* ---------- Lista ---------- */}
      <View style={styles.content}>
        <FlatList
          data={logs}
          renderItem={renderLogItem}
          keyExtractor={(item) => item.id}
          style={styles.logList}
          contentContainerStyle={styles.logListContent}
        />
      </View>
    </View>
  )
}

/* ---------- Estilos ---------- */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111827",   // gray-900
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1f2937",       // gray-800
    marginBottom: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
  },
  logList: {
    height: 200,
  },
  logListContent: {
    gap: 12,
  },
  logItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937", // gray-800
    paddingBottom: 8,
  },
  logTime: {
    alignItems: "center",
    marginRight: 12,
  },
  timeText: {
    fontSize: 12,
    color: "#6b7280",             // gray-500
  },
  dateText: {
    fontSize: 12,
    color: "#6b7280",             // gray-500
  },
  logInfo: {
    flex: 1,
  },
  deviceText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  actionText: {
    fontSize: 12,
    color: "#9ca3af",             // gray-400
  },
})
