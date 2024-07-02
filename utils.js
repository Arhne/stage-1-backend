require("dotenv").config();

const weatherResponse = async (ip) => {
    const Base_URL = "http://api.weatherapi.com/v1";
    console.log("hi");
    //after ? is called parameters
   
    const api_url = `${Base_URL}/current.json?key=${process.env.apiKey}&q=${ip}`; 
    // nextwork request
    try {
        const response = await fetch(api_url);
        const weather = await response.json();
        const { location:{name}, current:{temp_c} } = weather
        // console.log(name, temp_c)
        return {
            name,
            temp_c,
        }   
    } catch (err) {
        console.error(err);
    }
};

module.exports = weatherResponse;