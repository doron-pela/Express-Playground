import type { Request, Response } from 'express';
import _ from 'lodash';

function getHome(_req: Request, res: Response): void {
    res.send('<p>This is some text in response</p>');
    console.log('Some random number between 2 and 20:\n');
    const rand = _.random(2, 20);
    console.log(rand);
}

export default { getHome };
