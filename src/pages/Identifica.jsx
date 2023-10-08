import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Fragment, useState } from "react";
import fireDataJson from '../datos.json';

export const Identifica = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    });

    const [activeMarker, setActiveMarker] = useState(null);
    const [fireData, setFireData] = useState(fireDataJson);
    // const [fireData, setFireData] = useState([]);

    // useEffect(() => {
    //   // Hacer la solicitud a la API CSV y procesar los datos
    //   axios.get('https://firms.modaps.eosdis.nasa.gov/api/country/csv/6bca7fc6d19433c05dbda42abc2e7b1a/VIIRS_SNPP_NRT/PER/7/2023-10-05')
    //     .then((response) => {
    //       // Dividir el CSV en filas y procesar los datos
    //       const rows = response.data.split('\n');
    //       const data = rows.slice(1).map((row) => {
    //         const [country_id, latitude, longitude, bright_ti4, scan, track, acq_date, acq_time, satellite, instrument, confidence, version, bright_ti5, frp, daynight] = row.split(',');
    //         return {
    //           country_id,
    //           latitude: parseFloat(latitude),
    //           longitude: parseFloat(longitude),
    //           bright_ti4: parseFloat(bright_ti4),
    //           scan: parseFloat(scan),
    //           track: parseFloat(track),
    //           acq_date,
    //           acq_time,
    //           satellite,
    //           instrument,
    //           confidence,
    //           version,
    //           bright_ti5: parseFloat(bright_ti5),
    //           frp: parseFloat(frp),
    //           daynight,
    //         };
    //       });
    //       setFireData(data);
    //       console.log(data)
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching data:', error);
    //     });
    // }, []);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    return (
        <div className='w-screen h-screen m-0'>
            <Fragment>
                <div className=''>
                    {isLoaded ? (
                        <GoogleMap
                            center={{ lat: -16.35807, lng: -71.65679 }}
                            zoom={10}
                            onClick={() => setActiveMarker(null)}
                            mapContainerStyle={{ width: "100%", height: "100vh" }}
                            mapContainerClassName=''
                            options={{
                                mapTypeControl: false, // Desactivar el control de tipo de mapa
                                streetViewControl: false, // Desactivar el control de Street View
                                fullscreenControl: false, // Desactivar el control de pantalla completa
                            }}
                        >
                            {fireData.map((fire) => (
                                <MarkerF
                                    key={fire.acq_date + fire.acq_time}
                                    position={{ lat: fire.latitude, lng: fire.longitude }}
                                    onClick={() => handleActiveMarker(fire)}
                                >
                                    {activeMarker === fire ? (
                                        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                            <div>
                                                <p>Fecha: {fire.acq_date}</p>
                                                <p>Hora: {fire.acq_time}</p>
                                                <p>Brillo: {fire.bright_ti4}</p>
                                            </div>
                                        </InfoWindowF>
                                    ) : null}
                                </MarkerF>
                            ))}
                        </GoogleMap>
                    ) : null}
                </div>
            </Fragment>
        </div>
    );
}