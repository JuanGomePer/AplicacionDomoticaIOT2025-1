"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../lib/firebase";
import { ref as dbRef, get, set } from "firebase/database";
import {
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"parent" | "child">("parent");
  const [imageUri, setImageUri] = useState<string | null>(null);

  /* ---------- Seleccionar o tomar foto ---------- */
  const pickOrCapture = async (fromCamera: boolean) => {
    // permisos
    const camPerm = await ImagePicker.requestCameraPermissionsAsync();
    const galPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (
      camPerm.status !== "granted" ||
      galPerm.status !== "granted"
    ) {
      Alert.alert("Permiso requerido", "Habilita la cámara y galería");
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          quality: 0.7,
          allowsEditing: true,
        })
      : await ImagePicker.launchImageLibraryAsync({
          quality: 0.7,
          allowsEditing: true,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const handleChooseImage = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancelar", "Tomar foto", "Elegir de galería"],
          cancelButtonIndex: 0,
        },
        (btnIndex) => {
          if (btnIndex === 1) pickOrCapture(true);
          if (btnIndex === 2) pickOrCapture(false);
        }
      );
    } else {
      Alert.alert("Foto de perfil", "Selecciona una opción", [
        { text: "Tomar foto", onPress: () => pickOrCapture(true) },
        { text: "Galería", onPress: () => pickOrCapture(false) },
        { text: "Cancelar", style: "cancel" },
      ]);
    }
  };

  /* ---------- Registrar ---------- */
  const handleRegister = async () => {
    if (!username || !password || !imageUri) {
      Alert.alert("Completa todos los campos y añade una foto");
      return;
    }

    const userRef = dbRef(db, `users/${username}`);
    if ((await get(userRef)).exists()) {
      Alert.alert("El usuario ya existe");
      return;
    }

    // subir imagen
    const blob = await (await fetch(imageUri)).blob();
    const photoPath = `profilePhotos/${username}_${Date.now()}.jpg`;
    const photoRef = stRef(storage, photoPath);
    await uploadBytes(photoRef, blob);
    const photoURL = await getDownloadURL(photoRef);

    await set(userRef, { password, role, photoURL });

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

      {/* ---------- Foto de perfil ---------- */}
      <TouchableOpacity onPress={handleChooseImage} style={{ marginBottom: 12 }}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{ color: "#9ca3af" }}>Foto</Text>
          </View>
        )}
        <Text style={{ color: "#60a5fa", textAlign: "center" }}>
          {imageUri ? "Cambiar foto" : "Añadir foto"}
        </Text>
      </TouchableOpacity>

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
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#030712",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1f2937",
    color: "white",
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#374151",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 4,
  },
});
