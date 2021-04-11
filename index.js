const { request } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

let users = [
  {
    id: 1,
    fname: "Ajay",
    lname: "Singh",
    email: "helloajaysingh1@gmail.com",
  },
  {
    id: 2,
    fname: "John",
    lname: "john",
    email: "helloajaysingh1@gmail.com",
  },
  {
    id: 3,
    fname: "carl",
    lname: "johnson",
    email: "helloajaysingh1@gmail.com",
  },
]

app.get('/', (request, response) => {
  response.send("hello mf")
})

app.get('/api/users', (request, response) => {
  response.json(users)
})

app.get('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users.find(user => user.id === id)
  user
    ? response.json(user)
    : response.status(404).end()
})

app.delete('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users.filter(user => user.id !== id)
  response.json(user)
  response.status(204).end()
})

app.post('/api/users/', (request, response) => {
  // const user = request.body  
  newId = Math.max(...users.map(user => user.id))
  console.log(newId + 1)
  // const updatedUsers = users.concat(user)
  // response.json(updatedUsers)
  // response.status(201).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})