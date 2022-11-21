import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
  return (
    <div>
      <h1>Frontpage!</h1>
      <ul>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </div>
  );
}
