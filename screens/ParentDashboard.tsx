"use client";

import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import BlindsControl from "../components/BlindsControl";
import RoomControl from "../components/RoomControl";
import SensorControl from "../components/SensorControl";
import TemperatureDisplay from "../components/TemperatureDisplay";
import ActivityLogs from "../components/ActivityLogs";

export default function ParentDashboard() {
  const {
    params: { username, photoURL },
  } = useRoute<any>();

  return (
    <ScrollView style={styles.container}>
      {/* -------- cabecera con avatar -------- */}
      <View style={styles.header}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
        <Text style={styles.userText}>{username}</Text>
      </View>

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
  );
}

const AVATAR_SIZE = 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarPlaceholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#1f2937",
  },
  userText: { color: "white", fontSize: 16, fontWeight: "500" },
  content: { padding: 16 },
  row: { flexDirection: "row", marginBottom: 16 },
  halfWidth: { flex: 1, marginRight: 8 },
});
