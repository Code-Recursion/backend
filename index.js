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
    }).catch(error => {
      response.status(400).send({error:'malformated id'}).end()
    })
})

app.delete('/api/users/:id', (request, response) => {
  const id = request.params.id
  User.findByIdAndRemove(id)
    .then(user => {
      user
      ? response.json(user)
      : response.status(404).end()
    }).catch(error =>{
      console.log(error);
      response.status(400).send({error:'malformated id'}).end()
    })
})

app.post('/api/users/', (request, response) => {
  const user = request.body

  const newUser = new User({
    "email": user.email,
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})