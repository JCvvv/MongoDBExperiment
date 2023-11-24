import React, { useState, useEffect } from 'react';
import MovieChart from './component/MovieChart';
import YearSlider from './component/YearSlider';
import MonthlyMovieBarChart from './component/MonthlyMovieBarChart';
import MovieStatistics from './component/MovieStatistics';
import './App.css';




function App() {
    // ...状态定义...
    const [selectedYear, setSelectedYear] = useState(2000);
    const [chartData, setChartData] = useState({});

    const [stats, setStats] = useState({
        average: null,
        median: null,
        highest: null,
        lowest: null
    });

    // ...fetchData函数定义...
    const fetchData = async (url) => {
        try {
            const response = await fetch(`http://localhost:8082/movies${url}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetching data failed", error);
            return error.message.includes('404') ? [] : null; // 返回空数组或null作为错误处理
        }
    };
    

    // ...useEffect钩子...
    useEffect(() => {
        fetchData(`/countByMonth/${selectedYear}`).then(data => {
            setChartData(prevData => ({ ...prevData, [selectedYear]: data }));
        });
    }, [selectedYear]);
    
    useEffect(() => {
        const fetchStats = async () => {
            const highest = await fetchData('/maxRating');
            const lowest = await fetchData('/minRating');
            const average = await fetchData('/averageRating');
            const median = await fetchData('/medianRating');
    
            setStats({ highest, lowest, average, median });
        };
    
        fetchStats();
    }, []);
    

    return (
        <div className='App'>
            <div className='a'>
                <MonthlyMovieBarChart />
            </div>
            <div>
                <MovieStatistics
                    average={stats.average}
                    median={stats.median}
                    highest={stats.highest}
                    lowest={stats.lowest}
                />
            </div>
            <div className='b'>
                <MovieChart year={selectedYear} data={chartData} />
                <YearSlider minYear={2000} maxYear={2022} onYearChange={setSelectedYear} />
            </div>
        </div>
    );
}

export default App;




