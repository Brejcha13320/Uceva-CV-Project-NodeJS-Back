import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../application/usecases/get-all-users.usecase";
import { HandleError } from "../errors/handle.error";
import { GetUserByIdUseCase } from "../../../application/usecases/get-user-by-id.usecase";

export class UserController {

    constructor(
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase
    ){}

    getAll = (request: Request, response: Response) => {
        this.getAllUsersUseCase
        .execute()
        .then((user) => response.status(200).json(user))
        .catch((error) => HandleError.error(error, response));
    }

    getById = (request: Request, response: Response) => {
        const id = request.params.id as string;
        this.getUserByIdUseCase
        .execute(id)
        .then((user) => response.status(200).json(user))
        .catch((error) => HandleError.error(error, response));
    }

}