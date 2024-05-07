import React from "react";
import "./NewsList.scss";
import { UniversalLink } from "@plone/volto/components";
import { FormattedMessage } from "react-intl";

export const NewsList = ({ items, ...props }) => {
  console.log(items);
  return (
    <>
      {items.map((item) => (
        <a href={item["@id"]} className="card">
          <div className="container">
            <h3>{item.title}</h3>
            <span>{item.description}</span>
          </div>
        </a>
      ))}
    </>
  );
};
