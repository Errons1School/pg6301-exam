import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";

import React, { useEffect, useState } from "react";
import { LoginPage } from "./pages/login";
import { Logout } from "./pages/logout";
import {ListCatering} from "./pages/listCatering";
import {AddNewCatering} from "./pages/addNewCatering";
import {RemoveCatering} from "./pages/removeCatering";

export function Application() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(async () => {
    setLoading(true);
    const res = await fetch("/api/login");

    if (res.ok) {
      setUser(await res.json());
    } else if (res.status === 401) {
      setUser(null);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Front page </Link>
        {user ? (
          <div>
            <div>Welcome {user.username}</div>
            <Link to={"/logout"}>Logout </Link>
          </div>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
        <div className="menu-divider" />
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage user={user} />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/logout"} element={<Logout />} />
          <Route path={"/catering"} element={<ListCatering />} />
          <Route path={"/catering/new"} element={<AddNewCatering />} />
          <Route path={"/catering/delete"} element={<RemoveCatering />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
