import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";

import React, { } from "react";

export function Application() {
  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Front page</Link>
        <div className="menu-divider" />
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
