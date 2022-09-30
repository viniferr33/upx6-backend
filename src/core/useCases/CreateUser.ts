import IDatabase from "../../interfaces/IDatabase";
import { IUseCase } from "../../interfaces/IUseCase";
import { DTO } from "../../interfaces/types";

export default class CreateUser implements IUseCase {
  constructor(private database: IDatabase) {}

  setup(): void {}

  async execute(data: DTO): Promise<DTO> {
    return new Promise(() => {});
  }
}
