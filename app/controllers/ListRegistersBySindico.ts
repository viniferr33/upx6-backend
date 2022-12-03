import { Request, Response } from "express";
import ListRegistersBySindico from "../../src/core/useCases/ListRegistersBySindico";
import ListRegistersBySindicoInput from "../../src/core/useCases/DTOs/InputListRegistersBySindico";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class ListRegistersBySindicoController implements IController {
  public method: string;
  public path: string;

  constructor(database: IDatabaseNoSQL) {
    this.method = "get";
    this.path = "/register/sindico";
  }

  static handleRequest(req: Request): ListRegistersBySindicoInput {
    const { sindicoId } = req.query;
    return { sindicoId: new String(sindicoId) };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const listRegisterByCondominioUseCase = new ListRegistersBySindico(
        database
      );

      try {
        const data = ListRegistersBySindicoController.handleRequest(req);
        const output = await listRegisterByCondominioUseCase.execute(data);

        res.status(200).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
