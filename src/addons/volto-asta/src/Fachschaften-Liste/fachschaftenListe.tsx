import React from "react";
import { Async, useAsync, useFetch } from "react-async";
import { withBlockExtensions } from "@plone/volto/helpers";
import "./FSList.scss";

type ServiceTimes = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
};

type RegularMeeting = {
  dayOfWeek: string;
  time: string;
  location: string;
};

type StudentBody = {
  phone: string;
  website: string;
  address: string;
  serviceTimes: ServiceTimes;
  regularMeeting: RegularMeeting;
};

type StudentBodies = Record<string, StudentBody>;

const nameMapping: Map<string, string> = new Map([
    ["Agrarwissenschaften", "Agrarwissenschaften"],
    ["Altkatholisches-Seminar", "Altkatholisches Seminar"],
    ["Anglistik-Amerikanistik-und-Keltologie", "Anglistik, Amerikanistik und Keltologie"],
    ["Archaeologie", "Archäologie"],
    ["Biologie", "Biologie"],
    ["Chemie", "Chemie"],
    ["ELW", "ELW"],
    ["Ethnologie-Altamerikanistik", "Ethnologie / Altamerikanistik"],
    ["Evangelische-Theologie", "Evangelische Theologie"],
    ["GeKoSka", "GeKoSka"],
    ["Geodaesie", "Geodäsie"],
    ["Geographie", "Geographie"],
    ["Geowissenschaften", "Geowissenschaften"],
    ["Geschichte", "Geschichte"],
    ["Griechische-und-Lateinische-Philologie", "Griechische und Lateinische Philologie"],
    ["Klassische-und-Romanische-Philologie", "Klassische und Romanische Philologie"],
    ["Informatik", "Informatik"],
    ["Interkulturelle-Kommunikation-und-Mehrsprachigkeitsforschung-IKM", "Interkulturelle Kommunikation und Mehrsprachigkeitsforschung (IKM)"],
    ["Jura", "Jura"],
    ["Katholische-Theologie", "Katholische Theologie"],
    ["Kulturanthropologie", "Kulturanthropologie"],
    ["Kunstgeschichte", "Kunstgeschichte"],
    ["Lehramt", "Lehramt"],
    ["Mathematik", "Mathematik"],
    ["Medienwissenschaft", "Medienwissenschaft"],
    ["Medizin", "Medizin"],
    ["Meteorologie-und-Geophysik", "Meteorologie und Geophysik"],
    ["Molekulare-Biomedizin", "Molekulare Biomedizin"],
    ["Musikwissenschaften-Sound-Studies", "Musikwissenschaften/Sound Studies"],
    ["Neuroscience", "Neuroscience"],
    ["OrientAsia", "OrientAsia"],
    ["Pharmazie", "Pharmazie"],
    ["Philosophie", "Philosophie"],
    ["Physik-Astronomie", "Physik/Astronomie"],
    ["Politik-Soziologie", "Politik & Soziologie"],
    ["Psychologie", "Psychologie"],
    ["VWL", "VWL"],
    ["Zahnmedizin", "Zahnmedizin"],
]);

const ServiceTimesComponent = ({ serviceTimes }) => {
  return (
    <div>
      <h4>Anwesenheitszeiten:</h4>
      <ul>
        {serviceTimes.monday.length > 1 && <li>Montag: {serviceTimes.monday}</li>}
        {serviceTimes.tuesday.length > 1 && <li>Dienstag: {serviceTimes.tuesday}</li>}
        {serviceTimes.wednesday.length > 1 && <li>Mittwoch: {serviceTimes.wednesday}</li>}
        {serviceTimes.thursday.length > 1 && <li>Donnerstag: {serviceTimes.thursday}</li>}
        {serviceTimes.friday.length > 1 && <li>Freitag: {serviceTimes.friday}</li>}
      </ul>
    </div>
  );
};

const MeetingTime = ({ meeting }: { meeting: RegularMeeting }) => {
  return (
    <div>
      <h4 style={{ paddingBottom: 0, marginBottom: 0, marginTop: "1rem" }}>Regelmäßiger Sitzungstermin</h4>
      <span>Wochentag: {meeting.dayOfWeek}</span>
      <br />
      <span>Uhrzeit: {meeting.time}</span>
      <br />
      <span>Ort: {meeting.location}</span>
    </div>
  );
};

function FachschaftenListe({}) {
  return (
    <Async
      key="key"
      promiseFn={async () => {
        return (await fetch("https://fsen.datendrehschei.be/api/v1/export/public-fs-data")).json();
      }}
    >
      <Async.Pending>Loading...</Async.Pending>
      <Async.Rejected>{(error) => <div>Error: {error.name}</div>}</Async.Rejected>
      <Async.Fulfilled>
        {(data: StudentBodies) => {
          console.log(data);
          return Object.keys(data).map((key) => {
            const studentBody = data[key];
            const name = nameMapping.get(key) || key;
            const hasServiceTimes = ["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => studentBody.serviceTimes[day].length > 1).reduce((acc, v) => v || acc, false);
            return (
              <div className="card" key={key}>
                <h3 className="title">{name}</h3>
                <div className="container">
                  Telefon: {studentBody.phone.length > 1 ? <a href={`tel:${studentBody.website}`}>{studentBody.phone}</a> : "/"}
                  <br />
                  Adresse: {studentBody.address}
                  <br />
                  Webseite: {studentBody.website.length > 1 ? <a href={studentBody.website}> {studentBody.website}</a> : "/"}
                  <br />
                  {studentBody.regularMeeting && <MeetingTime meeting={studentBody.regularMeeting} />}
                  <br />
                  {hasServiceTimes ? <ServiceTimesComponent serviceTimes={studentBody.serviceTimes} /> : "Keine Anwesenheitszeiten"}
                </div>
              </div>
            );
          });
        }}
      </Async.Fulfilled>
    </Async>
  );
}

export default FachschaftenListe;
