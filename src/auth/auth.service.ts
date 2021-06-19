import { Injectable } from '@nestjs/common'
import { LoginDTO } from './dto/login.dto'
import { UsersService } from '../users/users.service'
import { generateToken } from '../helpers/token.helpers'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.usersService.findByLogin(loginDTO.login)

    if (!user || !user.isCorrectPassword(loginDTO.password)) throw new Error('Invalid username or password')
    delete (user.password)

    return generateToken(user)
  }
}