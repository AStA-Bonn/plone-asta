import React, { useState } from "react";
import ReferatsView from "./ReferatView";
import { Segment, Button, Input, Label, FormField } from "semantic-ui-react";
import { SidebarPortal } from "@plone/volto/components";
import { ReferatsSchema } from "./schema";
import { InlineForm } from "@plone/volto/components";
import { FileWidget } from "@plone/volto/components";
import { split } from "postcss/lib/list";

const upload = (file: { "@type": "File"; title: string; file: any }) => {
  const splittedPath = window.location.pathname.split("/");
  const joinedPath = splittedPath.slice(1, splittedPath.length - 1).join("/");

  return fetch(`/++api++/${joinedPath}/rechenschaftsberichte`, {
    body: JSON.stringify(file),
    method: "POST",
  });
};

const downloadFile = ({
  data,
  filename,
  "content-type": contentType,
  encoding,
}) => {
  let blobData;

  if (encoding === "base64") {
    // Convert base64 to ArrayBuffer
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    blobData = new Blob([byteArray], { type: contentType });
  } else {
    // Assume the data is a string in UTF-8 or another text encoding
    blobData = new Blob([data], { type: contentType });
  }

  // Create a link and trigger the download
  const blobUrl = URL.createObjectURL(blobData);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};

enum UploadState {
  none,
  uploading,
  uploaded,
  error,
}

const ReferatsEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = ReferatsSchema(props);
  const [uploadState, setUploadState] = useState(UploadState.none);
  const [refBericht, setRefBericht] = useState(
    {} as {
      data: string;
      filename: string;
      "content-type": string;
      encoding: string;
    }
  );
  const refShort = data.refkrz;

  let refError: string | null = null;
  if (refBericht.filename) {
    const splitted = refBericht.filename.split("_");
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
    if (splitted[0] !== "Rechenschaftsbericht") {
      refError =
        "Rechenschaftsberichte beginnt nicht mit 'Rechenschaftsbericht'";
    } else if (splitted[1] !== refShort) {
      refError = `Rechenschaftsberichte hat nicht den Referatsnamen ${refShort}`;
    } else if (dateRegex.test(splitted[2])) {
      refError = `Datum ist nicht in dem Format YYYY-MM`;
    } else if (dateRegex.test(splitted[3])) {
      refError = `Datei endet nicht mit .pdf`;
    }
  }
  return (
    <>
      <SidebarPortal selected={selected}>
        <Segment.Group>
          <h4>Rechenschaftsbericht upload</h4>
          {!refBericht.data ? (
            <FileWidget
              onChange={(id, content) => {
                setRefBericht({ ...content });
              }}
            ></FileWidget>
          ) : (
            <>
              Berichtsname:
              <br />
              <Input
                style={{ width: "100%" }}
                error={!!refError}
                placeholder="Rechenschaftsbericht.pdf"
                value={refBericht.filename}
                disabled={
                  UploadState.uploaded === uploadState ||
                  UploadState.uploading === uploadState
                }
                onChange={(_, newName) => {
                  setRefBericht({ ...refBericht, filename: newName.value });
                }}
              ></Input>
              {refError && (
                <div>
                  Fehler: {refError}.{" "}
                  <Button
                    disabled={
                      UploadState.uploaded === uploadState ||
                      UploadState.uploading === uploadState
                    }
                    onClick={() => {
                      const now = new Date();
                      const year = now.getFullYear();
                      const month = (now.getMonth() + 1)
                        .toString()
                        .padStart(2, "0"); // +1 because getMonth() returns 0-11
                      const name = `Rechenschaftsbericht_${refShort}_${year}-${month}.pdf`;
                      setRefBericht({ ...refBericht, filename: name });
                    }}
                  >
                    Fix: Setze Namen als aktueller Bericht
                  </Button>
                </div>
              )}
              <br />
              <div style={{ display: "flex" }}>
                <Button
                  onClick={() => {
                    downloadFile(refBericht);
                  }}
                >
                  View
                </Button>
                <Button
                  disabled={
                    UploadState.uploaded === uploadState ||
                    UploadState.uploading === uploadState
                  }
                  onClick={() => {
                    setRefBericht({} as any);
                  }}
                >
                  Remove
                </Button>
                <Button
                  disabled={
                    UploadState.uploaded === uploadState ||
                    UploadState.uploading === uploadState
                  }
                  onClick={() => {
                    setUploadState(UploadState.uploading);
                    upload({
                      "@type": "File",
                      title: "test",
                      file: refBericht,
                    })
                      .then(() => {
                        setUploadState(UploadState.uploaded);
                      })
                      .catch(() => {
                        setUploadState(UploadState.error);
                      });
                  }}
                >
                  Upload
                </Button>
              </div>
              {uploadState == UploadState.uploaded && (
                <>
                  "Rechenschaftsberichte hochgeladen"
                  <Button
                    onClick={() => {
                      setRefBericht({} as any);
                      setUploadState(UploadState.none);
                    }}
                  >
                    Nächsten Bericht hochladen
                  </Button>
                </>
              )}
              {uploadState == UploadState.error && (
                <>
                  Rechenschaftsberichte Hochladen Fehlgeschalgen, probiere es
                  gleich nochmal
                </>
              )}
            </>
          )}
        </Segment.Group>
        <Segment.Group raised>
          <InlineForm
            schema={schema}
            title={schema.title}
            onChangeField={(id, value) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            formData={data}
          />
        </Segment.Group>
      </SidebarPortal>
      <ReferatsView {...props} />
    </>
  );
};

export default ReferatsEdit;
