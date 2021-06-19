import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { User } from 'src/users/entities/user.entity'
import { decodeToken } from '../helpers/token.helpers'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(' ')?.[1]

    if (!token) return false

    const user = decodeToken(token)
    request.user = user.id
    return true
  }
}