interface User {
  id: String;
  name: String;
  email: String;
  avatarUrl: String;
  principals: Array<String>;
}

export default interface ListUserOutput {
  data: Array<User>;
}