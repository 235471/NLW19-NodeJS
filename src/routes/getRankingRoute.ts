import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z, { ZodArray, ZodBigInt } from 'zod'
import { GetRanking } from '../functions/getRanking'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['referral'],
        response: {
          200: z.object({
            ranking: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  score: z.number(),
                })
              ),
          }),
        },
      },
    },
    async () => {
      const { rankList } = await GetRanking()

      return { ranking: rankList}
    }
  )
}
