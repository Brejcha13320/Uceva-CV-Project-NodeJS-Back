import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../../domain/entities/user.entity";

export class ValidRolMiddleware {
  static validateRol(roles: UserRole[]) {
    return (request: Request, response: Response, next: NextFunction) => {
      const { role } = request.body.user;

      if (!roles.includes(role)) {
        /**
         * TODO: Validacion de Roles
         * Si el Rol del Usuario que hace la petición, no esta
         * en los roles permitidos genera un error
         */
        return response.status(403).json({
          success: false,
          error: `El usuario no tiene permisos para solicitar la informacion. UserRole: ${role}, ValidRoles: ${roles}`,
        });
      }

      next();
    };
  }
}