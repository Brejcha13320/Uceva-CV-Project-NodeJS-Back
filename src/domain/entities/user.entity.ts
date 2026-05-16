export type UserRole = "ESTUDIANTE" | "DOCENTE" | "ADMIN";

export type CreateUserData = Omit<UserEntity, "id">;

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole
  ) {}
}