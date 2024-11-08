const express = require("express");
const ExpressError = require("./ExpressError");
const app = express();



// app.use( (req, res, next) => {
//     console.log("hi, I am a 1st middleware!");
//     next();
// } );

// app.use( (req, res, next) => {
//     console.log("hi, I am a 2nd middleware!");
//     next();
// } );

//logger
// app.use( (req, res, next) => {
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// } );

// app.use("/random", (req, res, next) => {
//     console.log("I am only middleware for random!");
//     next();
// });
app.use("/api", (req, res, next) => {
    let {token} = req.query;
    if(token === "giveaccess") {
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
});


app.get("/err", (req, res) => {
    // throw new ExpressError(403 ,"Access Denied!!");
    abcd = abcd;
});

app.get("/api", (req, res) => {
    res.send("Data");
});

app.get("/", (req, res) => {
    res.send("Hi, i am root.");
});

app.get("/random", (req, res) => {
    res.send("this is a random page.");
});

app.get("/admin", (req, res) => {
    throw new ExpressError(403, "Acsess to admin is forbidden!");
});

app.use((err, req, res, next) => {
    let {status, message} = err;
    // res.status(status).send(message);
    // console.log(err);
    console.log(err);
    res.send(err.message);
    
});


// app.use((req, res) => {
//     res.status(404).send("Page not found!");
// });

app.listen(8080, () => {
    console.log("Server listening to port 8080");
});