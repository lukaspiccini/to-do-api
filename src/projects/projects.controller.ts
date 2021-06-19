import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ProjectDTO } from './dto/project.dto'
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Body() createProjectDTO: ProjectDTO) {
    return this.projectsService.create(createProjectDTO)
  }

  @Get()
  findAll() {
    return this.projectsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDTO: ProjectDTO) {
    return this.projectsService.update(id, updateProjectDTO)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id)
  }
}