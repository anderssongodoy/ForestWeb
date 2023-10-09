import { useState, useEffect, useRef } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from "@react-google-maps/api";
import iconVolcan from '../assets/img/volcanous.png'
import iconInun from '../assets/img/floods.png'
import iconInce from '../assets/img/wildfires.png'
import { GoAlertFill } from "react-icons/go"

import { AiFillRedditSquare } from "react-icons/ai"
import { BsFire } from "react-icons/bs"
import { AiFillAlert } from "react-icons/ai"
import ReactPlayer from 'react-player';
import video1 from '../assets/video/5muertos.mp4';
import video2 from '../assets/video/IncendioArequipa.mp4';
import video3 from '../assets/video/incendioPiura.mp4'
import video4 from '../assets/video/indeciIncendio.mp4'
import indice from '../assets/img/indicemeteorologico.png'
import jsonData from '../datos.json';
import Chart from 'chart.js/auto';

export const Identifica = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    });

    const [activeMarker, setActiveMarker] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [showBottomSection, setShowBottomSection] = useState(false);
    const [fireData, setFireData] = useState([]);
    const [videosData, setVideosData] = useState([]);
    const [customEventData, setCustomEventData] = useState(jsonData);
    const chartRef = useRef(null);

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
        fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
            .then((response) => response.json())
            .then((data) => {
                const eventsWithGeometry = data.events.filter((event) => {
                    return event.geometries.length > 0 && event.geometries[0].type === "Point";
                });

                setFireData(eventsWithGeometry);
            })
            .catch((error) => {
                console.error('Error fetching natural events data:', error);
            });

        const videoData = [
            { title: "Video 1", url: video1 },
            { title: "Video 2", url: video2 },
            { title: "Video 3", url: video3 },
            { title: "Video 4", url: video4 },
        ];

        setVideosData(videoData);

    }, []);

    useEffect(() => {
        if (chartRef.current) {
            const data = {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [
                    {
                        label: 'Incendios Forestales',
                        data: [664, 1343, 817, 1432, 591],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            };

            const options = {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad de Incendios',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Año',
                        },
                    },
                },
            };

            // Crear el gráfico en el elemento canvas
            const ctx = chartRef.current.getContext('2d');

            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: options,
                });
            }
        }
    }, [chartRef.current]);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            setShowInfo(false);
            setShowBottomSection(false);
            setActiveMarker(null);
        } else {
            setShowInfo(true);
            setShowBottomSection(true);
            setActiveMarker(marker);
        }
    };

    return (
        <div className="flex h-screen">
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
                            <AiFillRedditSquare />
                        </div>
                        <div className="text-sm">Entrenamiento</div>
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

            <div className="w-3/4 relative">
                <div className="">
                    {isLoaded ? (
                        <GoogleMap
                            center={{ lat: -12.0259475, lng: -77.6110465 }}
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
                            {customEventData.map((event) => (
                                <MarkerF
                                    key={event.fecha}
                                    position={{
                                        lat: event.coordenadas.latitud,
                                        lng: event.coordenadas.longitud,
                                    }}
                                    onClick={() => handleActiveMarker(event)}
                                    icon={getCategoryIcon(event.tipo)}
                                >
                                    {activeMarker === event ? (
                                        <InfoWindowF onCloseClick={() => handleActiveMarker(null)}>
                                            <div>
                                                <p>Fecha: {event.fecha}</p>
                                                <p>Tipo: {event.tipo}</p>
                                            </div>
                                        </InfoWindowF>
                                    ) : null}
                                </MarkerF>
                            ))}
                        </GoogleMap>
                    ) : null}
                </div>

                {showInfo && (
                    <div className="absolute top-0 right-0 bg-white p-4">
                        <h2>Contenido Superpuesto</h2>
                    </div>
                )}

                {showBottomSection && (
                    <div className="p-4 text-white">
                        <div>
                            <div className="text-center text-2xl">Indice Meteorológico de Incendios (FWI)</div>
                            <img src={indice} alt="asd" />
                        </div>
                        <div className="mt-10">
                            <div className="text-2xl">¿Sabías Qué?</div>
                            <div>En lo que va del 2023, los incendios forestales en Perú superan el medio millar. El Instituto Nacional de Defensa Civil (Indeci) ha documentado 591 de estos eventos en el país, entre el 1 de enero y el 28 de agosto de 2023. La mayoría de ellos fueron provocados por acciones humanas.<br />
                                El reporte presentado por el jefe del Indeci, Carlos Yañez, muestra que Cusco ha sido, hasta el momento, la región en la que se han registrado más incendios forestales con 161 en lo que va del año; seguido por <strong>Áncash (85), Apurimac (56) y Ucayali (55)</strong>. “Los incendios forestales se han registrado en 20 regiones del país”, asegura Yañez.</div>
                        </div>
                        <div className="mt-5">
                            <div className="text-2xl">Tenemos que concientizarnos</div>
                            <div>En los últimos días, se han reportado incendios forestales en Cusco, Apurímac, Huaraz, Arequipa y otras regiones, lo cual ha generado preocupación por las consecuencias que conllevan estos tipos de siniestros. Solo en el distrito de Ihuayllo se conoció que cinco personas fallecieron en esta tragedia.<br />
                                Una situación que ha dejado a cientos de ciudadanos de la región Apurímac preocupados. Ante ello, Instituto Nacional de Defensa Civil (Indeci) reveló que se han registrado más de 4.400 incendios forestales en los últimos cinco años en el Perú.</div>
                        </div>
                        <div className="mt-10">
                            <div className="text-2xl">INCENDIOS FORESTALES DE LOS ULTIMOS 5 AÑOS</div>
                            <div>
                                <canvas ref={chartRef} width={400} height={200}></canvas>
                            </div>
                        </div>
                    </div>
                )}
            </div>

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