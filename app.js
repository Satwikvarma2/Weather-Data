const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res){
  const city=req.body.city
  const appId="f0ed312411803dd8eee5ac0004b4fe8d"
  var url=("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appId+"&units=metric")
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      console.log(weatherData)
      var temp=(weatherData.main.temp)
      var des=weatherData.weather[0].description
      var icon=weatherData.weather[0].icon
      var image_url= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p> the weather is currently "+des+"</p>")
      res.write("<h1>the temperature in "+city+" is "+temp+"</h1>");
      res.write("<img src="+ image_url +">");
      res.send()
    });
  });
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});


app.listen(3000,function(){
  console.log("server is running on the port 3000");
})
