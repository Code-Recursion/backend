// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>')
//     process.exit(1)
// }

// const url =
//     `mongodb+srv://seekersdb:seekers-secure-1335@cluster0.l0j9j.mongodb.net/users?retryWrites=true&w=majority`

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
// })

// User = mongoose.model('User', userSchema)

// const user = new User({
//     email: 'test@test.com',
//     password: 'changeme'
// })

// User.find({}).then(result => {
//     result.forEach(user => {
//       console.log(user)
//     })
//     mongoose.connection.close()
// })


// // user.save().then(result => {
// //     console.log('user details! are saved')
// //     mongoose.connection.close()
// // })