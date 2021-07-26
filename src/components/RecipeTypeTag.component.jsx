import React from 'react';
import PropTypes from 'prop-types';
import {
  Chip
} from '@material-ui/core';

function RecipeTypeTag({ type }) {
  return (
    <Chip color="secondary" label={type} />
  );
}
RecipeTypeTag.propTypes = {
  type: PropTypes.oneOf(['breakfast', 'lunch', 'dinner']).isRequired
}

export default RecipeTypeTag;