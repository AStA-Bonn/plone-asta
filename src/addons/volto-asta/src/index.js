import tableSVG from '@plone/volto/icons/table.svg';
import { ReferatsEdit, ReferatsView } from './Referat';
import Clock from './widgets/Clock';
const applyConfig = (config) => {
  config.blocks.blocksConfig.Referat = {
    id: 'Referat',
    title: 'ReferatsView',
    icon: tableSVG,
    group: 'common',
    view: ReferatsView,
    edit: ReferatsEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  config.widgets.widget.clock = Clock;
  return config;
};

export default applyConfig;
