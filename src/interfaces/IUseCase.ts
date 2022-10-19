import IDatabaseNoSQL from "./IDatabaseNoSQL";
import { DTO } from "./types";

export interface IUseCaseConstructor {
  new (database: IDatabaseNoSQL): IUseCase;
}

export interface IUseCase {
  execute(data: DTO): Promise<DTO>;
}

/*
// Para implementar a um UseCase é necessario uma função que o produz, assim a tipagem fica abstrada baseada na interface
export default function createUseCase(
  UseCase: IUseCaseConstructor,
  database: IDatabaseNoSQL
): IUseCase {
  return new UseCase(database);
}
*/
