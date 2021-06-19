import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO)
  }
}