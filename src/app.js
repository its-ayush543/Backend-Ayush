import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


app.use(cors({  //CORS is used to allow cross-origin requests
    origin: process.env.CORS_ORIGIN,
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






export {app};