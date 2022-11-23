import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import Register from "../entities/Register";
import IRegisterRepository from "../repository/IRegisterRepository";
import RegisterRepository from "../repository/prod/RegisterRepository";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import CreateRegisterInput from "./DTOs/InputCreateRegister";

export default class CreateRegister implements IUseCase {
  private registerRepository: IRegisterRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.registerRepository = new RegisterRepository(database);
  }

  execute(data: CreateRegisterInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const allRegisters = await this.registerRepository.list();
        const exists = allRegisters.find(
          (register) =>
            register.date === data.date &&
            register.condominio_id === data.condominio_id &&
            register.inverter_id === data.inverter_id
        );

        if (exists) throw new Error("Registro ja existe!");
        await this.registerRepository.save(new Register(data));

        resolve({ failed: false, message: "Register Criado!" });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
