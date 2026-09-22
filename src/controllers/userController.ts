import type { NextFunction, Request, Response } from 'express';
import usernameRepo from "@/repos/UsernameRepo"

const userRouteGetController = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // console.log("username to be saved: ", req.body.username);
    res.send(
        `<form method='POST' action='/user'>
        <input type='text' name='username' placeholder='Enter username'>
        <button type='submit'>Submit</button>
    </form>
     `,
    );
};

const userRoutePostController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const {username} = req.body;
    console.log('username to be saved: ', username);
    await usernameRepo.insertUsername(username);
    return res.send(`
        <h1>POST request received</h1>
        <p>Redirecting you to the home page shortly...</p>
        <script>
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        </script>
    `);
};

export { userRouteGetController, userRoutePostController };
