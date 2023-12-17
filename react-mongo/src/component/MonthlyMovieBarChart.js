import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './MonthlyMovieBarChart.css';

const MonthlyMovieBarChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        // 定义数据
        const movieData = [
            { _id: "01", movieCount: 476 },
            { _id: "02", movieCount: 306 },
            { _id: "03", movieCount: 266 },
            { _id: "04", movieCount: 290 },
            { _id: "05", movieCount: 389 },
            { _id: "06", movieCount: 322 },
            { _id: "07", movieCount: 394 },
            { _id: "08", movieCount: 341 },
            { _id: "09", movieCount: 498 },
            { _id: "10", movieCount: 375 },
            { _id: "11", movieCount: 406 },
            { _id: "12", movieCount: 499 }
        ];

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {
                type: 'value',
                max: 600
            },
            series: [{
                data: movieData.map(item => item.movieCount),
                type: 'bar',
                itemStyle: {
                    color: (params) => {
                        if (params.value < 300) {
                            return '#85C1E9';
                        } else if (params.value >= 300 && params.value < 400) {
                            return '#F7DC6F';
                        } else {
                            return '#E74C3C';
                        }
                    }
                }
            }]
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    return <div ref={chartRef} className="MonthlyMovieBarChart" style={{ width: '600px', height: '380px' }}></div>;
};

export default MonthlyMovieBarChart;
