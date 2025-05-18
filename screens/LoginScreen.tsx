"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Feather } from "@expo/vector-icons"

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("parent")

  const handleLogin = () => {
    // In a real app, you would validate credentials here
    if (userType === "parent") {
      navigation.navigate("ParentDashboard")
    } else {
      navigation.navigate("ChildDashboard")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
        <View style={styles.content}>
          <Text style={styles.title}>Smart Home</Text>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Iniciar Sesión</Text>
              <Text style={styles.cardDescription}>Ingresa tus credenciales para acceder al sistema</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Usuario</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={16} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de usuario"
                  placeholderTextColor="#6b7280"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={16} color="#6b7280" style={styles.inputIcon} />
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

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de Usuario</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity style={styles.radioOption} onPress={() => setUserType("parent")}>
                  <View style={[styles.radioButton, userType === "parent" && styles.radioButtonSelected]}>
                    {userType === "parent" && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.radioLabel}>Padre</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioOption} onPress={() => setUserType("child")}>
                  <View style={[styles.radioButton, userType === "child" && styles.radioButtonSelected]}>
                    {userType === "child" && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.radioLabel}>Hijo</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712", // gray-950
  },
  keyboardAvoid: {
    flex: 1,
  },
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
    backgroundColor: "#111827", // gray-900
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1f2937", // gray-800
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  cardDescription: {
    fontSize: 14,
    color: "#9ca3af", // gray-400
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#d1d5db", // gray-300
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2937", // gray-800
    borderWidth: 1,
    borderColor: "#374151", // gray-700
    borderRadius: 4,
    height: 44,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "white",
    paddingHorizontal: 12,
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4b5563", // gray-600
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#9333ea", // purple-600
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9333ea", // purple-600
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#d1d5db", // gray-300
  },
  button: {
    backgroundColor: "#9333ea", // purple-600
    borderRadius: 4,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})
