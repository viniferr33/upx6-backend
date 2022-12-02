import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import IRegisterRepository from "../repository/IRegisterRepository";
import RegisterRepository from "../repository/prod/RegisterRepository";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import ListRegistersByCondominioInput from "./DTOs/InputListRegistersByCondominio";
import ListRegistersByCondominioOutput from "./DTOs/OutputListRegistersByCondominio";

export default class ListRegister implements IUseCase {
  private registerRepository: IRegisterRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.registerRepository = new RegisterRepository(database);
  }

  execute(
    data: ListRegistersByCondominioInput
  ): Promise<ListRegistersByCondominioOutput | DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const allRegisters = await this.registerRepository.list(
          data.condominioId
        );

        resolve({
          data: allRegisters.sort(
            (a, b) =>
              new Date(a.date.valueOf()).getTime() -
              new Date(b.date.valueOf()).getTime()
          ),
        });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
