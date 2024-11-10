const express = require("express");
const app = express();
const port = 8080;
app.use(express.urlencoded({extended: true})); // if hamara koi data frontend se/request body me urlencoded format me aaya hai to use express.urlencoded middleware JS Object me convert kr dega.
app.use(express.json()); // if request body me json format me data aaya hai to wo JS Object me convert ho jayega.

app.get('/register', (req, res) => {
    const {user, password} = req.query;
    res.send(`Standard Get REspone!! for user : ${user}`);
});


app.post('/register', (req, res) => {
    const {user, password} = req.body;
    console.log(req.body); 
    res.send(`Standard Post Response. Welcome ${user}`);
});










app.listen(port, () => {
    console.log(`Listening the port ${port}`);
});


