import { Request, Response } from "express";
import CreateUser from "../../src/core/useCases/CreateUser";
import CreateUserInput from "../../src/core/useCases/DTOs/InputCreateUser";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class CreateUserController implements IController {
  public method: string;
  public path: string;

  constructor(database: IDatabaseNoSQL) {
    this.method = "post";
    this.path = "/user/create";
  }

  static handleRequest(req: Request): CreateUserInput {
    const { name, email, avatarUrl, principals } = req.body;
    return { name, email, avatarUrl, principals };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const createUserUseCase = new CreateUser(database);

      try {
        const data = CreateUserController.handleRequest(req);
        const output = await createUserUseCase.execute(data);

        const resStatus = output.failed ? 400 : 200;
        res.status(resStatus).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
