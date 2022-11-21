import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
  return (
    <div>
      <h1>Frontpage!</h1>
      <ul>
        <li>
          <Link to={"/"}>Test 1</Link>
        </li>
        <li>
          <Link to={"/"}>Test 2</Link>
        </li>
      </ul>
    </div>
  );
}
