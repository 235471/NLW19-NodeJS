import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function GetRanking() {
  const topRanks = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const subscriberIdWithScore: Record<string, number> = {}

  for (let i = 0; i < topRanks.length; i += 2) {
    subscriberIdWithScore[topRanks[i]] = Number.parseInt(topRanks[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberIdWithScore)))

  const rankList = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdWithScore[subscriber.id],
      }
    })
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score
    })

  return { rankList }
}
