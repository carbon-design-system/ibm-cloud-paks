/**
 * @file Search bar mocks.
 * @copyright IBM Security 2019
 */

const scopes = [
  {
    id: 'scope-2',
    name: 'Scope 2',
  },
  {
    id: 'scope-1',
    name: 'Scope 1',
  },
  {
    id: 'scope-3',
    name: 'Scope 3',
  },
];

export default {
  submitLabel: 'Submit',
  placeHolderText: 'Placeholder',
  labelText: 'Label',
  clearButtonLabelText: 'Clear',
  value: 'Initial value',
  scopes,
  selectedScopes: [scopes[0]],
  scopesTypeLabel: 'Scopes',
  allSelectedScopesLabel: 'All scopes',
};
