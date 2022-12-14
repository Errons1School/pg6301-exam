import * as React from "react";
import * as ReactDOM from "react-dom";
import {Application} from "../client/application";
import {LoginPage} from "../client/pages/login";
import {ListCatering} from "../client/pages/listCatering";
import {AddNewCatering} from "../client/pages/addNewCatering";
import {RemoveCatering} from "../client/pages/removeCatering";
import {BrowserRouter, Route, Routes} from "react-router-dom";

describe("Snapshot tests", () => {

    it("url /", async () => {
        const element = document.createElement("div");
        ReactDOM.render(<Application />, element);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("url /login", async () => {
        const element = document.createElement("div");
        ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path={"login"} element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>,
            element
        );
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("url /catering", async () => {
        const element = document.createElement("div");
        ReactDOM.render(<ListCatering />, element);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("url /catering/new", async () => {
        const element = document.createElement("div");
        ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/catering/new"} element={<AddNewCatering />} />
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>,
            element
        );
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("url /catering/delete", async () => {
        const element = document.createElement("div");
        ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/catering/delete"} element={<RemoveCatering />} />
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>,
            element
        );
        expect(element.innerHTML).toMatchSnapshot();
    });

});