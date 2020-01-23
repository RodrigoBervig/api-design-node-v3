import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'
import itemRouter from './resources/item/item.router'
import userRouter from './resources/user/user.router'
import listRouter from './resources/list/list.router'

export const app = express()

app.disable('x-powered-by')

app.use('/api/item', itemRouter)
app.use('/api/user', userRouter)
app.use('/api/list', listRouter)

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
