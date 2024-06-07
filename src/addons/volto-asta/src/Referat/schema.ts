const MitarbeiterSchema = ({ intl }) => ({
  title: "Mitarbeitende",
  fieldsets: [
    {
      id: "default",
      title: "",
      fields: ["name", "desc"],
    },
  ],
  properties: {
    name: { type: "string", title: "Name" },
    desc: { type: "string", title: "Beschreibung" },
  },
});

export const ÖffnungSchema = ({ intl }) => ({
  title: "Öffnung",

  fieldsets: [
    {
      id: "default",
      title: "",
      fields: ["tag", "startHour", "endHour", "ort"],
    },
  ],

  properties: {
    tag: {
      widget: "select",
      title: "Tag",
      choices: [
        ["mo", "mo"],
        ["di", "di"],
        ["mi", "mi"],
        ["do", "do"],
        ["fr", "fr"],
      ],
    },
    startHour: {
      title: "Startuhrzeit",
      widget: "clock",
    },
    endHour: {
      title: "Enduhrzeit",
      widget: "clock",
    },
    ort: {
      title: "Ort (optional)",
      widget: "string",
    },
  },
});

export const ReferatsSchema = ({ intl }) => ({
  title: "Table",

  fieldsets: [
    {
      id: "default",
      title: "",
      fields: [
        "name",
        "email",
        "ort",
        "telefon",
        "mitarbeiter",
        "anwesenheitsdienste",
        "refkrz",
        // 'align'
      ],
    },
  ],

  properties: {
    ort: {
      type: "string",
      title: "Ort",
    },
    refkrz: {
      type: "string",
      title: "Refkuerzel",
    },
    name: {
      type: "string",
      title: "Name",
    },
    email: {
      type: "email",
      title: "Email",
    },
    telefon: {
      type: "string",
      title: "Telefon",
    },
    anwesenheitsdienste: {
      title: "Anwesehnheits",
      widget: "object_list",
      schema: ÖffnungSchema({ intl }),
    },
    mitarbeiter: {
      title: "Mitarbeiter",
      widget: "object_list",
      schema: MitarbeiterSchema({ intl }),
    },
    // align: {
    //     title: intl.formatMessage(messages.Align),
    //     widget: 'align',
    //   },
  },

  required: [],
});
