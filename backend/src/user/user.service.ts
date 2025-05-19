import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) throw new ConflictException('Email já cadastrado');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userCreated = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return userCreated;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async update({
    id,
    updateUserDto,
  }: {
    id: string;
    updateUserDto: UpdateUserDto;
  }) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) throw new ConflictException('Usuário não encontrado');

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    const userUpdated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password: _, ...result } = userUpdated;
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
