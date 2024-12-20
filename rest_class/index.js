const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const {v4 : uuidv4} = require('uuid');


let posts = [
    {
        username : 'ApnaCollege',
        content : 'I Love Coding!',
        id : uuidv4()
    },
    {
        username : 'ShradhaKhapra',
        content : 'Hard Work is Important!!',
        id : uuidv4()
    },
    {
        username : 'AmarPrakash',
        content : 'I got Selected!!',
        id : uuidv4()
    },
];

app.get("/", (req, res) => {
    res.send("Server Working Well!");
});

app.get('/posts' , (req, res) => {
    res.render('index.ejs', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/posts', (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get('/posts/:id', (req, res) => {

    let {id} = req.params;
    let post = posts.find((p) => id===p.id);
    res.render('show.ejs', {post});
});

app.patch('/posts/:id', (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");

});

app.get('/posts/:id/edit', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id===p.id);
    res.render('edit.ejs', {post});

})

app.delete('/posts/:id', (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id!==p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("Listening to port : 8080");
});


