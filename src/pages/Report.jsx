import { Sidebar } from "../components"
import fondo from '../assets/img/fondoReport2.png'

export const Report = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <div className="flex h-1/2 items-center justify-center" style={{ backgroundImage: `url(${fondo})` }}>
                    <h1 className="text-3xl text-white font-bold text-center tracking-[1em]">REPORT - 001</h1>
                </div>
                <div className="bg-white h-full flex justify-between">
                    <div className="ml-10 space-y-9">
                        <div className="flex space-x-48 pt-5">
                            <div>Tipo de animales</div>
                            <div>Aves / insectos</div>
                        </div>
                        <div className="flex space-x-48">
                            <div>Cantidad de animales</div>
                            <div>12</div>
                        </div>
                        <div className="flex space-x-48">
                            <div>Porcentaje de pérdida</div>
                            <div>5%</div>
                        </div>
                        <div className="flex space-x-52">
                            <div>Tipo de plantas</div>
                            <div>Herbáceas</div>
                        </div>
                        <div className="flex space-x-52">
                            <div>Cantidad de plantas</div>
                            <div>32</div>
                        </div>
                        <div className="flex space-x-48">
                            <div>Porcentaje de plantas</div>
                            <div>10%</div>
                        </div>
                        <div className="flex space-x-20">
                            <div>Impacto ambiental m2 <hr></hr>(porcentaje de daño terrestre)</div>
                            <div>Aves / insectos</div>
                        </div>
                    </div>
                    <div className="mr-10 mt-10">
                        <div className="px-10 py-5 bg-button2 text-white">
                            Download
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
