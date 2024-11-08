const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
    .then(res => {
        console.log('Connection Establish Successful!');
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: 'Neha',
        to: 'Preeti',
        msg: 'Send me notes for Exam',
        created_at: new Date()
    },
    {
        from:'Rohit',
        to: 'Mohit',
        msg: 'teach me JS callback',
        created_at: new Date()
    },
    {
        from: 'Amit',
        to: 'Sumit',
        msg: 'All the Best!',
        created_at: new Date()
    },
    {
        from: 'Anita',
        to: 'Ramesh',
        msg: 'bring me some fruits!',
        created_at: new Date()
    },
    {
        from: 'Tony',
        to: 'Peter',
        msg: 'Love you 3000',
        created_at: new Date()
    }
];

Chat.insertMany(allChats)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });





