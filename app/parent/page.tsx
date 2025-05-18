import ActivityLogs from "../../components/ActivityLogs"
import BlindsControl from "../../components/BlindsControl"
import RoomControl from "../../components/RoomControl"
import SensorControl from "../../components/SensorControl"
import TemperatureDisplay from "../../components/TemperatureDisplay"

export default function ParentDashboard() {
  return (
    <main className="min-h-screen bg-gray-950 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">Panel de Control - Padre</h1>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <BlindsControl />
            <SensorControl />
          </div>

          <div className="grid gap-4">
            <RoomControl roomName="Zona Exterior" />
            <RoomControl roomName="Sala" />
            <RoomControl roomName="Cocina" />
            <RoomControl roomName="Baño" />
            <RoomControl roomName="Cuarto de Padres" />
          </div>

          <TemperatureDisplay />
          <ActivityLogs />
        </div>
      </div>
    </main>
  )
}
