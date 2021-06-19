import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, default: '' })
  name: string
}