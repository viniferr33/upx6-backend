export default interface UpdateUserInput {
  id: string;
  userName: string;
  avatarUrl: string;
  principals: Array<string>;
}
