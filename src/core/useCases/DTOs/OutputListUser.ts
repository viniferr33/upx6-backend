interface User {
  id: String;
  name: String;
  email: String;
  avatarUrl: String;
  principals: String;
  password: String;
}

export default interface ListUserOutput {
  data: Array<User>;
}
