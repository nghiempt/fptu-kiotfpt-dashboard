import ApexCharts from 'apexcharts';
import { useEffect, useState } from 'react';
import { ShopStatisService } from '../../../services/shop-statis';

const StatisticalRevenue = (month: any) => {

    const [data, setData] = useState({} as any)
    const [chartData, setChartData] = useState(null as any)

    const init = async () => {
        const payload = {
            month: 7,
            year: 2024
        }
        const res = await ShopStatisService.getStatisRevenue(payload)
        if (res?.statusCode === '200') {
            setData(res?.data)
            console.log(res?.data);
            
            let listData: any = []
            let listCategory: any = []
            res?.data?.orders?.forEach((item: any) => {
                listCategory.push(item?.id.toString())
                listData.push(item?.total)
            })
            if (document.getElementById("data-labels-chart") && typeof ApexCharts !== 'undefined') {
                const chart = new ApexCharts(document.getElementById("data-labels-chart"), {
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
                            data: listData,
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
                        categories: listCategory,
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
                });
                chart.render();
                setChartData(chart)
            }
        }
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        update()
    }, [month])

    const update = async () => {
        const payload = {
            month: month?.month,
            year: 2024
        }
        console.log(payload);
        
        const res = await ShopStatisService.getStatisRevenue(payload)
        if (res?.statusCode === '200') {
            setData(res?.data)
            console.log(res?.data);
            
            let listData: any = []
            let listCategory: any = []
            res?.data?.orders?.forEach((item: any) => {
                listCategory.push(item?.id.toString())
                listData.push(item?.total)
            })
            chartData?.updateOptions({
                xaxis: {
                    categories: listCategory
                },
                series: [{
                    name: "Revenue",
                    data: listData,
                }]
            });
        }
    }

    return (
        <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 ">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center me-3">
                        <svg className="w-6 h-6 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                        </svg>
                    </div>
                    <div>
                        <h5 className="leading-none mb-1 text-2xl font-bold text-gray-900 ">Revenue: ${data?.totalMoneyOfAllOrders}</h5>
                        <p className="text-sm mt-0 font-normal text-gray-500 ">Orders generated per month</p>
                    </div>
                </div>
                <div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md ">
                        <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg>
                        0%
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1">
                <dl className="flex items-center justify-start">
                    <dt className="text-gray-500  text-sm font-normal me-1">Conversion rate:</dt>
                    <dd className="text-gray-900 text-sm  font-semibold">0%</dd>
                </dl>
            </div>
            <div id="data-labels-chart"></div>
        </div>

    )
}

export default StatisticalRevenue