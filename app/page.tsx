import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [userType, setUserType] = useState("parent")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") // Estado para el mensaje de error

  // Lógica de validación de credenciales
  const validateCredentials = (username: string, password: string) => {
    if (username === "admin" && password === "123456") {
      return true
    }
    return false
  }

  const handleSubmit = () => {
    if (validateCredentials(username, password)) {
      if (userType === "parent") {
        router.push("/parent") // Redirige a la página de Padre
      } else {
        router.push("/child")  // Redirige a la página de Hijo
      }
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">Smart Home</h1>
        
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 border border-gray-400 rounded"
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border border-gray-400 rounded"
        />
        
        <div className="flex space-x-4">
          <button
            className={`p-2 rounded ${userType === "parent" ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setUserType("parent")}
          >
            Padre
          </button>
          <button
            className={`p-2 rounded ${userType === "child" ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setUserType("child")}
          >
            Hijo
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button onClick={handleSubmit} className="mt-4 bg-purple-600 text-white p-2 rounded">
          Ingresar
        </button>
      </div>
    </div>
  )
}
