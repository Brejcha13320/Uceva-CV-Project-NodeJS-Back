import { UserEntity } from "../../domain/entities/user.entity";

export type RegisterUserResponse = Omit<UserEntity, "password">;