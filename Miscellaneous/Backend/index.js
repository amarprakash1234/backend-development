const express = require("express");
const app = express();
const port = 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/register', (req, res) => {
    const {user, password} = req.query;
    res.send(`Standard Get REspone!! for user : ${user}`);
});


app.post('/register', (req, res) => {
    const {user, password} = req.body;
    console.log(req.body); 
    res.send(`Standard Post REspone. Welcome ${user}`);
});










app.listen(port, () => {
    console.log(`Listening the port ${port}`);
});


