import tableSVG from "@plone/volto/icons/table.svg";
import { ReferatsEdit, ReferatsView } from "./Referat";
import Clock from "./widgets/Clock";
import { NewsList } from "./NewsList/NewsList";
const applyConfig = (config) => {
  config.blocks.blocksConfig.Referat = {
    id: "Referat",
    title: "ReferatsView",
    icon: tableSVG,
    group: "common",
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
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: "newsList",
      isDefault: false,
      title: "AStA News List",
      template: NewsList,
      /* use schemaEnhancer to add fields of FullCalendarBlock here */
    },
  ];
  config.widgets.widget.clock = Clock;
  config.settings.pluggableStylesBlocksWhitelist = [config.blocks.text];
  return config;
};

export default applyConfig;
