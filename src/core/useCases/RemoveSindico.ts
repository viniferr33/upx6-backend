import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import ICondominioRepository from "../repository/ICondominioRepository";
import IUserRepository from "../repository/IUserRepository";
import CondominioRepository from "../repository/prod/CondominioRepository";
import UserRepository from "../repository/prod/UserRepository";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import RemoveSindicoInput from "./DTOs/InputRemoveSindico";

export default class RemoveSindico implements IUseCase {
  private condominioRepository: ICondominioRepository;
  private userRepository: IUserRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.condominioRepository = new CondominioRepository(database);
    this.userRepository = new UserRepository(database);
  }

  execute(data: RemoveSindicoInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const condominio = await this.condominioRepository.findById(
          data.condominioId
        );
        if (!condominio) throw new Error("Condominio não existe!");

        const user = await this.userRepository.findById(data.sindicoId);
        if (!user) throw new Error("Usuario não existe!");

        if (!condominio.sindicos.includes(user.id))
          throw new Error("Usuario não é sindico deste condominio!");

        const indexOfUser = condominio.sindicos.indexOf(data.sindicoId);
        condominio.sindicos.slice(indexOfUser, 1);
        await this.condominioRepository.save(condominio);

        resolve({ failed: false, message: "Usuario removido da lista de sindicos!" });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
