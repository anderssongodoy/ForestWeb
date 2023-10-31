import { Sidebar } from '../components'
import fondo from '../assets/img/fondoReport.png'
import citizen from '../assets/img/citizen.png'
import specialist from '../assets/img/specialist.png'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

export const Reporta = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-auto scrollbar">
      <Sidebar />
      <div className="flex items-center flex-col justify-center w-full h-screen p-4 text-white text-center"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}>
        <div>
          <div className='text-6xl'>
            REPORT
          </div>
          <div className='flex space-x-20 mt-10'>
            <Link to="/specialist" className='cursor-pointer'>
              <img src={specialist} alt="" />
              <div className='text-xl mt-2'>Specialist</div>
            </Link>
            <Link to="/citizien" className='cursor-pointer'>
              <img src={citizen} alt="" />
              <div className='text-xl mt-2'>Citizen</div>
            </Link>
          </div>
        </div>
        <div className='fixed bottom-0 right-0 w-48 cursor-pointer'>
          <img src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};