import { Card, Header, Sidebar } from "../components"
import fondo from '../assets/img/fondoCity.png'

export const Specialist = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-cover min-h-screen w-full" style={{ backgroundImage: `url(${fondo})` }}>
        <div className="container mx-auto p-4">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card />
            <Card />
            <Card />
            {/* Agrega más tarjetas según sea necesario */}
          </div>
        </div>
      </div>
    </div>
  )
}
