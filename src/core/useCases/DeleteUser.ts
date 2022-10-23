import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import DeleteUserInput from "./DTOs/InputDeleteUser";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import IUserRepository from "../repository/IUserRepository";
import UserRepository from "../repository/prod/UserRepository";

export default class DeleteUser implements IUseCase {
  private userRepository: IUserRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.userRepository = new UserRepository(database);
  }

  execute(data: DeleteUserInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const user = await this.userRepository.findById(data.id);
        if (!user) throw new Error("Usuario não existe!");

        await this.userRepository.delete(user);
        resolve({ failed: false, message: "User deletado!" });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
