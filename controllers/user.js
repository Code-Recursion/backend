const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("details");
  response.json(users);
});

userRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;
  User.findById(id)
    .then((user) => {
      user ? response.json(user) : response.status(404).end();
    })
    .catch((error) => next(error));
});

userRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;

  User.findById(id)
    .then((user) => {
      if (user) {
        User.findByIdAndRemove(id)
          .then((user) => {
            console.log("deleted user ->", user);
            response.json({
              message: `user with id ${id} deleted successfully`,
            });
          })
          .catch((error) => next(error));
      } else {
        response
          .status(404)
          .json({ error: `user with id ${id} does'nt exists` })
          .end();
      }
    })
    .catch((error) => next(error));
});

userRouter.post("/", async (request, response, next) => {
  const user = request.body;
  if (
    !user.fname ||
    !user.lname ||
    !user.role ||
    !user.password ||
    !user.email
  ) {
    return response.status(400).json({ error: "content missing" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  const newUser = new User({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    role: user.role,
    passwordHash,
  });

  newUser
    .save()
    .then((result) => {
      response.json(newUser);
    })
    .catch((error) => next(error));
});

userRouter.put("/:id", async (request, response, next) => {
  const user = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  const updatedUserData = {
    fname: user.fname,
    lname: user.lname,
    passwordHash,
  };

  // by default updatedUser returns old res, optional param "{new : true}" fixes it, returns updated data
  User.findByIdAndUpdate(request.params.id, updatedUserData, { new: true })
    .then((updatedUser) => {
      response.json(updatedUser);
    })
    .catch((error) => next(error));
});

module.exports = userRouter;
