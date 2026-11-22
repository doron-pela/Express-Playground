import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import userRepository from '../users/user.repository.js';
import authService from './auth.service.js';

export function configurePassport(): void {
    // LocalStrategy reads "username" and "password" from the POST form.
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await authService.verifyCredentials(username, password);
                done(null, user ?? false);
            } catch (error) {
                done(error);
            }
        }),
    );

    // After login, only this identifier is saved in the session.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // On subsequent requests, resolve the saved ID into req.user.
    passport.deserializeUser(async (id: unknown, done) => {
        if (typeof id !== 'number' || !Number.isSafeInteger(id) || id <= 0) {
            done(null, false);
            return;
        }

        try {
            const user = await userRepository.findById(id);
            done(null, user ?? false);
        } catch (error) {
            done(error);
        }
    });
}
