import { Router } from 'express'

const controllers = (req, res) => {
  res.send({ message: 'hello'})
}

const router = Router()

router
  .route('/id')
  .get(controllers)
  .post(controllers)

router
  .route('/:id')
  .put(controllers)
  .delete(controllers)

export default router
