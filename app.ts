import express from 'express';
import {readFileSync, writeFileSync} from 'node:fs';
import _ from 'lodash';
const app = express();

const port = 4000;
const host = "127.0.0.1";

app.get('/', (req, res, next)=>{
    res.send('<p>This is some text in response</p>');
    console.log("Some random number between 2 and 20:\n")
    const rand = _.random(2,3);
    console.log(rand);
});

app.get('/filepipe', (req, res, next)=>{
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
})

//Returns an instance of the server, rund on localhost by default
//Listening meaning that the server is ready to accept requests
app.listen(port, host, ()=>{
    console.log(`Server running at http://${host}:${port}/`);
});