const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const Chat = require('./models/chat.js');
const ExpressError = require("./ExpressError");

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
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

// Index Route
app.get('/chats', asyncWrap(async (req, res) => {
        let chats = await Chat.find({});
        res.render('index.ejs', { chats });
        
    })
);

//New Route
app.get('/chats/new', (req, res) => {
    res.render('new.ejs');

});

//Create Route
app.post('/chats', asyncWrap(async (req, res, next) => {
        let {from, to, msg} = req.body;
        let newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date()
        });
        await newChat.save();
        res.redirect('/chats');

    })
);

function asyncWrap(fn) {
    return function(req, res, next) { // es function ka kam hoga to execute fn fxn 
        fn(req, res, next).catch(err => next(err));
    };
}

//New Show Route
app.get("/chats/:id",asyncWrap(async (req, res, next) => {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        if(!chat) {
            next(new ExpressError(404, "Chat not found!"));
        }
        res.render("edit.ejs", {chat});

    })
);

// Edit Route
app.get('/chats/:id/edit', asyncWrap(async (req, res) => {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render('edit.ejs', {chat});
    
    })
);

//Update Route
app.put('/chats/:id', asyncWrap(async (req, res) => {
        let {id} = req.params;
        let {msg: newMsg} = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true});
        console.log(updatedChat);
        res.redirect('/chats');
    
    })
);

//Destroy Route
app.delete('/chats/:id', async (req, res) => {
    try {
        let {id} = req.params;
        let chat = await Chat.findByIdAndDelete(id);
        console.log(chat);
        res.redirect('/chats');
    } catch(err) {
        next(err);
    }
});

app.get("/", async (req, res) => {
    res.send("Working root");
});

const handleValidationErr = (err) => { // err ko apne function me use krk kaam krr skte h 
    console.log("This was a validation error. Please follow rules");
    console.dir(err.message);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === "ValidationError") {
        err = handleValidationErr(err);
    }
    next(err);
});

// Error Handling Middleware!
app.use((err, req, res, next) => {
    let {status=500, message="Some Error Occured!"} = err;
    res.status(status).send(message);
});

app.listen(8080, () => {
    console.log('Server is listening on port 8080!');
});

