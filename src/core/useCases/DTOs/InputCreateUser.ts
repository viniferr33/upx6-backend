export default interface CreateUserInput {
    name: string;
    email: string;
    avatarUrl: string;
    principals: Array<string>;
}
