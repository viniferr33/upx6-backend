import { Request, Response } from "express";
import CreateRegister from "../../src/core/useCases/CreateRegister";
import CreateRegisterInput from "../../src/core/useCases/DTOs/InputCreateRegister";
import IDatabaseNoSQL from "../../src/interfaces/IDatabaseNoSQL";
import IController from "./IController";

export default class CreateRegisterController implements IController {
  public method: string;
  public path: string;

  constructor(database: IDatabaseNoSQL) {
    this.method = "post";
    this.path = "/register/create";
  }

  static handleRequest(req: Request): CreateRegisterInput {
    const {
      date,
      inverter_id,
      condominio_id,
      avg_dc_voltage,
      avg_dc_current,
      avg_dc_input_power,
      max_dc_voltage,
      max_dc_current,
      max_dc_input_power,
      min_dc_voltage,
      min_dc_current,
      min_dc_input_power,
      avg_ac_voltage,
      avg_ac_current,
      avg_ac_output_power,
      max_ac_voltage,
      max_ac_current,
      max_ac_output_power,
      min_ac_voltage,
      min_ac_current,
      min_ac_output_power,
      avg_generation,
      max_generation,
      min_generation,
      avg_temperature,
      max_temperature,
      min_temperature,
    } = req.body;
    return {
      date,
      inverter_id,
      condominio_id,
      avg_dc_voltage,
      avg_dc_current,
      avg_dc_input_power,
      max_dc_voltage,
      max_dc_current,
      max_dc_input_power,
      min_dc_voltage,
      min_dc_current,
      min_dc_input_power,
      avg_ac_voltage,
      avg_ac_current,
      avg_ac_output_power,
      max_ac_voltage,
      max_ac_current,
      max_ac_output_power,
      min_ac_voltage,
      min_ac_current,
      min_ac_output_power,
      avg_generation,
      max_generation,
      min_generation,
      avg_temperature,
      max_temperature,
      min_temperature,
    };
  }

  enable(database: IDatabaseNoSQL) {
    return async function e(req: Request, res: Response) {
      const createRegisterUseCase = new CreateRegister(database);

      try {
        const data = CreateRegisterController.handleRequest(req);
        const output = await createRegisterUseCase.execute(data);

        const resStatus = output.failed ? 400 : 200;
        res.status(resStatus).json(output);
      } catch (error) {
        res.status(500).send("Internal Error");
      }
    };
  }
}
