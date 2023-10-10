import { useEffect, useRef, useState } from "react";
import indice from '../assets/img/indicemeteorologico.png';
import { Chart, CategoryScale, LinearScale, BarController, Title, Tooltip } from 'chart.js/auto';

export const BottomSection = ({ showBottomSection }) => {
    const [chart, setChart] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chart) {
            chart.destroy();
        }

        if (chartRef.current && showBottomSection) {
            const data = {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [
                    {
                        label: 'Incendios Forestales',
                        data: [664, 1343, 817, 1432, 591],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            };

            const options = {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad de Incendios',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Año',
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            };

            const ctx = chartRef.current.getContext('2d');

            if (ctx) {
                const newChart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: options,
                });
                setChart(newChart);
            }
        }
    }, [showBottomSection]);

    return (
        <>
            {showBottomSection && (
                <div className="p-4 text-white">
                    <div>
                        <div className="text-center text-2xl">Indice Meteorológico de Incendios (FWI)</div>
                        <img src={indice} alt="asd" className="w-full" />
                    </div>
                    <div className="mt-10">
                        <div className="text-2xl">¿Sabías Qué?</div>
                        <div>En lo que va del 2023, los incendios forestales en Perú superan el medio millar. El Instituto Nacional de Defensa Civil (Indeci) ha documentado 591 de estos eventos en el país, entre el 1 de enero y el 28 de agosto de 2023. La mayoría de ellos fueron provocados por acciones humanas.<br />
                            El reporte presentado por el jefe del Indeci, Carlos Yañez, muestra que Cusco ha sido, hasta el momento, la región en la que se han registrado más incendios forestales con 161 en lo que va del año; seguido por <strong>Áncash (85), Apurimac (56) y Ucayali (55)</strong>. “Los incendios forestales se han registrado en 20 regiones del país”, asegura Yañez.</div>
                    </div>
                    <div className="mt-5">
                        <div className="text-2xl">Tenemos que concientizarnos</div>
                        <div>En los últimos días, se han reportado incendios forestales en Cusco, Apurímac, Huaraz, Arequipa y otras regiones, lo cual ha generado preocupación por las consecuencias que conllevan estos tipos de siniestros. Solo en el distrito de Ihuayllo se conoció que cinco personas fallecieron en esta tragedia.<br />
                            Una situación que ha dejado a cientos de ciudadanos de la región Apurímac preocupados. Ante ello, Instituto Nacional de Defensa Civil (Indeci) reveló que se han registrado más de 4.400 incendios forestales en los últimos cinco años en el Perú.</div>
                    </div>
                    <div className="mt-10">
                        <div className="text-2xl">INCENDIOS FORESTALES DE LOS ULTIMOS 5 AÑOS</div>
                        <div>
                            <canvas ref={chartRef} width={400} height={200}></canvas>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}