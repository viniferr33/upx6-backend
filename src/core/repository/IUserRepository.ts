import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import User from "../entities/User";

export default interface IUserRepository {
  stack: Array<Promise<any>>;
  noSqlDataBase: IDatabaseNoSQL;
  findById(id: string): Promise<User | undefined>;
  list(): Promise<Array<User>>;
  save(User: User): void;
  update(User: User): void;
  delete(User: User): void;
  commit(): Promise<void>;
  cancel(): void;
}
