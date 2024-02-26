/* Plone i18n is insuffarable. There self impl. Way easier to mantain.
*/
export interface MESSAGES {
        days: {
                monday: string;
                tuesday: string;
                wednesday: string;
                thursday: string;
                friday: string;
                saturday: string;
                sunday: string;
        }
        attr: {
                phone: string;
                email: string;
                place: string;
                staff: string;
                attendance_times: string;
        }
}

export function getMessages(locale: string): MESSAGES {
        switch(locale) {
                case 'de':
                        return MESSAGES_DE;
                case 'en':
                default:
                        return MESSAGES_EN;
        }
}

export const MESSAGES_EN: MESSAGES = {
    days: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
    },
    attr: {
        phone: "Phone",
        email: "Email",
        place: "Place",
        staff: "Staff",
        attendance_times: "Attendance Times",
    }
}

export const MESSAGES_DE: MESSAGES = {
    days: {
        monday: "Montag",
        tuesday: "Dienstag",
        wednesday: "Mittwoch",
        thursday: "Donnerstag",
        friday: "Freitag",
        saturday: "Samstag",
        sunday: "Sonntag",
    },
    attr: {
        phone: "Telefon",
        email: "E-Mail",
        place: "Ort",
        staff: "Mitarbeiter",
        attendance_times: "Anwesenheitszeiten",
    }
}

