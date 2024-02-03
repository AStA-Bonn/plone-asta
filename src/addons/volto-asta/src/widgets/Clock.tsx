import React from "react";
import { FormFieldWrapper } from "@plone/volto/components";
import { TextWidget } from "@plone/volto/components";

export default (props) => {
  const { value, onChange, id } = props;

  const validTime = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(value);

  const error = validTime ? [] : ["Falsches Format"];

  return (
    <TextWidget
      id={id}
      title="Uhrzeit"
      required={false}
      value={value}
      onChange={(name, value) => {
        onChange(id, value);
      }}
      error={error}
    />
  );
};
