import type { FastifyReply, FastifyRequest } from 'fastify'

export async function SessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  if (!sessionId) {
    return reply.send({
      error: 'Unauthorized',
    })
  }
}
