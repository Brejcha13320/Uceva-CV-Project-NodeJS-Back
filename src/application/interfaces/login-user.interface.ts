import { UserEntity } from "../../domain/entities/user.entity";

export interface LoginUserResponse {
    user: Omit<UserEntity, "password">,
    token: string
}