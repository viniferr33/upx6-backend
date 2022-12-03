import { Request, Response } from "express";
import ListRegistersBySindicoMonth from "../../src/core/useCases/ListRegistersBySindicoMonth";
import ListRegistersBySindicoInput from "../../src/core/useCases/DTOs/InputListRegistersBySindico";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class ListRegistersBySindicoMonthController
  implements IController
{
  public method: string;
  public path: string;

  constructor(database: IDatabaseNoSQL) {
    this.method = "get";
    this.path = "/register/sindicoMonth";
  }

  static handleRequest(req: Request): ListRegistersBySindicoInput {
    const { sindicoId } = req.query;
    return { sindicoId: new String(sindicoId) };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const listRegisterByCondominioUseCase = new ListRegistersBySindicoMonth(
        database
      );

      try {
        const data = ListRegistersBySindicoMonthController.handleRequest(req);
        const output = await listRegisterByCondominioUseCase.execute(data);

        res.status(200).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
