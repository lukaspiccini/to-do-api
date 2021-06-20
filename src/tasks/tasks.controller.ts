import { Controller, Get, Post, Body, Put, Param, Req, Delete, UseGuards } from '@nestjs/common'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { TasksService } from './tasks.service'
import { AuthGuard } from '../guards/auth.guard'

@Controller(':project/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post('')
  create(@Req() request: any, @Param('project') project: string, @Body() createTaskDTO: CreateTaskDTO) {
    const { user } = request
    return this.tasksService.create(user, parseInt(project), createTaskDTO)
  }

  @Get()
  findAll(@Req() request: any) {
    const { user } = request
    return this.tasksService.findAllByProject(user)
  }

  @Get(':id')
  findOne(@Req() request: any, @Param('id') id: string) {
    const { user } = request
    return this.tasksService.findOne(user, id)
  }

  @Put(':id')
  update(@Req() request: any, @Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO) {
    const { user } = request
    return this.tasksService.update(user, id, updateTaskDTO)
  }

  @Delete(':id')
  remove(@Req() request: any, @Param('id') id: string) {
    const { user } = request
    return this.tasksService.remove(user, id)
  }
}