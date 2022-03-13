const mysql = require('mysql')
//create mysql connection
const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'node_mysql_crud_db'
});

dbConn.connect((err)=>{
    if(err) throw err;
    console.log("Database connectes Suceesfully")
})

module.exports = dbConn;