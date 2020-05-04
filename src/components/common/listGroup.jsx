import React from 'react';

const ListGroup = ({
  textProperty,
  valueProperty,
  onItemSelect,
  items,
  selectedItem
}) => {
  return (
    <ul className='list-group'>
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          className={
            selectedItem === item
              ? 'clickable list-group-item active'
              : 'clickable list-group-item'
          }
          key={item[valueProperty]}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: '_id',
  textProperty: 'name'
};

export default ListGroup;
