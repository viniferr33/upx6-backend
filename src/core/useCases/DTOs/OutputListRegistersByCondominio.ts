interface Register {
  id: String;
  date: String;
  inverter_id: String;
  condominio_id: String;
  avg_dc_voltage: Number;
  avg_dc_current: Number;
  avg_dc_input_power: Number;
  max_dc_voltage: Number;
  max_dc_current: Number;
  max_dc_input_power: Number;
  min_dc_voltage: Number;
  min_dc_current: Number;
  min_dc_input_power: Number;
  avg_ac_voltage: Number;
  avg_ac_current: Number;
  avg_ac_output_power: Number;
  max_ac_voltage: Number;
  max_ac_current: Number;
  max_ac_output_power: Number;
  min_ac_voltage: Number;
  min_ac_current: Number;
  min_ac_output_power: Number;
  avg_generation: Number;
  max_generation: Number;
  min_generation: Number;
  avg_temperature: Number;
  max_temperature: Number;
  min_temperature: Number;
}

export default interface ListRegistersByCondominioOutput {
  data: Array<Register>;
}