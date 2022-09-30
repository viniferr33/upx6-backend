import IDatabase from "./IDatabase";
import { DTO } from "./types";

export interface IUseCaseConstructor {
  new (database: IDatabase): IUseCase;
}

export interface IUseCase {
  setup(): void;
  execute(data: DTO): Promise<DTO>;
}

/*
// Para implementar a um UseCase é necessario uma função que o produz, assim a tipagem fica abstrada baseada na interface
export default function createUseCase(
  UseCase: IUseCaseConstructor,
  database: IDatabase
): IUseCase {
  return new UseCase(database);
}
*/
