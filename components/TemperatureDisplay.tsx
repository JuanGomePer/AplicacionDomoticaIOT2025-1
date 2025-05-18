"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

export default function TemperatureDisplay() {
  const [temperature, setTemperature] = useState(22.5)
  const [humidity, setHumidity] = useState(45)

  // Simulate temperature changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => {
        const change = (Math.random() - 0.5) * 0.2
        return +(prev + change).toFixed(1)
      })

      setHumidity((prev) => {
        const change = Math.round((Math.random() - 0.5) * 2)
        return Math.max(30, Math.min(70, prev + change))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Determine temperature color
  const getTemperatureColor = (temp: number) => {
    if (temp < 18) return "#3b82f6" // blue-500
    if (temp > 25) return "#ef4444" // red-500
    return "#10b981" // green-500
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Temperatura Actual</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.temperatureContainer}>
            <Feather name="thermometer" size={32} color="#9333ea" />
            <Text style={[styles.temperatureText, { color: getTemperatureColor(temperature) }]}>{temperature}°C</Text>
          </View>
          <Text style={styles.humidityText}>Humedad: {humidity}%</Text>
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
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  humidityText: {
    fontSize: 14,
    color: "#9ca3af", // gray-400
  },
})
