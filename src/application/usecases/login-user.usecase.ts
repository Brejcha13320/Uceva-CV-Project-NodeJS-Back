import { UserRepository } from "../../domain/repositories/user.repository";
import { BcryptAdapter } from "../../infrastructure/adapters/bcrypt.adapter";
import { JwtAdapter } from "../../infrastructure/adapters/jwt.adapter";
import { LoginUserDto } from "../dtos/login-user.dto";
import { CustomError } from "../errors/custom.error";
import { LoginUserResponse } from "../interfaces/login-user.interface";


export class LoginUserUseCase {

  constructor(private userRepository: UserRepository) {}

  async execute(dto: LoginUserDto): Promise<LoginUserResponse> {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);
    if(!user) throw CustomError.badRequest("Invalid credentials");
        
    const isMatching = BcryptAdapter.compare(password, user.password);
    if(!isMatching) throw CustomError.badRequest("Invalid credentials");

    const token = (await JwtAdapter.generateToken({ id: user.id, role: user.role })) as string;
    if (!token) throw CustomError.badRequest("Error while creating JWT");

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}