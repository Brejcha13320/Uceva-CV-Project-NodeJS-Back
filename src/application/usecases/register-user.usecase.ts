import { CreateUserData } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { BcryptAdapter } from "../../infrastructure/adapters/bcrypt.adapter";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { CustomError } from "../errors/custom.error";
import { RegisterUserResponse } from "../interfaces/register-user.interface";

export class RegisterUserUseCase {

  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterUserDto): Promise<RegisterUserResponse> {
    const { name, email, password, role } = dto;
    
    const existUser = await this.userRepository.findByEmail(email);
    if(existUser) throw CustomError.badRequest("Email already exist");

    const createUserData: CreateUserData = {
      name,
      email,
      password: BcryptAdapter.hash(password),
      role
    }
    const userEntity = await this.userRepository.create(createUserData);
    const { password: _, ...registerUserReponse } = userEntity;
    return { ...registerUserReponse };
  }
}