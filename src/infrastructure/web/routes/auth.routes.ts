import { Router } from "express";
import { LoginUserUseCase } from "../../../application/usecases/login-user.usecase";
import { RegisterUserUseCase } from "../../../application/usecases/register-user.usecase";
import { UserRepositoryImpl } from "../../database/repositories/user.repository.impl";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const repository = new UserRepositoryImpl();
    const loginUserUseCase = new LoginUserUseCase(repository);
    const registerUserUseCase = new RegisterUserUseCase(repository);
    const controller = new AuthController(loginUserUseCase, registerUserUseCase);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}