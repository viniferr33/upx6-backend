import { Request, Response } from "express";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";

type handleCallback = (req: Request, res: Response) => void;

export default interface IController {
  method: string;
  path: string;
  enable(database: IDatabaseNoSQL): handleCallback;
}
