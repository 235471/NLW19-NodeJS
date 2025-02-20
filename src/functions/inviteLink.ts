import { redis } from '../redis/client'

interface InviteLinkParams {
    subscriberId: string
}
export async function accessInviteLink({
    subscriberId
}: InviteLinkParams) {
    await redis.hincrby('referral:access-count', subscriberId, 1)
}
