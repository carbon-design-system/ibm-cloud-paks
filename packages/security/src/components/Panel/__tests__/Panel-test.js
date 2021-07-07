/**
 * @file Panel tests.
 * @copyright IBM Security 2019, 2021
 */

import { render, fireEvent, screen } from '@testing-library/react';
import React, { Fragment } from 'react';

import { label } from '../_mocks_';

import {
  Button,
  Panel,
  PanelContainer,
  PanelContent,
  PanelController,
} from '../../..';

import { namespace } from '../PanelContainer';

describe('Panel', () => {
  let panelActive;

  const { fn } = jest;

  const onClose = fn(() => {
    if (panelActive) {
      panelActive = false;
    }
  });

  const onOpen = fn(() => {
    if (!panelActive) {
      panelActive = true;
    }
  });

  const panelRef = React.createRef();
  const panelElement = (props) => (
    <Panel
      ref={panelRef}
      onClose={onClose}
      onOpen={onOpen}
      shouldPanelOpen={!panelActive}
      render={({ active, toggleActive }) => (
        <Fragment>
          <Button onClick={toggleActive}>toggle panel</Button>
          <PanelController active={active}>
            <PanelContainer
              title={label}
              subtitle={label}
              closeButton={{ label, onClick: toggleActive }}>
              <PanelContent>Panel content</PanelContent>
            </PanelContainer>
          </PanelController>
        </Fragment>
      )}
      {...props}
    />
  );

  beforeEach(() => {
    panelActive = false;
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { asFragment } = render(panelElement());
      expect(screen.queryByText('Panel content')).toBeNull();
      expect(asFragment()).toMatchSnapshot();
    });

    it("renders the HTML of the node's subtree", () => {
      render(panelElement());
      expect(panelRef.current.render()).toMatchSnapshot();
    });

    it('renders the open panel', async () => {
      const { asFragment } = render(panelElement());
      await fireEvent.click(
        screen.getByRole('button', { name: /toggle panel/i })
      );
      expect(screen.getByText('Panel content')).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    it('does not render the open panel if `shouldPanelOpen` is false', async () => {
      const { asFragment } = render(panelElement({ shouldPanelOpen: false }));
      await fireEvent.click(
        screen.getByRole('button', { name: /toggle panel/i })
      );
      expect(screen.queryByText('Panel content')).toBeNull();
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders the correct body margin', async () => {
      render(panelElement());
      await fireEvent.click(
        screen.getByRole('button', { name: /toggle panel/i })
      );
      const body = screen.getByRole('region');
      expect(body).toHaveStyle(`margin-top: 0px`);
    });
  });

  describe('Events', () => {
    it('should invoke `onOpen`', async () => {
      render(panelElement());
      await fireEvent.click(
        screen.getByRole('button', { name: /toggle panel/i })
      );
      expect(onOpen).toBeCalled();
    });

    it('should invoke `onClose`', async () => {
      render(panelElement());
      await fireEvent.click(
        screen.getByRole('button', { name: /toggle panel/i })
      );
      await fireEvent.click(
        screen.getByRole('button', { name: /toggle panel/i })
      );
      expect(onClose).toBeCalled();
    });
  });
});
