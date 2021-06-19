import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(user: CreateUserDTO): Promise<User> {
    const newUser = this.usersRepository.create(user)
    return this.usersRepository.save(newUser)
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  findByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({ where: { login } })
  }
}