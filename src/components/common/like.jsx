import React from 'react';

const Like = ({ value, onClick }) => {
  const getHeartClass = v => {
    let cls = 'clickable fa fa-heart';

    if (!v) {
      cls += '-o';
    }

    return cls;
  };

  return <i className={getHeartClass(value)} onClick={onClick}></i>;
};

export default Like;
