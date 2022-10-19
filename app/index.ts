import CreateUser from "../src/core/useCases/CreateUser";
import Firebase from "../src/infra/database/Firestore/Firestore.test";

async function main() {
  const database = new Firebase();
  const ucCreateUser = new CreateUser(database);
  await ucCreateUser.execute({
    avatarUrl: "url kkk",
    email: "sim um email",
    name: "Nome pia",
    principals: ["iriri"],
  });
  console.log("criado");
}

main();
