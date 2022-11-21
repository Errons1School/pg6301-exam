import React from "react";

export function LoginPage() {
  return (
    <div>
      <h1>Login page!</h1>
      <form action="/api/login" method="POST">
        <div>
          Username:
          <input type="text" name="username" />
        </div>
        <div>
          Password <input type="password" name="password" />
        </div>
        <div>
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
}
