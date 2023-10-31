import { Sidebar } from "../components"
import fondo from '../assets/img/fondoReport2.png'

export const Report = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full " style={{ backgroundImage: `url(${fondo})` }}>
                <h1 className="text-3xl text-white font-bold text-center mt-5">Estamos trabajando en esta pagina</h1>
            </div>
        </div>
    )
}
