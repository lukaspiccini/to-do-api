import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProjectDTO } from './dto/project.dto'
import { Project } from './entities/project.entity'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) { }

  create(userId: number, project: ProjectDTO): Promise<Project> {
    return this.projectsRepository.save({
      name: project.name,
      userId: userId
    })
  }

  findAllByUser(user: number): Promise<Project[]> {
    return this.projectsRepository.find({ where: { userId: user }, relations: ['user', 'tasks'] })
  }

  async findOne(user: number, id: string): Promise<Project> {
    const project: Project = await this.projectsRepository.findOne(id, { relations: ['user', 'tasks'] })

    if (project.userId !== user) throw new Error('User not allowed to access this project')

    return project
  }

  async update(user: number, id: string, updateProjectDTO: ProjectDTO) {
    const project: Project = await this.projectsRepository.findOne(id)

    if (project.userId !== user) throw new Error('User not allowed to update this project')

    return this.projectsRepository.update(id, updateProjectDTO)
  }

  async remove(user: number, id: string): Promise<void> {
    const project: Project = await this.projectsRepository.findOne(id)

    if (project.userId !== user) throw new Error('User not allowed to delete this project')

    await this.projectsRepository.delete(id)
  }
}