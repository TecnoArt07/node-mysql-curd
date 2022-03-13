var dbConn = require('../../confiq/db.config');

var Employee = function (employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.phone = employee.phone;
    this.organization = employee.organization;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.status = employee.status ? employee.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();
}

// get all employees
Employee.getAllEmployees = (result) => {
    
    let query = 'SELECT * FROM employees WHERE is_deleted=0';
    dbConn.query(query, (err, res) => {
        if (err) {
            console.log('Error while fetching employess', err);
            result(null, err);

        } else {
            console.log('Employees fetched successfully');
            result(null, res);
        }
    })
}

//get Employee BY ID from Db
Employee.getEmployeeByID = (id, result) => {
    let query = 'SELECT * FROM employees where id =?'
    dbConn.query(query, id, (err, res) => {
        if (err) {
            console.log("Eroor while fetching employee by id", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

//create new employee
Employee.createEmployee = (employeeReqData, result) => {

    dbConn.query('INSERT INTO employees SET?', employeeReqData, (err, res) => {
        if (err) {
            console.log("Error while inserting Data")
            result(null, err);
            // {status:false,message:err}
        }
        else {
            console.log("Employee created Sucessfully")
            result(null, res)
            // {status:true,message:'Employee created Successfully',inserId:res.id}
        }

    })
}

//update employeee
Employee.updateEmployee = (id, employeeReqData, result) => {
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=?,status=? WHERE id = ?", [employeeReqData.first_name,employeeReqData.last_name,employeeReqData.email,employeeReqData.phone,employeeReqData.organization,employeeReqData.designation,employeeReqData.salary,employeeReqData.status,id],(err,res)=>{
        if(err){
           console.log('Eroor while updating the employee') 
           result(null,err)
        }
        else{
            console.log("Employee Update Sucessfully")
            result(null,res)
        }
    })
}

//delete employee
Employee.deleteEmployee = (id,result)=>{
    // dbConn.query('DELETE FROM employees WHERE id=?',[id],(err,res)=>{
    //     if(err){
    //         console.log("Eroor while deleting the employee")
    //         result(null,err);
    //     }else{
    //         result(null,res);
    //     }
    // })

    dbConn.query("UPDATE employees SET is_deleted=? WHERE id=?",[1,id],(err,res)=>{
        if(err){
           console.log('Eroor while deleting the employee') 
           result(null,err)
        }
        else{
            console.log("Employee deleted Sucessfully")
            result(null,res)
        }
    })

}

module.exports = Employee;