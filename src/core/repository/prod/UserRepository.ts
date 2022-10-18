import IUserRepository from "../IUserRepository";
import IDatabaseNoSQL from "../../../interfaces/IDatabaseNoSQL";
import User from "../../entities/User";

export default class UserRepository implements IUserRepository {
  stack: Array<Promise<any>>;
  noSqlDataBase: IDatabaseNoSQL;

  private defaultUserCollection: string;

  constructor(noSqlDataBase: IDatabaseNoSQL) {
    this.stack = [];
    this.noSqlDataBase = noSqlDataBase;

    this.defaultUserCollection = "users";
  }

  findById(id: string): Promise<User | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const userDocRef = this.defaultUserCollection + "/" + id;
        const user = await this.noSqlDataBase.getDocument(userDocRef);
        if (user) {
          resolve(new User(user.data, user.id));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  list(): Promise<Array<User>> {
    return new Promise(async (resolve, reject) => {
      try {
        const allUsers = await this.noSqlDataBase.getAllDocumentsFromCollection(
          this.defaultUserCollection
        );

        resolve(allUsers.map((user) => new User(user.data, user.id)));
      } catch (error) {
        reject(error);
      }
    });
  }

  save(user: User): void {
    try {
      const userPath = this.defaultUserCollection + "/" + user.id;
      const operation = this.noSqlDataBase.createDocument(userPath, user);
      this.stack.push(operation);
    } catch (error) {
      throw error;
    }
  }

  update(user: User): void {
    try {
    } catch (error) {}
  }

  delete(user: User): void {
    try {
    } catch (error) {}
  }

  commit(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        for (let i = this.stack.length; i > 0; i--) {
          this.stack[i].then();
          this.stack.splice(i, 1);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  cancel(): void {
    try {
    } catch (error) {}
  }
}
