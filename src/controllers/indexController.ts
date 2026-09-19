import type { Request, Response, NextFunction } from 'express';
import _ from 'lodash';


const defaultRouteGetController = (req: Request, res: Response, next: NextFunction)=>{
    res.send('<p>This is some text in response</p>');
    console.log("Some random number between 2 and 20:\n")
    const rand = _.random(2,20);
    console.log(rand);
};

export default defaultRouteGetController;