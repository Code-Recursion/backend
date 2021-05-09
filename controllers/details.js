const detailsRouter = require("express").Router();
const Detail = require("../models/details");
const User = require("../models/user");
const jwt = require('jsonwebtoken')

detailsRouter.get("/", async (request, response) => {
  const details = await Detail.find({}).populate("user")
  response.json(details)
});

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

detailsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log("--------------------------------------------------------------------------------")
  console.log(user)
  console.log("--------------------------------------------------------------------------------")

  // console.log(u)

  // const user = await User.findById(body.userId);
  
  const detail = new Detail({
    dob: new Date(),
    image: body.image,
    headline: body.headline,
    about: body.about,
    resume: body.resume,
    website: body.website,
    github: body.github,
    skills: body.skills,
    language: body.langauge,
    experience: body.experience,
    secondary: body.secondary,
    seniorSecondary: body.seniorSecondary,
    yearOfPass: body.yearOfGrad,
    currentGpa: body.currentGpa,
    yearOfGrad: body.yearOfGrad,
    course: body.course,
    school: body.school,
    college: body.college,
    city: body.city,
    state: body.state,
    country: body.country,
    openToWork: body.openToWork,
    user: user._id,
  });

  try {
    const savedDetails = await detail.save();
    user.details = savedDetails._id;
    await user.save();
    response.json(savedDetails);
  } catch (error) {
    next(error);
  }
});

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

module.exports = detailsRouter;
