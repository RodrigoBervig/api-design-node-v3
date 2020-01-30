import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload) // payload will be a user
    })
  })

/* Routes for authentication: (don't really work with REST) */
export const signup = async (req, res) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).send({ message: 'Email or Password invalid' })
  }

  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).send({ message: 'E-mail or password invalid' })
  }

  const user = await User.findOne({ email: req.body.email })
    .select('email password')
    .exec()

  if (!user) {
    return res.status(401).send({ message: 'User not valid' })
  }

  const password = await user.checkPassword(req.body.password)

  if (!password) {
    return res.status(401).send({ message: 'password not valid' })
  }

  const token = newToken(user)
  return res.status(201).send({ token })
}

export const protect = async (req, res, next) => {
  next()
}
