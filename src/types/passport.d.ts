// The shape that Passport attaches to req.user after deserialization.

//Would and should be better to use declare module 'express' { interface User { id: number; username: string; } }, 
//but @types/express and @types/passport define Express.User (the empty by default interface), in a global namespace than 
// exporting from a module, so we do the same here. 
declare global {
    namespace Express {
        interface User {
            id: number;
            username: string;
        }
    }
}

export {};
