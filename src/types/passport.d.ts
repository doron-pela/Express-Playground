// The shape that Passport attaches to req.user after deserialization.
declare global {
    namespace Express {
        interface User {
            id: number;
            username: string;
        }
    }
}

export {};
