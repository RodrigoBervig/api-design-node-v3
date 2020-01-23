import { Item } from './item.model'
import mongoose from 'mongoose'
import { connect } from '../../utils/db'

const run = async () => {
  await connect('mongodb://localhost:27017/api-test')
  const item = await Item.create({
    name: 'Clean up',
    createdBy: mongoose.Types.ObjectId(),
    list: mongoose.Types.ObjectId()
  })

  const updated = await Item.findByIdAndUpdate(
    item._id,
    { name: 'eat' },
    { new: true }
  ).exec()

  console.log(updated)
}

connect('mongodb://localhost:21017/api-test')
  .then(
    Item.find({})
      .exec()
      .then(response => {
        console.log('hey! \n' + response)
      })
      .catch(err => console.log('fuck' + err))
  )
  .catch(err => console.log('oops: \n' + err))

// run()
