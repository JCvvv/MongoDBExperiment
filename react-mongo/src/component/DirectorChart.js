import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const DirectorChart = ({ data }) => {
    useEffect(() => {
      var chartDom = document.getElementById('DirectorChart');
      var myChart = echarts.init(chartDom);
  
      // 对 data 进行排序
      const sortedData = data.sort((a, b) => a.movieCount - b.movieCount);
  
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: params => {
            const director = sortedData.find(item => item._id === params.name);
            return `${params.name}<br>电影数量: ${params.value}<br>最高评分电影: ${director.highestRatedMovieName} (${director.highestRating})`;
          }
        },
        legend: {
          data: sortedData.map(item => item._id)
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            sort: 'ascending', // 设置为升序排列
            data: sortedData.map(item => ({
              value: item.movieCount,
              name: item._id
            }))
          }
        ]
      };
  
      myChart.setOption(option);
    }, [data]);
  
    return <div id="DirectorChart" style={{ width: '600px', height: '400px' }}></div>;
  };
  
  export default DirectorChart;
  
