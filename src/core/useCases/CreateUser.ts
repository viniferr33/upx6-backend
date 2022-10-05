import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQLNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import CreateUserInput from "./DTOs/InputCreateUser";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";

export default class CreateUser implements IUseCase {
  constructor(private database: IDatabaseNoSQL) {}

  setup(): void {}

  async execute(data: CreateUserInput): Promise<DefaultOperationOutput> {
    return new Promise(() => {});
  }
}
