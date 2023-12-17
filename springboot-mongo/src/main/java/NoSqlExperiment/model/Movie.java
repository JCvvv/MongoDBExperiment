package NoSqlExperiment.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "MovieExtra")
public class Movie {
    @Id
    private String id;
    private String movieName;
    private MovieInfo movieInfo;
    private List<String> productionCountry;
    private List<ReleaseInfo> releaseInfo;
    private String rating;
}

@Data
class MovieInfo {
    private List<String> director;
    private List<String> actors;
    private List<String> genre;
}

@Data
class ReleaseInfo {
    private String date;
    private String region;
}
