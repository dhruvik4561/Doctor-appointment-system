import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import patientRoutes from './routes/patientRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js';
import notificationRoutes from './routes/notificationRoute.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import multer from 'multer';
import './cronJob.js'; 

const app = express()

//middleware
app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200 
}));

app.use(session({
    secret: 'yourSecretKey',  
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, 
        collectionName: "sessions",
         
    }),
    cookie: { secure: false,httpOnly:true,sameSite:"lax" }
}));



// app config
connectDB()
connectCloudinary()

// api endpoints
app.use('/api/',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.use('/api/patients',patientRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/notification', notificationRoutes)

app.get('/',(req,res)=>{
    res.send('API working')
})

app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Something went wrong on the server!" });
});

const port = process.env.PORT || 5001
app.listen(port, ()=> console.log("Server started",port))

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

console.log("cron job started")