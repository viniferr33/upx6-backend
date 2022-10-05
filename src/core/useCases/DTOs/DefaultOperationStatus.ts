export default interface DefaultOperationOutput {
  failed: boolean;
  message: string;
  stackTrace?: Array<string>;
}
