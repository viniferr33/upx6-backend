import { uuid } from "uuidv4";

export default class Condominio {
  public readonly id: String;

  public name: String;
  public sindicos: Array<String>;

  constructor(props: Omit<Condominio, "id">, id?: String) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
