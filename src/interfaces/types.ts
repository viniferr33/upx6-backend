import CreateUserInput from "../core/useCases/DTOs/InputCreateUser";
import DefaultOperationOutput from "../core/useCases/DTOs/DefaultOperationStatus";
import AddSindicoInput from "../core/useCases/DTOs/InputAddSindico";
import CreateCondominioInput from "../core/useCases/DTOs/InputCreateCondominio";
import DeleteCondominioInput from "../core/useCases/DTOs/InputDeleteCondominio";
import DeleteUserInput from "../core/useCases/DTOs/InputDeleteUser";
import RemoveSindicoInput from "../core/useCases/DTOs/InputRemoveSindico";
import UpdateCondominioInput from "../core/useCases/DTOs/InputUpdateCondominio";
import UpdateUserInput from "../core/useCases/DTOs/InputUpdateUser";
import None from "../core/useCases/DTOs/None";
import LoginOutput from "../core/useCases/DTOs/OutputLogin";
import ListUserOutput from "../core/useCases/DTOs/OutputListUser";
import ListCondominiosOutput from "../core/useCases/DTOs/OutputListCondominios";

import User from "../core/entities/User";
import Condominio from "../core/entities/Condominio";

// Tipagem de todas as Entidades Possiveis
type Entity = User | Condominio | Object;

// Tipagem de todos os Repositorios possiveis (interação com armazenamentos (banco de dados, storage, etc))
type Repository = {};

// Tipagem de Provedores (interação com Serviços Especificos)
type Provider = {};

// Data Transfer Object
type DTO =
  | CreateUserInput
  | DefaultOperationOutput
  | AddSindicoInput
  | CreateCondominioInput
  | DeleteCondominioInput
  | DeleteUserInput
  | RemoveSindicoInput
  | UpdateCondominioInput
  | UpdateUserInput
  | None
  | ListCondominiosOutput
  | ListUserOutput
  | LoginOutput;

export { Entity, Repository, Provider, DTO };
