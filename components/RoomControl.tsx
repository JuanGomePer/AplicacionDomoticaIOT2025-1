"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Switch } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useLogContext } from "../context/LogContext"

interface RoomControlProps {
  roomName: string
}

export default function RoomControl({ roomName }: RoomControlProps) {
  const [isOn, setIsOn] = useState(false)
  const { addLog } = useLogContext()

  const toggleLight = (value: boolean) => {
    setIsOn(value)
    // Add log entry when light is toggled
    addLog(`Luz ${roomName}`, value ? "Encendido" : "Apagado")
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{roomName}</Text>
        <Switch
          value={isOn}
          onValueChange={toggleLight}
          trackColor={{ false: "#374151", true: "#9333ea" }}
          thumbColor="white"
        />
      </View>
      <View style={styles.content}>
        <Feather name="sun" size={48} color={isOn ? "#facc15" : "#4b5563"} />
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
