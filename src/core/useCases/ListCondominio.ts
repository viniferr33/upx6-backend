import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import ICondominioRepository from "../repository/ICondominioRepository";
import CondominioRepository from "../repository/prod/CondominioRepository";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import ListCondominioInput from "./DTOs/InputListCondominios";
import ListCondominiosOutput from "./DTOs/OutputListCondominios";

export default class ListCondominio implements IUseCase {
  private condominioRepository: ICondominioRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.condominioRepository = new CondominioRepository(database);
  }

  execute(
    data: ListCondominioInput
  ): Promise<ListCondominiosOutput | DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const allCondominios = await this.condominioRepository.list();
        const finalCondominios =
          data.sindicoId !== "*"
            ? allCondominios.filter((condominio) =>
                condominio.sindicos.includes(data.sindicoId)
              )
            : allCondominios;

        resolve({ data: finalCondominios });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
