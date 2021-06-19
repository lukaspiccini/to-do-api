import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
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

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10)
  }
}