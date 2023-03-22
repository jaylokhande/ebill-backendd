const express = require('express');
var mysql = require('mysql');
const app = express();
var connection = mysql.createConnection
({
  host : 'localhost',
  user : 'root',
  password : '',
  port : '3306',
  database : 'loginregister'
}) ;
connection.connect(function(err){
  if(err) throw err ;
  console.log('db connected');
  //var sql = "CREATE TABLE item_master(PersonID int , hsn_number varchar(255) NOT NULL PRIMARY KEY , Product_name varchar(255) , price int , mrp_price int)";
  // connection.query(sql,function(err,result){
  //   if(err) throw err;
  //   console.log("Table created with Node!");
  // })
  // var sql = "ALTER TABLE item_master ADD quantity varchar(255)";
  // connection.query(sql,function(err,result) {
  //   if(err) throw err;
  //   console.log("quantity created with ");
  // })

  // var sql = "CREATE TABLE ordered_item(Product_name varchar(255) , price int , mrp_price int  , name varchar(255) ,mobile varchar(255) , date DATE )";
  // connection.query(sql,function(err,result){
  //   if(err) throw err;
  //   console.log("Table created with Node!");
  // })
  

  
});



module.exports = connection ;
