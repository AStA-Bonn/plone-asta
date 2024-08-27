import React from "react";
import { AppSettings } from "./Appsettings";
import { PlonePage, Referat } from "./PlonePage";
import "./edit.scss";

async function listAllNavs() {
  return fetch(`/++api++/de/@navigation?expand.navigation.depth=4`, {
    method: "GET",
  }).then((resp) => {
    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

interface NavItemDto {
  "@id": string;
  description: string;
  items: NavItemDto[]; // Replace 'any' with the specific type if the items array has a specific structure
  review_state: "private" | "public" | "draft"; // Add other possible values for `review_state` if applicable
  title: string;
  use_view_action_in_listings: boolean;
}

function getAllUrls(curr: NavItemDto): string[] {
  return curr.items.reduce((prev, curr) => [...prev, ...getAllUrls(curr), curr["@id"]], []);
}

function ReferateList({ referate, prop, onChange }: { referate: Referat[]; prop: any; onChange: (referate: Referat[]) => void }) {
  const { selected, block } = prop;
  return (referate as Referat[])?.map((ref: Referat, i: number) => (
    <div className="refLine">
      {ref.name}
      <button
        onClick={() => {
          if (i != 0) {
            const indexOfElem = referate.lastIndexOf(ref);
            onChange([...referate.slice(0, indexOfElem - 1), referate[indexOfElem], referate[indexOfElem - 1], ...referate.slice(indexOfElem + 1)]);
          }
        }}
      >
        Up
      </button>
      <button
        onClick={() => {
          if (referate.length - 1 != i) {
            const indexOfElem = referate.lastIndexOf(ref);
            onChange([...referate.slice(0, indexOfElem), referate[indexOfElem + 1], referate[indexOfElem], ...referate.slice(indexOfElem + 2)]);
          }
        }}
      >
        Down
      </button>
      <button
        onClick={() => {
          const indexOfElem = referate.lastIndexOf(ref);
          onChange([...referate.slice(0, indexOfElem), ...referate.slice(indexOfElem + 1)]);
        }}
      >
        Delete
      </button>
    </div>
  ));
}

export function AppSettingsEdit(props) {
  const { selected, onChangeBlock, block } = props;
  const data: { referate: Referat[]; beratungen: Referat[] } = props.data;
  console.log(data);
  return (
    <div>
      {data?.referate && <ReferateList prop={props} referate={data?.referate} onChange={(referate) => onChangeBlock(block, { ...data, referate })} />}
      <h2>Beratungen!</h2>
      {data?.beratungen && <ReferateList prop={props} referate={data?.beratungen} onChange={(beratungen) => onChangeBlock(block, { ...data, beratungen })} />}
      <button
        onClick={async () => {
          const allNavs = await listAllNavs();
          const referate = (await Promise.all(getAllUrls(allNavs).map((url) => new PlonePage(new URL(url).pathname).getReferate()))).flat();
          onChangeBlock(block, {
            ...data,
            referate: referate.filter((ref) => !ref.isConsultation),
            beratungen: referate.filter((ref) => ref.isConsultation),
          });
        }}
      >
        Update Index
      </button>
      Edit View: EditView
      <div className="refList"></div>
      <AppSettings {...props} />
    </div>
  );
}
