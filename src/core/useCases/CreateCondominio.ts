import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import Condominio from "../entities/Condominio";
import ICondominioRepository from "../repository/ICondominioRepository";
import CondominioRepository from "../repository/prod/CondominioRepository";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import CreateCondominioInput from "./DTOs/InputCreateCondominio";

export default class CreateCondominio implements IUseCase {
  private condominioRepository: ICondominioRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.condominioRepository = new CondominioRepository(database);
  }

  execute(data: CreateCondominioInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        await this.condominioRepository.save(new Condominio(data));

        resolve({ failed: false, message: "Condominio Criado!" });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
