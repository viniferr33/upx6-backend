import { uuid } from "uuidv4";

export default class Condominio {
  public readonly id: string;

  public name: string;
  public sindicos: Array<string>;

  constructor(props: Omit<Condominio, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
