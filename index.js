const express = require('express')
const cors = require('cors')
require('dotenv').config()
const User = require('./models/user')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send("Hello there")
})

app.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  })
})

app.get('/api/users/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  User.findById(id)
    .then(user => {
      user
        ? response.json(user)
        : response.status(404).end()
    })
})

app.delete('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users.filter(user => user.id !== id)
  response.json(user)
  response.status(204).end()
})

app.post('/api/users/', (request, response) => {
  const user = request.body

  const newUser = new User({
    "email": user.email,
    "fname": user.fname,
    "lname": user.lname,
    "password": user.password
  })

  if(!email || !fname || !lname || !password) {
    response.json({error:"some Field(s) is/are missing"})
  }
  newUser.save()
    .then(result => {
      response.status(200)
      response.json(newUser)
    }).catch(error => {
      console.log("error occured while saving the user", error);
      json.response({error: error})
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})