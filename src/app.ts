import express, { type NextFunction, type Response, type Request } from 'express';
const app = express();
import userRouter from "@/routes/user";
import filepipeRouter from "@/routes/filepipe";
import indexRouter from "@/routes/index";

app.use(express.json()); //parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); //parses incoming requests with URL-encoded payloads (url encoding is a way to encode data in a URL, often used when submitting html form data)

app.use("/user", userRouter);
app.use("/filepipe", filepipeRouter);
app.use("/", indexRouter);

const port = 4000;
const host = "127.0.0.1";

//Returns an instance of the server, rund on localhost by default
//Listening meaning that the server is configured and ready to accept requests
app.listen(port, host, ()=>{
    console.log(`Server running at http://${host}:${port}/`);
});