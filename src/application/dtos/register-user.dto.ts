import { UserRole } from "../../domain/entities/user.entity";
import { regex } from "../../shared/regex/regex";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole
  ) {}

  static create(object: { [key: string]: any }): [string | null, RegisterUserDto?] {
    const { name, email, password, role } = object;
    const roles: UserRole[] = ["ESTUDIANTE", "DOCENTE", "ADMIN"];

    if (!name) return ["Missing name"];
    if (!role) return ["Missing role"];
    if (!roles.includes(role)) return ["Invalid role"];
    if (!email) return ["Missing email"];
    if (!regex.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];

    return [null, new RegisterUserDto(name, email, password, role)];
  }
}