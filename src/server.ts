import { app } from './app'
import { env } from './env'

const port = env.PORT

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
