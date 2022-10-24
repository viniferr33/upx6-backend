import { Request, Response } from "express";
import UpdateUserInput from "../../src/core/useCases/DTOs/InputUpdateUser";
import UpdateUser from "../../src/core/useCases/UpdateUser";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class UpdateUserController implements IController {
  public database: IDatabaseNoSQL;
  public method: string;
  public path: string;

  constructor(database: IDatabaseNoSQL) {
    this.database = database;
    this.method = "post";
    this.path = "/user/update";
  }

  static handleRequest(req: Request): UpdateUserInput {
    const { id, userName, avatarUrl, principals } = req.body;
    return { id, userName, avatarUrl, principals };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const updateUserUseCase = new UpdateUser(database);

      try {
        const data = UpdateUserController.handleRequest(req);
        const output = await updateUserUseCase.execute(data);

        const resStatus = output.failed ? 400 : 200;
        res.status(resStatus).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
