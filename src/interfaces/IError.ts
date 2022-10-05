export default interface IError {
  httpStatus: Number;
  message: String;
  errorType: String;
  traceStack?: Array<String>;
  keepAlive: Boolean;
  severity: Number;
}
