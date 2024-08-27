const apiURL = "";

export interface Referat {
  "@canonical": string;
  "@type": string;
  anwesenheitsdienste: Anwesenheitsdienste[];
  block: string;
  email: string;
  mitarbeiter: Mitarbeiter[];
  name: string;
  ort: string;
  telefon: string;
  id: string;
  isConsultation: boolean;
}

export interface Anwesenheitsdienste {
  "@id": string;
  endHour: string;
  startHour: string;
  tag: string;
}

export interface Mitarbeiter {
  "@id": string;
  desc?: string;
  name?: string;
}

function removeUrl(url: string): string {
  return new URL(url).pathname;
}

function fixAPIUrl(url: string): string {
  return url.replace(/^(https?:\/\/[^\/]+)(\/)/, "$1/++api++$2");
}

export class PlonePage {
  private _body: any;
  public url: string;
  constructor(page: string) {
    this.url = `/++api++/${page}`;
  }

  async getBody() {
    if (!this._body) {
      const response = fetch(this.url);
      this._body = (await (await response).json()) as any;
    }
    return this._body;
  }

  async getReferate(): Promise<Referat[]> {
    const body = await this.getBody();
    const keys = Object.keys(body["blocks"]);
    const referate = [];
    for (let key of keys) {
      const currBlock = body["blocks"][key];
      if (currBlock["@type"] === "Referat") {
        referate.push({ ...currBlock, id: key });
      }
    }

    return referate;
  }

  async getTranslation(language: string) {
    const body = await this.getBody();
    const translationURL: string = body["@components"]["translations"]["@id"];
    const translations: { "@id": string; language: string }[] = ((await (await fetch(fixAPIUrl(translationURL))).json()) as any).items;
    const translation = translations.find((translation) => translation.language === language);
    if (translation === undefined) {
      return null;
    } else {
      return new PlonePage(removeUrl(translation["@id"]));
    }
  }
}
