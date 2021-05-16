const noticeRouter = require('express').Router()
const Notice = require('../models/notice')

noticeRouter.get('/', (request, response) => {
  Notice.find({}).then((notices) => {
    response.json(notices.map((n) => n.toJSON()))
  })
})

noticeRouter.get('/:id', (request, response, next) => {
  //using mongoose's findById method for fetching individual notices

  Notice.findById(request.params.id)
    .then((notice) => {
      if (notice) {
        response.json(notice).end()
      } else {
        response.status(404).end()
      }
    })
    // the error that is passed forwards is given to the next function as a parameter. If next was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.
    .catch((error) => next(error))
  // errorHandler defined at the bottom
})

noticeRouter.delete('/:id', (request, response, next) => {
  Notice.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

noticeRouter.post('/', (request, response, next) => {
  const body = request.body

  if (body.notice === undefined) {
    return response.status(400).json({
      error: 'notice is missing',
    })
  }

  const notice = new Notice({
    notice: body.notice,
    important: body.important || false,
    date: new Date(),
  })

  notice
    .save()
    .then((savedNotice) => savedNotice.toJSON())
    .then((savedAndJsonForamttedNotice) => {
      response.json(savedAndJsonForamttedNotice)
    })
    .catch((error) => next(error))
})

noticeRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const notice = {
    notice: body.notice,
  }

  Notice.findByIdAndUpdate(request.params.id, notice, { new: true })
    .then((updatedNotice) => {
      response.json(updatedNotice)
    })
    .catch((error) => next(error))
})

module.exports = noticeRouter