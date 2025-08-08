import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();




//MIDDLEWARES
app.use(cors({  //CORS is used to allow cross-origin requests
    origin: "*",
    credentials: true
}));
app.use(express.json({ //Jo body mein data aata hai usko json mein convert karne ke liye
    limit:'20kb'
}));
app.use(express.urlencoded({  //To support URL encoded bodies jaise kuch mein word                      
    extended: true,   //ke beech mein + hota hai aur kuch mein %20 hota hai
    limit:'20kb'
}));
app.use(express.static('public')); //saare static files
app.use(cookieParser()); //To parse cookies from the request



//ROUTES
//routes import
import userRouter from './routes/user.routes.js';


//routes declaration
app.use("/api/v1/users", userRouter); //https://localhost:5000/api/v1/users/register






export {app};