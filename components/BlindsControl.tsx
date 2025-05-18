"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { ref, onValue, set } from "firebase/database"
import { db } from "../lib/firebase"
import { useLogContext } from "../context/LogContext"

export default function BlindsControl() {
  // ----------- NUEVA LÓGICA: arriba (true) / abajo (false) -----------
  const [isUp, setIsUp] = useState(false)
  const { addLog } = useLogContext()
  const blindsRef = ref(db, "home/blinds/isUp")

  /* --- Sincroniza con Firebase --- */
  useEffect(() => {
    const unsub = onValue(blindsRef, snap => {
      if (snap.exists()) setIsUp(!!snap.val())
    })
    return () => unsub()
  }, [])

  const moveUp = () => {
    if (!isUp) {
      set(blindsRef, true)
      addLog("Persiana", "Subida")
    }
  }

  const moveDown = () => {
    if (isUp) {
      set(blindsRef, false)
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
            style={[styles.button, isUp && styles.buttonDisabled]}
            onPress={moveUp}
            disabled={isUp}
          >
            <Feather name="arrow-up" size={16} color="white" />
          </TouchableOpacity>

          <View style={styles.positionBadge}>
            <Text style={styles.positionText}>{isUp ? "Arriba" : "Abajo"}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, !isUp && styles.buttonDisabled]}
            onPress={moveDown}
            disabled={!isUp}
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
    backgroundColor: "#111827",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1f2937",
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
    backgroundColor: "#1f2937",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 4,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  positionBadge: {
    backgroundColor: "#9333ea",
    borderRadius: 16,
    width: 60,
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
