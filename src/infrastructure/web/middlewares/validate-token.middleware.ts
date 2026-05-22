import { NextFunction, Request, Response } from "express";
import { GetUserByIdUseCase } from "../../../application/usecases/get-user-by-id.usecase";
import { UserEntity, UserRole } from "../../../domain/entities/user.entity";
import { JwtAdapter } from "../../adapters/jwt.adapter";

export class ValidateTokenMiddleware {

    static validateToken(getUserByIdUseCase: GetUserByIdUseCase) {
        return async (request: Request, response: Response, next: NextFunction) => {
            const authorization = request.header("Authorization");

            if (!authorization) 
                return response.status(401)
                    .json({ authorization: false, error: "Not token provided" });
            
            if (!authorization.startsWith("Bearer "))
                return response.status(401)
                    .json({ authorization: false, error: "Invalid Bearer token" });

            const token = authorization.split(" ").at(1) || "";

            
            try {
                const payload = await JwtAdapter.validateToken<{ id: string, role: UserRole }>(token);
                if (!payload) return response.status(401).json({ authorization: false, error: "Invalid token" });
                
                const user = await getUserByIdUseCase.execute(payload.id);
                
                if (!user)
                    return response.status(401).json({
                        authorization: false,
                        error: "Invalid token - user not found",
                    });

                const { password, ...userWithoutPassword  } = user as UserEntity;
                if(!request.body) request.body = {}
                request.body.user = userWithoutPassword;
                next();
            } catch (error) {
                response.status(500).json({ authorization: false, error: "Internal Server Error" });
            }
        }
    }

}