# `Icon`

For performance reasons, the `iconName` prop has been deprecated in favor of
accepting
[`@carbon/icons-react` icons](https://www.npmjs.com/package/@carbon/icons-react) -
this is to aid in the reduction of overall bundle size and to promote
treeshaking.

If using the above method, the `size` prop is no longer required as the size is
now defined by the imported icon - this prop is solely reserved for determining
the size of an icon that is supplied via the `path` prop.

## Props

| `carbon-addons-security` | `@carbon/ibm-security` |
| ------------------------ | ---------------------- |
| `height` and `width`     | `size`                 |
| `iconName`               | `renderIcon`           |

## Example

```js
import Add16 from '@carbon/icons-react/lib/add/16';

<Icon renderIcon={Add16} />;
```
