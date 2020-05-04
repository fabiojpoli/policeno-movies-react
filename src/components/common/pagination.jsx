import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ pageSize, dataCount, onPageChange, currentPage }) => {
  const totalButtons = Math.ceil(dataCount / pageSize);
  const pages = _.range(1, totalButtons + 1);

  if (pages <= 1) {
    return null;
  }

  return (
    <ul className='pagination'>
      {pages.map(page => {
        return (
          <li
            className={page === currentPage ? 'page-item active' : 'page-item'}
            key={page}
          >
            <a className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  dataCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
