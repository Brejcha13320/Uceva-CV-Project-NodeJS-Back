import { Router } from "express";
import { GetAllUsersUseCase } from "../../../application/usecases/get-all-users.usecase";
import { UserRepositoryImpl } from "../../database/repositories/user.repository.impl";
import { UserController } from "../controllers/user.controller";
import { ValidateTokenMiddleware } from "../middlewares/validate-token.middleware";
import { GetUserByIdUseCase } from "../../../application/usecases/get-user-by-id.usecase";
import { ValidRolMiddleware } from "../middlewares/validate-role.middleware";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const repository = new UserRepositoryImpl();
    const getAllUsersUseCase = new GetAllUsersUseCase(repository);
    const getUserByIdUseCase = new GetUserByIdUseCase(repository);
    const controller = new UserController(getAllUsersUseCase, getUserByIdUseCase);

    //Middleware para todas las rutas
    router.use([ValidateTokenMiddleware.validateToken(getUserByIdUseCase)]);

    router.get(
      "/", 
      [ValidRolMiddleware.validateRol(["ADMIN"])],
      controller.getAll
    );

    router.get(
      "/:id", 
      [ValidRolMiddleware.validateRol(["ADMIN"])],
      controller.getById
    );

    return router;
  }
}