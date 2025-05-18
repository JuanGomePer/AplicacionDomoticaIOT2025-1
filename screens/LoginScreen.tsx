"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { db } from "../lib/firebase";
import { ref, get } from "firebase/database";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* ---------- Validar credenciales y redirigir ---------- */
  const handleLogin = async () => {
    const snap = await get(ref(db, `users/${username}`));

    if (!snap.exists() || snap.val().password !== password) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
      return;
    }

    const role = snap.val().role as "parent" | "child";
    navigation.navigate(
      role === "parent" ? "ParentDashboard" : "ChildDashboard"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Smart Home</Text>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Iniciar Sesión</Text>
              <Text style={styles.cardDescription}>
                Ingresa tus credenciales para acceder al sistema
              </Text>
            </View>

            {/* ---------- Usuario ---------- */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Usuario</Text>
              <View style={styles.inputWrapper}>
                <Feather
                  name="user"
                  size={16}
                  color="#6b7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de usuario"
                  placeholderTextColor="#6b7280"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>

            {/* ---------- Contraseña ---------- */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <Feather
                  name="lock"
                  size={16}
                  color="#6b7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#6b7280"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            {/* ---------- Botones ---------- */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 12 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ color: "#60a5fa", textAlign: "center" }}>
                ¿No tienes cuenta? Regístrate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ====== estilos sin cambios ====== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#030712" },
  keyboardAvoid: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 32,
  },
  card: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  cardHeader: { marginBottom: 16 },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "white" },
  cardDescription: { fontSize: 14, color: "#9ca3af", marginTop: 4 },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, color: "#d1d5db", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 4,
    height: 44,
  },
  inputIcon: { marginLeft: 12 },
  input: {
    flex: 1,
    height: "100%",
    color: "white",
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: "#9333ea",
    borderRadius: 4,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "500" },
});
