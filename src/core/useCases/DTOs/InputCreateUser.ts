export default interface CreateUserInput {
    name: String;
    email: String;
    avatarUrl: String;
    principals: Array<String>;
}
