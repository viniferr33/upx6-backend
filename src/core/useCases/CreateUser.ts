import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import CreateUserInput from "./DTOs/InputCreateUser";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import IUserRepository from "../repository/IUserRepository";

export default class CreateUser implements IUseCase {
  userRepository: IUserRepository;

  constructor(private database: IDatabaseNoSQL) {}

  setup(): void {}

  async execute(data: CreateUserInput): Promise<DefaultOperationOutput> {
    return new Promise(() => {});
  }
}
