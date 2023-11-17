import { defineMessages } from 'react-intl';

const MitarbeiterSchema = ({ intl }) => ({
  title: 'Mitarbeiter',
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['name'],
    },
  ],
  properties: {
    name: { type: 'string', title: 'Name' },
  },
});

export const ÖffnungSchema = ({ intl }) => ({
  title: 'Öffnung',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.styling),
      fields: ['tag', 'startHour', 'endHour'],
    },
  ],

  properties: {
    tag: {
      widget: 'select',
      title: 'Tag',
      choices: [
        ['mo', 'mo'],
        ['di', 'di'],
        ['mi', 'mi'],
        ['do', 'do'],
        ['fr', 'fr'],
      ],
    },
    startHour: {
      title: 'Startuhrzeit',
      widget: 'clock',
    },
    endHour: {
      title: 'Enduhrzeit',
      widget: 'clock',
    },
  },
});

export const ReferatsSchema = ({ intl }) => ({
  title: 'Table',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.styling),
      fields: [
        'name',
        'email',
        'telefon',
        'mitarbeiter',
        'anwesenheitsdienste',
      ],
    },
  ],

  properties: {
    name: {
      type: 'string',
      title: 'Name (XX:XX - XX:XX) ',
    },
    email: {
      type: 'email',
      title: 'Email',
    },
    telefon: {
      type: 'string',
      title: 'Telefon',
    },
    anwesenheitsdienste: {
      title: 'Anwesehnheits',
      widget: 'object_list',
      schema: ÖffnungSchema({ intl }),
    },
    mitarbeiter: {
      title: 'Mitarbeiter',
      widget: 'object_list',
      schema: MitarbeiterSchema({ intl }),
    },
  },

  required: [],
});

const messages = defineMessages({
  fixed: {
    id: 'Fixed width table cells',
    defaultMessage: 'Fixed width table cells',
  },
  compact: {
    id: 'Make the table compact',
    defaultMessage: 'Make the table compact',
  },
  basic: {
    id: 'Reduce complexity',
    defaultMessage: 'Reduce complexity',
  },
  celled: {
    id: 'Divide each row into separate cells',
    defaultMessage: 'Divide each row into separate cells',
  },
  inverted: {
    id: 'Table color inverted',
    defaultMessage: 'Table color inverted',
  },
  striped: {
    id: 'Stripe alternate rows with color',
    defaultMessage: 'Stripe alternate rows with color',
  },
  styling: {
    id: 'Styling',
    defaultMessage: 'Styling',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  dataFile: {
    id: 'Data file',
    defaultMessage: 'Data file',
  },
});
