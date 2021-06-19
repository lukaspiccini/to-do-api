import { User } from 'src/users/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, default: '' })
  name: string

  @Column({ type: 'int', nullable: true })
  userId: number

  @ManyToOne(() => User, user => user.projects)
  user: User
}