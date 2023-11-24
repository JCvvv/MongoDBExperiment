package NoSqlExperiment.service;

import NoSqlExperiment.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.bson.Document;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Movie> getAllMovies() {
        return mongoTemplate.findAll(Movie.class);
    }

    public Double getMaxRating() {
        List<Movie> movies = mongoTemplate.findAll(Movie.class);
        return movies.stream()
                .map(Movie::getRating)
                .map(Double::parseDouble)
                .max(Comparator.naturalOrder())
                .orElse(null);
    }

    public Double getMinRating() {
        List<Movie> movies = mongoTemplate.findAll(Movie.class);
        return movies.stream()
                .map(Movie::getRating)
                .map(Double::parseDouble)
                .min(Comparator.naturalOrder())
                .orElse(null);
    }

    public Double getAverageRating() {
        TypedAggregation<Movie> aggregation = Aggregation.newAggregation(
                Movie.class,
                Aggregation.project()
                        .andExpression("toDouble(rating)").as("ratingAsDouble"),
                Aggregation.group().avg("ratingAsDouble").as("averageRating")
        );

        AggregationResults<Document> result = mongoTemplate.aggregate(aggregation, Document.class);
        Document averageRatingResult = result.getUniqueMappedResult();

        return averageRatingResult != null ? averageRatingResult.getDouble("averageRating") : null;
    }

    public Double getMedianRating() {
        List<Movie> movies = mongoTemplate.findAll(Movie.class);
        List<Double> ratings = movies.stream()
                .map(Movie::getRating)
                .map(Double::parseDouble)
                .sorted()
                .collect(Collectors.toList());

        if (ratings.isEmpty()) {
            return null;
        }

        int middle = ratings.size() / 2;
        if (ratings.size() % 2 == 1) {
            return ratings.get(middle);
        } else {
            return (ratings.get(middle - 1) + ratings.get(middle)) / 2.0;
        }
    }

    public List<Document> getMovieCountByMonth() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("releaseInfo"),
                Aggregation.project()
                        .andExpression("substr(releaseInfo.date, 5, 2)").as("month"),
                Aggregation.group("month").count().as("movieCount"),
                Aggregation.sort(Sort.Direction.ASC, "_id")
        );

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "Movies", Document.class);
        return results.getMappedResults();
    }

    public List<Document> getMovieCountByMonthAndYear() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.unwind("releaseInfo"),
                Aggregation.project()
                        .andExpression("substr(releaseInfo.date, 0, 4)").as("year")  // 提取年份
                        .andExpression("substr(releaseInfo.date, 5, 2)").as("month"), // 提取月份
                Aggregation.group("year", "month").count().as("movieCount"),
                Aggregation.sort(Sort.Direction.ASC, "_id.year")
                        .and(Sort.Direction.ASC, "_id.month")
        );

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "Movies", Document.class);
        return results.getMappedResults();
    }

    public List<Document> getMovieCountByMonthForYear(int year) {
        TypedAggregation<Movie> aggregation = Aggregation.newAggregation(
                Movie.class,
                Aggregation.match(Criteria.where("releaseInfo.date").regex("^" + year)),
                Aggregation.unwind("releaseInfo"),
                Aggregation.project()
                        .andExpression("substr(releaseInfo.date, 5, 2)").as("month")
                        .and("rating").as("rating")
                        .and("movieName").as("movieName")
                        .andExpression("toDouble(rating)").as("numericRating"),
                Aggregation.sort(Sort.Direction.ASC, "month"),
                Aggregation.group("month")
                        .count().as("movieCount")
                        .max("rating").as("maxRating")
                        .min("rating").as("minRating")
                        .avg("numericRating").as("averageRating")
                        .first("movieName").as("highestRatedMovie")
                        .last("movieName").as("lowestRatedMovie"),
                Aggregation.sort(Sort.Direction.ASC, "_id")
        );

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, Document.class);
        return results.getMappedResults();
    }
}
