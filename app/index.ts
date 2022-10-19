import DeleteUser from "../src/core/useCases/DeleteUser";
import Firebase from "../src/infra/database/Firestore/Firestore.test";

async function main() {
  const database = new Firebase();
  const ucCreateUser = new DeleteUser(database);
  const res = await ucCreateUser.execute({
    id: "b4231d3a-c83f-4f4b-b843-a316439cf04b"
  });
  console.log(res);
}

main();
