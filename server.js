const express = require("express");
const weatherResponse = require("./utils");


const app = express();


const stripQuotes = (visitor_name) => {
    if (visitor_name.startsWith('"') && visitor_name.endsWith('"')) {
        return visitor_name.slice(1, -1);
    }
    return visitor_name;
}

// This line helps you to get your IP address from express, since IP is hidden by default;
app.set("trust proxy", true);

app.use((req, res, next) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  console.log("Client IP:", ip);
  next();   //a middle ware that tells the program to move to the next function
});

// {
//     "client_ip": "127.0.0.1", // The IP address of the requester
//     "location": "New York" // The city of the requester
//     "greeting": "Hello, Mark!, the temperature is 11 degrees Celcius in New York"
//   }
app.get("/api/hello/", async (req, res) => {
  const { visitor_name } = req.query;
  const IP = req.headers["x-forwarded-for"] || req.ip;
  const newIP = IP.split(",").slice(0, 1)[0];
  const {name, temp_c} = await weatherResponse(newIP);

  res.json({   
    client_ip: newIP,
    location: name,
    greetings: `Hello, ${visitor_name ? stripQuotes(visitor_name) : "guest"}!, the temperature is ${temp_c} degrees Celcius in ${name}`,
  });
});

app.listen(4000, function () {
  console.log("server is running on port 3000");
});

