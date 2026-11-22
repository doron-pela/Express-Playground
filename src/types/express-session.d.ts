// Add the one extra field we store in anonymous/authenticated sessions.
declare module 'express-session' {
    interface SessionData {
        csrfToken?: string;
    }
}

export {};
