import { User } from '../users/entities/user.entity'
const jwt = require('jsonwebtoken')

export function generateToken(user: User): string {
  const token = jwt.sign({
    user
  },
    'mysupersecret',
    {
      expiresIn: 3600
    })

  return token
}

export function decodeToken(token: string): User {
  const decoded = jwt.verify(token, 'mysupersecret')
  return decoded?.user
}