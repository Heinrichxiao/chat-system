const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require("fs");
let data = require("./database.json");
const app = express();
const port = process.env.PORT || 8080;
const saltRounds = 10;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// app.use(bodyParser);
app.use(bodyParser());

app.get('/login', (req, res) => {
    res.render("login");  
});

app.post('/login', (req, res) => {
    console.log(req.body);
    if (data.users[req.body.username]) {

    } else {
        res.render("apology", {top: 400, bottom: "cannot find username"});
        // apology(req, res, "cannot find username")
    }
});

app.get('/signup', (req, res) => {
    res.render("signup");  
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    if (!data.users[req.body.username]) {
        addUser(req.body.username, req.body.password);
        console.log(data);
        console.log(JSON.stringify(data));
    } else {
        res.render("apology", {top: 400, bottom: "username already taken"});
        // apology(req, res, "cannot find username")
    }
    saveData();
});


app.listen(port, () => {
    console.log(`Started server at: http://localhost:${port}`);
});

function addUser(username, password) {
    data.users[username] = {
        username: username, 
        password: null
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        data.users[username].password = hash;
    });
}


function saveData() {
    fs.writeFile("database.json", JSON.stringify(data), err => {
        if (err) throw err;
    });
}