const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
// const cookieParser = require("cookie-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const sessionOption = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
}
app.use(session(sessionOption));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    const {name = "anonymous"} = req.query;
    req.session.name = name; // es value ko ham apne dusre routes ke ander v access kr skte hai.
    if(name == "anonymous") {
        req.flash("error", "user not registered");
    } else{
        req.flash("success", "user registered successfully!");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    // res.locals.successMsg = req.flash("success");
    // res.locals.errorMsg = req.flash("error");
    // res.render("page.ejs", {name: req.session.name, msg: req.flash("success")});
    res.render("page.ejs", {name: req.session.name});

});

// app.get("/reqcount", (req, res) => {
//     if(req.session.count) {
//         req.session.count++;
//     } else{
//         req.session.count = 1;
//     }
    
//     res.send(`You sent a request ${req.session.count} times!`);
// });

// app.get("/test", (req, res) => {
//     res.send("TEst successful!");
// });











































// app.use(cookieParser("secretcode")); // jaise hi koi request aayegi to wo hamare cookieParser middleware ke through jayegi

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "India", {signed: true});
//     res.send("signed cookie sent");

// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     // console.log(req.cookies);
//     res.send("verified!");
// });

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "namasste!");
//     res.cookie("madeIn", "India");
//     res.send("Send you some cookies!");
// });

// app.get("/greet", (req, res) => {
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi, ${name}`);
// });

// app.get("/", (req, res) => {
//     console.dir(req.cookies); // if ham root route pr cookies ko print krana chahte hai.
//     res.send("Hi, I am root!");
// });

// app.use("/users", users);
// app.use("/posts", posts);


app.listen(3000, () => {
    console.log("Server is listening to 3000");
});