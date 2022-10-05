export default interface LoginOutput {
  sessionToken: string;
  id: string;
  userName: string;
  avatarUrl: string;
  principals: Array<string>;
}
