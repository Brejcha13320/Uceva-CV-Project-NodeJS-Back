import { regex } from "../../shared/regex/regex";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string | null, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!regex.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];

    return [null, new LoginUserDto(email, password)];
  }
}