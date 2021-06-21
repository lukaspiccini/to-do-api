import { User } from '../users/entities/user.entity'
const jwt = require('jsonwebtoken')

export function generateToken(user: User): string {
  const token = jwt.sign({
    user
  },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400
    })

  return token
}

export function decodeToken(token: string): User {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded?.user
}