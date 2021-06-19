import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDTO } from './dto/project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) { }

  create(project: ProjectDTO): Promise<Project> {
    return this.projectsRepository.save(project)
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOne(id)
  }

  update(id: string, updateProjectDTO: ProjectDTO) {
    return this.projectsRepository.update(id, updateProjectDTO)
  }

  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}