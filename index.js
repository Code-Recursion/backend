const express = require('express')
const cors = require('cors')
require('dotenv').config()
const User = require('./models/user')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('---------');
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---------')
  next()
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

// app.get('/', (request, response) => {
//   response.send("Hello there")
// })

app.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  })
})

app.get('/api/users/:id', (request, response, next) => {
  const id = request.params.id
  User.findById(id)
    .then(user => {
      user
        ? response.json(user)
        : response.status(404).end()
    }).catch(error => next(error))
})

app.delete('/api/users/:id', (request, response, next) => {
  const id = request.params.id
  User.findByIdAndRemove(id)
    .then(user => {
      response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/users/', (request, response) => {
  const user = request.body

  const newUser = new User({
    "fname": user.fname,
    "lname": user.lname,
    "password": user.password
  })
 
  newUser.save()
    .then(result => {
      response.json(newUser).status(200).end()
    }).catch(error => {
      response.json({error: error})
      response.status(500).end()
    })
})

app.put('/api/users/:id', (request, response, next) => {
  const user = request.body

  const updatedUserData = {
    "fname": user.fname,
    "lname": user.lname,
    "password": user.password
  }

  // bydefault updatedUser returns old res, optional param "{new : true}" fixes it, returns updated data
  User.findByIdAndUpdate(request.params.id, updatedUserData, {new : true})
    .then(updatedUser => {
      response.json(updatedUser)
    }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})