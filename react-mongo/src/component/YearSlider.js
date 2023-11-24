import React, { useState } from 'react';
import './YearSlider.css'; // 引入样式文件

const YearSlider = ({ minYear, maxYear, onYearChange }) => {
    const [year, setYear] = useState(minYear);

    const handleSliderChange = (event) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
        onYearChange(selectedYear);
    };

    // 生成年份标签
    const yearLabels = [];
    for (let y = minYear; y <= maxYear; y++) {
        yearLabels.push(
            <span key={y} className={`year-label ${(y % 2 === 0) ? 'even' : 'odd'}`}>
                {y}
            </span>
        );
    }

    return (
        <div className="year-slider-container">
            
            <input
                type="range"
                title="Select Year"
                min={minYear}
                max={maxYear}
                value={year}
                onChange={handleSliderChange}
                className="year-slider"
            />
            <div className="year-labels">
                {yearLabels}
            </div>
            
        </div>
    );
};

export default YearSlider;
