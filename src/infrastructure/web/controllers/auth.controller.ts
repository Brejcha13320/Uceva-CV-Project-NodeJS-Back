import { Request, Response } from "express";
import { LoginUserDto } from "../../../application/dtos/login-user.dto";
import { RegisterUserDto } from "../../../application/dtos/register-user.dto";
import { ValidateAuthDto } from "../../../application/dtos/validate-auth.dto";
import { LoginUserUseCase } from "../../../application/usecases/login-user.usecase";
import { RegisterUserUseCase } from "../../../application/usecases/register-user.usecase";
import { ValidateAuthUseCase } from "../../../application/usecases/validate-auth.usecase";
import { HandleError } from "../errors/handle.error";

export class AuthController {

    constructor(
        private loginUserUseCase: LoginUserUseCase,
        private registerUserUseCase: RegisterUserUseCase,
        private validateAuthUseCase: ValidateAuthUseCase
    ){}

    loginUser = (request: Request, response: Response) => {
        const [error, loginUserDTO] = LoginUserDto.create(request.body);
        if(error) return response.status(400).json({ error });
        this.loginUserUseCase
        .execute(loginUserDTO!)
        .then((user) => response.status(200).json(user))
        .catch((error) => HandleError.error(error, response));
    }

    registerUser = (request: Request, response: Response) => {
        const [error, registerUserDTO] = RegisterUserDto.create(request.body);
        if(error) return response.status(400).json({ error });
        this.registerUserUseCase
        .execute(registerUserDTO!)
        .then((user) => response.status(201).json(user))
        .catch((error) => HandleError.error(error, response));
    }

    validateAuth = (request: Request, response: Response) => {
        console.log('entro controller')
        const [error, validateAuthDTO] = ValidateAuthDto.create(request.body);
        if(error) return response.status(400).json({ error });
        this.validateAuthUseCase
        .execute(validateAuthDTO!)
        .then((user) => response.status(200).json(user))
        .catch((error) => HandleError.error(error, response));
    }

}