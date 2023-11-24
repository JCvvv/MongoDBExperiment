import React from 'react';

const MovieStatistics = ({ average, median, highest, lowest }) => {
    return (
        <div className="movie-statistics-container">
            <div className="statistic">
                <h2>Average Rating</h2>
                <p className="rating">{average}</p>
            </div>
            <div className="statistic">
                <h2>Median Rating</h2>
                <p className="rating">{median}</p>
            </div>
            <div className="statistic">
                <h2>Highest Rating</h2>
                <p className="rating">{highest}</p>
            </div>
            <div className="statistic">
                <h2>Lowest Rating</h2>
                <p className="rating">{lowest}</p>
            </div>
        </div>
    );
};

export default MovieStatistics;
