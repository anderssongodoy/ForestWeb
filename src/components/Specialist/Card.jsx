import fire1 from '../../assets/img/fire1.png'
import { AiFillEye } from "react-icons/ai"
import { IoMdSend } from "react-icons/io"
import { Link } from 'react-router-dom'

export const Card = () => {
    return (
        <Link to="/report">
        <div className="bg-white p-4 rounded-lg shadow-md">
            <img
                src={fire1}
                alt="Incendio"
                className="w-full h-48 object-cover"
            />
            <div className="flex items-center mt-2">
                <span className="text-lg font-bold text-gray-700">Incendio</span>
                <span className="ml-2 text-gray-500">#001</span>
            </div>
            <div className="flex items-center mt-2">
                <div className="bg-green-800 text-white px-2 py-1 rounded-md">
                    90%
                </div>
            </div>
            <div className="mt-2">
                <div className="text-gray-700">Ubication</div>
                <div className="text-gray-500">Ares 166 ate Lima - Perú</div>
            </div>
            <div className="mt-2">
                <div className="text-gray-700">Fecha y Hora</div>
                <div className="text-gray-500">Fecha y hora aquí</div>
            </div>
            <div className="mt-4 flex justify-end text-2xl">
                <button className="mr-2 ">
                    <AiFillEye/>
                </button>
                <button>
                    <IoMdSend/>
                </button>
            </div>
        </div>
        </Link>
    )
}
