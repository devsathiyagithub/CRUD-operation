
const mysql=require(`mysql`);


const con=mysql.createPool({
    connectionLimit:10,
    host:`localhost`,
    user:`root`,
    password:``,
    database:`priya`
});




exports.view=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        console.log("db connection success");


        connection.query("select *from student",(err,rows)=>{
            connection.release();
            if(!err){
                res.render("home",{rows});
            }else{
                console.log("error in listing data "+err);
            }
        });
    });
    

};


exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.edituser=(req,res)=>{
    res.render("edituser");
}


exports.save=(req,res)=>{

    con.getConnection((err,connection)=>{
        
        if(err) throw err

        //get user data //create new variable
        const {name,age,city}=req.body;
        console.log(req.body)


        console.log("db connection success");

        connection.query("insert into student(NAME,AGE,CITY) values (?,?,?)",[name,age,city] ,(err,rows)=>{
            connection.release();

            if(!err){
                console.log("Good");
                res.render("adduser",{msg:"User details added sucessfully"});   
                
            }else{
                console.log("error in listing data "+err);
            }
        });
    });

}


//create controller for edit user
exports.edituser=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        let id= req.params.id;
        connection.query("select *from student where id=?",[id],(err,rows)=>{
            connection.release();

            if(!err){
                console.log("Good");
                res.render("edituser",{rows});
            }else{
                console.log("error in listing data "+err);
            }
        });
    });
   
}

exports.edit=(req,res)=>{

con.getConnection((err,connection)=>{
        
    if(err) throw err

    //get user data //create new variable
    const {name,age,city}=req.body;

    let id=req.params.id;

    connection.query("update  student set NAME=?,AGE=?,CITY=? where ID=?",[name,age,city,id] ,(err,rows)=>{
        connection.release();

        if(!err){
            console.log("Good");
            con.getConnection((err,connection)=>{
                if(err) throw err
                let id=req.params.id;
                connection.query("select *from student where id=?",[id],(err,rows)=>{
                    connection.release();
        
                    if(!err){
                        console.log("Good");
                        res.render("edituser",{rows,msg:"User details updated  sucessfully"});   
                       
                        console.log("error in listing data "+err);
                    }
                });
            });
            
        }else{
            console.log("error in listing data "+err);
        }
    });
});
}

exports.delete = (req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;
        connection.query("delete from student where id=?",[id],(err,rows)=>{
        connection.release();
        if(!err)
        {
            res.redirect("/")
        }else{
            console.log(err)
        }
    });
});
};