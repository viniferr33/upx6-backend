import { uuid } from "uuidv4";

export default class Register {
  public readonly id: String;

  public date: String;
  public inverter_id: String;
  public condominio_id: String;
  public avg_dc_voltage: Number;
  public avg_dc_current: Number;
  public avg_dc_input_power: Number;
  public max_dc_voltage: Number;
  public max_dc_current: Number;
  public max_dc_input_power: Number;
  public min_dc_voltage: Number;
  public min_dc_current: Number;
  public min_dc_input_power: Number;
  public avg_ac_voltage: Number;
  public avg_ac_current: Number;
  public avg_ac_output_power: Number;
  public max_ac_voltage: Number;
  public max_ac_current: Number;
  public max_ac_output_power: Number;
  public min_ac_voltage: Number;
  public min_ac_current: Number;
  public min_ac_output_power: Number;
  public avg_generation: Number;
  public max_generation: Number;
  public min_generation: Number;
  public avg_temperature: Number;
  public max_temperature: Number;
  public min_temperature: Number;

  constructor(props: Omit<Register, "id" | "toObject">, id?: String) {
    this.date = props.date;
    this.inverter_id = props.inverter_id;
    this.condominio_id = props.condominio_id;
    this.avg_dc_voltage = props.avg_dc_voltage;
    this.avg_dc_current = props.avg_dc_current;
    this.avg_dc_input_power = props.avg_dc_input_power;
    this.max_dc_voltage = props.max_dc_voltage;
    this.max_dc_current = props.max_dc_current;
    this.max_dc_input_power = props.max_dc_input_power;
    this.min_dc_voltage = props.min_dc_voltage;
    this.min_dc_current = props.min_dc_current;
    this.min_dc_input_power = props.min_dc_input_power;
    this.avg_ac_voltage = props.avg_ac_voltage;
    this.avg_ac_current = props.avg_ac_current;
    this.avg_ac_output_power = props.avg_ac_output_power;
    this.max_ac_voltage = props.max_ac_voltage;
    this.max_ac_current = props.max_ac_current;
    this.max_ac_output_power = props.max_ac_output_power;
    this.min_ac_voltage = props.min_ac_voltage;
    this.min_ac_current = props.min_ac_current;
    this.min_ac_output_power = props.min_ac_output_power;
    this.avg_generation = props.avg_generation;
    this.max_generation = props.max_generation;
    this.min_generation = props.min_generation;
    this.avg_temperature = props.avg_temperature;
    this.max_temperature = props.max_temperature;
    this.min_temperature = props.min_temperature;

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }

  toObject(): Object {
    return {
      date: this.date,
      condominio_id: this.condominio_id,
      avg_dc_voltage: this.avg_dc_voltage,
      avg_dc_current: this.avg_dc_current,
      avg_dc_input_power: this.avg_dc_input_power,
      max_dc_voltage: this.max_dc_voltage,
      max_dc_current: this.max_dc_current,
      max_dc_input_power: this.max_dc_input_power,
      min_dc_voltage: this.min_dc_voltage,
      min_dc_current: this.min_dc_current,
      min_dc_input_power: this.min_dc_input_power,
      avg_ac_voltage: this.avg_ac_voltage,
      avg_ac_current: this.avg_ac_current,
      avg_ac_output_power: this.avg_ac_output_power,
      max_ac_voltage: this.max_ac_voltage,
      max_ac_current: this.max_ac_current,
      max_ac_output_power: this.max_ac_output_power,
      min_ac_voltage: this.min_ac_voltage,
      min_ac_current: this.min_ac_current,
      min_ac_output_power: this.min_ac_output_power,
      avg_generation: this.avg_generation,
      max_generation: this.max_generation,
      min_generation: this.min_generation,
      avg_temperature: this.avg_temperature,
      max_temperature: this.max_temperature,
      min_temperature: this.min_temperature,
    };
  }
}
