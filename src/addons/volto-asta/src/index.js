import tableSVG from "@plone/volto/icons/table.svg";
import { ReferatsEdit, ReferatsView } from "./Referat";
import { FachschaftenListe, FachschaftenListeEdit } from "./Fachschaften-Liste";
import { AppSettings, AppSettingsEdit } from "./Appsettings";
import Clock from "./widgets/Clock";
import { NewsList } from "./NewsList/NewsList";
import { routes } from "./Redirect/Redirect";
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
  config.blocks.blocksConfig.Fs = {
    id: "Fs",
    title: "FachschaftenView",
    icon: tableSVG,
    group: "common",
    view: FachschaftenListe,
    edit: FachschaftenListeEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  config.blocks.blocksConfig.App = {
    id: "App",
    title: "AppView",
    icon: tableSVG,
    group: "common",
    view: AppSettings,
    edit: AppSettingsEdit,
    restricted: (opts) => {
      return !opts?.properties["@id"]?.includes("de/app");
    },
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
  if (config.addonRoutes) {
    config.addonRoutes = [...config.addonRoutes, ...routes];
  } else {
    config.addonRoutes = routes;
  }

  return config;
};

export default applyConfig;
