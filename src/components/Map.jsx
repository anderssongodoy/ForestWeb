import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Flotantes } from './Flotantes';
import iconVolcan from '../assets/img/volcanous.png'
import iconInun from '../assets/img/floods.png'
import iconInce from '../assets/img/wildfires.png'
import imgmarcador from '../assets/img/imgmarcador.png'
import jsonData from '../datos.json';
import { useState } from 'react';

export const Map = ({setShowBottomSection}) => {

    const [activeMarker, setActiveMarker] = useState(null);
    const [customEventData] = useState(jsonData);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            setShowBottomSection(false);
            setActiveMarker(null);
        } else {
            setShowBottomSection(true);
            setActiveMarker(marker);
        }
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    });

    const getCategoryIcon = (categoryTitle) => {
        switch (categoryTitle) {
            case "Volcanoes":
                return iconVolcan;
            case "Floods":
                return iconInun;
            case "Wildfires":
                return iconInce;
            case "incendio forestal":
                return iconInce;
        }
    };

    return (
        <>
            <div className="">
                {isLoaded ? (
                    <GoogleMap
                        center={{ lat: -12.0265898, lng: -77.1529351 }}
                        zoom={10}
                        onClick={() => {
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
                                        <div className="bg-red-600 text-white p-2 text-center flex flex-col justify-center items-center">
                                            <p className="font-bold">Fecha: {event.fecha}</p>
                                            <p className="font-bold">Tipo: {event.tipo}</p>
                                            <p className="font-bold">Ubicación: {event.ubicacion.departamento}-{event.ubicacion.provincia}-{event.ubicacion.distrito}</p>
                                            <p className="font-bold">{event.danios}</p>
                                            <img src={imgmarcador} alt="Imagen del evento" className="w-64 mt-5" />
                                        </div>
                                    </InfoWindowF>
                                ) : null}
                            </MarkerF>
                        ))}
                        <Flotantes />
                    </GoogleMap>
                ) : null}
            </div>
        </>
    )
}
