import { useState } from 'react';
import logo from '../assets/img/logo.png'
import reporte from '../assets/img/reporte.png'
import mensaje from '../assets/img/mensaje.png'
import { Link } from 'react-router-dom';

export const Flotantes = () => {
    const [showWelcomeBox, setShowWelcomeBox] = useState(false);

    const handleLogoClick = () => {
        setShowWelcomeBox(!showWelcomeBox);
    };
    return (
        <>
            <div className="fixed bottom-4 left-16 z-50 cursor-pointer">
                <img src={logo} alt="Icono" className="w-40 h-50%" onClick={handleLogoClick} />
            </div>

            {showWelcomeBox && (
                <div className="fixed bottom-4 left-52 bg-message text-white p-4 rounded-lg shadow-lg z-50">
                    <p>Hola! Mi nombre es Yanapay soy de [tu información]</p>
                    <p>Acabo de configurar tu idioma por el lugar donde estás. ¿Deseas cambiarlo?</p>
                    <button className="bg-white text-black py-2 px-4 rounded-full mt-2">
                        Cambiar Idioma
                    </button>
                </div>
            )}
            <Link
            to="/reporta"
            className="fixed bottom-4 left-6 z-50">
                <img src={reporte} alt="Icono" className="w-20 h-50%" />
            </Link>
            <div className="fixed bottom-24 left-10 z-50">
                <img src={mensaje} alt="Icono" className="w-12 h-50%" />
            </div>
        </>
    )
}
