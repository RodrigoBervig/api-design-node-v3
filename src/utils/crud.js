import mongoose from 'mongoose'
// 'model', here, is the schema
export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()

  if (!doc) {
    return res.status(400).end()
  }
  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id

  const doc = await model.find({ createdBy: userId }).exec()

  res.status(200).json({ data: doc })
}

export const createOne = model => async (req, res) => {
  const userId = req.user._id

  const doc = await model.create({
    ...req.body,
    createdBy: userId,
    list: mongoose.Types.ObjectId()
  })

  res.status(201).json({ data: doc })
}

export const updateOne = model => async (req, res) => {
  const userId = req.user._id
  const id = req.params.id

  /*   const doc = await model
    .findOneAndUpdate(userId, { name: updateName }, { _id: id }, { new: true })
    .exec() */
  const doc = await model
    .findOneAndUpdate(
      {
        _id: id,
        createdBy: userId
      },
      req.body,
      { new: true }
    )
    .exec()

  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const userId = req.user._id
  const id = req.params.id

  const doc = await model
    .findByIdAndDelete({ _id: id, createdBy: userId })
    .exec()

  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
