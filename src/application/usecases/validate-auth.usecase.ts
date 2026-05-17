import { UserRole } from "@prisma/client";
import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtAdapter } from "../../infrastructure/adapters/jwt.adapter";
import { ValidateAuthDto } from "../dtos/validate-auth.dto";

export class ValidateAuthUseCase {

  constructor(private userRepository: UserRepository) {}

  async execute({ token }: ValidateAuthDto): Promise<boolean> {
    const payload = await JwtAdapter.validateToken<{ id: string, role: UserRole }>(token);
    if(!payload) return false;
    const user = await this.userRepository.findById(payload.id);
    if(!user) return false;
    return true;
  }
}