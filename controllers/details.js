const detailsRouter = require('express').Router()
const Details = require('../models/details')

detailsRouter.get('/', (request, response) => {
  Details.find({}).then(detail => {
    response.json(detail)
  })
})

// userRouter.get('/:id', (request, response, next) => {
//   const id = request.params.id
//   User.findById(id)
//     .then(user => {
//       user
//         ? response.json(user)
//         : response.status(404).end()
//     }).catch(error => next(error))
// })

// userRouter.delete('/:id', (request, response, next) => {
//   const id = request.params.id

//   User.findById(id)
//     .then(user => {
//       if (user) {
//         User.findByIdAndRemove(id)
//           .then(user => {
//             console.log("deleted user ->", user)
//             response.json({ "message": `user with id ${id} deleted successfully` })
//           }).catch(error => next(error))
//       }
//       else {
//         response.status(404).json({ "error": `user with id ${id} does'nt exists` }).end()
//       }
//     }).catch(error => next(error))
// })

// userRouter.post('/', (request, response, next) => {
//   const user = request.body
//   if (!user.fname || !user.lname || !user.role || !user.password || !user.email ) {
//     return response.status(400).json({ error: 'content missing' })
//   }
//   const newUser = new User({
//     "fname": user.fname,
//     "lname": user.lname,
//     "email": user.email,
//     "role": user.role,
//     "password": user.password
//   })

//   newUser.save()
//     .then(result => {
//       response.json(newUser).status(200).end()
//     })
//       .catch(error => next(error))
// }) 

// userRouter.put('/:id', (request, response, next) => {
//   const user = request.body

//   const updatedUserData = {
//     "fname": user.fname,
//     "lname": user.lname,
//     "password": user.password
//   }

//   // by default updatedUser returns old res, optional param "{new : true}" fixes it, returns updated data
//   User.findByIdAndUpdate(request.params.id, updatedUserData, { new: true })
//     .then(updatedUser => {
//       response.json(updatedUser)
//     }).catch(error => next(error))
// })

module.exports = detailsRouter