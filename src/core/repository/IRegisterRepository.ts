import Register from "../entities/Register";
import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";

export default interface IRegisterRepository {
  noSqlDataBase: IDatabaseNoSQL;
  findById(condominio_id: string, id: string): Promise<Register | void>;
  list(condominio_id: String): Promise<Array<Register>>;
  save(condominio_id: string, register: Register): Promise<void>;
  delete(condominio_id: string, register: Register): Promise<void>;
}
