"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useLogContext } from "../context/LogContext"

export default function BlindsControl() {
  const [position, setPosition] = useState(50) // 0 = fully down, 100 = fully up
  const { addLog } = useLogContext()

  const moveUp = () => {
    if (position < 100) {
      const newPosition = Math.min(100, position + 25)
      setPosition(newPosition)
      addLog("Persiana", "Subida")
    }
  }

  const moveDown = () => {
    if (position > 0) {
      const newPosition = Math.max(0, position - 25)
      setPosition(newPosition)
      addLog("Persiana", "Bajada")
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Persiana</Text>
      </View>
      <View style={styles.content}>
        <Feather name="grid" size={40} color="#9333ea" />

        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, position >= 100 && styles.buttonDisabled]}
            onPress={moveUp}
            disabled={position >= 100}
          >
            <Feather name="arrow-up" size={16} color="white" />
          </TouchableOpacity>

          <View style={styles.positionBadge}>
            <Text style={styles.positionText}>{position}%</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, position <= 0 && styles.buttonDisabled]}
            onPress={moveDown}
            disabled={position <= 0}
          >
            <Feather name="arrow-down" size={16} color="white" />
          </TouchableOpacity>
        </View>
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
    gap: 16,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#1f2937", // gray-800
    borderWidth: 1,
    borderColor: "#374151", // gray-700
    borderRadius: 4,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  positionBadge: {
    backgroundColor: "#9333ea", // purple-600
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  positionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
})
