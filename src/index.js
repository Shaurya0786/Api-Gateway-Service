const express = require('express')
const {rateLimit} = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');
const {Authmiddlewares} = require('./middlewares')
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const { ServerConfig , logger} = require('./config') 
const  apiRoutes  = require('./routes')

const app = express()

app.use(limiter)

// The Proxy paths are added here cuz body is getting parsed Two times
app.use('/flightServices',Authmiddlewares.checkAuth,createProxyMiddleware({target: ServerConfig.Flight_url,changeOrigin: true,pathRewrite: {'/flightServices':'/'}}));
app.use('/bookingServices',Authmiddlewares.checkAuth,createProxyMiddleware({target: ServerConfig.Flight_url,changeOrigin: true,pathRewrite: {'/bookingServices':'/'}}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes)
app.listen(ServerConfig.Port,()=>{
    console.log(`Server Started Successfully at Port : ${ServerConfig.Port}`)
   //logger.info('Server Initiated')
})