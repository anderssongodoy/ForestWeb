import ReactPlayer from "react-player"
import { Sidebar } from "../components"

export const Video = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar />
            <div className="w-full h-screen">
            <ReactPlayer
                                url="https://www.youtube.com/embed/CGYmdCivwcg?si=-L8u1AdmHeVRNyAv"
                                controls
                                width="100%"
                                height="100%"
                            />
            </div>
        </div>
    )
}
