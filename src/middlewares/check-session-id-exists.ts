import { FastifyReply, FastifyRequest } from 'fastify'

export async function acheckSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'unauthorized',
    })
  }
}
