# `Panel` component

> A set of panel primitives to help teams build simple, flexible, and WAI-ARIA
> compliant slide out panels in React.

## Table of Contents

- [Usage](#usage)
- [Props](#props)
  - [`onClose`](#onClose)
  - [`onOpen`](#onOpen)
- [Render Prop Function](#render-prop-function)
  - [Prop Getters](#prop-getters)
  - [Actions](#actions)
  - [State](#state)
  - [Props](#props-1)

## Usage

You can include `Panel` and its components by doing the following in your
project:

```js
import { Panel } from '@carbon/ibm-security';
```

The default export for `Panel` also includes properties for all the `Panel*`
components that you will also want to use in your application. You can access
them by doing either of the following:

```js
import { Panel } from '@carbon/ibm-security';
// De-structure `Panel` directly to get local references
const { Panel, PanelContainer, PanelContent, PanelController } = Panel;

// Or, just use them in your React projects by doing
<Panel.PanelContainer />
<Panel.PanelContent />
<Panel.PanelController />
```

The `Panel` component itself follows the `render` prop pattern, meaning that in
order to render something to the screen you'll have to provide a `render`
function to the `Panel` component. In practice, this looks like the following:

```jsx
import { Panel } from '@carbon/ibm-security';
const {
  Panel,
  PanelContainer,
  PanelContent,
  PanelController,
} = Panel;

// Inside of your component's `render` method
function App() {
  return (
    <Panel
        render={({ active, toggleActive }) => (
            <React.Fragment>
                <Button onClick={toggleActive}>Click Me!</Button>
                <Panel.PanelController active={active}>
                    <Panel.PanelContainer
                        title="Your title goes here"
                        subtitle="Your subtitle goes here"
                        closeButton={{ onClick: toggleActive, label: 'Close' }}
                        primaryButton={{
                            isDisabled: false,
                            label: 'Submit',
                            onClick: () => {},
                            icon: 'add',
                            iconDescription: 'Add',
                        }}
                        secondaryButton={{
                            isDisabled: false
                            label: 'Cancel',
                            onClick: toggleActive,
                        }}
                    >
                        <Panel.PanelContent>
                            <p>
                                Use the PanelContent Component to have the
                                appropriate formating applied to your content.
                            </p>
                        </Panel.PanelContent>
                        <Panel.PanelContent>
                            <p>
                                Lorem ipsum dolor sit amet, pri blandit adversarium ea,
                                cu nominavi iudicabit complectitur mel. Populo fabulas
                                eleifend cu mei, sea in everti deterruisset, labitur
                                deleniti an usu. Lorem delectus percipit vis et. Ad est
                                debet habemus constituto, ei usu autem imperdiet, pro ex
                                ridens iriure. Nibh numquam detraxit vis ut, zril
                                iracundia splendide eos ad. Mel populo melius at, vix
                                illud omnium verterem ut. Nec id viris laudem offendit,
                                ius fugit erroribus conceptam an. At has causae delenit
                                euripidis, dicta noluisse nam eu. No nec quod tota
                                euismod, cu persius elaboraret reprehendunt qui. Sit eu
                                case malorum volutpat.
                            </p>
                        </Panel.PanelContent>
                    </Panel.PanelContainer>
                </Panel.PanelController>
            </React.Fragment>
        )}
    />
  );
}
```

In the example above, we can see that the `render` prop is just a function that
has the following arguments:

- `active` which is the state of the `Panel`, it is used to mount/unmount the
  `PanelContainer` when open/closed
- `handleClose` which is the method to close `Panel`
- `handleOpen` which is the method to open the `Panel`
- `toggleActive` which is the method to change the state of the `Panel`

For a full list of what is available in this `render` prop, check out the
[Render Prop Function](#render-prop-function) section.

## Props

### `onClose`

The `onClose` prop is where you provide the function to call when the `Panel` is
closed by either the `handleClose` or `toggleActive` render prop arguments. Any
arguments passed to those functions will be passed through to the `onClose`
function.

### `onOpen`

The `onOpen` prop is where you provide the function to call when the `Panel` is
opened by either the `handleOpen` or `toggleActive` render prop arguments. Any
arguments passed to those functions will be passed through to the `onOpen`
function.

## Render Prop Function

The `render` prop is a function that you give to the `Panel` component that
takes in a variety of arguments and should ultimately return a valid React
element, or component. This could be as simple or complex as the following
example:

```jsx
// Not very useful, but returns a valid React element
const render = () => <div />;
// Useful and returns a valid React Component
const render = ({ active, toggleActive }) => (
    <React.Fragment>
        <Button onClick={toggleActive}>Click Me!</Button>
        <Panel.PanelController active={active}>
            <Panel.PanelContainer
                title="Your title goes here"
                subtitle="Your subtitle goes here"
                closeButton={{ onClick: toggleActive, label: 'Close' }}
                primaryButton={{
                    isDisabled: false,
                    label: 'Submit',
                    onClick: () => {},
                    icon: 'add',
                    iconDescription: 'Add',
                }}
                secondaryButton={{
                    isDisabled: false
                    label: 'Cancel',
                    onClick: toggleActive,
                }}
            >
                <Panel.PanelContent>
                    <p>
                        Use the PanelContent Component to have the
                        appropriate formating applied to your content.
                    </p>
                </Panel.PanelContent>
                <Panel.PanelContent>
                    <p>
                        Lorem ipsum dolor sit amet, pri blandit adversarium ea,
                        cu nominavi iudicabit complectitur mel. Populo fabulas
                        eleifend cu mei, sea in everti deterruisset, labitur
                        deleniti an usu. Lorem delectus percipit vis et. Ad est
                        debet habemus constituto, ei usu autem imperdiet, pro ex
                        ridens iriure. Nibh numquam detraxit vis ut, zril
                        iracundia splendide eos ad. Mel populo melius at, vix
                        illud omnium verterem ut. Nec id viris laudem offendit,
                        ius fugit erroribus conceptam an. At has causae delenit
                        euripidis, dicta noluisse nam eu. No nec quod tota
                        euismod, cu persius elaboraret reprehendunt qui. Sit eu
                        case malorum volutpat.
                    </p>
                </Panel.PanelContent>
            </Panel.PanelContainer>
        </Panel.PanelController>
    </React.Fragment>
);
```

The types of arguments that this function has are as follows:

- [Prop Getters](#prop-getters)
- [Actions](#actions)
- [State](#state)
- [Props](#props)

### Prop Getters

> See
> [the blog post about prop getters](https://blog.kentcdodds.com/how-to-give-rendering-control-to-users-with-prop-getters-549eaef76acf)

These functions are used to apply props to the elements that you render. The
idea behind this is that it can allow you more flexibility when deciding when to
render, and where, while still allowing `Panel` to help orchestrate state
changes inside of the Panel itself.

There are currently no available Prop Getters for the `Panel` component.

| property | type | description |
| -------- | ---- | ----------- |
|          |      |             |

### Actions

These are functions you can call to change the state of the `Panel` component.

| property       | type                                       | description                          |
| -------------- | ------------------------------------------ | ------------------------------------ | --------------------------------------- | --------------------------------------------- |
| `handleClose`  | `(...args) => this.props.onClose(...args)` | Set the state of the Panel to closed |
| `handleOpen`   | `(...args) => this.props.onOpen(...args)`  | Set the state of the Panel to open   |
| `toggleActive` | `handleOpen                                |                                      | handleClose` depending on current state | Toggle the state of the Panel, open or closed |

### State

These are values that represent the current state of the `Panel` component.

| property | type      | description                                      |
| -------- | --------- | ------------------------------------------------ |
| active   | `Boolean` | The current state of the `Panel`, open or closed |

### Props

As a convenience, properties can be passed through to make things easier to
render inside your `Panel`, however, no props are currently available.
