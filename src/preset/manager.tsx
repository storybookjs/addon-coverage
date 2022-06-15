import * as React from 'react';
import { addons, types } from "@storybook/addons";
import { AddonPanel } from '@storybook/components';

import { ADDON_ID, PANEL_ID, PARAM_KEY } from "../constants";
import { CoveragePanel } from '../components/CoveragePanel';

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Coverage',
    match: ({ viewMode }) => viewMode === 'story', // todo add type
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <CoveragePanel />
      </AddonPanel>
    ),
    paramKey: PARAM_KEY,
  });
});
