const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'delta_app',
    password : '@amar1234'
});

// let getRandomUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.userName(), // before version 9.1.0, use userName()
//         faker.internet.email(),
//         faker.internet.password()
//     ];
// }

// Inserting a new data
// let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = ["123", "123_newuser", "abc@gmail.com", "abc"];

// Inserting TWo Data
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users = [["123b", "123_newuserb", "abc@gmail.comb", "abcb"], ["123c", "123_newuserc", "abc@gmail.comc", "abcc"]];

// try{
//     connection.query("SHOW TABLES", (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     })
// } catch(err) {
//     console.log(err);
// }

// try{
//     connection.query(q, user, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     })
// } catch(err) {
//     console.log(err);
// }

// try{
//     connection.query(q, [users], (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     })
// } catch(err) {
//     console.log(err);
// }

// Insert in Bulk
// let data = [];
// for(let i = 1; i<=100; i++) {
//     data.push(getRandomUser());
// }


// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// try{
//     connection.query(q, [data], (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     })
// } catch(err) {
//     console.log(err);
// }




// Home ROUTE
app.get('/', (req, res) => {
    let q = `SELECT count(*) FROM user`;
    try{
        connection.query(q, (err, result) => {
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", {count});
        });
    } catch(err) {
        res.send("Some error in DB!");
    }
});

// SHow ROute
app.get('/user', (req, res) => {
    let q = `SELECT * FROM user`;
    try{
        connection.query(q, (err, users) => {
            if(err) throw err;
            res.render("showUsers.ejs", { users });
        });
    } catch(err) {
        res.send("Some error in DB!");
    }
});

// Edit Route
app.get('/user/:id/edit', (req, res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id ='${id}'`;
    try{
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            res.render('edit.ejs', { user });
        });
    } catch(err) {
        res.send("Some error in DB!");
    }
});

// Update Route
app.patch("/user/:id", (req, res) => {
    let {password: formPass, username: newUsername} = req.body;
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id ='${id}'`;
    try{
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            if(formPass != user.password) {
                res.send('Wrong PAssword!');
            } else {
                let q2 = `UPDATE user SET username = '${newUsername}' WHERE id='${id}'`;
                connection.query(q2, (err, result) => {
                    if(err) throw err;
                    res.redirect('/user');
                });
            }

        });
    } catch(err) {
        res.send("Some error in DB!");
    }

});

app.listen('8080', () => {
    console.log(`Server is listening to port 8080`);
});



