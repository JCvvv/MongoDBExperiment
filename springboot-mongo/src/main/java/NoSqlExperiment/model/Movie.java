package NoSqlExperiment.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "Movies")
public class Movie {
    @Id
    private String id;
    private String movieName;
    private List<String> productionCountry;
    private List<ReleaseInfo> releaseInfo;
    private String rating;
}

@Data
class ReleaseInfo {
    private String date;
    private String region;
}

