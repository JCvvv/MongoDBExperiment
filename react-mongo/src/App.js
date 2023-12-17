import React, { useState, useEffect } from 'react';
import MovieChart from './component/MovieChart';
import YearSlider from './component/YearSlider';
import MonthlyMovieBarChart from './component/MonthlyMovieBarChart';
import MovieStatistics from './component/MovieStatistics';
import DirectorChart from './component/DirectorChart';
import ActorChart from './component/ActorChart';
import './App.css';


function App() {
    // ...状态定义...
    const [selectedYear, setSelectedYear] = useState(2000);
    const [chartData, setChartData] = useState({});
    const [directors, setDirectors] = useState([]); 
    const [actors, setActors] = useState([]); 

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

    useEffect(() => {
        fetchData('/topDirectors').then(data => {
            setDirectors(data);
        });
    }, []);

    useEffect(() => {
        fetchData('/topActors').then(data => {
            setActors(data);
        });
    }, []);
    

    return (
        <div className='App'>

            <div>
                <MovieStatistics
                    average={stats.average}
                    median={stats.median}
                    highest={stats.highest}
                    lowest={stats.lowest}
                />
            </div>

            <div className='Box'>
                <div className='Chart1'>
                    <h3 className='title'>电影上映数量与月份的关系</h3>
                    <MonthlyMovieBarChart />
                </div>
                <div className='Chart2'>
                    <h3 className='title'>一年中每月电影上映信息</h3>
                    <MovieChart year={selectedYear} data={chartData} />
                    <YearSlider minYear={2000} maxYear={2022} onYearChange={setSelectedYear} />
                </div>
            </div>

            <div className='Box2'>
                <div className='Chart3'>
                <h3>拍摄电影数目前十导演信息及其代表作</h3>
                <DirectorChart data={directors} />
                </div>
                <div className='Chart4'>
                    <h3>参演电影数目前十演员信息及其代表作</h3>
                <ActorChart data={actors}/>
                </div>
            </div>

        </div>
    );
}

export default App;
