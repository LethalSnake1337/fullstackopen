const api = require('express').Router()
const Entry = require('../db/Entry')
const middlewareChain = require('../handlers/middlewareChain')

api.get('/', async (request, response) => {
  const items = await Entry
    .find({})
    .populate('author', { login: 1, fullname: 1 })
  response.json(items)
})

api.post('/', middlewareChain.verifyAccount, async (request, response, next) => {
  try {
    const { account } = request

    if (!account) {
      return response.status(401).json({ message: 'Authentication required' })
    }

    const { heading, writer, resource, votes } = request.body

    if (!heading || !resource) {
      return response.status(400).json({ message: 'Missing required fields: heading and resource' })
    }

    const entry = new Entry({
      heading,
      writer,
      resource,
      votes: votes ?? 0,
      author: account
    })

    const created = await entry.save()

    account.entries = account.entries.concat(created._id)
    await account.save({ validateModifiedOnly: true })

    response.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

api.put('/:id', async (request, response, next) => {
  try {
    const { heading, writer, resource, votes } = request.body

    const result = await Entry.findByIdAndUpdate(
      request.params.id,
      { heading, writer, resource, votes },
      { new: true }
    ).populate('author', { login: 1, fullname: 1 })

    response.json(result)
  } catch (error) {
    next(error)
  }
})

api.delete('/:id', middlewareChain.verifyAccount, async (request, response, next) => {
  try {
    const { account } = request

    if (!account) {
      return response.status(401).json({ message: 'Authentication required' })
    }

    const entry = await Entry.findById(request.params.id)

    if (entry?.author.toString() === account._id.toString()) {
      await Entry.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(403).json({ message: 'Access denied' })
    }
  } catch (error) {
    next(error)
  }
})

api.post('/:id/feedback', async (request, response, next) => {
  try {
    const { remark } = request.body

    if (!remark) {
      return response.status(400).json({ message: 'Feedback content required' })
    }

    const entry = await Entry.findById(request.params.id)
      .populate('author', { login: 1, fullname: 1 })

    entry.feedback = entry.feedback.concat(remark)

    const result = await entry.save()
    result ? response.status(201).json(result) : response.status(400).end()
  } catch (error) {
    next(error)
  }
})

module.exports = api
