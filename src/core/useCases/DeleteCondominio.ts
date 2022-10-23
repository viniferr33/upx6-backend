import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import ICondominioRepository from "../repository/ICondominioRepository";
import CondominioRepository from "../repository/prod/CondominioRepository";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import DeleteCondominioInput from "./DTOs/InputDeleteCondominio";

export default class DeleteCondominio implements IUseCase {
  private condominioRepository: ICondominioRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.condominioRepository = new CondominioRepository(database);
  }

  execute(data: DeleteCondominioInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const condominio = await this.condominioRepository.findById(data.id);

        if (!condominio) throw new Error("Condominio não existe!");

        await this.condominioRepository.delete(condominio);
        resolve({ failed: false, message: "Condominio deletado!" });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
