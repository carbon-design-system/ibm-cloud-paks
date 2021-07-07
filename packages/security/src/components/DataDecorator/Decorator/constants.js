/**
 * @file Decorator constants.
 * @copyright IBM Security 2019
 */

import { getComponentNamespace } from '../../../globals/namespace';

const namespace = getComponentNamespace('decorator');

const unknown = `M8 3.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z`;

const critical = `M14 2v12H2z`;

const high = `M8 2l7 11H1z`;

const medium = `M 8.00,1.00
           C 8.00,1.00 15.00,8.00 15.00,8.00
             15.00,8.00 8.00,15.00 8.00,15.00
             8.00,15.00 1.00,8.00 1.00,8.00
             1.00,8.00 8.00,1.00 8.00,1.00 Z`;

const low = `M 14.00,2.00
           C 14.00,2.00 14.00,14.00 14.00,14.00
             14.00,14.00 2.00,14.00 2.00,14.00
             2.00,14.00 2.00,2.00 2.00,2.00
             2.00,2.00 14.00,2.00 14.00,2.00 Z`;

const icons = {
  critical,
  high,
  low,
  medium,
  unknown,
};

const getDecoratorProps = (score, scoreThresholds, active) => {
  let path = icons.unknown;
  let classes = `${namespace}--unknown`;

  if (score < scoreThresholds[1] && score >= scoreThresholds[0]) {
    path = icons.low;
    classes = `${namespace}--low`;
  } else if (score < scoreThresholds[2] && score >= scoreThresholds[1]) {
    path = icons.medium;
    classes = `${namespace}--medium`;
  } else if (score < scoreThresholds[3] && score >= scoreThresholds[2]) {
    path = icons.high;
    classes = `${namespace}--high${active ? '--active' : ''}`;
  } else if (score >= scoreThresholds[3]) {
    path = icons.critical;
    classes = `${namespace}--critical`;
  }

  return { path, classes };
};

export { getDecoratorProps, icons, namespace };
