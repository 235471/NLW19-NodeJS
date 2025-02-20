import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { subscribeToEventRoute } from './routes/subscribeToEventRoute'
import { inviteLink } from './routes/inviteLinkRoute'
import { getSubscriberInviteClicksRoute } from './routes/getSubscriberInviteClicksRoute'
import { getSubscriberInviteCountRoute } from './routes/getSubscriberInviteCountRoute'
import { getSubscriberRankingPlacementRoute } from './routes/getSubscriberRankingPlacementRoute'
import { getRankingRoute } from './routes/getRankingRoute'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.listen({ port: env.PORT }).then(() => {
  console.log('Server running!')
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: env.WEB_URL || true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NWL Connect Node',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/api-docs',
})

app.register(subscribeToEventRoute)
app.register(inviteLink)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInviteCountRoute)
app.register(getSubscriberRankingPlacementRoute)
app.register(getRankingRoute)

