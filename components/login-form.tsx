import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function LoginForm() {
  const navigation = useNavigation()
  const [userType, setUserType] = useState("parent")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") // Estado para el mensaje de error

  // Lógica de validación de credenciales (puedes reemplazarlo con una API real)
  const validateCredentials = (username: string, password: string, userType: string) => {
    // Aquí podrías realizar una validación real con una API
    // Para efectos de este ejemplo, vamos a hacer una validación simple:
    if (username === "admin" && password === "123456") {
      return true
    }
    return false
  }

  const handleSubmit = () => {
    // Validación de credenciales
    if (validateCredentials(username, password, userType)) {
      // Redirigir según el tipo de usuario
      if (userType === "parent") {
        navigation.navigate("ParentPage") // Asegúrate de que el nombre sea el correcto
      } else {
        navigation.navigate("ChildPage") // Asegúrate de que el nombre sea el correcto
      }
    } else {
      // Mostrar error si las credenciales son incorrectas
      setError("Usuario o contraseña incorrectos")
      Alert.alert("Error", "Usuario o contraseña incorrectos")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.description}>Ingresa tus credenciales para acceder al sistema</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <Text style={styles.radioLabel}>Padre</Text>
          <Button title="Padre" onPress={() => setUserType("parent")} color={userType === "parent" ? "blue" : "gray"} />
        </View>
        <View style={styles.radioOption}>
          <Text style={styles.radioLabel}>Hijo</Text>
          <Button title="Hijo" onPress={() => setUserType("child")} color={userType === "child" ? "blue" : "gray"} />
        </View>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title="Ingresar" onPress={handleSubmit} color="#6B21A8" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#aaa",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    color: "#fff",
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    color: "#fff",
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
})
