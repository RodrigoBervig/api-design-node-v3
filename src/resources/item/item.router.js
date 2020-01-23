import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

router
  .route('/')
  .get(controllers)
  .post(controllers)

// /api/item/:id
router
  .route('/:id')
  .get(controllers)
  .put(controllers)
  .delete(controllers)

export default router
