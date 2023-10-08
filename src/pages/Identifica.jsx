import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from "@react-google-maps/api";
import iconVolcan from '../assets/img/volcanous.png'
import iconInun from '../assets/img/floods.png'
import iconInce from '../assets/img/wildfires.png'
import { GoAlertFill } from "react-icons/go"
import { BsFire } from "react-icons/bs"
import { AiFillAlert } from "react-icons/ai"
import ReactPlayer from 'react-player';
import video1 from '../assets/video/5muertos.mp4';
import video2 from '../assets/video/IncendioArequipa.mp4';
import video3 from '../assets/video/incendioPiura.mp4'
import video4 from '../assets/video/indeciIncendio.mp4'

export const Identifica = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    });

    const [activeMarker, setActiveMarker] = useState(null);
    const [showInfo, setShowInfo] = useState(false); // Estado para la sección superpuesta
    const [showBottomSection, setShowBottomSection] = useState(false); // Estado para la sección debajo del mapa
    const [fireData, setFireData] = useState([]);
    const [videosData, setVideosData] = useState([]);

    const getCategoryIcon = (categoryTitle) => {
        switch (categoryTitle) {
            case "Volcanoes":
                return iconVolcan;
            case "Floods":
                return iconInun;
            case "Wildfires":
                return iconInce;
        }
    };

    useEffect(() => {
        // Obtener datos de eventos naturales desde la API de EONET
        fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
            .then((response) => response.json())
            .then((data) => {
                // Filtrar eventos con coordenadas válidas
                const eventsWithGeometry = data.events.filter((event) => {
                    return event.geometries.length > 0 && event.geometries[0].type === "Point";
                });

                setFireData(eventsWithGeometry);
            })
            .catch((error) => {
                console.error('Error fetching natural events data:', error);
            });

        // Cargar datos de tus videos descargados aquí
        const videoData = [
            { title: "Video 1", url: video1 },
            { title: "Video 2", url: video2 },
            { title: "Video 3", url: video3 },
            { title: "Video 4", url: video4 },
            // Agregar más videos si es necesario
        ];

        setVideosData(videoData);
    }, []);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            // Si se hace clic en el mismo marcador, oculta la sección superpuesta y la sección debajo del mapa
            setShowInfo(false);
            setShowBottomSection(false);
        } else {
            // Muestra la sección superpuesta y la sección debajo del mapa, y establece el marcador activo
            setShowInfo(true);
            setShowBottomSection(true);
            setActiveMarker(marker);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar a la izquierda */}
            <div className="w-1/12 bg-black text-white text-center">
                <div className="text-4xl space-y-5 flex flex-col justify-center items-center mt-10">
                    <div className="text-center cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <GoAlertFill />
                        </div>
                        <div className="text-sm">Desastres</div>
                    </div>
                    <div className="cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <BsFire />
                        </div>
                        <div className="text-sm">Alerta</div>
                    </div>
                    <div className="cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <AiFillAlert />
                        </div>
                        <div className="text-sm">Reporta</div>
                    </div>
                </div>
            </div>

            {/* Mapa en el centro */}
            <div className="w-3/4 relative">
                <div className="">
                    {isLoaded ? (
                        <GoogleMap
                            center={{ lat: -16.35807, lng: -71.65679 }}
                            zoom={10}
                            onClick={() => {
                                setShowInfo(false);
                                setShowBottomSection(false);
                                setActiveMarker(null);
                            }}
                            mapContainerStyle={{ width: "100%", height: "100vh" }}
                            mapContainerClassName=""
                            options={{
                                mapTypeControl: false,
                                streetViewControl: false,
                                fullscreenControl: false,
                                mapTypeId: 'hybrid',
                            }}
                        >
                            {fireData.map((event) => (
                                <MarkerF
                                    key={event.id}
                                    position={{
                                        lat: event.geometries[0].coordinates[1],
                                        lng: event.geometries[0].coordinates[0],
                                    }}
                                    onClick={() => handleActiveMarker(event)}
                                    icon={getCategoryIcon(event.categories[0].title)}
                                >
                                    {activeMarker === event ? (
                                        <InfoWindowF onCloseClick={() => handleActiveMarker(null)}>
                                            <div>
                                                <p>Evento: {event.title}</p>
                                                <p>Categoría: {event.categories[0].title}</p>
                                            </div>
                                        </InfoWindowF>
                                    ) : null}
                                </MarkerF>
                            ))}
                        </GoogleMap>
                    ) : null}
                </div>

                {/* Sección superpuesta */}
                {showInfo && (
                    <div className="absolute top-0 right-0 bg-white p-4">
                        {/* Contenido de la sección superpuesta */}
                        <h2>Contenido Superpuesto</h2>
                    </div>
                )}

                {/* Sección debajo del mapa */}
                {showBottomSection && (
                    <div className="bg-white p-4">
                        {/* Contenido de la sección debajo del mapa */}
                        <h2>Contenido Debajo del Mapa</h2>
                    </div>
                )}
            </div>

            {/* Sección de videos a la derecha */}
            <div className="w-1/4 bg-black p-4 text-white" style={{ maxHeight: "100vh", overflowY: "auto" }}>
                <h2 className="text-xl font-bold mb-4">Sección de Videos</h2>
                <div className="video-list">
                    {videosData.map((video, index) => (
                        <div className="video-item" key={index}>
                            <h3>{video.title}</h3>
                            <ReactPlayer
                                url={video.url}
                                controls
                                width="100%"
                                height="auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
