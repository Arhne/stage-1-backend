const express = require ("express");


const app = express();


app.set('trust proxy', true);

app.use((req, res, next) => {
    // const clientIp = req.connection.remoteAddress || 0;

    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var ip = req.headers['x-forwarded-for'] ||
     req.socket.remoteAddress ||
     null;
    console.log('Client IP:', ip);
    next();
});

app.get("/api/hello/", (req, res) =>{
    const {visitor_name} = req.query
 res.json({
    // message: "sample mesg"
    "client_Id": req.headers['x-forwarded-for'] || req.connection.remoteAddress
 })  
})

app.listen(4000, function() {
    console.log("server is running on port 3000")
});


