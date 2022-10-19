import Condominio from "../entities/Condominio";
import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";

export default interface ICondominioRepository {
  noSqlDataBase: IDatabaseNoSQL;
  findById(id: string): Promise<Condominio | void>;
  list(): Promise<Array<Condominio>>;
  save(condominio: Condominio): Promise<void>;
  delete(condominio: Condominio): Promise<void>;
}
