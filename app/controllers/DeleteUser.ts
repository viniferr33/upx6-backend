import { Request, Response } from "express";
import DeleteUser from "../../src/core/useCases/DeleteUser";
import DeleteUserInput from "../../src/core/useCases/DTOs/InputDeleteUser";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class DeleteUserController implements IController {
  public method: string;
  public path: string;

  constructor() {
    this.method = "delete";
    this.path = "/user/delete";
  }

  static handleRequest(req: Request): DeleteUserInput {
    const { id } = req.query;
    return { id: String(id) };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const deleteUserUseCase = new DeleteUser(database);

      try {
        const data = DeleteUserController.handleRequest(req);
        const output = await deleteUserUseCase.execute(data);

        const resStatus = output.failed ? 400 : 200;
        res.status(resStatus).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
