import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProjectsService } from '../projects/projects.service'
import { Repository } from 'typeorm'
import { CreateTaskDTO } from './dto/create-task.dto'
import { UpdateTaskDTO } from './dto/update-task.dto'
import { Task } from './entities/task.entity'
import { Project } from 'src/projects/entities/project.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private readonly projectsService: ProjectsService,
  ) { }

  async create(user: number, project: number, task: CreateTaskDTO): Promise<Task> {
    const foundProject: Project = await this.projectsService.findOne(user, project?.toString())

    if (!foundProject) throw new Error('Project doesnt exist')
    if (foundProject.userId !== user) throw new Error('User cant add tasks to this project')

    return this.tasksRepository.save({
      description: task.description,
      projectId: project
    })
  }

  findAllByProject(user: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { userId: user }, relations: ['project'] })
  }

  async findOne(user: number, id: string): Promise<Task> {
    const task: Task = await this.tasksRepository.findOne(id, { relations: ['project'] })

    if (task.project.userId !== user) throw new Error('User not allowed to access this task')

    return task
  }

  async update(user: number, id: string, updateTaskDTO: UpdateTaskDTO) {
    const task: Task = await this.tasksRepository.findOne(id, { relations: ['project'] })

    if (task.project.userId !== user) throw new Error('User not allowed to update this task')

    return this.tasksRepository.update(id, updateTaskDTO)
  }

  async remove(user: number, id: string): Promise<void> {
    const task: Task = await this.tasksRepository.findOne(id, { relations: ['project'] })

    if (task.project.userId !== user) throw new Error('User not allowed to delete this task')

    await this.tasksRepository.delete(id)
  }
}