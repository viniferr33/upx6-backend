import { Request, Response } from "express";
import AddSindico from "../../src/core/useCases/AddSindico";
import AddSindicoInput from "../../src/core/useCases/DTOs/InputAddSindico";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class AddSindicoController implements IController {
  public method: string;
  public path: string;

  constructor() {
    this.method = "post";
    this.path = "/condominio/addSindico";
  }

  static handleRequest(req: Request): AddSindicoInput {
    const { condominioId, sindicoId } = req.body;
    return { condominioId, sindicoId };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const addSindicoUseCase = new AddSindico(database);

      try {
        const data = AddSindicoController.handleRequest(req);
        const output = await addSindicoUseCase.execute(data);

        const resStatus = output.failed ? 400 : 200;
        res.status(resStatus).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
