import React from "react";
import { Referat } from "./PlonePage";

export function AppSettings(props) {
  const { data } = props;
  return (
    <h1>
      AppSettings<p>{data?.referate?.map((ref: Referat) => ref.name)}</p>
    </h1>
  );
}
