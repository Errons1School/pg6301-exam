import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";

import React, { } from "react";
import {LoginPage} from "./pages/login";

export function Application() {
  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Front page   </Link>
        <Link to={"/login"}>Login</Link>
        <div className="menu-divider" />
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/login"} element={<LoginPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
