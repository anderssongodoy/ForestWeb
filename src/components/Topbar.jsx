import { Link, Outlet, useNavigate } from 'react-router-dom';

export const Topbar = () => {

    const menuItems = [
        { route: "conoce", title: "Conoce" },
        { route: "identifica", title: "Identifica" },
        { route: "aporta", title: "Aporta" },
    ];

    return (
        <div className="flex flex-col">
            <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                    <div className="inline-flex items-center">
                        <h1
                            className={`text-secondary font-medium text-2xl duration-300`}
                        >
                            NOMBRE
                        </h1>
                    </div>
                    <ul className={`flex`}>
                        {menuItems.map((menu, index) => (
                            <li key={index} className="mr-6">
                                <Link to={`/${menu.route}`} className="text-black text-sm hover:text-secondary">
                                    {menu.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-7">
                <Outlet />
            </div>
        </div>
    );
};
