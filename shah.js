const express= require('express');
const app =express();
const bodyParser =require('body-parser');
const mongoos = require('mongoose');

require('dotenv').config();
let port = process.env.port || 3000;
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoos.connect("mongodb://localhost:27017/studentBase", { useNewUrlParser:true})

const studentSchema=new mongoos.Schema({
name:String,
rollCall:Number,	
mEnglish:Number,
mMaths:Number,
mPhysics:Number,
mChemistry:Number,
totalMark:Number,
percentage:Number

});
const student=new mongoos.model("student",studentSchema);
app.get("/",function(req,res){
	res.sendFile(__dirname+"index.html");
	res.render("index",{bhadve:"Mt. Carmel High School"});




})
app.post("/",function(req,res){
	var nname=req.body.naam;
	var roll=req.body.rollNumber;
	console.log(nname);
	console.log(roll);
	
	

})

app.get("/result",function(req,res) {

	res.sendFile(__dirname+"/result.html");
	res.render("result",{MarksEnglish:"English",marksMaths:"Maths",marksPhysics:"Physics",marksChemistry:"Chemistry",ttotal:"Total Marks",spercentage:"Percentage (%)"})


})
app.post("/result",function(req,res) {
		var kris=req.body.surNaam;
		var thomas=req.body.rool;
	console.log(thomas);
student.findOne({rollCall:thomas},function(err,foundItem){
if (err) {
	console.log(err)
}else{
	
	res.render("result",{MarksEnglish:foundItem.mEnglish,marksMaths:foundItem.mMaths,marksPhysics:foundItem.mPhysics,marksChemistry:foundItem.mChemistry,ttotal:foundItem.totalMark,spercentage:foundItem.percentage});

}


})




})



app.get("/teacher",function(req,res){
	res.sendFile(__dirname+"/teacher.html");
	res.render("teacher",{tMark:"",percentage:""});
});
app.post("/teacher",function(req,res){
	var name=req.body.fullName;
	var rollNumber=req.body.rollNumber;
	var mEnglish=req.body.mEnglish;
	var mMaths=req.body.mMaths;
	var mPhysics=req.body.mPhysics;
	var mChemistry=req.body.mChemistry;
	var totalMarks=Number(mEnglish)+Number(mMaths)+Number(mPhysics)+Number(mChemistry);
	var percent=(totalMarks/400);
	
	res.render("teacher",{tMark:totalMarks,percentage:percent});
	var stu=new student({
		name:name,
		rollCall:rollNumber,
		mEnglish:mEnglish,
		mMaths:mMaths,
		mPhysics:mPhysics,
		mChemistry:mChemistry,
		totalMark:totalMarks,
		percentage:percent

	});
	stu.save();
})





app.listen(port,function() {
	console.log("oi maadarchod ${}" + port)
})