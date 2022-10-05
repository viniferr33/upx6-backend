import CreateUserInput from "../core/useCases/DTOs/InputCreateUser";
import DefaultOperationOutput from "../core/useCases/DTOs/DefaultOperationStatus";

import User from "../core/entities/User";
import Condominio from "../core/entities/Condominio";

// Tipagem de todas as Entidades Possiveis
type Entity = User | Condominio;

// Tipagem de todos os Repositorios possiveis (interação com armazenamentos (banco de dados, storage, etc))
type Repository = {};

// Tipagem de Provedores (interação com Serviços Especificos)
type Provider = {};

// Data Transfer Object
type DTO = CreateUserInput | DefaultOperationOutput;

export { Entity, Repository, Provider, DTO };
