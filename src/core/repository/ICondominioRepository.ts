import Condominio from "../entities/Condominio";
import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";

export default interface ICondominioRepository {
  stack: Array<Promise<any>>;
  noSqlDataBase: IDatabaseNoSQL;
  findById(id: string): Promise<Condominio | undefined>;
  list(): Promise<Array<Condominio>>;
  save(condominio: Condominio): void;
  update(condominio: Condominio): void;
  delete(condominio: Condominio): void;
  commit(): Promise<void>;
  cancel(): void;
}
