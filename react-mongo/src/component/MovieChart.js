import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './MovieChart.css';

const MovieChart = ({ year, data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!data || !data[year]) {
            return; // 如果给定年份的数据不存在，则不渲染图表
        }

        const chartInstance = echarts.init(chartRef.current);
        const chartData = data[year]; // 获取给定年份的数据

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    // 将月份格式化为两位数字以匹配数据
                    const monthFormatted = params.name.padStart(2, '0');
                    const movieData = data[year].find(item => item._id === monthFormatted);

                    if (!movieData || movieData.movieCount === 0) {
                        return '无电影上映';
                    } else if (movieData.movieCount === 1) {
                        return `评分：${movieData.maxRating}<br>电影：${movieData.highestRatedMovie}`;
                    } else {
                        return `
                            平均评分：${movieData.averageRating.toFixed(2)}<br>
                            最高评分电影：${movieData.highestRatedMovie} (${movieData.maxRating})<br>
                            最低评分电影：${movieData.lowestRatedMovie} (${movieData.minRating})
                        `;
                    }
                }
            },
            legend: {
                top: '15%',
                left: 'center',
                selectedMode: true
            },
            series: [
                {
                    name: '每月电影数量',
                    type: 'pie',
                    radius: ['40%', '90%'],
                    center: ['50%', '80%'],
                    startAngle: 180,
                    label: {
                        show: true,
                        formatter: (param) => {
                            // 从月份数据中移除前导零
                            const month = param.name.startsWith('0') ? param.name.substring(1) : param.name;
                            return `${month}月 (${Math.round(param.percent * 2)}%)`;
                        }
                    },
                    data: chartData.map(item => ({
                        value: item.movieCount,
                        name: item._id.startsWith('0') ? item._id.substring(1) : item._id
                    })).concat({
                        value: chartData.reduce((sum, item) => sum + item.movieCount, 0),
                        itemStyle: { color: 'none' },
                        label: { show: false }
                    })
                }
            ],
            title: {
                show: true,
                text: year.toString(), // 显示选定的年份
                left: 'center', // 水平居中
                top: '70%', // 调整位置使其位于环形图的中心
                textStyle: {
                    color: '#333', // 字体颜色
                    fontSize: 28, // 字体大小
                    fontWeight: 'bold' // 字体粗细
                }
            },
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, [year, data]);

    return <div ref={chartRef} className="chart-container" style={{ width: '600px', height: '350px'}}></div>;

};

export default MovieChart;
