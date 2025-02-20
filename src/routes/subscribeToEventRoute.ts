import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribeToEvent'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribes to the event',
        tags: ['subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish()
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { name, email, referrer } = req.body

      const { subscriberId } = await subscribeToEvent({ name, email, referrerId: referrer })

      return res.status(201).send({ subscriberId })
    }
  )
}
