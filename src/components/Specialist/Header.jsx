
export const Header = () => {
    return (
        <div className="bg-red bg-cover py-4 px-4">
            <h1 className="text-3xl text-white font-bold">List of Reports</h1>
            <div className="flex space-x-4 mt-4">
                <div className="bg-gray-200 p-2 rounded-md">
                    <label htmlFor="specialistFilter">Type of Specialist</label>
                    <select
                        id="specialistFilter"
                        className="bg-transparent border-b-2"
                    >
                        {/* Opciones del filtro de especialista */}
                    </select>
                </div>
                <div className="bg-gray-200 p-2 rounded-md">
                    <label htmlFor="databaseFilter">Database of</label>
                    <select
                        id="databaseFilter"
                        className="bg-transparent border-b-2"
                    >
                        {/* Opciones del filtro de base de datos */}
                    </select>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Send to
                </button>
            </div>
        </div>
    )
}
