// It is a package that is used to manage our enviorment variables as there are some variables that we dont want someone to directly see
// On requiring dotenv package we get an object and on calling the config function of that object we get a env propetry in out process global that 
// we can use 
const dotenv = require('dotenv') 
dotenv.config();

module.exports = {
    Port: process.env.Port,
    SaltRounds:process.env.SaltRounds,
    JwtSecret:process.env.JWTSECRET,
    JwtExpiry:process.env.JWTEXPIRY,
    Flight_url:process.env.FLIGHT_URL,
    Booking_url:process.env.BOOKING_URL
}