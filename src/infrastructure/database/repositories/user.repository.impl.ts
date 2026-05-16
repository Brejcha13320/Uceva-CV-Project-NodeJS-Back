import { CreateUserData, UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { prisma } from "../prisma/client";

export class UserRepositoryImpl extends UserRepository {

    async create(createUserData: CreateUserData): Promise<UserEntity> {
        const user = await prisma.user.create({ data: createUserData });
        return new UserEntity(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role
        );
    }
    
    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;

        return new UserEntity(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role
        );
    }

}