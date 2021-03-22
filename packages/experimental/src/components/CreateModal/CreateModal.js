/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  ComposedModal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormGroup,
  Button,
} from 'carbon-components-react';

import { Canary } from '../_Canary';
import { pkg } from '../../settings';
const componentName = 'CreateModal';

const isValidChildren = () => (props) => {
  let child = props.children.props.children;
  if (child && child.length > 4) {
    throw new Error(
      'The `CreateModal` component does not take more than 4 nodes as children. This is to ensure that the modal does not overflow. Please remove 1 or more nodes.'
    );
  } else return;
};

export const CreateModal = !pkg.isComponentEnabled(componentName)
  ? // Return canary if not released or flag not set
    () => <Canary component={componentName} />
  : // Main component code...
    ({
      className,
      children,
      onClose,
      onSubmit,
      open,
      title,
      subtitle,
      description,
      secondaryButtonText,
      primaryButtonText,
      disabled,
    }) => {
      useEffect(() => {
        let modal = document.querySelector(`.${pkg.prefix}-create-modal`);
        let closeButton = modal.querySelector('.bx--modal-close');
        closeButton.remove();
      }, []);
      return (
        <ComposedModal
          className={classNames(`${pkg.prefix}-create-modal`, {
            [className]: className,
          })}
          onClose={onClose}
          open={open}
          size="sm"
          preventCloseOnClickOutside>
          <ModalHeader
            title={title}
            titleClassName={`${pkg.prefix}-create-modal-title`}>
            {subtitle && (
              <p className={`${pkg.prefix}-create-modal-subtitle`}>
                {subtitle}
              </p>
            )}
          </ModalHeader>
          <ModalBody hasForm>
            {description && (
              <p className={`${pkg.prefix}-create-modal-description`}>
                {description}
              </p>
            )}

            <div className={classNames(`${pkg.prefix}-create-modal-form`)}>
              <FormGroup legendText="">{children}</FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button kind="secondary" onClick={onClose}>
              {secondaryButtonText}
            </Button>
            <Button kind="primary" onClick={onSubmit} disabled={disabled}>
              {primaryButtonText}
            </Button>
          </ModalFooter>
        </ComposedModal>
      );
    };

CreateModal.propTypes = {
  /**
   * Children refers to all form items within a form inside of the modal's body.
   */
  children: isValidChildren(),
  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,
  /**
   * The description of the CreateModal is optional and serves to provide more information about the modal.
   */
  description: PropTypes.node,
  /**
   * Specifies an optional handler which is called when the CreateModal
   * is closed. Returning `false` prevents the CreateModal from closing.
   */
  disabled: PropTypes.bool,
  /**
   * Specifies whether the submission of the modal can be clicked or not.
   * This is important for form validation. Returning `true` enables the primary modal button.
   */
  onClose: PropTypes.func,
  /**
   * Specifies an optional handler which is called when the CreateModal
   * primary button is pressed.
   */
  onSubmit: PropTypes.func,
  /**
   * Specifies whether the CreateModal is open or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Specifies the primary button's text in the modal.
   */
  primaryButtonText: PropTypes.string,
  /**
   * Specifies the secondary button's text in the modal.
   */
  secondaryButtonText: PropTypes.string,
  /**
   * The subtitle of the CreateModal is optional and serves to provide more information about the modal.
   */
  subtitle: PropTypes.node,
  /**
   * The title of the CreateModal is usually the product or service name.
   */
  title: PropTypes.node.isRequired,
  /**
   *
   */
};

CreateModal.displayName = componentName;
CreateModal.defaultProps = {
  disabled: false,
  primaryButtonText: 'Create',
  secondaryButtonText: 'Cancel',
};
