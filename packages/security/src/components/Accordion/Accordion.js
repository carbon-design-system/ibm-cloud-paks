/**
 * @file Accordion.
 * @copyright IBM Security 2019 - 2021
 */

import PropTypes from 'prop-types';
import React from 'react';

import { Accordion as CarbonAccordion } from 'carbon-components-react';

const { defaultProps, propTypes } = CarbonAccordion;

const Accordion = ({ align, ...other }) => (
  <CarbonAccordion {...other} align={align} />
);

Accordion.defaultProps = {
  ...defaultProps,
  align: 'start',
};

Accordion.propTypes = {
  ...propTypes,

  /** Specify the alignment of the accordion heading title and chevron. */
  align: PropTypes.oneOf(['start', 'end']),
};

export default Accordion;
