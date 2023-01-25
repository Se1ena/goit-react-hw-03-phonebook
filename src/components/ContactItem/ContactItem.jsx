import React from 'react';
import PropTypes from 'prop-types';
import { Btn, Contact, Item } from './ContactItem.styled';

export const ContactItem = ({ id, name, number, del }) => {
  return (
    <Item>
      <Contact>
        {name}: {number}
      </Contact>
      <Btn onClick={() => del(id)}>Delete</Btn>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  del: PropTypes.func.isRequired,
};
