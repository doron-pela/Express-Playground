// Preserve the original sign-up page, adding only a CSRF hidden field.
// This remains temporary, framework-independent server-rendered HTML.
export const signupPage = (csrfToken: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sign Up</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; display: flex; justify-content: center; align-items: center; min-height: 100vh;">

  <div style="background-color: #ffffff; padding: 36px 32px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); width: 100%; max-width: 380px; box-sizing: border-box;">
    
    <h1 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 700; color: #111827; text-align: center;">
      Sign Up
    </h1>
    
    <form action="/user" method="POST" style="display: flex; flex-direction: column;">
      <input type="hidden" name="_csrf" value="${csrfToken}">
      
      <label for="username" style="margin-bottom: 6px; font-size: 14px; font-weight: 600; color: #374151;">
        Username
      </label>
      <input 
        id="username" 
        name="username" 
        placeholder="Enter a username" 
        type="text" 
        style="padding: 10px 12px; margin-bottom: 18px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; color: #111827; outline: none; box-sizing: border-box;" 
      />
      
      <label for="password" style="margin-bottom: 6px; font-size: 14px; font-weight: 600; color: #374151;">
        Password
      </label>
      <input 
        id="password" 
        name="password" 
        placeholder="••••••••" 
        type="password" 
        style="padding: 10px 12px; margin-bottom: 24px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; color: #111827; outline: none; box-sizing: border-box;" 
      />
      
      <button 
        type="submit" 
        style="background-color: #2563eb; color: #ffffff; padding: 12px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;"
      >
        Sign Up
      </button>
      
    </form>
  </div>

</body>
</html>

     `;
