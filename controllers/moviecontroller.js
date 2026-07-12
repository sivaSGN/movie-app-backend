 
const OMDB_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.OMDB_API_KEY;
 
// Controller for: GET /api/movies/search?q=...
const searchMovies = async (req, res) => {
  const { q } = req.query;
 
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
 
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(q)}&type=movie`
    );
    const data = await response.json();
 
    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error || "No movies found" });
    }
 
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching movies" });
  }
};
 
// Controller for: GET /api/movies/:id  (id = imdbID, e.g. tt1375666)
const getMovieById = async (req, res) => {
  const { id } = req.params;
 
  try {
    const response = await fetch(`${OMDB_BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
 
    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error || "Movie not found" });
    }
 
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching movie details" });
  }
};
 
module.exports = { searchMovies, getMovieById };