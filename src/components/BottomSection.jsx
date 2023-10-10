import { useEffect, useRef, useState } from "react";
import indice from '../assets/img/indicemeteorologico.png';
import { Chart } from 'chart.js/auto';
import videoFire from '../assets/video/FireDetection.mp4'
import ReactPlayer from "react-player";

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
                        label: 'Forest Fires',
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
                            text: 'Number of Fires',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year',
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
                        <div>This is a video from our group where we developed a flame sensor that will be placed on each drone</div>
                    <ReactPlayer
                                url={videoFire}
                                controls
                                width="100%"
                                height="auto"
                            />
                    </div>
                    <div>
                        <div className="text-center text-2xl">Fire Weather Index (FWI)</div>
                        <img src={indice} alt="asd" className="w-full" />
                    </div>
                    <div className="mt-10">
                        <div className="text-2xl">Did You Know?</div>
                        <div>So far in 2023, forest fires in Peru have exceeded five hundred. The National Institute of Civil Defense (Indeci) has documented 591 of these events in the country, between January 1 and August 28, 2023. Most of them were caused by human actions.<br />
                            The report presented by the head of Indeci, Carlos Yañez, shows that Cusco has been, so far, the region with the most forest fires with 161 this year; followed by <strong>Áncash (85), Apurimac (56), and Ucayali (55)</strong>. "Forest fires have been reported in 20 regions of the country," says Yañez.</div>
                    </div>
                    <div className="mt-5">
                        <div className="text-2xl">We Need to Raise Awareness</div>
                        <div>In recent days, forest fires have been reported in Cusco, Apurímac, Huaraz, Arequipa, and other regions, which has raised concerns about the consequences of these types of disasters. In the district of Ihuayllo alone, it was reported that five people died in this tragedy.<br />
                            A situation that has left hundreds of citizens in the Apurímac region concerned. In response, the National Institute of Civil Defense (Indeci) revealed that more than 4,400 forest fires have been recorded in Peru over the past five years.</div>
                    </div>
                    <div className="mt-10">
                        <div className="text-2xl">FOREST FIRES IN THE LAST 5 YEARS</div>
                        <div>
                            <canvas ref={chartRef} width={400} height={200}></canvas>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}