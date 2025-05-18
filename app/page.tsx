"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { ref, get } from "firebase/database";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const snap = await get(ref(db, `users/${username}`));
    if (!snap.exists() || snap.val().password !== password) {
      setError("Usuario o contraseña incorrectos");
      return;
    }
    const { role } = snap.val() as { role: "parent" | "child"; password: string };
    router.push(role === "parent" ? "/parent" : "/child");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Smart Home
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
          className="mb-2 p-2 border border-gray-400 rounded w-full"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          className="mt-4 bg-purple-600 text-white p-2 rounded w-full"
        >
          Ingresar
        </button>

        <button
          onClick={() => router.push("/register")}
          className="mt-2 text-blue-400 underline w-full"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
