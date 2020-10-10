import { FastifyReply } from 'fastify';
import { User } from 'src/users/models/user.entity';
//import {Response} from 'express'

export interface Reply extends FastifyReply{
  view(page: string, data?: object): FastifyReply
}
export type UsersWithCount = {
  users: User[],
  count?: number
}