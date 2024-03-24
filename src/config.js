/**
 * Add your config changes here.
 * @module config
 * @example
 * export default function applyConfig(config) {
 *   config.settings = {
 *     ...config.settings,
 *     port: 4300,
 *     listBlockTypes: {
 *       ...config.settings.listBlockTypes,
 *       'my-list-item',
 *    }
 * }
 */

// All your imports required for the config here BEFORE this line
import '@plone/volto/config';

export default function applyConfig(config) {
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['de', 'en'];
  config.settings.defaultLanguage = 'de';
  config.settings.pluggableStylesBlocksWhitelist = [];
  config.settings = {
    ...config.settings,
    navDepth: 2,
  };
  return config;
}
