import Register from "../entities/Register";
import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";

export default interface IRegisterRepository {
  noSqlDataBase: IDatabaseNoSQL;
  findById(id: string): Promise<Register | void>;
  list(): Promise<Array<Register>>;
  save(register: Register): Promise<void>;
  delete(register: Register): Promise<void>;
}
