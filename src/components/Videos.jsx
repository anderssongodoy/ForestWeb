import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import video1 from '../assets/video/5muertos.mp4';
import video2 from '../assets/video/IncendioArequipa.mp4';
import video3 from '../assets/video/incendioPiura.mp4'
import video4 from '../assets/video/indeciIncendio.mp4'

export const Videos = () => {

    const [videosData, setVideosData] = useState([]);

    useEffect(() => {

        const videoData = [
            { title: "Video 1", url: video1 },
            { title: "Video 2", url: video2 },
            { title: "Video 3", url: video3 },
            { title: "Video 4", url: video4 },
        ];

        setVideosData(videoData);

    }, []);
    return (
        <>
            <div className="md:w-1/4 w-full bg-black p-4 text-white md:overflow-y-auto ">
                <h2 className="text-xl font-bold mb-4 text-center">Find out what is happening</h2>
                <div className="video-list">
                    {videosData.map((video, index) => (
                        <div className="video-item mb-4" key={index}>
                            <hr/>
                            <br/>
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
        </>
    )
}
