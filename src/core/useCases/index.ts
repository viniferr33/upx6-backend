// Para implementar a um UseCase é necessario uma função que o produz, assim a tipagem fica abstrada baseada na interface
export default function createUseCase(
  UseCase: IUseCaseConstructor,
  repository: Repository[],
  ...provider: Provider[]
): IUseCase {
  return new UseCase(repository, provider);
}
