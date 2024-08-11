/**
 * Home container.
 * @module components/theme/NotFound/NotFound
 */

import React from "react";
import { Redirect } from "react-router-dom";

const RedirectAStASites = (to: string) => () => <Redirect to={to} />;

export const routes = [
  { path: "/Hauptseite", component: RedirectAStASites("/de") },
  // TODO Better list
  { path: "/Referate", component: RedirectAStASites("/de") },
  { path: "/Vorsitz", component: RedirectAStASites("/de/referate/Vorsitz") },
  {
    path: "/Finanzreferat",
    component: RedirectAStASites("/de/referate/finanzreferat"),
  },
  {
    path: "/Referat_für_Hochschulpolitik",
    component: RedirectAStASites("/de/referate/referat-fuer-hochschulpolitik"),
  },
  {
    path: "/IT-Referat",
    component: RedirectAStASites("de/referate/it-referat"),
  },
  {
    path: "/Referat_für_Kultur_und_studentische_Initiativen",
    component: RedirectAStASites("de/referate/referat-fuer-kultur-und-studentische-initiativen"),
  },
  {
    path: "/Öffentlichkeitsreferat",
    component: RedirectAStASites("de/referate/oeffentlichkeitsreferat"),
  },
  {
    path: "/Referat_für_Ökologie",
    component: RedirectAStASites("de/referate/referat-fuer-oekologie"),
  },
  {
    path: "/Sozialreferat",
    component: RedirectAStASites("de/referate/sozialreferat"),
  },
  {
    path: "/BIPoC-Referat",
    component: RedirectAStASites("de/referate/bipoc-referat"),
  },
  {
    path: "/Fachschaftenreferat",
    component: RedirectAStASites("de/referate/fachschaftenreferat"),
  },
  {
    path: "/Referat_für_FLINTA*_und_Geschlechtergerechtigkeit",
    component: RedirectAStASites("de/referate/referat-fuer-flinta-und-geschlechtergerechtigkeit"),
  },
  {
    path: "/Referat_für_internationale_Studierende",
    component: RedirectAStASites("de/referate/referat-fuer-internationale-studierende"),
  },
  {
    path: "/Queer-Referat",
    component: RedirectAStASites("de/referate/queer-referat"),
  },
  {
    path: "/Sportreferat",
    component: RedirectAStASites("de/referate/sportreferat"),
  },
  // TODO
  {
    path: "/Service",
    component: RedirectAStASites("de"),
  },
  {
    path: "/Beratungen_und_Leistungen",
    component: RedirectAStASites("de/service/beratungen"),
  },
  {
    path: "/Beratungen_und_Leistungen",
    component: RedirectAStASites("de/service/beratungen"),
  },
  {
    path: "/Geschäftszimmer",
    component: RedirectAStASites("de/service/geschaeftszimmer"),
  },
  {
    path: "/Studentische_Gruppen",
    component: RedirectAStASites("de/service/studentische-gruppen"),
  },
  {
    path: "/Downloadarchiv",
    component: RedirectAStASites("de/service/downloadarchive"),
  },
  {
    path: "/Downloadarchiv/Unihandbuch",
    component: RedirectAStASites("de/service/uni-guide"),
  },
  {
    path: "/Fachschaften",
    component: RedirectAStASites("de/referate/fachschaftenreferat/fachschaften"),
  },
  {
    path: "/Kontakt",
    component: RedirectAStASites("de/ueber-den-asta"),
  },
  {
    path: "/Consultations",
    component: RedirectAStASites("en/services/consultations-and-services"),
  },
  {
    path: "/Services",
    component: RedirectAStASites("en/services/consultations-and-services"),
  },
  {
    path: "/Studentisches_Wohnen",
    component: RedirectAStASites("de/referate/sozialreferat/sozialberatung#-wohnberatung-"),
  },
  {
    path: "/Wohnen_für_Hilfe",
    component: RedirectAStASites("de/service/beratungen/wohnen-fuer-hilfe"),
  },
  {
    path: "/Fahrradwerkstatt",
    component: RedirectAStASites("de/service/beratungen/fahrradwerkstatt"),
  },
  {
    path: "/Fahrradmarkt",
    component: RedirectAStASites("de/service/beratungen/fahrradmarkt"),
  },
  {
    path: "/Fahrradmarkt",
    component: RedirectAStASites("de/service/beratungen/fahrradmarkt"),
  },
  {
    path: "/Semesterticket-Rückerstattung",
    component: RedirectAStASites("de/service/beratungen/semesterticket-rueckerstattung"),
  },
  {
    path: "/Freitisch",
    component: RedirectAStASites("de/service/beratungen/freitisch"),
  },
  {
    path: "/Ausländerreferat",
    component: RedirectAStASites("de/referate/referat-fuer-internationale-studierende"),
  },
  {
    path: "/BOCKS",
    component: RedirectAStASites("de/referate/sozialreferat/bocks"),
  },
  {
    path: "/Psychosoziale_Beratung",
    component: RedirectAStASites("de/referate/sozialreferat/psychosoziale-beratung"),
  },
  {
    path: "/Sozialberatung",
    component: RedirectAStASites("de/referate/sozialreferat/sozialberatung"),
  },
  {
    path: "/Studiticket",
    component: RedirectAStASites("de/service/beratungen/mobilitaet-studiticket"),
  },
];

export default RedirectAStASites;
