import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { CVRoutes } from "./cv.routes";
import { UserRoutes } from "./user.routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    // Definir rutas
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/user", UserRoutes.routes);
    router.use("/api/cv", CVRoutes.routes);

    return router;
  }
}