import type { Request, Response, NextFunction } from 'express';
import {readFileSync, writeFileSync} from 'node:fs';


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

export default filepipeRouteGetController;