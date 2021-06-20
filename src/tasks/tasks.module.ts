import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectsModule } from 'src/projects/projects.module'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { Task } from './entities/task.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    ProjectsModule
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService]
})
export class TasksModule { }