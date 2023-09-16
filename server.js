const http = require('http');
// it take in a call back function , a function that is going to run and send a home page.
// it has 2 objects that are request and response, the request has information about the requesst like the url
//the response is used to send a response oo user's browser

const fs = require('fs'); // object to read a file 

const server = http.createServer((req,res)=>{
    console.log(req.url, req.method);

    //set header content type we take 3 steps here
    //res.setHeader('content-Type','text/plain'); // step 1 here we set the rsponse header to plain text

    res.setHeader('content-Type','text/html');// step 1 change --here we set the rsponse header to html instead of plain text

    let path = './views'  //we are going to use this switch as a simple routing system.
    switch(req.url){
        case'/': 
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200; 
            break;
        case '/about-me':
            res.statusCode = 301;  // the requested page is changed and we need to redirect to the new url
            res.setHeader('Location','/about'); // set header with the new location
            res.end();
            break;
        default:
            path += '/404.html';
            res.statusCode = 404; // telling the browser that source doesn't exist
        break;
    }

    //res.write('hello,ninja'); // step 2 --here we set what content we want to send to the browser

    /* code used to check ho html works //  step 2 change--here we set what content we want to send to the browser with html
    res.write('<head><link rel="stylesheet" herf="#"></head>')
    res.write('<p>hello, ninjas</p>'); l 
    res.write('<p>hello again, ninjas</p>');
    */

    //fs.readFile('./views/index.html', (err,data) => { //html file being read and sent in data argument  
    fs.readFile(path, (err,data) => { // here we changed the previuos code and added the path we created earlier so it follows the desired route
        if (err){
            console.log(err);
            res.end(); 
        } else {
            //res.write(data); // that code used earlier but as we are sending only one file we can send directly thorugh the end function as follows
           
            res.end(data);
        }
    })

   // res.end(); // step 3 -- here we end the request
}); 

// then we use the listen function that takes the port number (3000) and the host  and a function to execute
// local host ip is 127.0.0.1
server.listen(3000,'localhost',()=> {
    console.log('listening for request on port 3000');
})//
                                                    
                                                    

