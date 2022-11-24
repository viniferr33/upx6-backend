import IRegisterRepository from "../IRegisterRepository";
import IDatabaseNoSQL from "../../../interfaces/IDatabaseNoSQL";
import Register from "../../entities/Register";

export default class RegisterRepository implements IRegisterRepository {
  noSqlDataBase: IDatabaseNoSQL;

  private defaultRegisterCollection: string;

  constructor(noSqlDataBase: IDatabaseNoSQL) {
    this.noSqlDataBase = noSqlDataBase;

    this.defaultRegisterCollection = "registers";
  }

  findById(condominio_id: string, id: string): Promise<Register | void> {
    return new Promise(async (resolve, reject) => {
      try {
        const registerDocRef = `condominios/${condominio_id}/${this.defaultRegisterCollection}/${id}`;
        const register = await this.noSqlDataBase.getDocument(registerDocRef);
        if (register.data) {
          resolve(new Register(register.data, register.id));
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  list(condominio_id: string): Promise<Array<Register>> {
    return new Promise(async (resolve, reject) => {
      try {
        const allRegisters =
          await this.noSqlDataBase.getAllDocumentsFromCollection(
            `condominios/${condominio_id}/${this.defaultRegisterCollection}`
          );

        resolve(
          allRegisters.map(
            (register) => new Register(register.data, register.id)
          )
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  save(condominio_id: string, register: Register): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const registerPath = `condominios/${condominio_id}/${this.defaultRegisterCollection}/${register.id}`;
        await this.noSqlDataBase.createDocument(
          registerPath,
          register.toObject()
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(condominio_id: string, register: Register): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const registerPath = `condominios/${condominio_id}/${this.defaultRegisterCollection}/${register.id}`;
        await this.noSqlDataBase.deleteDocument(registerPath);
      } catch (error) {
        reject(error);
      }
    });
  }
}
