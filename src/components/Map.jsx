import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Flotantes } from './Flotantes';
import iconInce from '../assets/img/wildfires.png'
import imgmarcador from '../assets/img/imgmarcador.png'
import jsonData from '../fireforestData.json';
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
            case "forest fire":
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
                                key={event.date}
                                position={{
                                    lat: event.coordinates.latitude,
                                    lng: event.coordinates.longitude,
                                }}
                                onClick={() => handleActiveMarker(event)}
                                icon={getCategoryIcon(event.type)}
                            >
                                {activeMarker === event ? (
                                    <InfoWindowF onCloseClick={() => handleActiveMarker(null)}>
                                        <div className="bg-red-600 text-white p-2 text-center flex flex-col justify-center items-center">
                                            <p className="font-bold">DATE: {event.date}</p>
                                            <p className="font-bold">Type: {event.type}</p>
                                            <p className="font-bold">Location: {event.location.department}-{event.location.province}-{event.location.district}</p>
                                            <p className="font-bold">{event.damages}</p>
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
