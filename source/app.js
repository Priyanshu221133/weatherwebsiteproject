const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
// const requests = require('requests');

//  statc ka path
const static_Path = path.join(__dirname,'../public');

// dynamic partials file
const templetes_partials_path = path.join(__dirname,'../templetes/partials');
const templetes_views_path = path.join(__dirname,'../templetes/views');

//  Dymanic Website using HBS Templete Engine
app.set("view engine","hbs");
//  know we have to tell that we are using partials files
app.set("views",templetes_views_path);
//  know we use hbs
hbs.registerPartials(templetes_partials_path);

//  run static website // ya style da raha ha public folder ma sa
app.use(express.static(static_Path));

//  express 

//  Home page
app.get("/",(request,response)=>{
    //  When we do static
    // response.send("This is our home page");

    // When we do dynamic , file ka name pass kr na ha
    response.render('index');
});

//  about page
app.get("/about",(request,response)=>{
    //  When we do static
    // response.send("This is our about page");

    // When we do dynamic , file ka name pass kr na ha
    response.render('about');
});
app.get("/about/*",(request,response)=>{
    response.render('404',{
          errorMessage:"Opps! Page Not Found"
    });
});

//  weather page
app.get("/weather",(request,response)=>{
    //  When we do static
    //  response.send("This is our Weather page");

    // When we do dynamic , file ka name pass kr na ha
    response.render('weather');
});

//  If user put different page
app.get("/*",(request,response)=>{
    // response.send("404 error Opps page not found");

    response.render('404',{
          errorMessage:"Opps! Page Not Found"      
    });
})
app.listen(port,()=>{
    console.log("listening from port ",port);
})