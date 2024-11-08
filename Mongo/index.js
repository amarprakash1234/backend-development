const mongoose = require('mongoose');


main()
    .then(() => {
        console.log('Connection Successful!');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

// User.findByIdAndDelete('66b9e987aa37978c71bf943e')
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// User.findOneAndUpdate({name: "Bruce"}, {age : 35}, {new: true})
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// User.findById('66b9e987aa37978c71bf943e').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });

// User.insertMany([
//     {name: "Tony", email: "tony@gmail.com", age: 50},
//     {name: "Peter", email: "peter@gmail.com", age: 30},
//     {name: "Bruce", email: "bruce@gmail.com", age: 47}
// ]).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// const user2 = new User({
//     name: "Eve",
//     email: "eve@yahoo.in",
//     age: 48
// });

// user2.save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });





