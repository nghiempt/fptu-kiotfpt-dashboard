import ApexCharts from 'apexcharts';
import { useEffect, useState } from 'react';
import { ShopStatisService } from '../../../services/shop-statis';

const StatisticalRevenue = () => {

    const options = {
        dataLabels: {
            enabled: true,
            style: {
                cssClass: 'text-xs text-white font-medium'
            },
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 16,
                right: 16,
                top: -26
            },
        },
        series: [
            {
                name: "Revenue",
                data: [150, 141, 145, 152, 148, 153, 150],
                color: "#1A56DB",
            },
        ],
        chart: {
            height: "100%",
            maxWidth: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },
        legend: {
            show: true
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: "#1C64F2",
                gradientToColors: ["#1C64F2"],
            },
        },
        stroke: {
            width: 6,
        },
        xaxis: {
            categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            labels: {
                formatter: function (value: any) {
                    return '$' + value;
                }
            }
        },
    }

    useEffect(() => {
        if (document.getElementById("data-labels-chart") && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(document.getElementById("data-labels-chart"), options);
            chart.render();
            const time2 = document.getElementById('click2');
            time2?.addEventListener('click', (event) => {
                chart.updateSeries([
                    {
                        name: "Revenue",
                        data: [777, 777, 777, 777, 777, 777, 777],
                        color: "#1A56DB",
                    },
                ],);
            });
        }
    }, [])

    const [data, setData] = useState({} as any)

    const getData = async () => {
        const payload = {
            month: 7,
            year: 2024
        }
        const res = await ShopStatisService.getStatisRevenue(payload)
        if (res?.statusCode === '200') {
            setData(res?.data)
            console.log(res?.data);

        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <button id="click2">clock</button>
            <div className="flex justify-between mb-5">
                <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">$12,423</h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales this week</p>
                </div>
                <div
                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                    23%
                    <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                    </svg>
                </div>
            </div>
            <div id="data-labels-chart"></div>
        </div>
    )
}

export default StatisticalRevenue