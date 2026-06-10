import { AppPlugin } from '@grafana/data';

import { O11yAssistantSidebar } from './components/O11yAssistantSidebar';

export const plugin = new AppPlugin().addComponent({
  title: 'O11y Assistant',
  description: 'LibreChat-powered observability assistant',
  targets: ['grafana/extension-sidebar/v0-alpha'],
  component: O11yAssistantSidebar,
});
