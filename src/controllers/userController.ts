import type { Request, Response, NextFunction } from "express";

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
  res.send("<h1>POST request received</h1>");
};

export { userRouteGetController, userRoutePostController };