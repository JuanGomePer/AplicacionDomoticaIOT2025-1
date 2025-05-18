import { View, StyleSheet, ScrollView } from "react-native"
import BlindsControl from "../components/BlindsControl"
import RoomControl from "../components/RoomControl"
import TemperatureDisplay from "../components/TemperatureDisplay"

export default function ChildDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <BlindsControl />

        <RoomControl roomName="Zona Exterior" />
        <RoomControl roomName="Sala" />
        <RoomControl roomName="Cocina" />
        <RoomControl roomName="Baño" />
        <RoomControl roomName="Cuarto del Hijo" />

        <TemperatureDisplay />
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
})
