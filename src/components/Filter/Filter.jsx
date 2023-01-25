import React from "react";
import PropTypes from 'prop-types';

import { Title } from './Filter.styled';

export const Filter = ({ value, onFilter }) => {
  return (
    <>
      <Title>Find contacts by name</Title>
      <input type='text' name='filter' value={value} onChange={onFilter} />
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};