import express, { type NextFunction, type Response, type Request } from 'express';
import {readFileSync, writeFileSync} from 'node:fs';
import _ from 'lodash';
const app = express();
const router = express.Router();
import defaultRouteGetController from '@/controllers/defaultRouteGetController';

const port = 4000;
const host = "127.0.0.1";


const filepipeRouteGetController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    res.status(200);    
    res.setHeader('Content-Type', 'text/html');
    writeFileSync(
      "./file.txt",
        `This is another string of content I am writing into file.txt. It is a test script. And it will write. 
        \n
        I am trying to see what happens with spaces and newline characters as well. What happens now?`
    );
    const contents = readFileSync("./file.txt", "utf-8");
    res.send(`<h1>${contents}</h1>`);
};


const userRouteGetController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("username to be saved: ", req.body.username);
  res.send(
    `<form method='POST' action='/user'>
        <input type='text' name='username' placeholder='Enter username'>
        <button type='submit'>Submit</button>
    </form>
     `,
  );
};

const userRoutePostController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("username to be saved: ", req.body.username);
  res.send('<h1>POST request received</h1>');
};

app.get('/', defaultRouteGetController);

app.get('/filepipe', filepipeRouteGetController);

app.get("/user", userRouteGetController);

app.post('/user', userRoutePostController);

//Returns an instance of the server, rund on localhost by default
//Listening meaning that the server is ready to accept requests
app.listen(port, host, ()=>{
    console.log(`Server running at http://${host}:${port}/`);
});