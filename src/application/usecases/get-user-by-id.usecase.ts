import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { CustomError } from "../errors/custom.error";


export class GetUserByIdUseCase {

  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if(!user) throw CustomError.badRequest("Invalid user");

    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword };
  }
}