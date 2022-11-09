import { uuid } from "uuidv4";

export default class Condominio {
  public readonly id: String;

  public name: String;
  public sindicos: Array<String>;

  constructor(props: Omit<Condominio, "id" | "toObject">, id?: String) {
    this.name = props.name;
    this.sindicos = props.sindicos;
    
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
