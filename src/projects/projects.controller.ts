import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { ProjectDTO } from './dto/project.dto'
import { ProjectsService } from './projects.service'
import { AuthGuard } from '../guards/auth.guard'

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Req() request: any, @Body() createProjectDTO: ProjectDTO) {
    const { user } = request
    return this.projectsService.create(user, createProjectDTO)
  }

  @Get()
  findAll(@Req() request: any) {
    const { user } = request
    return this.projectsService.findAllByUser(user)
  }

  @Get(':id')
  findOne(@Req() request: any, @Param('id') id: string) {
    const { user } = request
    return this.projectsService.findOne(user, id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDTO: ProjectDTO) {
    return this.projectsService.update(id, updateProjectDTO)
  }

  @Delete(':id')
  remove(@Req() request: any, @Param('id') id: string) {
    const { user } = request
    return this.projectsService.remove(user, id)
  }
}