import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Like from './common/like';
import Table from './common/table';

class MoviewTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => (
        <Like
          value={movie.favorite}
          onClick={() => this.props.onLike(movie._id)}
        />
      )
    },
    {
      key: 'delete',
      isHidden: () => {
        const user = auth.getCurrentUser();
        return !(user && user.isAdmin);
      },
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          type='button'
          className='btn btn-danger'
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviewTable;
