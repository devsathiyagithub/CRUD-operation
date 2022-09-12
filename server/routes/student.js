const express=require("express");

const router=express.Router();

const studentcontroller=require("../controllers/studentcontroller");

//view all record
router.get("/",studentcontroller.view);


//add  new record
router.get("/adduser",studentcontroller.adduser);
router.post("/adduser",studentcontroller.save);


//edit record
router.get("/edituser/:id",studentcontroller.edituser);
router.post("/edituser/:id",studentcontroller.edit);


//delete records
router.get("/deleteuser/:id",studentcontroller.delete);


module.exports=router;

