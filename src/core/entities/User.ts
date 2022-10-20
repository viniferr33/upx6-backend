import { uuid } from "uuidv4";

export default class User {
  public readonly id: String;

  public name: String;
  public email: String;
  public avatarUrl: String;
  public principals: Array<String>;

  constructor(props: Omit<User, "id" | "toObject">, id?: String) {
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
      email: this.email,
      avatarUrl: this.avatarUrl,
      principals: this.principals,
    };
  }
}
