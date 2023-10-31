import { useState } from 'react';
import { Sidebar } from '../components';
import fondo from '../assets/img/fondoReport.png';
import logo from '../assets/img/logo.png';
import { MdLocationOn } from 'react-icons/md';
import { BsFire } from 'react-icons/bs';
import { BiSolidCamera } from 'react-icons/bi';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const Citizien = () => {
    const [showMap, setShowMap] = useState(false); // Estado para controlar la visibilidad del mapa
    const [selectedLocation, setSelectedLocation] = useState(''); // Estado para almacenar las coordenadas o el lugar seleccionado
    const [mapKey, setMapKey] = useState(0); // Un identificador único para el mapa

    // Función para manejar la selección de ubicación en el mapa
    const handleMapClick = (event) => {
        const { latLng } = event;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setSelectedLocation({ lat, lng }); // Actualizar el estado con las coordenadas
        setShowMap(false); // Ocultar el mapa
    };

    // Función para abrir un nuevo mapa
    const openMap = () => {
        setShowMap(true);
        // Cambiar el key del mapa para cargar uno nuevo
        setMapKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-auto scrollbar">
            <Sidebar />
            <div
                className="flex items-center flex-col justify-center w-full h-screen p-4 text-white text-center"
                style={{
                    backgroundImage: `url(${fondo})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <div className="bg-[#757575] w-5/12 ">
                    <div className="mt-10 text-5xl">REGISTRATION</div>
                    <form className="m-10">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Enter your location"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 pr-10 text-black"
                                onClick={openMap}
                                value={
                                    selectedLocation
                                        ? `Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}`
                                        : ''
                                }
                                readOnly
                            />
                            <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3 text-gray-600">
                                <MdLocationOn />
                            </div>
                        </div>
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Fire Forest"
                                value="Fire Forest"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 pr-10 text-black"
                                readOnly
                            />
                            <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3 text-gray-600">
                                <BsFire />
                            </div>
                        </div>
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Descriptive or visual evidence"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 pr-10"
                            />
                            <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3 text-gray-600">
                                <BiSolidCamera />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Send to
                        </button>
                    </form>
                </div>
                {showMap && (
                    <div className="fixed inset-0 z-10 bg-white">
                        {/* Eliminar el LoadScript anterior y cargar uno nuevo con un nuevo key */}
                        <LoadScript key={mapKey} googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY}>
                            <GoogleMap
                                id="map"
                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                zoom={8}
                                center={{ lat: -12.0265898, lng: -77.1529351 }}
                                onClick={handleMapClick}
                            >
                                {selectedLocation && (
                                    <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
                                )}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                )}
            </div>
        </div>
    );
};
