import React from "react";
import { withBlockExtensions } from "@plone/volto/helpers";
import { useIntl, FormattedMessage, defineMessages } from "react-intl";

function mapToDay(day: "mo" | "di" | "mi" | "do" | "fr") {
  return {
    mo: "Montag",
    di: "Dienstag",
    mi: "Mittwoch",
    do: "Donnerstag",
    fr: "Freitag",
  }[day];
}
function AttrBox({
  desc,
  content,
  attrType,
}: {
  desc: string;
  content: string;
  attrType?: "email" | "phone";
}) {
  if (!content || content.length < 1) {
    return <div></div>;
  }
  return (
    <div style={{ fontSize: "1rem" }}>
      <p
        style={{
          paddingTop: 0,
          marginTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        }}
      >
        {attrType === "email" && <a href={"mailto:" + content}>{content}</a>}
        {attrType === "phone" && <a href={"tel:" + content}>{content}</a>}
        {attrType === undefined && <p>{content}</p>}
      </p>
      <p
        style={{
          paddingBottom: 0,
          marginBottom: "0.5rem",
          color: "gray",
          fontSize: "0.85rem",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

const ReferatsView = (props) => {
  const { className, data, detached, properties, style } = props;

  const intl = useIntl();
  const messages = defineMessages({
    email: {
      id: "email",
    },
    phone: {
      id: "phone",
    },
  });
  return (
    <div>
      <div>
        <AttrBox
          desc={intl.formatMessage(messages.email)}
          attrType="emailtabWidth:"
          content={props?.data?.email}
        ></AttrBox>
        <AttrBox
          desc={intl.formatMessage(messages.phone)}
          attrType="phone"
          content={props.data?.telefon}
        ></AttrBox>
        {isOrt && <AttrBox desc="Ort" content={props?.data?.ort}></AttrBox>}
      </div>
      <div>
        <h3 style={{ marginBottom: "0.25rem", fontSize: "1.3rem" }}>
          {" "}
          <FormattedMessage id="staff" />{" "}
        </h3>
        <table>
          {props?.data?.mitarbeiter?.map(
            (mitarbeiter: { name: string; desc: string }) => (
              <AttrBox
                desc={mitarbeiter.desc}
                content={mitarbeiter.name}
              ></AttrBox>
            )
          )}
        </table>
        <h3 style={{ marginBottom: "0.25rem", marginTop: "0.25rem" }}>
          {" "}
          <FormattedMessage id="attendance_times" />{" "}
        </h3>
        <table>
          {props?.data?.anwesenheitsdienste?.map((anweseneheit) => (
            <AttrBox
              desc={mapToDay(anweseneheit.tag)}
              content={`${anweseneheit.startHour} - ${anweseneheit.endHour}`}
            ></AttrBox>
          ))}
        </table>
      </div>
    </div>
  );
};

export default withBlockExtensions(ReferatsView);
