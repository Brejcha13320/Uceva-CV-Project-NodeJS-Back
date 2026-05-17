import { UserEntity } from "../../domain/entities/user.entity";

export interface ValidateAuthResponse {
    authorization: boolean,
    user: Omit<UserEntity, "password"> | null
}