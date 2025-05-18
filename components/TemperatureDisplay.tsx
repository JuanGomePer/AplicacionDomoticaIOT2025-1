/* components/TemperatureDisplay.tsx */
"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import { ref, onValue } from "firebase/database"
import { db } from "../lib/firebase"          // ← tu inicialización global

export default function TemperatureDisplay() {
  const [temperature, setTemperature] = useState<number | null>(null)
  const [humidity, setHumidity]       = useState<number | null>(null)

  /* --- Suscribirse a tiempo real en Firebase --- */
  useEffect(() => {
    const tempRef = ref(db, "home/environment/temperature")
    const humRef  = ref(db, "home/environment/humidity")

    const offTemp = onValue(tempRef, snap => {
      if (snap.exists()) setTemperature(snap.val())
    })
    const offHum  = onValue(humRef, snap => {
      if (snap.exists()) setHumidity(snap.val())
    })

    return () => { offTemp(); offHum() }      // Limpieza al desmontar
  }, [])

  /* --- Color según rango --- */
  const getColor = (t: number | null) => {
    if (t === null) return "#9ca3af"          // gris mientras llega dato
    if (t < 18)  return "#3b82f6"             // azul
    if (t > 25)  return "#ef4444"             // rojo
    return "#10b981"                          // verde
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Temperatura Actual</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.tempContainer}>
            <Feather name="thermometer" size={32} color="#9333ea" />
            <Text style={[styles.tempText, { color: getColor(temperature) }]}>
              {temperature !== null ? `${temperature}°C` : "--.-°C"}
            </Text>
          </View>

          <Text style={styles.humText}>
            Humedad: {humidity !== null ? `${humidity}%` : "--%"}
          </Text>
        </View>
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
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tempText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  humText: {
    fontSize: 14,
    color: "#9ca3af",             // gray-400
  },
})
