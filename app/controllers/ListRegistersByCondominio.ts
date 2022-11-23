import { Request, Response } from "express";
import ListRegistersByCondominio from "../../src/core/useCases/ListRegistersByCondominio";
import ListRegistersByCondominioInput from "../../src/core/useCases/DTOs/InputListRegistersByCondominio";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class ListRegistersByCondominioController
  implements IController
{
  public method: string;
  public path: string;

  constructor(database: IDatabaseNoSQL) {
    this.method = "post";
    this.path = "/register/create";
  }

  static handleRequest(req: Request): ListRegistersByCondominioInput {
    const { condominioId } = req.body;
    return { condominioId };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const listRegisterByCondominioUseCase = new ListRegistersByCondominio(
        database
      );

      try {
        const data = ListRegistersByCondominioController.handleRequest(req);
        const output = await listRegisterByCondominioUseCase.execute(data);

        res.status(200).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
