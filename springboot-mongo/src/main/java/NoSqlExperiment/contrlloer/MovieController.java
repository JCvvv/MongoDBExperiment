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
        Double averageRating = movieService.getAverageRating();
        if (averageRating != null) {
            return BigDecimal.valueOf(averageRating)
                    .setScale(2, RoundingMode.HALF_UP)
                    .doubleValue();
        }
        return null;
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
}


