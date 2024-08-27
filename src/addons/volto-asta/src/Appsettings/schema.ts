export const AppSettingsSchema = ({ intl }) => ({
  title: "AppSettings",

  fieldsets: [
    {
      id: "default",
      title: "",
      fields: [
        "name",
        "isConsultation",
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
    isConsultation: {
      type: "bool",
      title: "Beratung?",
    },
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
    referate: {
      title: "Referate",
      widget: "object_list",
    },
  },

  required: [],
});

export const ReferateAppSchema = () => {};
