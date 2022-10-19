import ICondominioRepository from "../ICondominioRepository";
import IDatabaseNoSQL from "../../../interfaces/IDatabaseNoSQL";
import Condominio from "../../entities/Condominio";
export default class CondominioRepository implements ICondominioRepository {
  noSqlDataBase: IDatabaseNoSQL;

  private defaultCondominioCollection: string;

  constructor(noSqlDataBase: IDatabaseNoSQL) {
    this.noSqlDataBase = noSqlDataBase;

    this.defaultCondominioCollection = "condominios";
  }

  findById(id: string): Promise<Condominio | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const condominioDocRef = this.defaultCondominioCollection + "/" + id;
        const condominio = await this.noSqlDataBase.getDocument(
          condominioDocRef
        );
        if (condominio) {
          resolve(new Condominio(condominio.data, condominio.id));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  list(): Promise<Array<Condominio>> {
    return new Promise(async (resolve, reject) => {
      try {
        const allCondominios =
          await this.noSqlDataBase.getAllDocumentsFromCollection(
            this.defaultCondominioCollection
          );

        resolve(
          allCondominios.map(
            (condominio) => new Condominio(condominio.data, condominio.id)
          )
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  save(condominio: Condominio): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const condominioPath =
          this.defaultCondominioCollection + "/" + condominio.id;
        await this.noSqlDataBase.createDocument(condominioPath, condominio);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(condominio: Condominio): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const condominioPath =
          this.defaultCondominioCollection + "/" + condominio.id;
        await this.noSqlDataBase.deleteDocument(condominioPath);
      } catch (error) {
        reject(error);
      }
    });
  }
}
