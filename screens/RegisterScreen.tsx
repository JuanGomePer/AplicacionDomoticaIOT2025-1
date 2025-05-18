"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { db } from "../lib/firebase";
import { ref, get, set } from "firebase/database";

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"parent" | "child">("parent");

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Completa todos los campos");
      return;
    }
    const userRef = ref(db, `users/${username}`);
    if ((await get(userRef)).exists()) {
      Alert.alert("El usuario ya existe");
      return;
    }
    await set(userRef, { password, role });
    Alert.alert("Cuenta creada", "Ahora inicia sesión", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#6b7280"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#6b7280"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <Button
          title="Padre"
          onPress={() => setRole("parent")}
          color={role === "parent" ? "#9333ea" : "gray"}
        />
        <View style={{ width: 8 }} />
        <Button
          title="Hijo"
          onPress={() => setRole("child")}
          color={role === "child" ? "#9333ea" : "gray"}
        />
      </View>
      <Button title="Registrar" onPress={handleRegister} color="#9333ea" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#030712" },
  title: { fontSize: 28, fontWeight: "bold", color: "white", marginBottom: 24, textAlign: "center" },
  input: { backgroundColor: "#1f2937", color: "white", borderRadius: 4, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#374151" },
});
