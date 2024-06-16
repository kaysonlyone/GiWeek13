import express from 'express';
import fetch from 'node-fetch';

//initialize an express application
const app = express();
app.set('view engine','hbs');
// Define the port the server will listen on
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'))

// Asynchronous function to search for a movie using The Movie Database 
async function searchMovie(movieName) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODg2ZDAzYzcwMGNlZWM5NmFlODczMWY4MThjNTQ0MyIsInN1YiI6IjY2NmI5NmU5OTgxNzBlYzllZmE3YmVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BX15nGtPIf9LXGxzgysDqi1U_0yI307ky_BSon_LTSE'
    }
  };
  // Fetch data from the  API
  const res = await fetch(url, options);
// If the response is not OK, throw an error
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data");
  }

  const json = await res.json();
  return json.results;
}

app.get('', async (req,res) =>{
  res.render('index',{movies: []});
})

app.get('/api/search', async (req, res) => {
  try {
      const { movieName } = req.query; 
      if (!movieName) {
          throw new Error("Movie name is required");
      }

      const movieData = await searchMovie(movieName); 


      if (movieData.length === 0) {
          console.log(`No movies found for ${movieName}`);
          res.render('index', { movies: [] });
      } else {
          res.render('index', { movies: movieData }); 
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});