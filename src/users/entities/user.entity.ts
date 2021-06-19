import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
const bcrypt = require('bcrypt')

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, default: '' })
  firstName: string

  @Column({ nullable: false, default: '' })
  lastName: string

  @Column({ nullable: false, default: '' })
  login: string

  @Column({ nullable: false, default: '' })
  password: string

  @OneToMany(() => Project, project => project.user)
  projects: Project[]

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async isCorrectPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }

  toJSON() {
    delete this.password
    delete this.login
    return this
  }
}