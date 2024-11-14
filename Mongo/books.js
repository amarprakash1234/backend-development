const mongoose = require('mongoose');
main()
    .then(() => {
        console.log('Connection Successful!');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');

}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['fiction', 'non-fiction']
    },
    genre : [String]

});

const Book = mongoose.model('Book', bookSchema);

let book1 = new Book({
    // title: 'Marvel Comic v2',
    price: '600',
    genre: ['Comics', 'SuperHero', 'Fiction']
});

book1.save()
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });






