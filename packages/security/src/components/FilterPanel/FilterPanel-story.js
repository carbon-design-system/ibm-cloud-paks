/**
 * @file Filter panel stories.
 * @copyright IBM Security 2020 - 2021
 */

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';

import { compose, withState, withHandlers, getDisplayName } from 'recompose';
import React from 'react';

import { patterns } from '../../../.storybook';
import Checkbox from '../Checkbox';
import Search from '../Search';
import { AccordionItem, Accordion } from '../Accordion';

import {
  filterData,
  title,
  filtersExpandLabel,
  filtersCollapseLabel,
  noFiltersResultsLabel,
  filterSearchLabel,
  labels,
} from './_mocks_';

import FilterPanel, {
  FilterPanelSearch,
  FilterPanelAccordion,
  FilterPanelAccordionItem,
  FilterPanelCheckbox,
  FilterPanelGroup,
} from '.';

// Ensure that passed down props are shown in types table.
FilterPanelCheckbox.__docgenInfo = Checkbox.__docgenInfo;
FilterPanelAccordion.__docgenInfo = Accordion.__docgenInfo;
FilterPanelAccordionItem.__docgenInfo = AccordionItem.__docgenInfo;
FilterPanelSearch.__docgenInfo = Search.__docgenInfo;

const LegacyFilterPanelWithState = compose(
  // Maintain a state attribute called filterData.
  withState('filterData', 'onFilterToggle', ({ filterData }) => filterData),

  // When value changes update state and call passed in onChange method.
  withHandlers({
    onChange:
      ({ onChange, onFilterToggle, filterData }) =>
      (filter) => {
        onChange(filter);

        // eslint-disable-next-line no-param-reassign
        filterData.filters[filter.id].enabled =
          !filterData.filters[filter.id].enabled;
        onFilterToggle(filterData);
      },
  })
)(FilterPanel);

const checkboxProps = () => ({
  count: 10,
  onChange: action('FilterPanelCheckbox onChange'),
  title: 'FilterPanelCheckbox title attribute (title)',
});

LegacyFilterPanelWithState.displayName = getDisplayName(FilterPanel);
LegacyFilterPanelWithState.__docgenInfo = FilterPanel.__docgenInfo;

storiesOf(patterns('FilterPanel'), module)
  .addDecorator((story) => (
    <div style={{ padding: '1rem', width: '16rem', margin: '0 auto' }}>
      {story()}
    </div>
  ))
  .add('default', () => (
    <FilterPanel title={text('FilterPanel title (title)', title)}>
      <FilterPanelSearch
        id="filter-search"
        labelText={text(
          'FilterPanelSearch label text (labelText)',
          filterSearchLabel
        )}
        onChange={action('FilterPanelSearch onChange')}
        placeholder={text(
          'FilterPanelSearch placeholder text (placeholder)',
          filterSearchLabel
        )}>
        <FilterPanelGroup title="Filter accordion item">
          <FilterPanelCheckbox
            labelText="Filter checkbox"
            id="result-filter-checkbox"
            {...checkboxProps()}
          />
          <FilterPanelCheckbox
            labelText="Long filter checkbox label"
            id="result-long-filter-checkbox"
            {...checkboxProps()}
          />
          <FilterPanelCheckbox
            labelText="Checked"
            id="result-checked"
            defaultChecked
            {...checkboxProps()}
          />
        </FilterPanelGroup>
        <FilterPanelGroup title="Truncated accordion item">
          {new Array(3).fill(null).map((value, index) => (
            <FilterPanelCheckbox
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              labelText={`Filter ${index + 1}`}
              id={`result-filter-checkbox-${index + 1}`}
              {...checkboxProps()}
            />
          ))}
        </FilterPanelGroup>
      </FilterPanelSearch>

      <FilterPanelAccordion title="Filter accordion" count={150}>
        <FilterPanelAccordionItem
          open
          title="Filter accordion item"
          count={3}
          expandLabel="View more"
          collapseLabel="View less">
          <FilterPanelCheckbox
            labelText="Filter checkbox"
            id="filter-checkbox"
            {...checkboxProps()}
          />
          <FilterPanelCheckbox
            labelText="Long filter checkbox  label"
            id="long-filter-checkbox"
            {...checkboxProps()}
          />
          <FilterPanelCheckbox
            labelText="Checked"
            id="checked"
            defaultChecked
            {...checkboxProps()}
          />
        </FilterPanelAccordionItem>
        <FilterPanelAccordionItem
          title="Truncated accordion item"
          count={12}
          expandLabel="View more"
          collapseLabel="View less">
          {new Array(12).fill(null).map((value, index) => (
            <FilterPanelCheckbox
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              labelText={`Filter ${index + 1}`}
              id={`filter-checkbox-${index + 1}`}
              {...checkboxProps()}
            />
          ))}
        </FilterPanelAccordionItem>
      </FilterPanelAccordion>
      <FilterPanelAccordion title="Filter accordion 2" count={100}>
        <FilterPanelAccordionItem
          heading={<span>Filter accordion item 1</span>}
          title="Filter accordion item 1"
          count={4}
          expandLabel="View more"
          collapseLabel="View less">
          {new Array(4).fill(null).map((value, index) => (
            <FilterPanelCheckbox
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              labelText={`Filter ${index + 1}`}
              id={`1-filter-${index + 1}`}
              {...checkboxProps()}
            />
          ))}
        </FilterPanelAccordionItem>

        <FilterPanelAccordionItem
          title="Filter accordion item 2"
          count={6}
          expandLabel="View more"
          collapseLabel="View less">
          {new Array(6).fill(null).map((value, index) => (
            <FilterPanelCheckbox
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              labelText={`Filter ${index + 1}`}
              id={`2-filter-${index + 1}`}
              {...checkboxProps()}
            />
          ))}
        </FilterPanelAccordionItem>
      </FilterPanelAccordion>
    </FilterPanel>
  ))

  .add(
    'with deprecated FilterData',
    () => (
      <LegacyFilterPanelWithState
        onChange={action('onChange')}
        title={text('title', title)}
        filtersExpandLabel={text('filtersExpandLabel', filtersExpandLabel)}
        filtersCollapseLabel={text(
          'filtersCollapseLabel',
          filtersCollapseLabel
        )}
        noFiltersResultsLabel={text(
          'noFiltersResultsLabel',
          noFiltersResultsLabel
        )}
        filterSearchLabel={text('filterSearchLabel', filterSearchLabel)}
        filterData={object('filterData', filterData)}
        labels={labels}
      />
    ),
    {
      info: {
        text: `## Basic implementation of Filter Panel

          The most crucial requirement for this component is the structure of the filter data. Be sure to
          check out type definitions for [filter data](https://github.com/carbon-design-system/ibm-security/blob/master/src/components/FilterPanel/LEGACY_FilterPanel/FilterPanelUtilities.js#L60).
          Using the unique prop for each label will override the version passed in the \`labels\` prop.`,
      },
    }
  );
