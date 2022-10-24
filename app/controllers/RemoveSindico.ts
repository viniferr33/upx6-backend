import { Request, Response } from "express";
import RemoveSindicoInput from "../../src/core/useCases/DTOs/InputRemoveSindico";
import RemoveSindico from "../../src/core/useCases/RemoveSindico";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class RemoveSindicoController implements IController {
  public method: string;
  public path: string;

  constructor() {
    this.method = "post";
    this.path = "/condominio/removeSindico";
  }

  static handleRequest(req: Request): RemoveSindicoInput {
    const { condominioId, sindicoId } = req.body;
    return { condominioId, sindicoId };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const removeSindicoUseCase = new RemoveSindico(database);

      try {
        const data = RemoveSindicoController.handleRequest(req);
        const output = await removeSindicoUseCase.execute(data);

        const resStatus = output.failed ? 400 : 200;
        res.status(resStatus).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
