var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var path = require('path');
var mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_mysql'
});

module.exports.index = function(req, res){
    res.send('index');
    // res.sendFile(path.join(__dirname, '../index.html'));
}

module.exports.showUsers = function(req, res){

    var sqlText = "SELECT * FROM users";
    var names = [];
    connection.query(sqlText, function(err, results){
        if (err) throw err;
        console.log('Veriler Çekildi');
        res.send(results);
    });
}

module.exports.insertUsers = function(req, res){
    var sqlText = "INSERT INTO users (name, surname, gender , department , computer_skills) "+
    "VALUES (" + 
    "'"+ req.body.fname + "', " +  
    "'"+ req.body.lname +"', "+
    "'"+ req.body.gender +"', "+
    "'"+ req.body.department +"', "+
    "'"+ req.body.cskills + "'"+
    ");";
    // console.log(sqlText);
    connection.query(sqlText, function(err, results){
        if (err) throw err;
        console.log('Veri Eklendi');
        res.send(results);
        res.end();
    });
    
}