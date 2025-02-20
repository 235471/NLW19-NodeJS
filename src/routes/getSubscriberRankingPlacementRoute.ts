import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberRankingPlacement } from '../functions/getSubscriberRankingPlacement'

export const getSubscriberRankingPlacementRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/placement',
      {
        schema: {
          summary: 'Get subscriber rank placement',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              placement: z.number().nullable(),
            }),
          },
        },
      },
      async req => {
        const { subscriberId } = req.params

        const { placement } = await getSubscriberRankingPlacement({ subscriberId })

        return { placement }
      }
    )
  }
