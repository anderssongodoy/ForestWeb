
import { useState } from "react";
import { BottomSection, Map, Sidebar, Videos } from "../components";

export const Identifica = () => {
    const [showBottomSection, setShowBottomSection] = useState(false);


    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar/>
            <div className="md:w-3/4 relative w-full">
                <Map setShowBottomSection={setShowBottomSection}/>

                <BottomSection showBottomSection={showBottomSection}/>
            </div>
            <Videos/>
        </div>
    );
};