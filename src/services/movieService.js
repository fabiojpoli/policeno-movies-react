import http from './httpService';

export async function getMovies() {
  const { data: movies } = await http.get('/movies');
  return movies;
}

export async function getMovie(id) {
  const { data: movie } = await http.get(`/movies/${id}`);
  return movie;
}

export async function saveMovie(data) {
  const id = data._id;
  let result;

  if (id) {
    const movie = { ...data };
    delete movie._id;
    result = await http.put(`/movies/${id}`, movie);
  } else {
    result = await http.post('/movies', data);
  }

  return result.data;
}

export async function deleteMovie(id) {
  const { data: movie } = await http.delete(`/movies/${id}`);
  return movie;
}
