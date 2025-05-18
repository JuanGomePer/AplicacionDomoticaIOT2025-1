"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { ref, get, set } from "firebase/database";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"parent" | "child">("parent");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Completa todos los campos");
      return;
    }
    const userRef = ref(db, `users/${username}`);
    if ((await get(userRef)).exists()) {
      setError("Usuario ya existe");
      return;
    }
    await set(userRef, { password, role });
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Registro
        </h1>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          className="mb-2 p-2 border border-gray-400 rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="mb-4 p-2 border border-gray-400 rounded w-full"
        />

        <div className="flex space-x-4 mb-4">
          <button
            className={`p-2 rounded w-full ${
              role === "parent" ? "bg-purple-600" : "bg-gray-700"
            }`}
            onClick={() => setRole("parent")}
          >
            Padre
          </button>
          <button
            className={`p-2 rounded w-full ${
              role === "child" ? "bg-purple-600" : "bg-gray-700"
            }`}
            onClick={() => setRole("child")}
          >
            Hijo
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleRegister}
          className="bg-purple-600 text-white p-2 rounded w-full"
        >
          Registrar
        </button>
      </div>
    </div>
  );
}
