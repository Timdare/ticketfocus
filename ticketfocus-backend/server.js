import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mySqlPool } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { ticketRouter } from "./routes/ticketRoutes.js";

const app = express();

dotenv.config() // CONFIGURE dotenv

//MIDDLEWARE
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST","GET","DELETE","PUT"],
    credentials: true,
}));
app.use("/api/auth", userRouter);
app.use("/api/tickets", ticketRouter);

app.get("/",(req,res)=> res.send("<h1> This is a message from the backend</h1>"))


// PORT
const PORT = process.env.PORT || 5001;
mySqlPool
    .query("SELECT 1")
    .then(()=>{
        // MY SQL
        console.log("MySql db is connected");
        //LISTEN
        app.listen(PORT,()=> console.log(`Server running on port: ${PORT}...`));
    })
    .catch(error => {
        console.log(error);
    });