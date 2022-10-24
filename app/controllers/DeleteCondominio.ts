import { Request, Response } from "express";
import DeleteCondominio from "../../src/core/useCases/DeleteCondominio";
import DeleteCondominioInput from "../../src/core/useCases/DTOs/InputDeleteCondominio";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class DeleteCondominioController implements IController {
  public method: string;
  public path: string;

  constructor() {
    this.method = "delete";
    this.path = "/condominio/delete";
  }

  static handleRequest(req: Request): DeleteCondominioInput {
    const { id } = req.query;
    return { id: String(id) };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const deleteCondominioUseCase = new DeleteCondominio(database);

      try {
        const data = DeleteCondominioController.handleRequest(req);
        const output = await deleteCondominioUseCase.execute(data);

        const resStatus = output.failed ? 400 : 200;
        res.status(resStatus).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
