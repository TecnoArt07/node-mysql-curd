const express= require('express');
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 5000;

//parse request data conntent type application/x-www-form-rulencodeed

app.use(bodyParser.urlencoded({extended:false}))

//PArse request data content type application/json
app.use(bodyParser.json())
// #define root nodemon;
app.get("/",(req,resp)=>{
    resp.send("Hello word")
});


// import employee routes
const employeeRoutes = require('./src/routes/employee.routes');
//create employee routes
app.use('/api/v1/employee',employeeRoutes);


// listen to the port

app.listen(port,()=>{
    console.log(`Server is running at the port ${port}`)
})