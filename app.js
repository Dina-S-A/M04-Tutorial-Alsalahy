
const express = require('express');

//Express app
const app = express();

//register view engine
app.set ('view engine', 'ejs'); //set lets us set some settings
//listen for request
app.listen(3000); //starting the server

// here app responds to get command it has 2 arguments (what app listens to , function(req,res))  req like get or post , res is what the server responds with
app.get ('/' , (req, res) => {

    //res.send ('<p> Home Page </p>'); // here by using express we don't need to set the header with the data type, it is set automatically
    res.sendFile('./views/index.html', {root: __dirname}); //here we are sendind the path to pur file, but express deals with absolute path only so we need to give it the root which is the directory of app.js file

});

app.get ('/about' , (req, res) => {

   // res.send ('<p> About Page </p>');
   res.sendFile('./views/about.html', {root: __dirname});
});

//redirects
app.get('/about-us',(req, res) => {

       res.redirect('/about'); //redirect is a ready made method forces the server to send this
 });

 // 404 page
 app.use((req, res) => { //use is a middle ware function will fire only when the execution reaches it after going through each previous line and finds no match 
                            // that is why this part postion is very important as it fires for every single request if it is reached. 

   // res.sendFile('./views/404.html', {root: __dirname});
   res.status(404).sendFile('./views/404.html', {root: __dirname}); //here status 404 is added to fire the function with any error
});
