// const res = require('express/lib/response');
// const Employee = require('../models/employee.model');
const  EmployeeModel = require('../models/employee.model')

// get all employee list
exports.getEmployeeList=(req,resp)=>{
    console.log ("Here ALl Employee List")
    EmployeeModel.getAllEmployees((err,employees)=>{
        // console.log("WE ARE heer")
        if(err)
        
        resp.send(err);
        console.log('Employees',employees)
        resp.send(employees)

        

    })
}

//get Employee by ID
exports.getEmployeeByID = (req,res)=>{
    // console.log("get emp by id")
    EmployeeModel.getEmployeeByID(req.params.id,(err,employee)=>{
        if(err)
        res.send(err);
        console.log("single Employee Data",employee);
        res.send(employee)

    })
}

//create new employee
exports.createNewEmoloyee = (req,res)=>{
    // console.log("   Create new emp")
    // console.log('req_data',req.body);
    const employeeReqData =  new EmployeeModel(req.body)
    console.log('employeeReqData',employeeReqData)
    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0)
    {
        res.send(400).send({success:false,message:'Please fill all fields'});
    }else{
        // console.log("Valid Data");
       
        EmployeeModel.createEmployee(employeeReqData,(err,employee)=>{
            if(err)
            res.send(err)
            res.json({status:true,message:'Employee created Sucessfully' ,data:employee.insertId})
            
        
        })
    }
}

//update Employeee
exports.updateEmployee = (req,res)=>{
    const employeeReqData =  new EmployeeModel(req.body)
    console.log('employeeReqData update',employeeReqData)
    //check null
    if(req.body.contructor === Object && Object.keys(req.body).length === 0)
    {
        res.send(400).send({success:false,message:'Please fill all fields'});
    }else{
        // console.log("Valid Data");
       
        EmployeeModel.updateEmployee(req.params.id,employeeReqData,(err,employee)=>{
            if(err)
            res.send(err)
            res.json({status:true,message:'Employee updated Sucessfully'})
        })
    }

}


//Delete employee

exports.deleteEmployee = (req,res)=>{
    EmployeeModel.deleteEmployee(req.params.id,(err,employee)=>{
        if(err)
        res.send(err)
        res.json({success:true,message:'Employee deleted Successfuy'})
    })
}