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

  setUserRepository(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(data: CreateUserInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve, reject) => {
      try {
        const allUsers = await this.userRepository.list();
        const exists = allUsers.find((user) => (user.email = data.email));

        if (exists) throw new Error("User already exists!");
        await this.userRepository.save(new User(data));
      } catch (error) {
        reject(error);
      }
    });
  }
}
