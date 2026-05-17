import { CreateUserData, UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract create(createUserData: CreateUserData): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
}