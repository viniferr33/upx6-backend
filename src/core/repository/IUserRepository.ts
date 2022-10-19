import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import User from "../entities/User";

export default interface IUserRepository {
  noSqlDataBase: IDatabaseNoSQL;
  findById(id: string): Promise<User | undefined>;
  list(): Promise<Array<User>>;
  save(User: User): Promise<void>;
  delete(User: User): Promise<void>;
}
