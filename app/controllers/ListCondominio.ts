import { Request, Response } from "express";
import ListCondominioInput from "../../src/core/useCases/DTOs/InputListCondominios";
import ListCondominio from "../../src/core/useCases/ListCondominio";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class ListCondominioController implements IController {
  public method: string;
  public path: string;

  constructor() {
    this.method = "get";
    this.path = "/condominio/list";
  }

  static handleRequest(req: Request): ListCondominioInput {
    const { sindicoId } = req.query;
    return { sindicoId: String(sindicoId) };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const listCondominioUseCase = new ListCondominio(database);

      try {
        const data = ListCondominioController.handleRequest(req);
        const output = await listCondominioUseCase.execute(data);

        res.status(200).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
