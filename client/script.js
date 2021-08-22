const movieListRow = document.querySelector(
  '.movie-list-section .movie-list-row',
);
const movieSection = document.querySelector('.movie-section');

const queryFetch = (query, variables) => {
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then(res => res.json());
};

const getMoviesList = async () => {
  const query = `
    query getMovies{
      movies {
        id
        name
        director { 
          name 
        }
      }
    }`;

  const response = await queryFetch(query);
  return response.data;
};

const getMovie = async paramsId => {
  const query = `
    query getMovie($id:Int!){
      movie (id: $id) {
        name
        director {
          name
        }
      }
    }`;

  const variables = { id: parseInt(paramsId) };

  const response = await queryFetch(query, variables);
  return response.data;
};

const init = () => {
  if (movieListRow) {
    let htmlTemplate = '';

    getMoviesList().then(data => {
      data.movies.map(movie => {
        htmlTemplate += `
          <div class="col-md-3 mt-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${movie.name}</h5>
                <p class="card-text">${movie.director.name}</p>
                <a href="./movie.html?id=${movie.id}" class="btn btn-outline-success">More details</a>
              </div>
            </div>
          </div>
        `;
      });
      movieListRow.innerHTML = htmlTemplate;
    });
  } else if (movieSection) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    let htmlTemplate = '';

    if (movieId) {
      getMovie(movieId).then(data => {
        htmlTemplate = `
          <h2>${data.movie.name}</h2>
          <h4 class="mt-4">${data.movie.director.name}</h4>
          <a href="./movies.html" class="btn btn-success mt-3">Back to movies</a>
        `;
        movieSection.innerHTML = htmlTemplate;
      });
    }
  }
};

init();
