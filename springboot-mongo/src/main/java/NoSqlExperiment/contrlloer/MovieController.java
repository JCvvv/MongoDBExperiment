package NoSqlExperiment.contrlloer;

import NoSqlExperiment.model.Movie;
import NoSqlExperiment.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.bson.Document;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/maxRating")
    public Double getMaxRating() {
        return movieService.getMaxRating();
    }

    @GetMapping("/minRating")
    public Double getMinRating() {
        return movieService.getMinRating();
    }

    @GetMapping("/averageRating")
    public Double getAverageRating() {
        return movieService.getAverageRating();
    }

    @GetMapping("/medianRating")
    public Double getMedianRating() {
        return movieService.getMedianRating();
    }

    @GetMapping("/countByMonth")
    public List<Document> getMovieCountByMonth() {
        return movieService.getMovieCountByMonth();
    }

    @GetMapping("/countByMonthAndYear")
    public List<Document> getMovieCountByMonthAndYear() {
        return movieService.getMovieCountByMonthAndYear();
    }

    @GetMapping("/countByMonth/{year}")
    public List<Document> getMovieCountByMonthForYear(@PathVariable int year) {
        return movieService.getMovieCountByMonthForYear(year);
    }

    @GetMapping("/topDirectors")
    public List<Document> getTop20Directors() {
        return movieService.getTop20DirectorsWithHighestRatedMovies();
    }

    @GetMapping("/topActors")
    public List<Document> getTop20Actors() {
        return movieService.getTop20ActorsWithHighestRatedMovies();
    }

    @GetMapping("/highRated")
    public List<Document> getHighRatedMovies() {
        return movieService.getHighRatedMovies();
    }
}


