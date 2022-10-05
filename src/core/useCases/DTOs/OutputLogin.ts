export default interface LoginOutput {
  sessionToken: String;
  id: String;
  userName: String;
  avatarUrl: String;
  principals: Array<String>;
}
