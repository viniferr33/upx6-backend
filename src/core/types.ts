// Tipagem de todas as Entidades Possiveis
type Entity = {};

// Tipagem de todos os Repositorios possiveis (interação com armazenamentos (banco de dados, storage, etc))
type Repository = {};

// Tipagem de Provedores (interação com Serviços Especificos)
type Provider = {};

// Data Transfer Object
type DTO = {};

// Um UseCase deve ter *pelo menos um* Repositório
interface IUseCaseConstructor {
  new (repository: Repository[], ...provider: Provider[]): IUseCase;
}

interface IUseCase {
  execute(data: DTO): Promise<DTO>;
}