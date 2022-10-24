import { Request, Response } from "express";
import ListUsers from "../../src/core/useCases/ListUsers";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class ListUserController implements IController {
  public method: string;
  public path: string;

  constructor() {
    this.method = "get";
    this.path = "/user/list";
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const listUsersUseCase = new ListUsers(database);

      try {
        const output = await listUsersUseCase.execute();

        res.status(200).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
