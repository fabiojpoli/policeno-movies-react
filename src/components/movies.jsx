import React, { Component } from 'react';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
import { toast } from 'react-toastify';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: ''
  };

  async componentDidMount() {
    const genres = [{ name: 'All Genres', _id: null }, ...(await getGenres())];

    this.setState({
      movies: await getMovies(),
      genres
    });
  }

  handleDelete = async movieId => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movieId);
    this.setState({
      movies
    });

    try {
      await deleteMovie(movieId);
      this.props.history.push('/movies');
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted.');
      }

      this.setState({
        movies: originalMovies
      });
    }
  };

  handleFavorite = movieId => {
    const movies = [...this.state.movies];

    movies.map(mov => {
      if (mov._id === movieId) {
        mov.favorite = !mov.favorite;
      }

      return mov;
    });

    this.setState({
      movies
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: ''
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    const searchered = searchQuery.length
      ? movies.filter(m =>
          new RegExp(`\\b${searchQuery}\\b`, 'gi').test(m.title)
        )
      : movies;

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : searchered;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginedMovies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: paginedMovies
    };
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1
    });
  };

  render() {
    const {
      genres,
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies
    } = this.state;

    const { user } = this.props;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className='row movies'>
        <div className='col-3'>
          <ListGroup
            items={genres}
            allText='All Genres'
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          {user && (
            <Link
              to='/movies/new'
              className='btn btn-primary'
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onLike={this.handleFavorite}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            pageSize={pageSize}
            dataCount={totalCount}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
