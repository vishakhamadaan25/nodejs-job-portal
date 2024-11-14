//imports
// const express=require('express');

//API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

//package imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

//security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";


//file imports
import connectDB from "./config/db.js";
import testRoutes from './routes/testRoutes.js';

//routes imports
// import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoute.js";

//Dot ENV config
// dotenv.config({path:'./config'});
dotenv.config({ path: './.env' });

console.log('MongoDB URL:', process.env.MONGO_URL);

//mongodb connection
connectDB();//function call

//Swagger api config
const options={
    definition:{
    openapi:"3.0.0",
    info:{
        title:"Job Portal Application",
        description: "Node Expressjs Job Portal Application"
    },
    servers:[
        {
            url:"http://localhost:8080"
        }
    ]
},
    apis:['./routes/*.js'],
};

const spec = swaggerJsDoc(options);

//rest object
const app=express();


//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
// app.get("/",(req,res)=>{
//         res.send("<h1>Welcome to job portal</h1>");
// });
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job',jobsRoutes);

//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware);

//port
//extracting port from environment variable
const PORT= process.env.PORT || 8080;


//listen
app.listen(PORT,()=>{

    console.log(`Node server running In ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
