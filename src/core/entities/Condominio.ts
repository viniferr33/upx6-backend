import { uuid } from "uuidv4";

export default class Condominio {
  public readonly id: String;

  public name: String;
  public sindicos: Array<String>;

  constructor(props: Omit<Condominio, "id" | "toObject">, id?: String) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }

  toObject(): Object {
    return {
      name: this.name,
      sindicos: this.sindicos,
    };
  }
}
