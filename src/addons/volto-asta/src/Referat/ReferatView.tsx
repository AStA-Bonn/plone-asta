import React from "react";
// @ts-ignore
import { withBlockExtensions } from "@plone/volto/helpers";
import { useIntl, FormattedMessage, defineMessages } from "react-intl";
import { MESSAGES, MESSAGES_EN, getMessages } from "./lang";

function mapToDay(day: "mo" | "di" | "mi" | "do" | "fr" | 'sa' | 'su', messages: MESSAGES) {
  return {
    mo: messages.days.monday,
    di: messages.days.tuesday,
    mi: messages.days.wednesday,
    do: messages.days.thursday,
    fr: messages.days.friday,
    sa: messages.days.saturday,
    su: messages.days.sunday,
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

  const isOrt = props?.data?.ort;
  const isName = props?.data?.name;
  // isMail is bool
  const intl = useIntl();
  const messages = getMessages(intl.locale);
  return (
    <div>
      <div>
        <AttrBox
          desc={messages.attr.email}
          attrType="email"
          content={props?.data?.email}
        ></AttrBox>
        <AttrBox
          desc={messages.attr.phone}
          attrType="phone"
          content={props.data?.telefon}
        ></AttrBox>
        {isOrt && <AttrBox desc={messages.attr.place} content={props?.data?.ort}></AttrBox>}
      </div>
      <div>
        <h3 style={{ marginBottom: "0.25rem", fontSize: "1.3rem" }}>
          {messages.attr.staff}
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
          {messages.attr.attendance_times}
        </h3>
        <table>
          {props?.data?.anwesenheitsdienste?.map((anweseneheit) => (
            <AttrBox
              desc={mapToDay(anweseneheit.tag, messages)}
              content={`${anweseneheit.startHour} - ${anweseneheit.endHour}`}
            ></AttrBox>
          ))}
        </table>
      </div>
    </div>
  );
};

export default withBlockExtensions(ReferatsView);
