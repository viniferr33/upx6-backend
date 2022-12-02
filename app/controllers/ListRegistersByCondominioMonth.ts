import { Request, Response } from "express";
import ListRegistersByCondominioMonth from "../../src/core/useCases/ListRegistersByCondominioMonth";
import ListRegistersByCondominioInput from "../../src/core/useCases/DTOs/InputListRegistersByCondominio";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class ListRegistersByCondominioMonthController
  implements IController
{
  public method: string;
  public path: string;

  constructor(database: IDatabaseNoSQL) {
    this.method = "get";
    this.path = "/register/month";
  }

  static handleRequest(req: Request): ListRegistersByCondominioInput {
    const { condominioId } = req.query;
    return { condominioId: new String(condominioId) };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const listRegisterByCondominioUseCase = new ListRegistersByCondominioMonth(
        database
      );

      try {
        const data = ListRegistersByCondominioMonthController.handleRequest(req);
        const output = await listRegisterByCondominioUseCase.execute(data);

        res.status(200).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
