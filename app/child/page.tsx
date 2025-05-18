import BlindsControl from "../../components/BlindsControl"
import RoomControl from "../../components/RoomControl"
import TemperatureDisplay from "../../components/TemperatureDisplay"

export default function ChildDashboard() {
  return (
    <main className="min-h-screen bg-gray-950 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">Panel de Control - Hijo</h1>

        <div className="grid gap-4">
          <BlindsControl />

          <div className="grid gap-4">
            <RoomControl roomName="Zona Exterior" />
            <RoomControl roomName="Sala" />
            <RoomControl roomName="Cocina" />
            <RoomControl roomName="Baño" />
            <RoomControl roomName="Cuarto del Hijo" />
          </div>

          <TemperatureDisplay />
        </div>
      </div>
    </main>
  )
}
