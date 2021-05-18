//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import styles from './_storybook-styles.scss'; // import index in case more files are added later.
import { pkg } from '../../settings';
import { getStorybookPrefix } from '../../../config';
import { RemoveModal } from '.';
import mdx from './RemoveModal.mdx';
const storybookPrefix = getStorybookPrefix(pkg, RemoveModal.displayName);

export default {
  title: `${storybookPrefix}/${RemoveModal.displayName}`,
  component: RemoveModal,
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const resourceName = 'bx1001';

const defaultProps = {
  body: `Deleting ${resourceName} will permanently delete the configuration. This action cannot be undone.`,
  className: 'remove-modal-test',
  title: 'Confirm delete',
  iconDescription: 'close',
  inputInvalidText: 'A valid value is required',
  inputLabelText: `Type ${resourceName} to confirm`,
  inputPlaceholderText: 'Name of resourceName',
  open: true,
  onRequestClose: () => {},
  primaryButtonText: 'Delete',
  resourceName,
  secondaryButtonText: 'Close',
  label: `Delete ${resourceName}`,
  preventCloseOnClickOutside: true,
};

const Template = (args) => {
  return <RemoveModal {...args} />;
};

export const WithoutConfirmation = Template.bind({});
WithoutConfirmation.args = {
  ...defaultProps,
  body: `Removing ${resourceName} will permanently remove the configuration. This action cannot be undone.`,
  title: 'Confirm removal',
  primaryButtonText: 'Remove',
  label: `Remove ${resourceName}`,
};

export const WithConfirmation = Template.bind({});
WithConfirmation.args = {
  ...defaultProps,
  textConfirmation: true,
};
