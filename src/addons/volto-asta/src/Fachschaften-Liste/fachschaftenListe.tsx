import React from "react";
import { Async, useAsync, useFetch } from "react-async";
import { withBlockExtensions } from "@plone/volto/helpers";

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

const ServiceTimesComponent = ({ serviceTimes }) => {
  return (
    <div>
      <h4>Anwesehenheitszeiten:</h4>
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

function FachschaftenListe({}) {
  console.log("CALLED");
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
            return (
              <div key={key}>
                <h3>{key}</h3>
                Telefon: {studentBody.phone.length > 1 ? <a href={`tel:${studentBody.website}`}>{studentBody.phone}</a> : "/"}
                <br />
                Adresse: {studentBody.address}
                <br />
                Website: {studentBody.website.length > 1 ? <a href={studentBody.website}> {studentBody.website}</a> : "/"}
                <br />
                <ServiceTimesComponent serviceTimes={studentBody.serviceTimes} />
              </div>
            );
          });
        }}
      </Async.Fulfilled>
    </Async>
  );
}

export default FachschaftenListe;
