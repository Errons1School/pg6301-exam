import React from "react";
import { Link } from "react-router-dom";

export function FrontPage({ user }) {
  if (user === null) {
    return (
      <div>
        <h1>Frontpage!</h1>
        <ul>
          <li>
            <Link to={"/catering"}>View Catering options</Link>
          </li>
        </ul>
      </div>
    );

  } else if (user.username === "root") {
    return (
      <div>
        <h1>Frontpage!</h1>
        <ul>
          <li>
            <Link to={"/catering"}>View Catering options</Link>
          </li>
          <li>
            <Link to={"/catering/new"}>Add new Catering option</Link>
          </li>
          <li>
            <Link to={"/catering/delete"}>Delete Catering option</Link>
          </li>
        </ul>
      </div>
    );

  } else if (user.username === "user") {
    return (
      <div>
        <h1>Frontpage!</h1>
        <ul>
          <li>
            <Link to={"/catering"}>View Catering options</Link>
          </li>
        </ul>
      </div>
    );
  }

}
