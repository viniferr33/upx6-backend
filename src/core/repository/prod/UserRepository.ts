import IUserRepository from "../IUserRepository";
import IDatabaseNoSQL from "../../../interfaces/IDatabaseNoSQL";
import User from "../../entities/User";

export default class UserRepository implements IUserRepository {
  noSqlDataBase: IDatabaseNoSQL;

  private defaultUserCollection: string;

  constructor(noSqlDataBase: IDatabaseNoSQL) {
    this.noSqlDataBase = noSqlDataBase;

    this.defaultUserCollection = "users";
  }

  findById(id: string): Promise<User | void> {
    return new Promise(async (resolve, reject) => {
      try {
        const userDocRef = this.defaultUserCollection + "/" + id;
        const user = await this.noSqlDataBase.getDocument(userDocRef);
        if (user.data) {
          resolve(new User(user.data, user.id));
        } else {
          resolve();
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

  save(user: User): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const userPath = this.defaultUserCollection + "/" + user.id;
        await this.noSqlDataBase.createDocument(userPath, user.toObject());
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(user: User): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const userPath = this.defaultUserCollection + "/" + user.id;
        await this.noSqlDataBase.deleteDocument(userPath);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
