export default interface DefaultOperationOutput {
  failed: boolean;
  message: String;
  stackTrace?: Array<String> | String;
}
