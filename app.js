const express =require("express");
const app =express();
const https =require("https");
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){

res.sendfile(__dirname + "/index.html");
});


app.post("/",function(req,res){

console.log(req.body.cityName);
console.log("Post request received");
const query=req.body.cityName;
const apikey="2a25162a1011ab9c73435807a5c27a05";
const unit= "metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+ unit+"";
https.get(url,function(response){
console.log(response.statusCode);

response.on("data",function(data){
	const weatherdata=JSON.parse(data)
	//console.log(weatherdata);

	const temp=weatherdata.main.temp
	//console.log(temp);
	const wd=weatherdata.weather[0].description
	const icon=weatherdata.weather[0].icon
	const imageURL=" http://openweathermap.org/img/wn/"+ icon  + "@2x.png"
	res.write("<p> The weather is currently" + wd + "<p>");
	res.write("<h1>The temperature in "+ query +" is" + temp +"degrees celcius</h1>");
	res.write("<img src=" + imageURL +">");
	res.send();



})

})

})

app.listen(3000,function(){

console.log("Server is running on port 3000");


})
