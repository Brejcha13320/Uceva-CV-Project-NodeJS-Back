import { UserRole } from "@prisma/client";
import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtAdapter } from "../../infrastructure/adapters/jwt.adapter";
import { ValidateAuthDto } from "../dtos/validate-auth.dto";
import { ValidateAuthResponse } from "../interfaces/validate-auth.interface";

export class ValidateAuthUseCase {

  constructor(private userRepository: UserRepository) {}

  async execute({ token }: ValidateAuthDto): Promise<ValidateAuthResponse> {
    const notAuthorization: ValidateAuthResponse = { authorization: false, user: null };
    const payload = await JwtAdapter.validateToken<{ id: string, role: UserRole }>(token);
    if(!payload) return notAuthorization;
    const user = await this.userRepository.findById(payload.id);
    if(!user) return notAuthorization;
    const { password: _, ...restUser } = user;
    return {
      authorization: true,
      user: restUser
    };
  }
}