/**
 * @file Decorator
 * @copyright IBM Security 2019 - 2021
 */

import deprecate from 'carbon-components-react/es/prop-types/deprecate';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getDecoratorProps, namespace, icons } from './constants';

import Icon from '../../Icon';

/**
 * Decorator component.
 * @param {boolean} noIcon don't display icon.
 * @param {string} path svg path.
 * @returns {Decorator} Decorator instance.
 */
class Decorator extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handles when the Decorator has been clicked.
   * @param {SyntheticEvent} event The event fired when the Decorator has been clicked.
   */
  handleClick = (event) => {
    this.props.onClick(event, this.props.type, this.props.value);
  };

  handleContextMenuClick = (event) => {
    this.props.onContextMenu(event, this.props.type, this.props.value);
  };

  truncationUtil = (inputText, maxLength, front, back) => {
    let truncationValue = inputText;
    if (inputText.length > maxLength) {
      truncationValue = `${inputText.substring(0, front)}…${inputText.substr(
        inputText.length - back
      )}`;
    }
    return truncationValue;
  };

  renderDecorator = (
    inline,
    noIcon,
    path,
    score,
    scoreDescription,
    scoreThresholds,
    title,
    type,
    value
  ) => (
    <>
      {!noIcon && (
        <span className={`${namespace}__icon`}>
          <Icon
            fillRule="evenodd"
            path={path}
            size={inline ? 12 : 16}
            viewBox="0 0 16 16"
            title={scoreDescription(score, scoreThresholds)}
          />
        </span>
      )}
      <span className={`${namespace}__type`}>{type}</span>
      <span className={`${namespace}__value`} title={title || value}>
        {this.props.midLineTruncation.enabled
          ? this.truncationUtil(
              value,
              this.props.midLineTruncation.maxLength,
              this.props.midLineTruncation.front,
              this.props.midLineTruncation.back
            )
          : value}
      </span>
    </>
  );

  render() {
    const {
      active,
      className,
      href,
      inline,
      noIcon,
      onClick,
      score,
      scoreDescription,
      scoreThresholds,
      title,
      type,
      value,
    } = this.props;

    const { path, classes } = getDecoratorProps(score, scoreThresholds, active);

    const decorator = this.renderDecorator(
      inline,
      noIcon,
      path,
      score,
      scoreDescription,
      scoreThresholds,
      title,
      type,
      value
    );

    const decoratorClasses = classnames(namespace, classes, className, {
      [`${namespace}--interactive`]: href || onClick,
      [`${namespace}--active`]: active,
      [`${namespace}--inline`]: inline,
    });

    if (href) {
      return (
        <a href={href} className={decoratorClasses} tabIndex={0}>
          {decorator}
        </a>
      );
    }

    if (onClick) {
      return (
        <button
          className={decoratorClasses}
          onClick={this.handleClick}
          onContextMenu={this.handleContextMenuClick}>
          {decorator}
        </button>
      );
    }

    return <span className={decoratorClasses}>{decorator}</span>;
  }
}

Decorator.propTypes = {
  /** @type {boolean} Whether the Decorator is active */
  active: PropTypes.bool,

  /** @type {string} Additional classes to add. */
  className: PropTypes.string,

  /** @type {string} The href for the Decorator. */
  href: PropTypes.string,

  /** @type {boolean} Whether the Decorator can be interacted with */
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  inert: deprecate(
    PropTypes.bool,
    `\nThe prop \`inert\` for Decorator has been deprecated. The Decorator will now be considered "inert" (non-interactive) by default. You can make a Decorator interactive by adding an \`href\` or \`onClick\` prop.`
  ),

  /** @type {boolean} Whether the Decorator should be treated and styled as an inline element. */
  inline: PropTypes.bool,

  /** @type {Function} Click handler of the Decorator. */
  onClick: PropTypes.func,

  /** @type {Function} Secondary click handler of the Decorator. */
  onContextMenu: PropTypes.func,

  /** @type {boolean} Whether the Decorator includes an icon */
  noIcon: PropTypes.bool,

  /** @type {number} The score of the data. */
  score: PropTypes.number,

  /** @type {Array<number>} An array of four numbers indicating score thresholds for severity. */
  scoreThresholds: (props, propName) => {
    if (
      !Array.isArray(props.scoreThresholds) ||
      props.scoreThresholds.length !== 4 ||
      !props.scoreThresholds.every((number) => typeof number === 'number')
    ) {
      return new Error(
        `${propName} is required to be an array of four numbers.`
      );
    }
    return null;
  },

  /** @type {string} The title of data. */
  title: PropTypes.string,

  /** @type {string} The type of data. */
  type: PropTypes.string.isRequired,

  /** @type {string} The value of the data. */
  value: PropTypes.string.isRequired,

  /** @type {func} Descriptive text for screen readers that details the severity of a score. */
  scoreDescription: PropTypes.func,

  /** @type {object} Mid-line truncation options applied to value of decorator if applicable. */
  midLineTruncation: PropTypes.shape({
    enabled: PropTypes.bool,
    maxLength: PropTypes.number,
    front: PropTypes.number,
    back: PropTypes.number,
  }),
};

Decorator.defaultProps = {
  active: false,
  className: '',
  href: undefined,
  inline: false,
  onClick: undefined,
  onContextMenu: () => {},
  noIcon: false,
  score: undefined,
  scoreThresholds: [0, 4, 7, 10],
  title: '',
  scoreDescription: (score, scoreThresholds) =>
    score
      ? `Score ${score} out of ${scoreThresholds.slice(-1)[0]}`
      : 'No score',
  midLineTruncation: {
    enabled: false,
    maxLength: 20,
    front: 12,
    back: 4,
  },
};

/**
 * Generate exports for individual severity icon types.
 * @param {Array} iconNames array of icon names
 */
function generateIconExports(...iconNames) {
  const namedExports = {};
  iconNames.forEach((iconName) => {
    const IconComponent = ({ className, description, size, ...other }) => (
      <Icon
        className={classnames(
          `${namespace}__icon--${iconName.toLowerCase()}`,
          className
        )}
        fillRule="evenodd"
        path={icons[iconName]}
        size={size}
        viewBox="0 0 16 16"
        aria-label={description}
        {...other}
      />
    );
    IconComponent.propTypes = {
      /** Optional class name. */
      className: PropTypes.string,

      /** Icon size. */
      size: PropTypes.oneOf([12, 16]),

      /** The icon description. */
      description: PropTypes.string.isRequired,
    };

    IconComponent.defaultProps = {
      className: '',
      size: 16,
    };

    // Capitalize first character of icon name
    // so that the export is `Decorator.Low` etc.
    const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);

    IconComponent.displayName = `Decorator.${formattedName}`;
    namedExports[formattedName] = IconComponent;
  });
  return namedExports;
}

Object.assign(Decorator, generateIconExports(...Object.keys(icons)));

export default Decorator;
