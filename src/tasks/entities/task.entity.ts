import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Project } from '../../projects/entities/project.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, default: '' })
  description: string

  @Column({ type: 'datetime', nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt: string

  @Column({ type: 'datetime', nullable: true })
  finishedAt: string

  @Column()
  projectId: number

  @ManyToOne(() => Project, project => project.tasks)
  project: Project
}