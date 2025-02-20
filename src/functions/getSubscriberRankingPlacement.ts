import { redis } from '../redis/client'

interface GetSubscriberRankingPlacementParams {
  subscriberId: string
}
export async function getSubscriberRankingPlacement({
  subscriberId,
}: GetSubscriberRankingPlacementParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank !== null) return { placement: rank + 1 }
  return { placement: null }
}
