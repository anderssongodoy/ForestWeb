import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Fragment, useState, useEffect } from "react";
import iconVolcan from '../assets/img/volcanous.png'
import iconInun from '../assets/img/floods.png'
import iconInce from '../assets/img/wildfires.png'
import { GoAlertFill } from "react-icons/go"
import { BsFire } from "react-icons/bs"
import { AiFillAlert } from "react-icons/ai"
import ReactPlayer from "react-player";
import video1 from '../assets/video/5muertos.mp4'

export const Identifica = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    });

    const [activeMarker, setActiveMarker] = useState(null);
    const [fireData, setFireData] = useState([]);
    const [naturalEvents, setNaturalEvents] = useState([]);
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
        fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
            .then((response) => response.json())
            .then((data) => {
                const eventsWithGeometry = data.events.filter((event) => {
                    return event.geometries.length > 0 && event.geometries[0].type === "Point";
                });

                setNaturalEvents(eventsWithGeometry);
            })
            .catch((error) => {
                console.error('Error fetching natural events data:', error);
            });

        const fetchedVideos = [
            { title: "Video 1", filename: "/src/assets/video/5muertos.mp4" },
            { title: "Video 2", filename: "../assets/video/IncendioArequipa.mp4" },
        ];

        setVideosData(fetchedVideos);
        console.log(video1)
    }, []);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
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
                        <BsFire />
                    </div>
                    <div className="cursor-pointer">
                        <AiFillAlert />
                    </div>
                </div>
            </div>

            <div className="w-3/4">
                <Fragment>
                    <div className="">
                        {isLoaded ? (
                            <GoogleMap
                                center={{ lat: -16.35807, lng: -71.65679 }}
                                zoom={10}
                                onClick={() => setActiveMarker(null)}
                                mapContainerStyle={{ width: "100%", height: "100vh" }}
                                mapContainerClassName=""
                                options={{
                                    mapTypeControl: false,
                                    streetViewControl: false,
                                    fullscreenControl: false,
                                    mapTypeId: 'hybrid',
                                }}
                            >
                                {naturalEvents.map((event) => (
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
                                            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
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
                </Fragment>
            </div>

            <div className="w-1/4 bg-black p-4 text-white">
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