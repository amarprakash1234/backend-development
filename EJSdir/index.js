const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/rollDice", (req, res) => {
    let num = Math.floor(Math.random()*6) + 1;
    const obj = {
        diceVal : num
    }
    res.render("rollDice.ejs", obj);
    
});

app.get("/ig/:username", (req, res) => {
    const instaData = require('./data.json');
    let {username} = req.params;
    const data = instaData[username];
    if(data) {
        res.render("instagram.ejs", {data});
    } else {
        res.render("error.ejs");
    }

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

