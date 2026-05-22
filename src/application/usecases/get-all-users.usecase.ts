import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";


export class GetAllUsersUseCase {

  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.getAll();
    return users?.map(({ password, ...user }) => user) ?? [];
  }
}