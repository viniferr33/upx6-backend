interface Condominio {
  id: String;
  name: String;
  sindicos: Array<String>;
}

export default interface ListCondominiosOutput {
  data: Array<Condominio>;
}
