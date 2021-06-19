import { Injectable } from '@nestjs/common'
import { LoginDTO } from './dto/login.dto'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.usersService.findByLogin(loginDTO.login)

    if (!user) throw new Error('Invalid username or password')

    const isSamePassword = await bcrypt.compare(loginDTO.password, user.password)

    if (!isSamePassword) throw new Error('Invalid username or password')

    return this.generateToken(user)

  }

  generateToken(user: User): string {
    const token = jwt.sign({
      user
    },
      'mysupersecret',
      {
        expiresIn: 3600
      })

    return token
  }

  async decodeToken(token: string): Promise<User> {
    const user = await jwt.verify(token)
    return user
  }
}