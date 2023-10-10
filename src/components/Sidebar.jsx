import { useState } from 'react'
import { GoAlertFill } from "react-icons/go"
import { AiFillRedditSquare, AiFillAlert } from "react-icons/ai"
import { BsFire } from "react-icons/bs"
import { FiFigma } from "react-icons/fi"
import { Link } from 'react-router-dom'

export const Sidebar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const handleClick = () => {
        window.open("https://www.figma.com/proto/6imgEKMW7KFQlh9i0cQTQf/Pyronite?type=design&node-id=162-543&t=Nr2WFrZoupmlnrel-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=162%3A543&mode=design", '_blank')

    }
    return (
        <>
            <div className="md:hidden bg-black text-white p-4">
                <button onClick={toggleMobileMenu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            <div className="hidden md:w-1/12 md:block bg-black text-white text-center">
                <div className="text-4xl space-y-5 flex flex-col px-10 justify-center items-center mt-10">
                <div className="text-center cursor-pointer" onClick={handleClick}>
                        <div className="text-center items-center flex justify-center">
                            <FiFigma />
                        </div>
                        <div className="text-sm">CLICK</div>
                        <div className="text-sm">TO VIEW</div>
                        <div className="text-sm">OUR</div>
                        <div className="text-sm">FIGMA</div>
                    </div>
                    <div className="text-center cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <GoAlertFill />
                        </div>
                        <div className="text-sm">Disasters</div>
                    </div>
                    <Link
                        // to="/trivia"
                        >
                        <div className="text-center items-center flex justify-center">
                            <AiFillRedditSquare />
                        </div>
                        <div className="text-sm">Training</div>
                    </Link>
                    <div className="cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <BsFire />
                        </div>
                        <div className="text-sm">Alert</div>
                    </div>
                    {/* <div className="cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <AiFillAlert />
                        </div>
                        <div className="text-sm">Reporta</div>
                    </div> */}
                </div>
            </div>
            <div className={`md:w-1/12 w-full bg-black text-white text-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className="text-4xl space-y-5 flex flex-col justify-center items-center mt-10">
                    <div className="text-center cursor-pointer" onClick={handleClick}>
                        <div className="text-center items-center flex justify-center">
                            <FiFigma />
                        </div>
                        <div className="text-sm">CLICK</div>
                        <div className="text-sm">TO VIEW</div>
                        <div className="text-sm">OUR</div>
                        <div className="text-sm">FIGMA</div>
                    </div>
                    <div className="text-center cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <GoAlertFill />
                        </div>
                        <div className="text-sm">Disasters</div>
                    </div>
                    <Link
                    // to="/trivia"
                    >
                        <div className="text-center items-center flex justify-center">
                            <AiFillRedditSquare />
                        </div>
                        <div className="text-sm">Training</div>
                    </Link>
                    <div className="cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <BsFire />
                        </div>
                        <div className="text-sm">Alert</div>
                    </div>
                    {/* <div className="cursor-pointer">
                        <div className="text-center items-center flex justify-center">
                            <AiFillAlert />
                        </div>
                        <div className="text-sm">Reporta</div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
