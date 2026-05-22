import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../application/usecases/get-all-users.usecase";
import { HandleError } from "../errors/handle.error";

export class UserController {

    constructor(
        private getAllUsersUseCase: GetAllUsersUseCase,
    ){}

    getAll = (request: Request, response: Response) => {
        this.getAllUsersUseCase
        .execute()
        .then((user) => response.status(200).json(user))
        .catch((error) => HandleError.error(error, response));
    }

}