import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import CreateUserInput from "./DTOs/InputCreateUser";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import IUserRepository from "../repository/IUserRepository";
import UserRepository from "../repository/prod/UserRepository";
import User from "../entities/User";

export default class CreateUser implements IUseCase {
  private userRepository: IUserRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.userRepository = new UserRepository(database);
  }

  execute(data: CreateUserInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        if (data.principals === "ADMIN" && data.createCode !== "ADMIN-COD")
          throw new Error("Código invalido!");

        if (data.principals === "SINDICO" && data.createCode !== "SINDICO-COD")
          throw new Error("Código invalido!");

        const allUsers = await this.userRepository.list();
        const exists = allUsers.find((user) => user.email === data.email);

        if (exists) throw new Error("Usuario ja existe!");
        await this.userRepository.save(new User(data));

        resolve({ failed: false, message: "Usuario criado!" });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
