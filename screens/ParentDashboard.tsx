import { View, StyleSheet, ScrollView } from "react-native"
import BlindsControl from "../components/BlindsControl"
import RoomControl from "../components/RoomControl"
import SensorControl from "../components/SensorControl"
import TemperatureDisplay from "../components/TemperatureDisplay"
import ActivityLogs from "../components/ActivityLogs"

export default function ParentDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <BlindsControl />
          </View>
          <View style={styles.halfWidth}>
            <SensorControl />
          </View>
        </View>

        <RoomControl roomName="Zona Exterior" />
        <RoomControl roomName="Sala" />
        <RoomControl roomName="Cocina" />
        <RoomControl roomName="Baño" />
        <RoomControl roomName="Cuarto de Padres" />

        <TemperatureDisplay />
        <ActivityLogs />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712", // gray-950
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
    marginRight: 8,
  },
})
