import React from "react";
import "./NewsList.scss";
import { getMessages } from "../Referat/lang";
import { useIntl } from "react-intl";
import { When } from "@plone/volto/components/theme/View/EventDatesInfo";
import { Icon } from "@plone/volto/components";
import mapSvg from "@plone/volto/icons/map.svg";
import chronoSvg from "@plone/volto/icons/chrono.svg";

export const EventSubtitle = ({ item }) => {
  return (
    <>
      <div className="icon-line">
        <Icon name={chronoSvg} size="1.5rem" />
        <When
          start={item.start}
          end={item.end}
          whole_day={item.whole_day}
          open_end={true}
        />
      </div>
      <div className="icon-line">
        <Icon name={mapSvg} size="1.5rem" />{" "}
        <div>{item.location ?? "Wird noch bekannt gegeben"}</div>
      </div>
      <div style={{ padding: "0.25rem" }} />
    </>
  );
};

export const NewsItem = ({ item }) => {
  const intl = useIntl();
  const messages = getMessages(intl.locale);
  const creationDate = new Date(item.CreationDate);
  const isNews = !item.start;
  return (
    <a key={item["@id"]} href={item["@id"]} className="card unstyled-link">
      <div className="container">
        <h3 className="title">{item.title}</h3>
        {isNews && (
          <p className="subtitle">
            {creationDate.getDate()}.{creationDate.getMonth() + 1}.
            {creationDate.getFullYear()}
          </p>
        )}
        {!!item.start && <EventSubtitle item={item} />}
        {!!item.description && (
          <>
            <span>{item.description}</span> <br />
          </>
        )}
        <a key={item["@id"]}>{messages.more}</a>
      </div>
    </a>
  );
};

export const NewsList = ({ items, ...props }) => {
  return (
    <>
      {items.map((item) => (
        <NewsItem key={item["@id"]} item={item} />
      ))}
    </>
  );
};
