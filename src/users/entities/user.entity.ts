import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
const bcrypt = require('bcrypt')

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  login: string

  @Column()
  password: string

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }
}