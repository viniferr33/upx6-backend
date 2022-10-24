import { Router } from "express";
import Firebase from "../src/infra/database/Firestore/Firestore.test";
import AddSindicoController from "./controllers/AddSindico";
import CreateCondominioController from "./controllers/CreateCondominio";
import CreateUserController from "./controllers/CreateUser";
import DeleteCondominioController from "./controllers/DeleteCondominio";
import DeleteUserController from "./controllers/DeleteUser";
import IController from "./controllers/IController";
import ListCondominioController from "./controllers/ListCondominio";
import ListUserController from "./controllers/ListUsers";
import RemoveSindicoController from "./controllers/RemoveSindico";
import UpdateUserController from "./controllers/UpdateUser";

// infra setup
const firestore = new Firebase();

// Controllers
const allControllers = [
  AddSindicoController,
  CreateCondominioController,
  CreateUserController,
  DeleteCondominioController,
  DeleteUserController,
  ListCondominioController,
  ListUserController,
  RemoveSindicoController,
  UpdateUserController,
];

// Router setup
const router = Router();
allControllers.forEach((controllerClass) => {
  const controller = new controllerClass(firestore);

  switch (controller.method) {
    case "get":
      router.get(controller.path, controller.enable(firestore));
      break;

    case "post":
      router.post(controller.path, controller.enable(firestore));
      break;

    case "delete":
      router.delete(controller.path, controller.enable(firestore));
      break;
  }
});

export default router;
