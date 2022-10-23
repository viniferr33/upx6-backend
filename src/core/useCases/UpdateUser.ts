import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import IUserRepository from "../repository/IUserRepository";
import UserRepository from "../repository/prod/UserRepository";
import UpdateUserInput from "./DTOs/InputUpdateUser";

export default class UpdateUser implements IUseCase {
  private userRepository: IUserRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.userRepository = new UserRepository(database);
  }

  execute(data: UpdateUserInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const user = await this.userRepository.findById(data.id);
        if (!user) throw new Error("Usuario não existe!");

        Object.assign(user, data);
        await this.userRepository.save(user);
        resolve({ failed: false, message: "User atualizado!!" });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
