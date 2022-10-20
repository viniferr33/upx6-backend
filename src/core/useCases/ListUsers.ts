import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import IUserRepository from "../repository/IUserRepository";
import UserRepository from "../repository/prod/UserRepository";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import ListUserOutput from "./DTOs/OutputListUser";

export default class ListUsers implements IUseCase {
  private userRepository: IUserRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.userRepository = new UserRepository(database);
  }

  execute(): Promise<ListUserOutput | DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const allUsers = await this.userRepository.list();
        resolve({ data: allUsers });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
