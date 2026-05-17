
export class ValidateAuthDto {
  private constructor(
    public readonly token: string
  ) {}

  static create(object: { [key: string]: any }): [string | null, ValidateAuthDto?] {
    const { token } = object;

    if (!token) return ["Missing token"];

    return [null, new ValidateAuthDto(token)];
  }
}