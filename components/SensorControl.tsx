"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Switch } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useLogContext } from "../context/LogContext"

export default function SensorControl() {
  const [isActive, setIsActive] = useState(true)
  const { addLog } = useLogContext()

  const toggleSensor = (value: boolean) => {
    setIsActive(value)
    // Add log entry when sensor is toggled
    addLog("Sensor de Movimiento", value ? "Activado" : "Desactivado")
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensor</Text>
        <Switch
          value={isActive}
          onValueChange={toggleSensor}
          trackColor={{ false: "#374151", true: "#9333ea" }}
          thumbColor="white"
        />
      </View>
      <View style={styles.content}>
        <Feather name={isActive ? "eye" : "eye-off"} size={40} color={isActive ? "#9333ea" : "#4b5563"} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111827", // gray-900
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1f2937", // gray-800
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
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
})
