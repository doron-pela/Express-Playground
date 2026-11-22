// No EJS or frontend framework is needed for this minimal login example.
export function loginPage(csrfToken: string, failed: boolean): string {
    const errorMessage = failed
        ? '<p style="color:#b91c1c">Invalid username or password.</p>'
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Log In</title></head>
<body style="font-family:system-ui;max-width:420px;margin:60px auto;padding:16px">
    <h1>Log in</h1>
    ${errorMessage}
    <form action="/login" method="POST">
        <input type="hidden" name="_csrf" value="${csrfToken}">
        <p><label>Username <input name="username" autocomplete="username" required></label></p>
        <p><label>Password <input name="password" type="password" autocomplete="current-password" required></label></p>
        <button type="submit">Log in</button>
    </form>
    <p>New here? <a href="/user">Sign up</a></p>
</body>
</html>`;
}

export function loggedInPage(csrfToken: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Logged In</title></head>
<body style="font-family:system-ui;max-width:420px;margin:60px auto;padding:16px">
    <h1>You're logged in</h1>
    <p><a href="/me">See the user attached to this session (JSON)</a></p>
    <form action="/logout" method="POST">
        <input type="hidden" name="_csrf" value="${csrfToken}">
        <button type="submit">Log out</button>
    </form>
</body>
</html>`;
}
