import { Request, Response } from "express";
import CreateCondominio from "../../src/core/useCases/CreateCondominio";
import CreateCondominioInput from "../../src/core/useCases/DTOs/InputCreateCondominio";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class CreateCondominioController implements IController {
  public method: string;
  public path: string;

  constructor() {
    this.method = "post";
    this.path = "/condominio/create";
  }

  static handleRequest(req: Request): CreateCondominioInput {
    const { name, sindicos } = req.body;
    return { name, sindicos };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const createCondominioUseCase = new CreateCondominio(database);

      try {
        const data = CreateCondominioController.handleRequest(req);
        const output = await createCondominioUseCase.execute(data);

        const resStatus = output.failed ? 400 : 200;
        res.status(resStatus).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
