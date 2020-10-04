import { FastifyReply } from 'fastify';
//import {Response} from 'express'

export interface Reply extends FastifyReply{
  view(page: string, data?: object): FastifyReply
}