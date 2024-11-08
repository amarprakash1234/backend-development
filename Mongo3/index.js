const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const Chat = require('./models/chat.js');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

// Index Route
app.get('/chats', async (req, res) => {
    let chats = await Chat.find({});
    res.render('index.ejs', { chats });

});

//New Route
app.get('/chats/new', (req, res) => {

    res.render('new.ejs');

});

//Create Route
app.post('/chats', (req, res) => {
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save()
        .then((res) => {
            console.log('Chat was saved!');
        })
        .catch(err => {
            console.log(err);
        });
    
    res.redirect('/chats');

});

// Edit Route
app.get('/chats/:id/edit', async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs', {chat});

});

//Update Route
app.put('/chats/:id', async (req, res) => {
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg});
    console.log(updatedChat);
    res.redirect('/chats');

});

//Destroy Route
app.delete('/chats/:id', async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findByIdAndDelete(id);
    console.log(chat);
    res.redirect('/chats');
});

app.listen(8080, () => {
    console.log(`Server is listening on port 8080`);
});























app.listen(8080, () => {
    console.log('Server is listening on port 8080!');
});

