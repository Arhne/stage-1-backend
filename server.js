const express = require ("express");


const app = express();

// This line helps you to get your IP address from express, since IP is hidden by default;
app.set('trust proxy', true);

app.use((req, res, next) => {
   
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    console.log('Client IP:', ip);
    next();
});

app.get("/api/hello/", (req, res) =>{
    const {visitor_name} = req.query
 res.json({
    // message: "sample mesg"
    "client_Id": req.headers['x-forwarded-for'] || req.ip
 })  
})

app.listen(4000, function() {
    console.log("server is running on port 3000")
});


