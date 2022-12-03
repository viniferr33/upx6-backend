import IDatabaseNoSQL from "../../interfaces/IDatabaseNoSQL";
import { IUseCase } from "../../interfaces/IUseCase";
import IRegisterRepository from "../repository/IRegisterRepository";
import RegisterRepository from "../repository/prod/RegisterRepository";
import DefaultOperationOutput from "./DTOs/DefaultOperationStatus";
import ListRegistersByCondominioOutput from "./DTOs/OutputListRegistersByCondominio";
import Register from "../entities/Register";
import ListRegistersBySindicoInput from "./DTOs/InputListRegistersBySindico";
import UserRepository from "../repository/prod/UserRepository";
import IUserRepository from "../repository/IUserRepository";
import ICondominioRepository from "../repository/ICondominioRepository";
import CondominioRepository from "../repository/prod/CondominioRepository";

function resolveAggregations(
  registerArray: Array<Register>,
  dateLabel: String,
  inverterLabel: String,
  condominioId: String
): Register {
  const finalReg: Map<string, Number | Array<number>> = new Map();

  const aggAverage = (input: Array<number>): Number =>
    input.reduce((a, b) => a + b, 0) / input.length;

  [
    "avg_dc_voltage",
    "avg_dc_current",
    "avg_dc_input_power",
    "max_dc_voltage",
    "max_dc_current",
    "max_dc_input_power",
    "min_dc_voltage",
    "min_dc_current",
    "min_dc_input_power",
    "avg_ac_voltage",
    "avg_ac_current",
    "avg_ac_output_power",
    "max_ac_voltage",
    "max_ac_current",
    "max_ac_output_power",
    "min_ac_voltage",
    "min_ac_current",
    "min_ac_output_power",
    "avg_generation",
    "max_generation",
    "min_generation",
    "avg_temperature",
    "max_temperature",
    "min_temperature",
  ].forEach((key) => {
    finalReg.set(
      key,
      registerArray.map((reg) => {
        const obj = reg.toObject();
        type ObjectKey = keyof typeof obj;
        const myKey = key as ObjectKey;
        return Number(obj[myKey]);
      })
    );
  });

  finalReg.forEach((reg, key) => {
    const keyType = key.slice(0, 3);
    switch (keyType) {
      case "avg":
        finalReg.set(key, Array.isArray(reg) ? aggAverage(reg) : reg);
        break;
      case "min":
        finalReg.set(key, Array.isArray(reg) ? Math.min(...reg) : reg);
        break;
      case "max":
        finalReg.set(key, Array.isArray(reg) ? Math.max(...reg) : reg);
        break;
    }
  });

  const regObj = Array.from(finalReg).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }),
    {
      date: dateLabel,
      condominio_id: condominioId,
      inverter_id: inverterLabel,
    }
  );

  return new Register(regObj as Omit<Register, "id" | "toObject">);
}

export default class ListRegister implements IUseCase {
  private registerRepository: IRegisterRepository;
  private usersRepository: IUserRepository;
  private condominioRepository: ICondominioRepository;

  constructor(private database: IDatabaseNoSQL) {
    this.registerRepository = new RegisterRepository(database);
    this.usersRepository = new UserRepository(database);
    this.condominioRepository = new CondominioRepository(database);
  }

  execute(
    data: ListRegistersBySindicoInput
  ): Promise<ListRegistersByCondominioOutput | DefaultOperationOutput> {
    return new Promise(async (resolve) => {
      try {
        const user = await this.usersRepository.findById(
          data.sindicoId.valueOf()
        );
        if (!user) throw new Error("Usuario não existe!");

        const allRegisters: Array<Register> = [];

        if (user.principals === "ADMIN") {
          const allConds = await this.condominioRepository.list();
          user.condominios = allConds.map((cond) => cond.id);
        }

        if (user.condominios) {
          user.condominios.forEach(async (cond) => {
            const temp = await this.registerRepository.list(cond);
            allRegisters.push(...temp);
          });
        }

        resolve({
          data: [resolveAggregations(allRegisters, "all", "all", "all")],
        });
      } catch (error) {
        const err = new Error(String(error));
        resolve({ failed: true, message: err.message, stackTrace: err.stack });
      }
    });
  }
}
